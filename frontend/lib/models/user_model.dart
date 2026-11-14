class UserModel {
  final int id;
  final String username;
  final String nama;
  final String role; // 'admin' atau 'guru'

  UserModel({
    required this.id,
    required this.username,
    required this.nama,
    required this.role,
  });

  bool get isAdmin => role == 'admin';
  bool get isGuru => role == 'guru';

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] is int ? json['id'] : int.tryParse(json['id'].toString()) ?? 0,
      username: json['username'] ?? '',
      nama: json['nama'] ?? '',
      role: json['role'] ?? 'guru',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'nama': nama,
      'role': role,
    };
  }
}
