class AbsensiModel {
  final int id;
  final int siswaId;
  final String nama;
  final String nis;
  final String namaKelas;
  final String tanggal;
  final String jam;
  final String status; // 'Hadir', 'Terlambat', 'Izin', 'Sakit', 'Alpa'
  final String? keterangan;
  final String? dicatatOleh;

  AbsensiModel({
    required this.id,
    required this.siswaId,
    required this.nama,
    required this.nis,
    required this.namaKelas,
    required this.tanggal,
    required this.jam,
    required this.status,
    this.keterangan,
    this.dicatatOleh,
  });

  factory AbsensiModel.fromJson(Map<String, dynamic> json) {
    String nama = json['nama'] ?? '';
    String nis = json['nis'] ?? '';
    String kName = json['kelas'] ?? '';

    if (json['siswa'] != null && json['siswa'] is Map) {
      nama = json['siswa']['nama'] ?? nama;
      nis = json['siswa']['nis'] ?? nis;
      if (json['siswa']['kelas'] != null && json['siswa']['kelas'] is Map) {
        kName = json['siswa']['kelas']['nama_kelas'] ?? kName;
      }
    }

    String? pencatatNama;
    if (json['pencatat'] != null && json['pencatat'] is Map) {
      pencatatNama = json['pencatat']['nama'];
    } else if (json['dicatat_oleh'] != null) {
      pencatatNama = json['dicatat_oleh'].toString();
    }

    return AbsensiModel(
      id: json['id'] is int ? json['id'] : int.tryParse(json['id'].toString()) ?? 0,
      siswaId: json['siswa_id'] is int ? json['siswa_id'] : int.tryParse(json['siswa_id'].toString()) ?? 0,
      nama: nama,
      nis: nis,
      namaKelas: kName,
      tanggal: json['tanggal'] ?? '',
      jam: json['jam'] ?? '',
      status: json['status'] ?? 'Hadir',
      keterangan: json['keterangan'],
      dicatatOleh: pencatatNama,
    );
  }
}
