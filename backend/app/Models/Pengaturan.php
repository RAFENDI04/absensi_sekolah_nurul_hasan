<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengaturan extends Model
{
    use HasFactory;

    protected $table = 'pengaturan';
    protected $primaryKey = 'kunci';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'kunci',
        'nilai',
        'label',
        'kategori',
    ];

    /**
     * Helper cepat mengambil nilai pengaturan
     */
    public static function ambil(string $kunci, ?string $default = null): ?string
    {
        $setting = static::where('kunci', $kunci)->first();
        return $setting ? $setting->nilai : $default;
    }

    /**
     * Helper cepat mengubah atau menyimpan nilai pengaturan
     */
    public static function simpan(string $kunci, string $nilai, ?string $label = null): void
    {
        static::updateOrCreate(
            ['kunci' => $kunci],
            ['nilai' => $nilai, 'label' => $label]
        );
    }
}
