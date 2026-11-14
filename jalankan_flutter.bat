@echo off
title Frontend Flutter - Presensi Siswa LAN
echo ===================================================
echo Menjalankan Frontend Flutter Client...
echo ===================================================
cd /d "%~dp0frontend"
echo Menjalankan flutter pub get...
call flutter pub get
echo.
echo Pilih target perangkat untuk dijalankan:
echo [1] Browser Chrome (Web)
echo [2] Android Device / Emulator
echo [3] Windows Desktop
echo.
set /p TARGET="Masukkan pilihan (1/2/3, default 1): "
if "%TARGET%"=="2" (
    flutter run
) else if "%TARGET%"=="3" (
    flutter run -d windows
) else (
    flutter run -d chrome
)
pause
