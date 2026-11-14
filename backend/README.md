# Backend API - Sistem Absensi Siswa LAN (Laravel 11)

Backend REST API untuk Sistem Informasi Absensi Siswa berbasis QR Code pada Jaringan Lokal (LAN), sesuai Blueprint Sistem dan Standar Desain **Academic Precision**.

---

## 🌟 Fitur Utama Backend

1. **Autentikasi & Otorisasi Peran**:
   - Multi-role: `admin` (akses penuh) & `guru` (operasional & rekap).
   - Menggunakan Laravel Sanctum API Token.
2. **Mesin Validasi Absensi QR Code Cepat (`/api/scan`)**:
   - Validasi format QR terenkripsi/token: `SISWA-<NIS>-<TOKEN>`.
   - Pencegahan **Absensi Ganda (Double Scan)** pada hari yang sama menggunakan database unique constraint `(siswa_id, tanggal)`.
   - Penentuan otomatis status **Hadir** (on-time) atau **Terlambat** (late) berpatokan pada jam server (`batas_terlambat`).
   - Audit trail otomatis: Menyimpan nama petugas/guru pencatat (`dicatat_oleh`).
3. **Penyelarasan Waktu & Jaringan LAN (`/api/ping`)**:
   - Mendeteksi IP lokal server secara otomatis.
   - Mengukur latensi jaringan dalam milidetik (ms).
   - Menghindari manipulasi jam lokal perangkat HP pemindai.
4. **Manajemen Siswa & Kelas**:
   - CRUD data siswa & kelas.
   - Pembuatan token QR unik & fitur reset token jika kartu siswa hilang.
   - API data cetak ID Card siap render (85.6 mm x 54 mm).
5. **Input & Koreksi Manual**:
   - Input izin, sakit, alpa secara manual dengan lampiran keterangan.
6. **Laporan & Rekap Multi-Format**:
   - Rekap harian & matriks bulanan per siswa.
   - Ekspor data CSV kompatibel langsung dengan Microsoft Excel.

---

## 🚀 Panduan Instalasi & Menjalankan

### Persyaratan Sistem
- PHP >= 8.2 (dengan ekstensi `pdo_sqlite`, `pdo_mysql`, `mbstring`, `openssl`)
- Composer
- Jaringan Wi-Fi / Router LAN lokal (misal: 192.168.1.x)

### Langkah Instalasi

1. **Install Dependensi**:
   ```bash
   cd backend
   composer install
   ```

2. **Setup Konfigurasi Environment**:
   Salin `.env.example` menjadi `.env`:
   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**:
   Secara default, project ini telah dikonfigurasi menggunakan **SQLite** agar langsung bisa berjalan tanpa install MySQL terpisah:
   ```bash
   # Buat file database sqlite jika belum ada:
   type nul > database\database.sqlite
   
   # Jalankan migrasi dan seeder data awal:
   php artisan migrate:fresh --seed
   ```

   *(Opsi MySQL/XAMPP)*: Jika ingin menggunakan MySQL XAMPP:
   - Buat database di phpMyAdmin bernama `absensi_sekolah`.
   - Ubah `.env`:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=absensi_sekolah
     DB_USERNAME=root
     DB_PASSWORD=
     ```
   - Jalankan `php artisan migrate:fresh --seed`.

4. **Jalankan Server Pada Jaringan LAN**:
   Jalankan server agar dapat diakses oleh seluruh HP guru/terminal scan di jaringan Wi-Fi lokal:
   ```bash
   # Jalankan pada port 8000 dan bind ke semua interface (0.0.0.0):
   php artisan serve --host=0.0.0.0 --port=8000
   ```
   *Catatan: Pastikan port 8000 diizinkan di Windows Firewall (Inbound Rules).*

---

## 🔑 Akun Bawaan (Default Seeders)

| Role | Username | Password | Keterangan |
|------|----------|----------|------------|
| **Admin** | `admin` | `admin123` | Akses penuh seluruh menu |
| **Guru** | `guru1` | `guru123` | Guru Kelas VII / Pemindai |
| **Guru** | `guru2` | `guru123` | Guru Kelas VIII & IX |

---

## 📡 Daftar Endpoint API Utama

- `GET  /api/ping` : Cek status LAN & latensi
- `POST /api/auth/login` : Autentikasi user & penerbitan Bearer Token
- `POST /api/scan` : Verifikasi & rekam absensi QR Code
- `GET  /api/dashboard` : Statistik ringkasan, chart 7 hari & live feed
- `GET  /api/siswa` : Daftar & pencarian data siswa
- `POST /api/siswa` : Tambah siswa (otomatis generate QR code)
- `POST /api/siswa/{id}/regenerate-qr` : Terbitkan ulang QR code
- `GET  /api/cetak-kartu` : Payload cetak kartu ID Card
- `GET  /api/absensi` : Riwayat absensi dengan filter tanggal & kelas
- `POST /api/absensi/manual` : Input manual (Izin, Sakit, Alpa)
- `GET  /api/laporan/harian` : Rekap harian kehadiran
- `GET  /api/laporan/bulanan` : Matriks bulanan per siswa
- `GET  /api/laporan/export-csv` : Download file CSV untuk Excel
- `GET  /api/pengaturan` : Ambil konfigurasi jam sekolah
- `POST /api/pengaturan` : Update jam masuk & toleransi terlambat
