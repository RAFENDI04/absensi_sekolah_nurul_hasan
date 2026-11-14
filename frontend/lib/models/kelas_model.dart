
class KelasModel {
  final int id;
  final String namaKelas;
  final String? jurusan;
  final String tahunAjaran;
  final int totalSiswa;

  KelasModel({
    required this.id,
    required this.namaKelas,
    this.jurusan,
    required this.tahunAjaran,
    this.totalSiswa = 0,
  });

  factory KelasModel.fromJson(Map<String, dynamic> json) {
    return KelasModel(
      id: json['id'] is int ? json['id'] : int.tryParse(json['id'].toString()) ?? 0,
      namaKelas: json['nama_kelas'] ?? '',
      jurusan: json['jurusan'],
      tahunAjaran: json['tahun_ajaran'] ?? '',
      totalSiswa: json['siswa_count'] ?? json['total_siswa'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nama_kelas': namaKelas,
      'jurusan': jurusan,
      'tahun_ajaran': tahunAjaran,
    };
  }
}
