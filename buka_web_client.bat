@echo off
title Sistem Presensi Siswa LAN - Terminal Web
cd /d "%~dp0"
echo ===================================================
echo Membuka Terminal Web Presensi Siswa (Port 8080)...
echo ===================================================
call "%~dp0jalankan_server_lokal.bat"
