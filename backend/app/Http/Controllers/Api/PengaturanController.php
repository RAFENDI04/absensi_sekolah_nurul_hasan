<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pengaturan;
use Illuminate\Http\Request;

class PengaturanController extends Controller
{
    public function index()
    {
        $settings = Pengaturan::all()->pluck('nilai', 'kunci');

        return response()->json([
            'ok' => true,
            'data' => [
                'jam_masuk' => $settings->get('jam_masuk', '07:00:00'),
                'batas_terlambat' => $settings->get('batas_terlambat', '07:15:00'),
                'jam_tutup_scan' => $settings->get('jam_tutup_scan', '09:00:00'),
                'nama_sekolah' => $settings->get('nama_sekolah', 'SMA Nurul Hasan Sabuntan'),
                'tahun_ajaran_aktif' => $settings->get('tahun_ajaran_aktif', '2026/2027'),
                'alamat_sekolah' => $settings->get('alamat_sekolah', 'Jl. Pendidikan No. 45'),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'jam_masuk' => 'nullable|string',
            'batas_terlambat' => 'nullable|string',
            'jam_tutup_scan' => 'nullable|string',
            'nama_sekolah' => 'nullable|string|max:100',
            'tahun_ajaran_aktif' => 'nullable|string|max:20',
            'alamat_sekolah' => 'nullable|string|max:255',
        ]);

        $allowedKeys = [
            'jam_masuk',
            'batas_terlambat',
            'jam_tutup_scan',
            'nama_sekolah',
            'tahun_ajaran_aktif',
            'alamat_sekolah',
        ];

        foreach ($allowedKeys as $key) {
            if ($request->has($key)) {
                Pengaturan::updateOrCreate(
                    ['kunci' => $key],
                    ['nilai' => $request->input($key)]
                );
            }
        }

        return response()->json([
            'ok' => true,
            'message' => 'Pengaturan sistem berhasil disimpan.',
        ]);
    }
}
