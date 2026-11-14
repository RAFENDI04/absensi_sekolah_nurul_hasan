<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('absensi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->onDelete('cascade');
            $table->date('tanggal');
            $table->time('jam');
            $table->enum('status', ['Hadir', 'Terlambat', 'Izin', 'Sakit', 'Alpa']);
            $table->string('keterangan', 255)->nullable();
            $table->foreignId('dicatat_oleh')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            // Batasan unik: Satu siswa hanya memiliki satu catatan absensi per tanggal
            $table->unique(['siswa_id', 'tanggal'], 'uq_siswa_tanggal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('absensi');
    }
};
