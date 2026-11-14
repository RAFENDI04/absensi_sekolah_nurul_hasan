<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'ONLINE',
        'message' => 'Backend API Sistem Absensi Siswa LAN (Laravel 11)',
        'version' => '1.0.0',
        'docs' => [
            'api_ping' => '/api/ping',
            'api_dashboard' => '/api/public/dashboard',
            'api_scan' => '/api/scan',
        ],
    ]);
});
