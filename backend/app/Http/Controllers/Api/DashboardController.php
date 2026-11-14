<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Absensi;
use App\Models\Kelas;
use App\Models\Pengaturan;
use App\Models\Siswa;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $targetDate = $request->input('tanggal', Carbon::now()->toDateString());

        // 1. Total Siswa Aktif
        $totalSiswa = Siswa::where('aktif', true)->count();

        // 2. Absensi Hari Ini
        $absensiHariIni = Absensi::where('tanggal', $targetDate)->get();

        $hadirCount = $absensiHariIni->where('status', 'Hadir')->count();
        $terlambatCount = $absensiHariIni->where('status', 'Terlambat')->count();
        $izinCount = $absensiHariIni->where('status', 'Izin')->count();
        $sakitCount = $absensiHariIni->where('status', 'Sakit')->count();
        $alpaCount = $absensiHariIni->where('status', 'Alpa')->count();

        $sudahAbsenTotal = $hadirCount + $terlambatCount + $izinCount + $sakitCount + $alpaCount;
        $belumAbsenCount = max(0, $totalSiswa - $sudahAbsenTotal);

        // 3. Persentase kehadiran (Hadir + Terlambat) / Total Siswa
        $persentaseKehadiran = $totalSiswa > 0 
            ? round((($hadirCount + $terlambatCount) / $totalSiswa) * 100, 1) 
            : 0;

        // 4. Live Recent Scans Feed (15 entri terakhir)
        $recentScans = Absensi::with(['siswa.kelas', 'pencatat'])
            ->where('tanggal', $targetDate)
            ->orderBy('id', 'desc')
            ->limit(15)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'siswa_id' => $item->siswa_id,
                    'nama' => $item->siswa->nama ?? 'Tanpa Nama',
                    'nis' => $item->siswa->nis ?? '-',
                    'kelas' => $item->siswa->kelas->nama_kelas ?? '-',
                    'jam' => $item->jam,
                    'status' => $item->status,
                    'keterangan' => $item->keterangan,
                    'dicatat_oleh' => $item->pencatat->nama ?? 'Sistem',
                ];
            });

        // 5. Statistik Kehadiran 7 Hari Terakhir
        $chart7Hari = [];
        for ($i = 6; $i >= 0; $i--) {
            $tgl = Carbon::now()->subDays($i)->toDateString();
            $label = Carbon::now()->subDays($i)->locale('id')->isoFormat('dd, D MMM');
            
            $h = Absensi::where('tanggal', $tgl)->where('status', 'Hadir')->count();
            $t = Absensi::where('tanggal', $tgl)->where('status', 'Terlambat')->count();
            $is = Absensi::where('tanggal', $tgl)->whereIn('status', ['Izin', 'Sakit'])->count();
            $a = Absensi::where('tanggal', $tgl)->where('status', 'Alpa')->count();

            $chart7Hari[] = [
                'tanggal' => $tgl,
                'label' => $label,
                'hadir' => $h,
                'terlambat' => $t,
                'izin_sakit' => $is,
                'alpa' => $a,
                'total_hadir' => $h + $t,
            ];
        }

        // 6. Ringkasan per Kelas
        $kelasRingkasan = Kelas::withCount([
            'siswa as total_siswa' => function ($q) {
                $q->where('aktif', true);
            }
        ])->get()->map(function ($k) use ($targetDate) {
            $hadir = Absensi::whereHas('siswa', function ($q) use ($k) {
                $q->where('kelas_id', $k->id);
            })->where('tanggal', $targetDate)->whereIn('status', ['Hadir', 'Terlambat'])->count();

            return [
                'id' => $k->id,
                'nama_kelas' => $k->nama_kelas,
                'total_siswa' => $k->total_siswa,
                'hadir' => $hadir,
                'persentase' => $k->total_siswa > 0 ? round(($hadir / $k->total_siswa) * 100) : 0,
            ];
        });

        return response()->json([
            'ok' => true,
            'data' => [
                'tanggal' => $targetDate,
                'server_time' => Carbon::now()->toTimeString(),
                'server_ip' => request()->server('SERVER_ADDR', '192.168.1.10'),
                'sekolah' => Pengaturan::ambil('nama_sekolah', 'SMA Nurul Hasan Sabuntan'),
                'tahun_ajaran' => Pengaturan::ambil('tahun_ajaran_aktif', '2026/2027'),
                'ringkasan' => [
                    'total_siswa' => $totalSiswa,
                    'hadir' => $hadirCount,
                    'terlambat' => $terlambatCount,
                    'izin_sakit' => $izinCount + $sakitCount,
                    'izin' => $izinCount,
                    'sakit' => $sakitCount,
                    'alpa' => $alpaCount,
                    'belum_absen' => $belumAbsenCount,
                    'persentase_kehadiran' => $persentaseKehadiran,
                ],
                'recent_scans' => $recentScans,
                'chart_7_hari' => $chart7Hari,
                'kelas_ringkasan' => $kelasRingkasan,
            ],
        ]);
    }
}
