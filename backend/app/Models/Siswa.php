<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'siswa';

    protected $fillable = [
        'nis',
        'nama',
        'jenis_kelamin',
        'kelas_id',
        'qr_code',
        'foto',
        'aktif',
    ];

    protected function casts(): array
    {
        return [
            'aktif' => 'boolean',
        ];
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function absensi()
    {
        return $this->hasMany(Absensi::class, 'siswa_id');
    }

    /**
     * Membuat format QR Code unik standar blueprint: SISWA-<NIS>-<TOKEN>
     */
    public static function generateQrToken(string $nis): string
    {
        $token = Str::random(6);
        return "SISWA-{$nis}-{$token}";
    }

    /**
     * Cari absensi hari ini untuk siswa ini
     */
    public function absensiHariIni(?string $tanggal = null)
    {
        $targetDate = $tanggal ?? now()->toDateString();
        return $this->absensi()->where('tanggal', $targetDate)->first();
    }
}
