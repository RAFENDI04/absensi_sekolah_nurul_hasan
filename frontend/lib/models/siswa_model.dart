class SiswaModel {
  final int id;
  final String nis;
  final String nama;
  final String jenisKelamin; // 'L' atau 'P'
  final int kelasId;
  final String? namaKelas;
  final String qrCode;
  final String? foto;
  final bool aktif;

  SiswaModel({
    required this.id,
    required this.nis,
    required this.nama,
    required this.jenisKelamin,
    required this.kelasId,
    this.namaKelas,
    required this.qrCode,
    this.foto,
    this.aktif = true,
  });

  String get jenisKelaminDisplay => jenisKelamin == 'L' ? 'Laki-laki' : 'Perempuan';

  factory SiswaModel.fromJson(Map<String, dynamic> json) {
    String? kName;
    if (json['kelas'] != null && json['kelas'] is Map) {
      kName = json['kelas']['nama_kelas'];
    }

    return SiswaModel(
      id: json['id'] is int ? json['id'] : int.tryParse(json['id'].toString()) ?? 0,
      nis: json['nis'] ?? '',
      nama: json['nama'] ?? '',
      jenisKelamin: json['jenis_kelamin'] ?? 'L',
      kelasId: json['kelas_id'] is int ? json['kelas_id'] : int.tryParse(json['kelas_id'].toString()) ?? 0,
      namaKelas: kName ?? json['nama_kelas'],
      qrCode: json['qr_code'] ?? '',
      foto: json['foto'],
      aktif: json['aktif'] == 1 || json['aktif'] == true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nis': nis,
      'nama': nama,
      'jenis_kelamin': jenisKelamin,
      'kelas_id': kelasId,
      'qr_code': qrCode,
      'foto': foto,
      'aktif': aktif,
    };
  }
}
