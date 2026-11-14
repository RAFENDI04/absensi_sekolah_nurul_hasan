<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::withCount('siswa')->orderBy('nama_kelas', 'asc')->get();

        return response()->json([
            'ok' => true,
            'data' => $kelas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kelas' => 'required|string|max:20',
            'jurusan' => 'nullable|string|max:50',
            'tahun_ajaran' => 'required|string|max:9',
        ]);

        $kelas = Kelas::create($request->only(['nama_kelas', 'jurusan', 'tahun_ajaran']));

        return response()->json([
            'ok' => true,
            'message' => 'Kelas berhasil ditambahkan.',
            'data' => $kelas,
        ], 201);
    }

    public function show($id)
    {
        $kelas = Kelas::with(['siswa' => function ($q) {
            $q->where('aktif', true)->orderBy('nama', 'asc');
        }])->findOrFail($id);

        return response()->json([
            'ok' => true,
            'data' => $kelas,
        ]);
    }

    public function update(Request $request, $id)
    {
        $kelas = Kelas::findOrFail($id);

        $request->validate([
            'nama_kelas' => 'required|string|max:20',
            'jurusan' => 'nullable|string|max:50',
            'tahun_ajaran' => 'required|string|max:9',
        ]);

        $kelas->update($request->only(['nama_kelas', 'jurusan', 'tahun_ajaran']));

        return response()->json([
            'ok' => true,
            'message' => 'Kelas berhasil diperbarui.',
            'data' => $kelas,
        ]);
    }

    public function destroy($id)
    {
        $kelas = Kelas::findOrFail($id);

        if ($kelas->siswa()->count() > 0) {
            return response()->json([
                'ok' => false,
                'message' => 'Tidak dapat menghapus kelas yang masih memiliki siswa.',
            ], 422);
        }

        $kelas->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Kelas berhasil dihapus.',
        ]);
    }
}
