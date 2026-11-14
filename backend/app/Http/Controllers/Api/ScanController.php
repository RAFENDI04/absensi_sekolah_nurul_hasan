<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Absensi;
use App\Models\Pengaturan;
use App\Models\Siswa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScanController extends Controller
{
    public function scan(Request $request)
    {
        $request->validate([
            'qr_code' => 'required|string',
            'keterangan' => 'nullable|string|max:255',
        ]);

        $rawCode = trim($request->input('qr_code'));

        // 1. Validasi keberadaan siswa berdasarkan kode QR
        $siswa = Siswa::with('kelas')->where('qr_code', $rawCode)->first();

        // Fallback jika scanner membaca NIS langsung (misal input manual atau barcode NIS)
        if (!$siswa) {
            $siswa = Siswa::with('kelas')->where('nis', $rawCode)->first();
        }

        // Fallback jika scanner membaca token atau NIK
        if (!$siswa) {
            $siswa = Siswa::with('kelas')->where('token', $rawCode)->orWhere('nik', $rawCode)->first();
        }

        // Fallback jika scanner membaca URL atau string yang memuat NIS
        if (!$siswa) {
            $siswa = Siswa::with('kelas')->whereRaw("? LIKE '%' || nis || '%'", [$rawCode])->first();
        }

        if (!$siswa) {
            return response()->json([
                'ok' => false,
                'code' => 'INVALID_QR',
                'message' => 'QR Code tidak terdaftar di sistem sekolah.',
            ], 404);
        }

        // 2. Periksa status keaktifan siswa
        if (!$siswa->aktif) {
            return response()->json([
                'ok' => false,
                'code' => 'INACTIVE_STUDENT',
                'message' => 'Siswa berstatus nonaktif. Silakan hubungi bagian Tata Usaha.',
                'nama' => $siswa->nama,
                'nis' => $siswa->nis,
            ], 403);
        }

        // 3. Waktu server berwenang (Authoritative Server Time)
        $now = Carbon::now();
        $tanggalHariIni = $now->toDateString();
        $jamServer = $now->toTimeString(); // Format HH:mm:ss

        // 4. Periksa apakah sudah ada absensi hari ini (Cegah scan ganda)
        $existingAbsensi = Absensi::where('siswa_id', $siswa->id)
            ->where('tanggal', $tanggalHariIni)
            ->first();

        if ($existingAbsensi) {
            return response()->json([
                'ok' => false,
                'code' => 'ALREADY_SCANNED',
                'message' => "Siswa sudah tercatat absen hari ini pada pukul {$existingAbsensi->jam}.",
                'nama' => $siswa->nama,
                'nis' => $siswa->nis,
                'kelas' => $siswa->kelas ? $siswa->kelas->nama_kelas : '-',
                'jam' => $existingAbsensi->jam,
                'status' => $existingAbsensi->status,
            ], 409);
        }

        // 5. Tentukan status Hadir atau Terlambat berdasarkan konfigurasi jam server
        $batasTerlambatStr = Pengaturan::ambil('batas_terlambat', '07:15:00');
        $jamTutupScanStr = Pengaturan::ambil('jam_tutup_scan', '10:00:00');

        $batasTerlambat = Carbon::createFromTimeString($batasTerlambatStr);
        $jamTutupScan = Carbon::createFromTimeString($jamTutupScanStr);

        $statusKehadiran = 'Hadir';
        if ($now->greaterThan($batasTerlambat)) {
            $statusKehadiran = 'Terlambat';
        }

        // 6. Simpan absensi ke database
        $user = $request->user();
        $userId = $user ? $user->id : 1; // Default fallback to system/first user

        try {
            DB::beginTransaction();

            $absensi = Absensi::create([
                'siswa_id' => $siswa->id,
                'tanggal' => $tanggalHariIni,
                'jam' => $jamServer,
                'status' => $statusKehadiran,
                'keterangan' => $request->input('keterangan'),
                'dicatat_oleh' => $userId,
            ]);

            DB::commit();

            return response()->json([
                'ok' => true,
                'code' => 'SUCCESS',
                'message' => $statusKehadiran === 'Hadir' ? 'Absensi tepat waktu berhasil dicatat.' : 'Absensi tercatat (Terlambat).',
                'nama' => $siswa->nama,
                'nis' => $siswa->nis,
                'kelas' => $siswa->kelas ? $siswa->kelas->nama_kelas : '-',
                'tanggal' => $tanggalHariIni,
                'jam' => $jamServer,
                'status' => $statusKehadiran,
                'foto' => $siswa->foto,
            ], 200);

        } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
            DB::rollBack();
            return response()->json([
                'ok' => false,
                'code' => 'ALREADY_SCANNED',
                'message' => 'Siswa sudah tercatat absen hari ini.',
                'nama' => $siswa->nama,
                'nis' => $siswa->nis,
            ], 409);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'ok' => false,
                'code' => 'SERVER_ERROR',
                'message' => 'Gagal menyimpan absensi: ' . $e->getMessage(),
            ], 500);
        }
    }
}
