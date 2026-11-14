# Frontend Flutter - Sistem Presensi Siswa LAN

Aplikasi Mobile & Desktop Client untuk Sistem Presensi Siswa berbasis QR Code pada Jaringan Lokal (LAN), mengadopsi Design System **Academic Precision** (Image 12.markdown).

---

## 🎨 Karakteristik Desain (Academic Precision)

- **Hierarki Warna**:
  - Primary (`#00236F` / `#1E3A8A`): Chrome struktural & identitas institusi.
  - Success / On-Time (`#10B981` / `#006C49`): Hadir tepat waktu & status LAN sehat.
  - Warning (`#D97706`): Terlambat masuk & proses sinkronisasi.
  - Critical (`#E11D48`): QR tidak dikenal / alpa.
- **Tipografi**: Plus Jakarta Sans (Headlines) & Inter (Data padat) dengan angka tabular (`tabular-nums`) untuk stempel jam server dan NIS.
- **QR Scanner HUD Viewfinder**:
  - Vignette kontras tinggi (`rgba(15, 23, 42, 0.6)`).
  - 4 Corner L-Brackets (putih saat idle -> hijau saat target terkunci).
  - Laser pemindai horizontal beranimasi vertikal dengan gradien `#2563EB` ke `#60A5FA`.
  - Umpan balik audio & vibrasi haptic instan.
- **Konektivitas LAN**:
  - Header status bar dengan indikator titik hijau berdenyut (*pulsing green dot*), IP gateway server, dan uji latensi (*ping ms*).
- **Format Kartu Pelajar Siap Cetak**:
  - Rasio 85.6 mm x 54 mm dengan QR Code presisi tinggi.

---

## 🚀 Panduan Menjalankan Aplikasi Flutter

### Persyaratan
- Flutter SDK (>= 3.2.0)
- Android Studio / VS Code dengan plugin Flutter
- Device fisik Android / iPhone / Emulator / Web Chrome

### Langkah Menjalankan

1. **Install Dependensi**:
   ```bash
   cd frontend
   flutter pub get
   ```

2. **Jalankan Aplikasi**:
   - **Mode Web Chrome**:
     ```bash
     flutter run -d chrome
     ```
   - **Mode Android Fisik (HP Guru)**:
     Sambungkan HP ke PC via USB debugging atau Wi-Fi, lalu:
     ```bash
     flutter run
     ```
   - **Mode Windows Desktop**:
     ```bash
     flutter run -d windows
     ```

3. **Menghubungkan ke Server Laravel di Jaringan LAN**:
   - Di aplikasi Flutter, buka tab **LAN** (Pengaturan) atau klik ikon status LAN di pojok atas.
   - Masukkan IP Laptop Server, contoh: `http://192.168.1.10:8000/api`.
   - Klik **SIMPAN & TES KONEKSI LAN**.
   - Jika latensi (ms) muncul berwarna hijau, perangkat pemindai telah tersambung sempurna ke database sekolah.

---

## 📱 Izin Akses Perangkat (Permissions)

Untuk platform Android, pastikan izin kamera dan internet aktif di `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.VIBRATE" />
```
Untuk platform iOS, tambahkan di `ios/Runner/Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>Aplikasi memerlukan akses kamera untuk memindai QR Code kartu presensi siswa.</string>
```
