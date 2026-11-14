@echo off
title Presensi Siswa LAN - Server Web Lokal
cd /d "%~dp0"
echo ========================================================
echo Memulai Server Web Presensi Siswa (Port 8080)...
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
