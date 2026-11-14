<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Absensi;
use App\Models\Kelas;
use App\Models\Pengaturan;
use App\Models\Siswa;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    /**
     * Rekap Harian
     */
    public function harian(Request $request)
    {
        $tanggal = $request->input('tanggal', Carbon::now()->toDateString());
        $kelasId = $request->input('kelas_id');

        $query = Absensi::with(['siswa.kelas', 'pencatat'])
            ->where('tanggal', $tanggal);

        if ($kelasId) {
            $query->whereHas('siswa', function ($q) use ($kelasId) {
                $q->where('kelas_id', $kelasId);
            });
        }

        $records = $query->orderBy('jam', 'asc')->get();

        return response()->json([
            'ok' => true,
            'jenis' => 'Harian',
            'tanggal' => $tanggal,
            'sekolah' => Pengaturan::ambil('nama_sekolah', 'SMA Nurul Hasan Sabuntan'),
            'total_tercatat' => $records->count(),
            'ringkasan' => [
                'hadir' => $records->where('status', 'Hadir')->count(),
                'terlambat' => $records->where('status', 'Terlambat')->count(),
                'izin' => $records->where('status', 'Izin')->count(),
                'sakit' => $records->where('status', 'Sakit')->count(),
                'alpa' => $records->where('status', 'Alpa')->count(),
            ],
            'data' => $records,
        ]);
    }

    /**
     * Rekap Bulanan berbentuk Matriks Kehadiran per Siswa
     */
    public function bulanan(Request $request)
    {
        $bulan = (int)$request->input('bulan', Carbon::now()->month);
        $tahun = (int)$request->input('tahun', Carbon::now()->year);
        $kelasId = $request->input('kelas_id');

        $startDate = Carbon::createFromDate($tahun, $bulan, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();
        $daysInMonth = $startDate->daysInMonth;

        $query = Siswa::with('kelas')->where('aktif', true);
        if ($kelasId) {
            $query->where('kelas_id', $kelasId);
        }
        $siswaList = $query->orderBy('nama', 'asc')->get();

        $absensi = Absensi::whereBetween('tanggal', [$startDate->toDateString(), $endDate->toDateString()])
            ->whereIn('siswa_id', $siswaList->pluck('id'))
            ->get();

        $matrix = $siswaList->map(function ($s) use ($absensi, $daysInMonth) {
            $userAbsen = $absensi->where('siswa_id', $s->id);

            $hadir = $userAbsen->where('status', 'Hadir')->count();
            $terlambat = $userAbsen->where('status', 'Terlambat')->count();
            $izin = $userAbsen->where('status', 'Izin')->count();
            $sakit = $userAbsen->where('status', 'Sakit')->count();
            $alpa = $userAbsen->where('status', 'Alpa')->count();

            // Peta tanggal -> kode status (H, T, I, S, A, .)
            $dailyMap = [];
            for ($d = 1; $d <= $daysInMonth; $d++) {
                $dayStr = sprintf('%02d', $d);
                $found = $userAbsen->first(function ($item) use ($dayStr) {
                    return substr($item->tanggal, 8, 2) === $dayStr;
                });

                if ($found) {
                    $dailyMap[$d] = substr($found->status, 0, 1); // H, T, I, S, A
                } else {
                    $dailyMap[$d] = '-';
                }
            }

            // Hitung persentase kehadiran: (Hadir + Terlambat) / Total Hari Efektif
            $totalKehadiran = $hadir + $terlambat;
            $persentase = ($totalKehadiran + $izin + $sakit + $alpa) > 0
                ? round(($totalKehadiran / ($totalKehadiran + $izin + $sakit + $alpa)) * 100, 1)
                : 100;

            return [
                'siswa_id' => $s->id,
                'nis' => $s->nis,
                'nama' => $s->nama,
                'kelas' => $s->kelas ? $s->kelas->nama_kelas : '-',
                'hadir' => $hadir,
                'terlambat' => $terlambat,
                'izin' => $izin,
                'sakit' => $sakit,
                'alpa' => $alpa,
                'persentase' => $persentase,
                'daily_map' => $dailyMap,
            ];
        });

        return response()->json([
            'ok' => true,
            'jenis' => 'Bulanan',
            'bulan' => $bulan,
            'tahun' => $tahun,
            'days_in_month' => $daysInMonth,
            'sekolah' => Pengaturan::ambil('nama_sekolah', 'SMA Nurul Hasan Sabuntan'),
            'data' => $matrix,
        ]);
    }

    /**
     * Ekspor CSV Siap Buka di Excel
     */
    public function exportCsv(Request $request)
    {
        $tanggal = $request->input('tanggal', Carbon::now()->toDateString());
        $kelasId = $request->input('kelas_id');

        $query = Absensi::with(['siswa.kelas', 'pencatat'])->where('tanggal', $tanggal);
        if ($kelasId) {
            $query->whereHas('siswa', function ($q) use ($kelasId) {
                $q->where('kelas_id', $kelasId);
            });
        }
        $records = $query->orderBy('jam', 'asc')->get();

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"rekap-absensi-{$tanggal}.csv\"",
        ];

        $callback = function () use ($records, $tanggal) {
            $file = fopen('php://output', 'w');
            // Byte Order Mark (BOM) UTF-8 agar Excel membaca karakter dengan baik
            fputs($file, "\xEF\xBB\xBF");

            fputcsv($file, ['No', 'NIS', 'Nama Siswa', 'Kelas', 'Tanggal', 'Jam Masuk', 'Status', 'Keterangan', 'Dicatat Oleh']);

            $no = 1;
            foreach ($records as $row) {
                fputcsv($file, [
                    $no++,
                    $row->siswa ? $row->siswa->nis : '-',
                    $row->siswa ? $row->siswa->nama : '-',
                    $row->siswa && $row->siswa->kelas ? $row->siswa->kelas->nama_kelas : '-',
                    $row->tanggal,
                    $row->jam,
                    $row->status,
                    $row->keterangan ?? '-',
                    $row->pencatat ? $row->pencatat->nama : 'Sistem',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Ekspor Matriks Rekap Bulanan per Siswa ke Format CSV (Excel)
     */
    public function exportBulanan(Request $request)
    {
        $bulan = (int)$request->input('bulan', Carbon::now()->month);
        $tahun = (int)$request->input('tahun', Carbon::now()->year);
        $kelasId = $request->input('kelas_id');

        $startDate = Carbon::createFromDate($tahun, $bulan, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();
        $daysInMonth = $startDate->daysInMonth;

        $query = Siswa::with('kelas')->where('aktif', true);
        if ($kelasId) {
            $query->where('kelas_id', $kelasId);
        }
        $siswaList = $query->orderBy('nama', 'asc')->get();

        $absensi = Absensi::whereBetween('tanggal', [$startDate->toDateString(), $endDate->toDateString()])
            ->whereIn('siswa_id', $siswaList->pluck('id'))
            ->get();

        $namaBulan = Carbon::createFromDate($tahun, $bulan, 1)->locale('id')->translatedFormat('F');
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"rekap-bulanan-siswa-{$namaBulan}-{$tahun}.csv\"",
        ];

        $callback = function () use ($siswaList, $absensi, $daysInMonth, $namaBulan, $tahun) {
            $file = fopen('php://output', 'w');
            fputs($file, "\xEF\xBB\xBF"); // UTF-8 BOM

            // Header kolom
            $headerCols = ['No', 'NIS', 'Nama Siswa', 'Kelas'];
            for ($d = 1; $d <= $daysInMonth; $d++) {
                $headerCols[] = (string)$d;
            }
            $headerCols = array_merge($headerCols, ['Hadir (H)', 'Terlambat (T)', 'Izin (I)', 'Sakit (S)', 'Alpa (A)', 'Persentase (%)']);
            fputcsv($file, $headerCols);

            $no = 1;
            foreach ($siswaList as $s) {
                $userAbsen = $absensi->where('siswa_id', $s->id);
                $hadir = $userAbsen->where('status', 'Hadir')->count();
                $terlambat = $userAbsen->where('status', 'Terlambat')->count();
                $izin = $userAbsen->where('status', 'Izin')->count();
                $sakit = $userAbsen->where('status', 'Sakit')->count();
                $alpa = $userAbsen->where('status', 'Alpa')->count();

                $row = [
                    $no++,
                    $s->nis,
                    $s->nama,
                    $s->kelas ? $s->kelas->nama_kelas : '-',
                ];

                for ($d = 1; $d <= $daysInMonth; $d++) {
                    $dayStr = sprintf('%02d', $d);
                    $found = $userAbsen->first(function ($item) use ($dayStr) {
                        return substr($item->tanggal, 8, 2) === $dayStr;
                    });
                    $row[] = $found ? substr($found->status, 0, 1) : '-';
                }

                $totalKehadiran = $hadir + $terlambat;
                $persentase = ($totalKehadiran + $izin + $sakit + $alpa) > 0
                    ? round(($totalKehadiran / ($totalKehadiran + $izin + $sakit + $alpa)) * 100, 1)
                    : 100;

                $row[] = $hadir;
                $row[] = $terlambat;
                $row[] = $izin;
                $row[] = $sakit;
                $row[] = $alpa;
                $row[] = $persentase . '%';

                fputcsv($file, $row);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Rekap Tahunan per Siswa di Setiap Bulannya (12 Bulan)
     */
    public function perSiswaBulanan(Request $request, $siswaId)
    {
        $tahun = (int)$request->input('tahun', Carbon::now()->year);
        $siswa = Siswa::with('kelas')->findOrFail($siswaId);

        $absensi = Absensi::where('siswa_id', $siswaId)
            ->whereYear('tanggal', $tahun)
            ->get();

        $namaBulanList = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        $rekapPerBulan = [];
        $totalHadirTahun = 0;
        $totalTerlambatTahun = 0;
        $totalIzinTahun = 0;
        $totalSakitTahun = 0;
        $totalAlpaTahun = 0;

        for ($b = 1; $b <= 12; $b++) {
            $monthStr = sprintf('%02d', $b);
            $absenBulan = $absensi->filter(function ($item) use ($monthStr) {
                return substr($item->tanggal, 5, 2) === $monthStr;
            });

            $h = $absenBulan->where('status', 'Hadir')->count();
            $t = $absenBulan->where('status', 'Terlambat')->count();
            $i = $absenBulan->where('status', 'Izin')->count();
            $s = $absenBulan->where('status', 'Sakit')->count();
            $a = $absenBulan->where('status', 'Alpa')->count();

            $totalMasuk = $h + $t;
            $totalSemua = $totalMasuk + $i + $s + $a;
            $persen = $totalSemua > 0 ? round(($totalMasuk / $totalSemua) * 100, 1) : 0;

            $rekapPerBulan[] = [
                'bulan' => $b,
                'nama_bulan' => $namaBulanList[$b],
                'hadir' => $h,
                'terlambat' => $t,
                'izin' => $i,
                'sakit' => $s,
                'alpa' => $a,
                'total_pertemuan' => $totalSemua,
                'persentase' => $persen,
            ];

            $totalHadirTahun += $h;
            $totalTerlambatTahun += $t;
            $totalIzinTahun += $i;
            $totalSakitTahun += $s;
            $totalAlpaTahun += $a;
        }

        $totalMasukTahun = $totalHadirTahun + $totalTerlambatTahun;
        $totalSemuaTahun = $totalMasukTahun + $totalIzinTahun + $totalSakitTahun + $totalAlpaTahun;
        $persenTahun = $totalSemuaTahun > 0 ? round(($totalMasukTahun / $totalSemuaTahun) * 100, 1) : 0;

        return response()->json([
            'ok' => true,
            'tahun' => $tahun,
            'siswa' => [
                'id' => $siswa->id,
                'nis' => $siswa->nis,
                'nama' => $siswa->nama,
                'kelas' => $siswa->kelas ? $siswa->kelas->nama_kelas : '-',
                'jenis_kelamin' => $siswa->jenis_kelamin,
                'qr_code' => $siswa->qr_code,
            ],
            'ringkasan_tahunan' => [
                'hadir' => $totalHadirTahun,
                'terlambat' => $totalTerlambatTahun,
                'izin' => $totalIzinTahun,
                'sakit' => $totalSakitTahun,
                'alpa' => $totalAlpaTahun,
                'persentase' => $persenTahun,
            ],
            'rekap_per_bulan' => $rekapPerBulan,
        ]);
    }
}
