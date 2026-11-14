# Server Lokal Presensi Siswa LAN (PowerShell HttpListener)
param(
    [int]$Port = 8080
)

try { $Host.UI.RawUI.WindowTitle = "Presensi Siswa LAN - Server Web Lokal (Port $Port)" } catch {}

$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = "c:\Users\USER\Downloads\aplikasi" }
$webRoot = Join-Path $scriptDir "web_client"

if (-not (Test-Path $webRoot)) {
    Write-Host "Folder web_client tidak ditemukan di $webRoot!" -ForegroundColor Red
    pause
    exit 1
}

$listener = New-Object System.Net.HttpListener
$urlPrefix = "http://localhost:$Port/"
$listener.Prefixes.Add($urlPrefix)

try {
    $listener.Start()
} catch {
    Write-Host "Gagal memulai server di port $($Port): $_" -ForegroundColor Red
    Write-Host "Mencoba port alternatif 8081..." -ForegroundColor Yellow
    $Port = 8081
    $urlPrefix = "http://localhost:$Port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($urlPrefix)
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  SISTEM INFORMASI PRESENSI SISWA BERBASIS QR CODE LAN    " -ForegroundColor Green
Write-Host "  Academic Precision Edition (Web Terminal & Simulator)  " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Server aktif pada: $urlPrefix" -ForegroundColor Yellow
Write-Host " Membuka browser default secara otomatis..." -ForegroundColor Gray
Write-Host " Tekan Ctrl+C di jendela ini untuk mematikan server." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

# Buka browser
Start-Process $urlPrefix

# MIME types lookup
$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
            $path = "/index.html"
        }
        $relPath = $path.TrimStart("/").Replace("/", "\")
        $filePath = Join-Path $webRoot $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            
            $response.ContentType = $mime
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "[200 OK] $($request.HttpMethod) $path" -ForegroundColor DarkGreen
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            Write-Host "[404 Not Found] $($request.HttpMethod) $path" -ForegroundColor DarkYellow
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
