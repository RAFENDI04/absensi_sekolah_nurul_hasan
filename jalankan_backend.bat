@echo off
title Backend Laravel - Presensi Siswa LAN
set "PATH=C:\php;%PATH%"
echo ===================================================
echo Menjalankan Backend Laravel API (Port 8000)...
echo ===================================================
cd /d "%~dp0backend"
if not exist ".env" (
    copy .env.example .env
    echo File .env berhasil dibuat dari .env.example
)
if not exist "database\database.sqlite" (
    type nul > "database\database.sqlite"
    echo Database SQLite berhasil diinisialisasi.
)
echo.
echo Menjalankan server lokal: php artisan serve --host=0.0.0.0 --port=8000
php artisan serve --host=0.0.0.0 --port=8000
pause

