import 'absensi_model.dart';

class DashboardDataModel {
  final String tanggal;
  final String serverTime;
  final String serverIp;
  final String sekolah;
  final String tahunAjaran;
  final int totalSiswa;
  final int hadir;
  final int terlambat;
  final int izinSakit;
  final int izin;
  final int sakit;
  final int alpa;
  final int belumAbsen;
  final double persentaseKehadiran;
  final List<AbsensiModel> recentScans;
  final List<DailyChartItem> chart7Hari;

  DashboardDataModel({
    required this.tanggal,
    required this.serverTime,
    required this.serverIp,
    required this.sekolah,
    required this.tahunAjaran,
    required this.totalSiswa,
    required this.hadir,
    required this.terlambat,
    required this.izinSakit,
    required this.izin,
    required this.sakit,
    required this.alpa,
    required this.belumAbsen,
    required this.persentaseKehadiran,
    required this.recentScans,
    required this.chart7Hari,
  });

  factory DashboardDataModel.fromJson(Map<String, dynamic> json) {
    final ringkasan = json['ringkasan'] ?? {};

    List<AbsensiModel> scans = [];
    if (json['recent_scans'] != null && json['recent_scans'] is List) {
      scans = (json['recent_scans'] as List)
          .map((i) => AbsensiModel.fromJson(i))
          .toList();
    }

    List<DailyChartItem> charts = [];
    if (json['chart_7_hari'] != null && json['chart_7_hari'] is List) {
      charts = (json['chart_7_hari'] as List)
          .map((i) => DailyChartItem.fromJson(i))
          .toList();
    }

    return DashboardDataModel(
      tanggal: json['tanggal'] ?? '',
      serverTime: json['server_time'] ?? '',
      serverIp: json['server_ip'] ?? '192.168.1.10',
      sekolah: json['sekolah'] ?? 'SMP Negeri 1 Cerdas Bangsa',
      tahunAjaran: json['tahun_ajaran'] ?? '2026/2027',
      totalSiswa: ringkasan['total_siswa'] ?? 0,
      hadir: ringkasan['hadir'] ?? 0,
      terlambat: ringkasan['terlambat'] ?? 0,
      izinSakit: ringkasan['izin_sakit'] ?? 0,
      izin: ringkasan['izin'] ?? 0,
      sakit: ringkasan['sakit'] ?? 0,
      alpa: ringkasan['alpa'] ?? 0,
      belumAbsen: ringkasan['belum_absen'] ?? 0,
      persentaseKehadiran: (ringkasan['persentase_kehadiran'] is num)
          ? (ringkasan['persentase_kehadiran'] as num).toDouble()
          : 0.0,
      recentScans: scans,
      chart7Hari: charts,
    );
  }
}

class DailyChartItem {
  final String tanggal;
  final String label;
  final int hadir;
  final int terlambat;
  final int izinSakit;
  final int alpa;
  final int totalHadir;

  DailyChartItem({
    required this.tanggal,
    required this.label,
    required this.hadir,
    required this.terlambat,
    required this.izinSakit,
    required this.alpa,
    required this.totalHadir,
  });

  factory DailyChartItem.fromJson(Map<String, dynamic> json) {
    return DailyChartItem(
      tanggal: json['tanggal'] ?? '',
      label: json['label'] ?? '',
      hadir: json['hadir'] ?? 0,
      terlambat: json['terlambat'] ?? 0,
      izinSakit: json['izin_sakit'] ?? 0,
      alpa: json['alpa'] ?? 0,
      totalHadir: json['total_hadir'] ?? 0,
    );
  }
}
