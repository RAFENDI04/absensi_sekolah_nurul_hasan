<?php

namespace Database\Seeders;

use App\Models\Absensi;
use App\Models\Kelas;
use App\Models\Pengaturan;
use App\Models\Siswa;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Pengaturan Sistem
        $settings = [
            'jam_masuk' => '07:00:00',
            'batas_terlambat' => '07:15:00',
            'jam_tutup_scan' => '09:00:00',
            'nama_sekolah' => 'SMA Nurul Hasan Sabuntan',
            'tahun_ajaran_aktif' => '2026/2027',
            'alamat_sekolah' => 'Jl. Pendidikan No. 45, Kompleks Akademik',
        ];

        foreach ($settings as $kunci => $nilai) {
            Pengaturan::updateOrCreate(
                ['kunci' => $kunci],
                ['nilai' => $nilai]
            );
        }

        // 2. Seed Pengguna (Users)
        $admin = User::firstOrCreate(
            ['username' => 'admin'],
            [
                'nama' => 'Anwar S.pd.G.r',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'aktif' => true,
            ]
        );

        $guru1 = User::firstOrCreate(
            ['username' => 'guru1'],
            [
                'nama' => 'Siti Rahmawati, S.Pd.',
                'password' => Hash::make('guru123'),
                'role' => 'guru',
                'aktif' => true,
            ]
        );

        $guru2 = User::firstOrCreate(
            ['username' => 'guru2'],
            [
                'nama' => 'Budi Darmawan, S.Kom.',
                'password' => Hash::make('guru123'),
                'role' => 'guru',
                'aktif' => true,
            ]
        );

        // 3. Seed Kelas
        $kelasX = Kelas::firstOrCreate(
            ['nama_kelas' => 'Kelas 10 (X)'],
            ['tahun_ajaran' => '2026/2027', 'jurusan' => 'Reguler']
        );

        $kelasXI = Kelas::firstOrCreate(
            ['nama_kelas' => 'Kelas 11 (XI)'],
            ['tahun_ajaran' => '2026/2027', 'jurusan' => 'Reguler']
        );

        $kelasXII = Kelas::firstOrCreate(
            ['nama_kelas' => 'Kelas 12 (XII)'],
            ['tahun_ajaran' => '2026/2027', 'jurusan' => 'Reguler']
        );

        // 4. Seed Siswa Realistis dengan QR Code Standar SISWA-<NIS>-<TOKEN>
        $dataSiswa = [
            // Kelas X
            ['nis' => '0111389549', 'nama' => 'ADIP ARJUNA PUTRA', 'gender' => 'L', 'kelas_id' => $kelasX->id, 'token' => '9fA3kQ'],
            ['nis' => '0109289289', 'nama' => 'ANDARA', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'B8xR4L'],
            ['nis' => '0117605409', 'nama' => 'EPAH NUR ISTIKOMAH', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'V2mK9J'],
            ['nis' => '3117563204', 'nama' => 'FITRI OLIVIA', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'Q7wE1P'],
            ['nis' => '0106470950', 'nama' => 'HAFIFAH', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'L5pT3N'],
            ['nis' => '3112895872', 'nama' => 'HAIRAN MAGFIRAH', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'H4jS8Y'],
            ['nis' => '0111396773', 'nama' => 'HALIMATUS SA\'DIYAH', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'M9cZ2W'],
            ['nis' => '0118698841', 'nama' => 'HIJRAH RAMADHAN', 'gender' => 'L', 'kelas_id' => $kelasX->id, 'token' => 'T1uO6V'],
            ['nis' => '3117949612', 'nama' => 'JUMRAH', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'J3mN8S'],
            ['nis' => '0113898338', 'nama' => 'MARISA', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'C6aD9B'],
            ['nis' => '3115856847', 'nama' => 'MOH. YUNUS GAFURI', 'gender' => 'L', 'kelas_id' => $kelasX->id, 'token' => 'G8hU4X'],
            ['nis' => '0114459011', 'nama' => 'NAHYUDI', 'gender' => 'L', 'kelas_id' => $kelasX->id, 'token' => 'K2yR5M'],
            ['nis' => '0113568818', 'nama' => 'RAHEL PRATA SAPUTRA', 'gender' => 'L', 'kelas_id' => $kelasX->id, 'token' => 'P7tW1E'],
            ['nis' => '3117911793', 'nama' => 'RAUDATUL IMANI', 'gender' => 'P', 'kelas_id' => $kelasX->id, 'token' => 'F5sL2Q'],
            ['nis' => '3073155939', 'nama' => 'RIDWAN', 'gender' => 'L', 'kelas_id' => $kelasX->id, 'token' => 'V9oP3A'],

            // Kelas XI
            ['nis' => '3093251577', 'nama' => 'AFIV ANWAR', 'gender' => 'L', 'kelas_id' => $kelasXI->id, 'token' => 'K3bV9R'],
            ['nis' => '3104836960', 'nama' => 'AINI', 'gender' => 'P', 'kelas_id' => $kelasXI->id, 'token' => 'W8yU5M'],
            ['nis' => '0108365964', 'nama' => 'ARDIANSYAH', 'gender' => 'L', 'kelas_id' => $kelasXI->id, 'token' => 'X2iO7L'],
            ['nis' => '3115806413', 'nama' => 'FAHMI AULIA', 'gender' => 'L', 'kelas_id' => $kelasXI->id, 'token' => 'P4rT1K'],
            ['nis' => '0091350789', 'nama' => 'KAVA ANJANI', 'gender' => 'L', 'kelas_id' => $kelasXI->id, 'token' => 'F6aE9B'],
            ['nis' => '3072969141', 'nama' => 'MAHKAMUL A', 'gender' => 'L', 'kelas_id' => $kelasXI->id, 'token' => 'C9dL3Q'],
            ['nis' => '0105952237', 'nama' => 'MARINA', 'gender' => 'P', 'kelas_id' => $kelasXI->id, 'token' => 'Y7uH4A'],
            ['nis' => '0118709158', 'nama' => 'MOZAYYANATUL JANNAH', 'gender' => 'P', 'kelas_id' => $kelasXI->id, 'token' => 'E5mN8S'],
            ['nis' => '3107759094', 'nama' => 'NURUL AZQIYA', 'gender' => 'P', 'kelas_id' => $kelasXI->id, 'token' => 'N8jM2K'],
            ['nis' => '3115152565', 'nama' => 'PAJIRA SAFIRA', 'gender' => 'P', 'kelas_id' => $kelasXI->id, 'token' => 'R4vL6X'],
            ['nis' => '3081745700', 'nama' => 'SAPIRA', 'gender' => 'P', 'kelas_id' => $kelasXI->id, 'token' => 'T9wP1Q'],

            // Kelas XII
            ['nis' => '0081844547', 'nama' => 'ADAM', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'U3oK2D'],
            ['nis' => '0083391026', 'nama' => 'ALIEF D.P.', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'Z1pX6C'],
            ['nis' => '0086974628', 'nama' => 'ARINI MARDIANA', 'gender' => 'P', 'kelas_id' => $kelasXII->id, 'token' => 'J8wL5V'],
            ['nis' => '0083070888', 'nama' => 'EBING RELA MANULOH', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'N6kQ3T'],
            ['nis' => '3086049385', 'nama' => 'HILWA', 'gender' => 'P', 'kelas_id' => $kelasXII->id, 'token' => 'R2sF9W'],
            ['nis' => '0089458351', 'nama' => 'IDAM MALIK', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'B4tE1Z'],
            ['nis' => '3081922419', 'nama' => 'ILAL PAHRI', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'G9hU7M'],
            ['nis' => '0099612423', 'nama' => 'LUPITA NUR ALFIYAH', 'gender' => 'P', 'kelas_id' => $kelasXII->id, 'token' => 'D3yR8P'],
            ['nis' => '0098477788', 'nama' => 'LUTFI ANWAR', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'M5tV1K'],
            ['nis' => '0093463981', 'nama' => 'NADA FITRIYAH', 'gender' => 'P', 'kelas_id' => $kelasXII->id, 'token' => 'L7wR3Y'],
            ['nis' => '0087320928', 'nama' => 'RENDI PRATAMA', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'P2xJ8Q'],
            ['nis' => '3097536165', 'nama' => 'RUSMILA', 'gender' => 'P', 'kelas_id' => $kelasXII->id, 'token' => 'H9nE4B'],
            ['nis' => '0086671068', 'nama' => 'SANDI AULIYA', 'gender' => 'P', 'kelas_id' => $kelasXII->id, 'token' => 'K1qZ6F'],
            ['nis' => '0075381869', 'nama' => 'SUGIANTO', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'T4mS7D'],
            ['nis' => '0085611936', 'nama' => 'TRI YUNA HUSNAINI', 'gender' => 'P', 'kelas_id' => $kelasXII->id, 'token' => 'W3bL9X'],
            ['nis' => '0083138245', 'nama' => 'ZAINAL ARIF', 'gender' => 'L', 'kelas_id' => $kelasXII->id, 'token' => 'Y8jC2N'],
        ];

        $insertedSiswa = [];
        foreach ($dataSiswa as $row) {
            $qrCode = "SISWA-{$row['nis']}-{$row['token']}";
            $siswa = Siswa::firstOrCreate(
                ['nis' => $row['nis']],
                [
                    'nama' => $row['nama'],
                    'jenis_kelamin' => $row['gender'],
                    'kelas_id' => $row['kelas_id'],
                    'qr_code' => $qrCode,
                    'aktif' => true,
                ]
            );
            $insertedSiswa[] = $siswa;
        }

        // 5. Seed Catatan Absensi Bulanan Realistis (Bulan Berjalan & Sebelumnya)
        $now = Carbon::now();
        $monthsToSeed = [
            $now->copy()->subMonth(), // Bulan lalu
            $now->copy(),             // Bulan berjalan
        ];

        foreach ($monthsToSeed as $mDate) {
            $daysInMonth = $mDate->daysInMonth;
            $maxDay = ($mDate->month === $now->month && $mDate->year === $now->year) ? min($now->day, $daysInMonth) : $daysInMonth;

            for ($d = 1; $d <= $maxDay; $d++) {
                $curDate = Carbon::createFromDate($mDate->year, $mDate->month, $d);
                // Lewati akhir pekan (Sabtu & Minggu)
                if ($curDate->isWeekend()) {
                    continue;
                }

                $curDateStr = $curDate->toDateString();

                foreach ($insertedSiswa as $idx => $siswa) {
                    // Seed deterministik berbasis hash siswa & tanggal agar konsisten
                    $hashVal = crc32($siswa->nis . '_' . $curDateStr) % 100;

                    $status = 'Hadir';
                    $jam = sprintf('06:%02d:%02d', 45 + ($hashVal % 25), ($hashVal * 7) % 60);
                    $keterangan = 'Tepat waktu via QR Scanner';
                    $dicatatOleh = $guru1->id;

                    if ($hashVal < 70) {
                        // 70% Hadir tepat waktu (06:45 - 07:14)
                        $status = 'Hadir';
                        $jam = sprintf('06:%02d:%02d', 45 + ($hashVal % 28), ($hashVal * 3) % 60);
                        $keterangan = 'Tepat waktu via QR Scanner';
                    } elseif ($hashVal < 85) {
                        // 15% Terlambat (07:16 - 07:35)
                        $status = 'Terlambat';
                        $jam = sprintf('07:%02d:%02d', 16 + ($hashVal % 18), ($hashVal * 5) % 60);
                        $keterangan = 'Terlambat masuk sekolah';
                    } elseif ($hashVal < 92) {
                        // 7% Izin
                        $status = 'Izin';
                        $jam = '07:00:00';
                        $keterangan = 'Surat izin keluarga / dinas';
                        $dicatatOleh = $admin->id;
                    } elseif ($hashVal < 97) {
                        // 5% Sakit
                        $status = 'Sakit';
                        $jam = '07:00:00';
                        $keterangan = 'Sakit (Surat keterangan dokter/orang tua)';
                        $dicatatOleh = $guru2->id;
                    } else {
                        // 3% Alpa
                        $status = 'Alpa';
                        $jam = '07:00:00';
                        $keterangan = 'Tanpa keterangan kehadiran';
                        $dicatatOleh = $admin->id;
                    }

                    Absensi::firstOrCreate(
                        [
                            'siswa_id' => $siswa->id,
                            'tanggal' => $curDateStr,
                        ],
                        [
                            'jam' => $jam,
                            'status' => $status,
                            'keterangan' => $keterangan,
                            'dicatat_oleh' => $dicatatOleh,
                        ]
                    );
                }
            }
        }
    }
}
