# Sistem Informasi Presensi Siswa Berbasis QR Code pada Jaringan LAN

Proyek lengkap aplikasi presensi siswa berbasis **Frontend Flutter** dan **Backend Laravel 11**, yang dibangun berdasarkan:
1. **[Blueprint Sistem Absensi Siswa Berbasis Web dengan QR Code pada Jaringan LAN](file:///c:/Users/USER/Downloads/aplikasi/Blueprint%20Sistem%20Absensi%20Siswa%20Berbasis%20Web%20dengan%20QR%20Code%20pada%20Jaringan%20LAN.docx)**
2. **[Desain Sistem Academic Precision](file:///c:/Users/USER/Downloads/aplikasi/Image%2012.markdown)**

---

## 📁 Struktur Direktori Proyek

```text
c:\Users\USER\Downloads\aplikasi\
├── backend/                       # Backend REST API Laravel 11
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php         # Login, logout, profil peran Admin & Guru
│   │   │   ├── ScanController.php         # Validasi QR, cegah double-scan, status Hadir/Terlambat
│   │   │   ├── DashboardController.php    # Counter real-time, live scan feed, chart 7 hari
│   │   │   ├── SiswaController.php        # CRUD siswa, token generator SISWA-<NIS>-<TOKEN>
│   │   │   ├── KelasController.php        # Manajemen kelas
│   │   │   ├── AbsensiController.php      # Riwayat & input manual (Izin, Sakit, Alpa)
│   │   │   ├── LaporanController.php      # Rekap harian, matriks bulanan, ekspor CSV Excel
│   │   │   ├── PengaturanController.php   # Jam masuk, batas terlambat, jam tutup scan
│   │   │   └── SystemController.php       # LAN ping discovery & latensi server
│   │   └── Models/                        # User, Kelas, Siswa, Absensi, Pengaturan
│   ├── database/
│   │   ├── migrations/                    # 5 file skema migrasi tabel database
│   │   └── seeders/DatabaseSeeder.php     # Akun admin, guru, 24 data siswa & riwayat presensi
│   ├── routes/api.php                     # Rute REST API lengkap
│   ├── .env & composer.json               # Konfigurasi SQLite (default) & MySQL XAMPP
│   └── README.md
│
├── frontend/                      # Aplikasi Mobile & Web Client Flutter
│   ├── lib/
│   │   ├── main.dart                      # Inisialisasi tema & sesi pengguna
│   │   ├── theme/
│   │   │   ├── app_colors.dart            # Palet warna spesifikasi Academic Precision
│   │   │   ├── app_typography.dart        # Plus Jakarta Sans, Inter, & font angka tabular
│   │   │   └── app_theme.dart             # ThemeData & elevasi komponen
│   │   ├── models/                        # UserModel, SiswaModel, AbsensiModel, DashboardDataModel
│   │   ├── services/
│   │   │   ├── api_service.dart           # HTTP client LAN, auto ping & offline fallback
│   │   │   └── sound_service.dart         # Vibrasi haptic & nada audio
│   │   ├── widgets/
│   │   │   ├── lan_connectivity_header.dart # Indikator pulsing green dot, ping ms & gateway IP
│   │   │   ├── qr_scanner_hud.dart        # Vignette viewfinder, 4 L-brackets, animated laser line
│   │   │   ├── status_badge.dart          # Pill badges (HADIR, TERLAMBAT, ALPA, IZIN, SAKIT)
│   │   │   ├── stat_card.dart             # Kartu metrik counter
│   │   │   ├── scan_feed_item.dart        # List item live attendance feed
│   │   │   └── student_id_card_widget.dart# Desain kartu pelajar 85.6 x 54 mm dengan QR Code
│   │   ├── screens/
│   │   │   ├── login_screen.dart          # Halaman masuk sistem
│   │   │   ├── main_navigation_screen.dart# Navigasi bottom bar dengan floating action scan
│   │   │   ├── dashboard_screen.dart      # Ringkasan statistik & feed live scan
│   │   │   ├── scanner_screen.dart        # Kamera scanner HUD dengan fallback input manual
│   │   │   ├── manual_absensi_screen.dart # Formulir input keterangan Izin/Sakit/Alpa
│   │   │   ├── siswa_screen.dart          # Daftar siswa, filter kelas & preview kartu
│   │   │   ├── rekap_screen.dart          # Filter tanggal/kelas/status & ekspor data
│   │   │   ├── id_card_print_screen.dart  # Tata letak cetak massal kartu pelajar
│   │   │   └── settings_screen.dart       # Atur IP gateway server LAN & uji koneksi
│   │   └── pubspec.yaml
│   └── README.md
│
├── web_client/                    # Terminal Web Siap Pakai Langsung (HTML5 + CSS + JS)
│   ├── index.html                         # Terminal scanner HUD & dashboard interaktif
│   ├── style.css                          # Desain lengkap Academic Precision
│   └── app.js                             # Mesin simulator presensi & audio synthetic
│
├── buka_web_client.bat            # Klik 2x untuk membuka Terminal Web langsung di browser
├── jalankan_backend.bat           # Skrip instan menjalankan server Laravel
└── jalankan_flutter.bat           # Skrip instan menjalankan aplikasi Flutter
```

---

## ⚡ Cara Menjalankan

### 1. Menjalankan Terminal Web Interaktif (Langsung Tanpa Setup Tambahan)
Klik dua kali file [`buka_web_client.bat`](file:///c:/Users/USER/Downloads/aplikasi/buka_web_client.bat) atau buka [`web_client/index.html`](file:///c:/Users/USER/Downloads/aplikasi/web_client/index.html) di Google Chrome atau Microsoft Edge.
- Terminal web ini telah terintegrasi dengan mesin scan kamera, simulasi scan cepat, audio chime, feed kehadiran langsung, cetak kartu QR (85.6 x 54 mm), dan detektor gateway LAN.

### 2. Menjalankan Backend Laravel
1. Buka folder `backend/`:
   ```bash
   cd backend
   composer install
   copy .env.example .env
   php artisan key:generate
   php artisan migrate:fresh --seed
   php artisan serve --host=0.0.0.0 --port=8000
   ```
   *Atau klik dua kali file [`jalankan_backend.bat`](file:///c:/Users/USER/Downloads/aplikasi/jalankan_backend.bat).*
2. Akun bawaan:
   - **Admin**: Username `admin` / Password `admin123`
   - **Guru**: Username `guru1` / Password `guru123`

### 3. Menjalankan Frontend Flutter
1. Buka folder `frontend/`:
   ```bash
   cd frontend
   flutter pub get
   flutter run -d chrome
   ```
   *Atau klik dua kali file [`jalankan_flutter.bat`](file:///c:/Users/USER/Downloads/aplikasi/jalankan_flutter.bat).*
2. Pada tab LAN Pengaturan, masukkan alamat server laptop (contoh: `http://192.168.1.10:8000/api`) lalu klik **SIMPAN & TES KONEKSI LAN**.
