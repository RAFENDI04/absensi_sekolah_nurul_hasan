<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Pengaturan;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Siswa::with('kelas');

        // Pencarian berdasarkan nama atau NIS
        if ($request->filled('q')) {
            $q = $request->input('q');
            $query->where(function ($sub) use ($q) {
                $sub->where('nama', 'like', "%{$q}%")
                    ->orWhere('nis', 'like', "%{$q}%");
            });
        }

        // Filter kelas
        if ($request->filled('kelas_id')) {
            $query->where('kelas_id', $request->input('kelas_id'));
        }

        // Filter status aktif
        if ($request->has('aktif')) {
            $query->where('aktif', filter_var($request->input('aktif'), FILTER_VALIDATE_BOOLEAN));
        }

        $perPage = $request->input('per_page', 20);
        $siswa = $query->orderBy('nama', 'asc')->paginate($perPage);

        return response()->json([
            'ok' => true,
            'data' => $siswa,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nis' => 'required|string|max:20|unique:siswa,nis',
            'nama' => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'kelas_id' => 'required|exists:kelas,id',
            'aktif' => 'nullable|boolean',
        ]);

        $nis = $request->input('nis');
        $qrCode = Siswa::generateQrToken($nis);

        $siswa = Siswa::create([
            'nis' => $nis,
            'nama' => $request->input('nama'),
            'jenis_kelamin' => $request->input('jenis_kelamin'),
            'kelas_id' => $request->input('kelas_id'),
            'qr_code' => $qrCode,
            'aktif' => $request->input('aktif', true),
        ]);

        $siswa->load('kelas');

        return response()->json([
            'ok' => true,
            'message' => 'Data siswa berhasil ditambahkan.',
            'data' => $siswa,
        ], 201);
    }

    public function show($id)
    {
        $siswa = Siswa::with('kelas')->findOrFail($id);

        return response()->json([
            'ok' => true,
            'data' => $siswa,
        ]);
    }

    public function update(Request $request, $id)
    {
        $siswa = Siswa::findOrFail($id);

        $request->validate([
            'nis' => ['required', 'string', 'max:20', Rule::unique('siswa', 'nis')->ignore($siswa->id)],
            'nama' => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'kelas_id' => 'required|exists:kelas,id',
            'aktif' => 'nullable|boolean',
        ]);

        $siswa->update([
            'nis' => $request->input('nis'),
            'nama' => $request->input('nama'),
            'jenis_kelamin' => $request->input('jenis_kelamin'),
            'kelas_id' => $request->input('kelas_id'),
            'aktif' => $request->input('aktif', $siswa->aktif),
        ]);

        $siswa->load('kelas');

        return response()->json([
            'ok' => true,
            'message' => 'Data siswa berhasil diperbarui.',
            'data' => $siswa,
        ]);
    }

    public function destroy($id)
    {
        $siswa = Siswa::findOrFail($id);
        $siswa->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Data siswa berhasil dihapus.',
        ]);
    }

    /**
     * Regenerate token QR jika kartu hilang atau rusak
     */
    public function regenerateQr($id)
    {
        $siswa = Siswa::findOrFail($id);
        $newQr = Siswa::generateQrToken($siswa->nis);

        $siswa->update(['qr_code' => $newQr]);

        return response()->json([
            'ok' => true,
            'message' => 'QR Code berhasil di-generate ulang. Kartu lama otomatis tidak berlaku.',
            'qr_code' => $newQr,
        ]);
    }

    /**
     * Payload cetak kartu ID Card dengan data lengkap QR
     */
    public function cetakKartu(Request $request)
    {
        $query = Siswa::with('kelas')->where('aktif', true);

        if ($request->filled('kelas_id')) {
            $query->where('kelas_id', $request->input('kelas_id'));
        }

        if ($request->filled('siswa_id')) {
            $query->where('id', $request->input('siswa_id'));
        }

        $siswaList = $query->orderBy('nama', 'asc')->get();

        $namaSekolah = Pengaturan::ambil('nama_sekolah', 'SMA Nurul Hasan Sabuntan');
        $tahunAjaran = Pengaturan::ambil('tahun_ajaran_aktif', '2026/2027');

        return response()->json([
            'ok' => true,
            'sekolah' => $namaSekolah,
            'tahun_ajaran' => $tahunAjaran,
            'kartu' => $siswaList->map(function ($s) use ($namaSekolah, $tahunAjaran) {
                return [
                    'id' => $s->id,
                    'nis' => $s->nis,
                    'nama' => $s->nama,
                    'kelas' => $s->kelas ? $s->kelas->nama_kelas : '-',
                    'jenis_kelamin' => $s->jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan',
                    'qr_code' => $s->qr_code,
                    'sekolah' => $namaSekolah,
                    'tahun_ajaran' => $tahunAjaran,
                ];
            }),
        ]);
    }
}
