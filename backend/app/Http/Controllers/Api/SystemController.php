<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SystemController extends Controller
{
    /**
     * Health check endpoint untuk Flutter LAN client
     */
    public function ping(Request $request)
    {
        $startTime = microtime(true);
        $serverTime = Carbon::now();

        return response()->json([
            'ok' => true,
            'status' => 'ONLINE',
            'app' => 'Sistem Absensi Siswa LAN API',
            'version' => '1.0.0',
            'server_ip' => $request->server('SERVER_ADDR', gethostbyname(gethostname())),
            'client_ip' => $request->ip(),
            'server_time' => $serverTime->toIso8601String(),
            'server_time_display' => $serverTime->format('H:i:s d-m-Y'),
            'execution_ms' => round((microtime(true) - $startTime) * 1000, 2),
        ]);
    }

    /**
     * Info ringkas server LAN
     */
    public function lanInfo(Request $request)
    {
        return response()->json([
            'ok' => true,
            'hostname' => gethostname(),
            'local_ips' => [
                gethostbyname(gethostname()),
                $request->server('SERVER_ADDR', '127.0.0.1')
            ],
            'php_version' => PHP_VERSION,
            'os' => PHP_OS,
        ]);
    }
}
