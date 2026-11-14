<?php

use App\Http\Controllers\Api\AbsensiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\KelasController;
use App\Http\Controllers\Api\LaporanController;
use App\Http\Controllers\Api\PengaturanController;
use App\Http\Controllers\Api\ScanController;
use App\Http\Controllers\Api\SiswaController;
use App\Http\Controllers\Api\SystemController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Sistem Absensi Siswa LAN
|--------------------------------------------------------------------------
*/

// Endpoint Sistem & Pemeriksaan Jaringan LAN
Route::get('/ping', [SystemController::class, 'ping']);
Route::get('/lan-info', [SystemController::class, 'lanInfo']);

// Autentikasi Publik
Route::post('/auth/login', [AuthController::class, 'login']);

// Endpoint Inti (Dapat diakses dengan Token Sanctum, atau fallback sesi)
Route::middleware('auth:sanctum')->group(function () {
    // Autentikasi Pengguna
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Scanning QR Code
    Route::post('/scan', [ScanController::class, 'scan']);

    // Dashboard & Metrik
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Manajemen Siswa
    Route::get('/siswa', [SiswaController::class, 'index']);
    Route::post('/siswa', [SiswaController::class, 'store']);
    Route::get('/siswa/{id}', [SiswaController::class, 'show']);
    Route::put('/siswa/{id}', [SiswaController::class, 'update']);
    Route::delete('/siswa/{id}', [SiswaController::class, 'destroy']);
    Route::post('/siswa/{id}/regenerate-qr', [SiswaController::class, 'regenerateQr']);
    Route::get('/cetak-kartu', [SiswaController::class, 'cetakKartu']);

    // Manajemen Kelas
    Route::get('/kelas', [KelasController::class, 'index']);
    Route::post('/kelas', [KelasController::class, 'store']);
    Route::get('/kelas/{id}', [KelasController::class, 'show']);
    Route::put('/kelas/{id}', [KelasController::class, 'update']);
    Route::delete('/kelas/{id}', [KelasController::class, 'destroy']);

    // Absensi & Input Manual
    Route::get('/absensi', [AbsensiController::class, 'index']);
    Route::post('/absensi/manual', [AbsensiController::class, 'manualInput']);
    Route::put('/absensi/{id}', [AbsensiController::class, 'update']);
    Route::delete('/absensi/{id}', [AbsensiController::class, 'destroy']);
    Route::delete('/absensi/siswa/{siswaId}', [AbsensiController::class, 'destroyBySiswa']);
    Route::get('/absensi/sheet-kelas', [AbsensiController::class, 'sheetByClass']);

    // Laporan & Rekap
    Route::get('/laporan/harian', [LaporanController::class, 'harian']);
    Route::get('/laporan/bulanan', [LaporanController::class, 'bulanan']);
    Route::get('/laporan/export-csv', [LaporanController::class, 'exportCsv']);
    Route::get('/laporan/export-bulanan', [LaporanController::class, 'exportBulanan']);
    Route::get('/laporan/siswa/{id}', [LaporanController::class, 'perSiswaBulanan']);

    // Pengaturan Jam & Profil Sekolah
    Route::get('/pengaturan', [PengaturanController::class, 'index']);
    Route::post('/pengaturan', [PengaturanController::class, 'update']);
});

// Fallback akses scan tanpa auth jika scanner terminal berada dalam mode Kiosk Terbuka
Route::post('/public/scan', [ScanController::class, 'scan']);
Route::get('/public/dashboard', [DashboardController::class, 'index']);
Route::get('/public/cetak-kartu', [SiswaController::class, 'cetakKartu']);
Route::get('/public/siswa', [SiswaController::class, 'index']);
Route::get('/public/kelas', [KelasController::class, 'index']);
Route::get('/public/absensi', [AbsensiController::class, 'index']);
Route::post('/public/absensi/manual', [AbsensiController::class, 'manualInput']);
Route::delete('/public/absensi/{id}', [AbsensiController::class, 'destroy']);
Route::delete('/public/absensi/siswa/{siswaId}', [AbsensiController::class, 'destroyBySiswa']);
Route::get('/public/laporan/harian', [LaporanController::class, 'harian']);
Route::get('/public/laporan/bulanan', [LaporanController::class, 'bulanan']);
Route::get('/public/laporan/export-bulanan', [LaporanController::class, 'exportBulanan']);
Route::get('/public/laporan/siswa/{id}', [LaporanController::class, 'perSiswaBulanan']);
Route::get('/public/pengaturan', [PengaturanController::class, 'index']);

