<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Absensi;
use App\Models\Siswa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AbsensiController extends Controller
{
    public function index(Request $request)
    {
        $tanggal = $request->input('tanggal', Carbon::now()->toDateString());

        $query = Absensi::with(['siswa.kelas', 'pencatat'])
            ->where('tanggal', $tanggal);

        if ($request->filled('kelas_id')) {
            $kelasId = $request->input('kelas_id');
            $query->whereHas('siswa', function ($q) use ($kelasId) {
                $q->where('kelas_id', $kelasId);
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $absensi = $query->orderBy('jam', 'desc')->paginate($request->input('per_page', 30));

        return response()->json([
            'ok' => true,
            'tanggal' => $tanggal,
            'data' => $absensi,
        ]);
    }

    /**
     * Input atau Koreksi Absensi Manual oleh Guru/Admin (F-13)
     */
    public function manualInput(Request $request)
    {
        $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'tanggal' => 'required|date',
            'status' => 'required|in:Hadir,Terlambat,Izin,Sakit,Alpa',
            'keterangan' => 'nullable|string|max:255',
            'jam' => 'nullable|date_format:H:i:s',
        ]);

        $user = $request->user();
        $userId = $user ? $user->id : 1;

        $jam = $request->input('jam', Carbon::now()->toTimeString());

        // UpdateOrCreate berdasarkan batasan unik (siswa_id, tanggal)
        $absensi = Absensi::updateOrCreate(
            [
                'siswa_id' => $request->input('siswa_id'),
                'tanggal' => $request->input('tanggal'),
            ],
            [
                'status' => $request->input('status'),
                'jam' => $jam,
                'keterangan' => $request->input('keterangan'),
                'dicatat_oleh' => $userId,
            ]
        );

        $absensi->load(['siswa.kelas', 'pencatat']);

        return response()->json([
            'ok' => true,
            'message' => 'Data absensi berhasil disimpan secara manual.',
            'data' => $absensi,
        ]);
    }

    public function update(Request $request, $id)
    {
        $absensi = Absensi::findOrFail($id);

        $request->validate([
            'status' => 'required|in:Hadir,Terlambat,Izin,Sakit,Alpa',
            'keterangan' => 'nullable|string|max:255',
            'jam' => 'nullable|date_format:H:i:s',
        ]);

        $data = ['status' => $request->input('status')];
        if ($request->has('keterangan')) {
            $data['keterangan'] = $request->input('keterangan');
        }
        if ($request->has('jam')) {
            $data['jam'] = $request->input('jam');
        }

        $absensi->update($data);
        $absensi->load(['siswa.kelas', 'pencatat']);

        return response()->json([
            'ok' => true,
            'message' => 'Status kehadiran berhasil dikoreksi.',
            'data' => $absensi,
        ]);
    }

    public function destroy($id)
    {
        $absensi = Absensi::findOrFail($id);
        $absensi->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Catatan absensi berhasil dihapus.',
        ]);
    }

    /**
     * Hapus catatan absensi berdasarkan ID Siswa & Tanggal (Bisa absen ulang)
     */
    public function destroyBySiswa(Request $request, $siswaId)
    {
        $tanggal = $request->input('tanggal', Carbon::now()->toDateString());
        $absensi = Absensi::where('siswa_id', $siswaId)
            ->where('tanggal', $tanggal)
            ->first();

        if ($absensi) {
            $absensi->delete();
            return response()->json([
                'ok' => true,
                'message' => 'Catatan absensi siswa berhasil dihapus.',
            ]);
        }

        return response()->json([
            'ok' => true,
            'message' => 'Tidak ada data absensi untuk dihapus.',
        ]);
    }

    /**
     * Lembar Absensi Lengkap per Kelas (menampilkan siapa yang belum hadir)
     */
    public function sheetByClass(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'tanggal' => 'nullable|date',
        ]);

        $kelasId = $request->input('kelas_id');
        $tanggal = $request->input('tanggal', Carbon::now()->toDateString());

        $siswaList = Siswa::where('kelas_id', $kelasId)
            ->where('aktif', true)
            ->orderBy('nama', 'asc')
            ->get();

        $absensiHariIni = Absensi::where('tanggal', $tanggal)
            ->whereIn('siswa_id', $siswaList->pluck('id'))
            ->get()
            ->keyBy('siswa_id');

        $result = $siswaList->map(function ($s) use ($absensiHariIni) {
            $absen = $absensiHariIni->get($s->id);
            return [
                'siswa_id' => $s->id,
                'nis' => $s->nis,
                'nama' => $s->nama,
                'jenis_kelamin' => $s->jenis_kelamin,
                'absensi_id' => $absen ? $absen->id : null,
                'status' => $absen ? $absen->status : 'Belum Hadir',
                'jam' => $absen ? $absen->jam : '-',
                'keterangan' => $absen ? $absen->keterangan : '',
            ];
        });

        return response()->json([
            'ok' => true,
            'kelas_id' => $kelasId,
            'tanggal' => $tanggal,
            'data' => $result,
        ]);
    }
}
