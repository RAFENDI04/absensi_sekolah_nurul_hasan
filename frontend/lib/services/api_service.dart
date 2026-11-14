import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';
import '../models/siswa_model.dart';
import '../models/kelas_model.dart';
import '../models/absensi_model.dart';
import '../models/dashboard_data_model.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  String _baseUrl = 'http://127.0.0.1:8000/api';
  String? _token;
  UserModel? _currentUser;
  bool _isOnline = false;
  int _lastPingMs = 0;

  String get baseUrl => _baseUrl;
  String? get token => _token;
  UserModel? get currentUser => _currentUser;
  bool get isOnline => _isOnline;
  int get lastPingMs => _lastPingMs;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _baseUrl = prefs.getString('api_base_url') ?? 'http://127.0.0.1:8000/api';
    _token = prefs.getString('api_token');
    final userJson = prefs.getString('current_user');
    if (userJson != null) {
      try {
        _currentUser = UserModel.fromJson(jsonDecode(userJson));
      } catch (_) {}
    }
    await checkPing();
  }

  Future<void> setBaseUrl(String url) async {
    String cleanUrl = url.trim();
    if (cleanUrl.endsWith('/')) {
      cleanUrl = cleanUrl.substring(0, cleanUrl.length - 1);
    }
    if (!cleanUrl.endsWith('/api')) {
      cleanUrl = '$cleanUrl/api';
    }
    _baseUrl = cleanUrl;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('api_base_url', _baseUrl);
    await checkPing();
  }

  Map<String, String> get _headers {
    final headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (_token != null) {
      headers['Authorization'] = 'Bearer $_token';
    }
    return headers;
  }

  /// Ping LAN Server untuk cek status koneksi dan latensi (ms)
  Future<Map<String, dynamic>> checkPing() async {
    final stopwatch = Stopwatch()..start();
    try {
      final response = await http
          .get(Uri.parse('$_baseUrl/ping'), headers: {'Accept': 'application/json'})
          .timeout(const Duration(seconds: 3));
      stopwatch.stop();
      _lastPingMs = stopwatch.elapsedMilliseconds;

      if (response.statusCode == 200) {
        _isOnline = true;
        final data = jsonDecode(response.body);
        return {
          'online': true,
          'latency_ms': _lastPingMs,
          'server_ip': data['server_ip'] ?? '127.0.0.1',
          'server_time': data['server_time_display'] ?? '',
        };
      }
    } catch (_) {
      stopwatch.stop();
      _lastPingMs = 0;
      _isOnline = false;
    }

    _isOnline = false;
    return {
      'online': false,
      'latency_ms': 0,
      'server_ip': '-',
      'server_time': '-',
    };
  }

  /// Login Pengguna
  Future<Map<String, dynamic>> login(String username, String password) async {
    try {
      final response = await http
          .post(
            Uri.parse('$_baseUrl/auth/login'),
            headers: _headers,
            body: jsonEncode({'username': username, 'password': password}),
          )
          .timeout(const Duration(seconds: 4));

      final data = jsonDecode(response.body);
      if (response.statusCode == 200 && data['ok'] == true) {
        _token = data['token'];
        _currentUser = UserModel.fromJson(data['user']);

        final prefs = await SharedPreferences.getInstance();
        if (_token != null) await prefs.setString('api_token', _token!);
        await prefs.setString('current_user', jsonEncode(_currentUser!.toJson()));

        return {'ok': true, 'message': 'Login berhasil', 'user': _currentUser};
      } else {
        return {'ok': false, 'message': data['message'] ?? 'Login gagal'};
      }
    } catch (e) {
      // Fallback demo login jika backend offline
      if (username == 'admin' && password == 'admin123') {
        _currentUser = UserModel(id: 1, username: 'admin', nama: 'Anwar S.pd.G.r (Demo)', role: 'admin');
        return {'ok': true, 'message': 'Login Demo Offline Berhasil', 'user': _currentUser};
      } else if (username == 'guru1' && password == 'guru123') {
        _currentUser = UserModel(id: 2, username: 'guru1', nama: 'Siti Rahmawati, S.Pd. (Demo)', role: 'guru');
        return {'ok': true, 'message': 'Login Demo Offline Berhasil', 'user': _currentUser};
      }
      return {'ok': false, 'message': 'Tidak dapat terhubung ke server LAN ($e)'};
    }
  }

  Future<void> logout() async {
    try {
      if (_token != null) {
        await http.post(Uri.parse('$_baseUrl/auth/logout'), headers: _headers);
      }
    } catch (_) {}

    _token = null;
    _currentUser = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('api_token');
    await prefs.remove('current_user');
  }

  /// Ambil Ringkasan Dashboard
  Future<DashboardDataModel> getDashboard({String? tanggal}) async {
    try {
      final url = tanggal != null ? '$_baseUrl/dashboard?tanggal=$tanggal' : '$_baseUrl/dashboard';
      final response = await http.get(Uri.parse(url), headers: _headers).timeout(const Duration(seconds: 4));

      if (response.statusCode == 200) {
        final res = jsonDecode(response.body);
        if (res['ok'] == true && res['data'] != null) {
          return DashboardDataModel.fromJson(res['data']);
        }
      }
    } catch (_) {}

    // Fallback Mock Data jika backend belum online
    return DashboardDataModel(
      tanggal: DateTime.now().toString().split(' ')[0],
      serverTime: '07:14:22',
      serverIp: '192.168.1.10:8000',
      sekolah: 'SMA Nurul Hasan Sabuntan',
      tahunAjaran: '2026/2027',
      totalSiswa: 24,
      hadir: 4,
      terlambat: 2,
      izinSakit: 2,
      izin: 1,
      sakit: 1,
      alpa: 0,
      belumAbsen: 16,
      persentaseKehadiran: 25.0,
      recentScans: [
        AbsensiModel(id: 6, siswaId: 5, nama: 'Dimas Wahyu Saputra', nis: '10025', namaKelas: 'Kelas 10 (X)', tanggal: '2026-10-08', jam: '07:22:10', status: 'Terlambat', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
        AbsensiModel(id: 4, siswaId: 4, nama: 'Cantika Dewi Lestari', nis: '10024', namaKelas: 'Kelas 10 (X)', tanggal: '2026-10-08', jam: '07:11:45', status: 'Hadir', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
        AbsensiModel(id: 3, siswaId: 3, nama: 'Bagas Arya Pratama', nis: '10023', namaKelas: 'Kelas 10 (X)', tanggal: '2026-10-08', jam: '07:04:12', status: 'Hadir', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
        AbsensiModel(id: 2, siswaId: 2, nama: 'Anisa Putri Maharani', nis: '10022', namaKelas: 'Kelas 10 (X)', tanggal: '2026-10-08', jam: '06:58:30', status: 'Hadir', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
        AbsensiModel(id: 1, siswaId: 1, nama: 'Ahmad Fadhil Prasetyo', nis: '10021', namaKelas: 'Kelas 10 (X)', tanggal: '2026-10-08', jam: '06:52:14', status: 'Hadir', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
      ],
      chart7Hari: [
        DailyChartItem(tanggal: '2026-10-02', label: 'Jum', hadir: 22, terlambat: 1, izinSakit: 1, alpa: 0, totalHadir: 23),
        DailyChartItem(tanggal: '2026-10-03', label: 'Sab', hadir: 23, terlambat: 0, izinSakit: 1, alpa: 0, totalHadir: 23),
        DailyChartItem(tanggal: '2026-10-05', label: 'Sen', hadir: 20, terlambat: 3, izinSakit: 1, alpa: 0, totalHadir: 23),
        DailyChartItem(tanggal: '2026-10-06', label: 'Sel', hadir: 21, terlambat: 2, izinSakit: 1, alpa: 0, totalHadir: 23),
        DailyChartItem(tanggal: '2026-10-07', label: 'Rab', hadir: 22, terlambat: 1, izinSakit: 1, alpa: 0, totalHadir: 23),
        DailyChartItem(tanggal: '2026-10-08', label: 'Kam', hadir: 4, terlambat: 2, izinSakit: 2, alpa: 0, totalHadir: 6),
      ],
    );
  }

  /// Eksekusi Scan QR Code
  Future<Map<String, dynamic>> scanQr(String qrCode, {String? keterangan}) async {
    try {
      final response = await http
          .post(
            Uri.parse('$_baseUrl/scan'),
            headers: _headers,
            body: jsonEncode({'qr_code': qrCode, 'keterangan': keterangan}),
          )
          .timeout(const Duration(seconds: 4));

      final data = jsonDecode(response.body);
      return data;
    } catch (e) {
      // Mock scanner response jika backend offline
      if (qrCode.contains('10021') || qrCode.contains('9fA3kQ')) {
        return {
          'ok': true,
          'code': 'SUCCESS',
          'message': 'Absensi tepat waktu berhasil dicatat (Demo Mode).',
          'nama': 'Ahmad Fadhil Prasetyo',
          'nis': '10021',
          'kelas': 'Kelas 10 (X)',
          'tanggal': DateTime.now().toString().split(' ')[0],
          'jam': '07:05:14',
          'status': 'Hadir',
        };
      }
      return {
        'ok': false,
        'code': 'OFFLINE_ERROR',
        'message': 'Gagal menghubungi server LAN: $e',
      };
    }
  }

  /// Ambil Daftar Siswa
  Future<List<SiswaModel>> getSiswa({String? query, int? kelasId}) async {
    try {
      String url = '$_baseUrl/siswa?per_page=100';
      if (query != null && query.isNotEmpty) url += '&q=$query';
      if (kelasId != null) url += '&kelas_id=$kelasId';

      final response = await http.get(Uri.parse(url), headers: _headers).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final res = jsonDecode(response.body);
        if (res['data'] != null && res['data']['data'] is List) {
          return (res['data']['data'] as List).map((i) => SiswaModel.fromJson(i)).toList();
        }
      }
    } catch (_) {}

    // Mock Siswa List
    return [
      // Kelas 10 (X)
      SiswaModel(id: 1, nis: '10021', nama: 'Ahmad Fadhil Prasetyo', jenisKelamin: 'L', kelasId: 1, namaKelas: 'Kelas 10 (X)', qrCode: 'SISWA-10021-9fA3kQ'),
      SiswaModel(id: 2, nis: '10022', nama: 'Anisa Putri Maharani', jenisKelamin: 'P', kelasId: 1, namaKelas: 'Kelas 10 (X)', qrCode: 'SISWA-10022-B8xR4L'),
      SiswaModel(id: 3, nis: '10023', nama: 'Bagas Arya Pratama', jenisKelamin: 'L', kelasId: 1, namaKelas: 'Kelas 10 (X)', qrCode: 'SISWA-10023-V2mK9J'),
      SiswaModel(id: 4, nis: '10024', nama: 'Cantika Dewi Lestari', jenisKelamin: 'P', kelasId: 1, namaKelas: 'Kelas 10 (X)', qrCode: 'SISWA-10024-Q7wE1P'),
      SiswaModel(id: 5, nis: '10025', nama: 'Dimas Wahyu Saputra', jenisKelamin: 'L', kelasId: 1, namaKelas: 'Kelas 10 (X)', qrCode: 'SISWA-10025-L5pT3N'),
      SiswaModel(id: 6, nis: '10026', nama: 'Fitria Nur Aini', jenisKelamin: 'P', kelasId: 1, namaKelas: 'Kelas 10 (X)', qrCode: 'SISWA-10026-H4jS8Y'),
      SiswaModel(id: 7, nis: '10027', nama: 'Gilang Ramadhan', jenisKelamin: 'L', kelasId: 1, namaKelas: 'Kelas 10 (X)', qrCode: 'SISWA-10027-M9cZ2W'),
      SiswaModel(id: 8, nis: '10028', nama: 'Hana Khalisa', jenisKelamin: 'P', kelasId: 1, namaKelas: 'Kelas 10 (X)', qrCode: 'SISWA-10028-T1uO6V'),
      // Kelas 11 (XI)
      SiswaModel(id: 9, nis: '10031', nama: 'Ilham Maulana', jenisKelamin: 'L', kelasId: 2, namaKelas: 'Kelas 11 (XI)', qrCode: 'SISWA-10031-K3bV9R'),
      SiswaModel(id: 10, nis: '10032', nama: 'Jessica Amanda', jenisKelamin: 'P', kelasId: 2, namaKelas: 'Kelas 11 (XI)', qrCode: 'SISWA-10032-W8yU5M'),
      SiswaModel(id: 11, nis: '10033', nama: 'Kevin Alfarizi', jenisKelamin: 'L', kelasId: 2, namaKelas: 'Kelas 11 (XI)', qrCode: 'SISWA-10033-X2iO7L'),
      SiswaModel(id: 12, nis: '10034', nama: 'Laila Zahra', jenisKelamin: 'P', kelasId: 2, namaKelas: 'Kelas 11 (XI)', qrCode: 'SISWA-10034-P4rT1K'),
      SiswaModel(id: 13, nis: '10035', nama: 'Muhammad Rizky Fauzi', jenisKelamin: 'L', kelasId: 2, namaKelas: 'Kelas 11 (XI)', qrCode: 'SISWA-10035-F6aE9B'),
      SiswaModel(id: 14, nis: '10036', nama: 'Nadya Salsabila', jenisKelamin: 'P', kelasId: 2, namaKelas: 'Kelas 11 (XI)', qrCode: 'SISWA-10036-C9dL3Q'),
      SiswaModel(id: 15, nis: '20011', nama: 'Oki Setiawan', jenisKelamin: 'L', kelasId: 2, namaKelas: 'Kelas 11 (XI)', qrCode: 'SISWA-20011-Y7uH4A'),
      SiswaModel(id: 16, nis: '20012', nama: 'Putri Ayu Ningsih', jenisKelamin: 'P', kelasId: 2, namaKelas: 'Kelas 11 (XI)', qrCode: 'SISWA-20012-E5mN8S'),
      // Kelas 12 (XII)
      SiswaModel(id: 17, nis: '20013', nama: 'Rian Hidayat', jenisKelamin: 'L', kelasId: 3, namaKelas: 'Kelas 12 (XII)', qrCode: 'SISWA-20013-U3oK2D'),
      SiswaModel(id: 18, nis: '20014', nama: 'Siti Nurhaliza', jenisKelamin: 'P', kelasId: 3, namaKelas: 'Kelas 12 (XII)', qrCode: 'SISWA-20014-Z1pX6C'),
      SiswaModel(id: 19, nis: '20015', nama: 'Tegar Aditia', jenisKelamin: 'L', kelasId: 3, namaKelas: 'Kelas 12 (XII)', qrCode: 'SISWA-20015-J8wL5V'),
      SiswaModel(id: 20, nis: '30001', nama: 'Umar Faruq', jenisKelamin: 'L', kelasId: 3, namaKelas: 'Kelas 12 (XII)', qrCode: 'SISWA-30001-N6kQ3T'),
      SiswaModel(id: 21, nis: '30002', nama: 'Vina Anggraini', jenisKelamin: 'P', kelasId: 3, namaKelas: 'Kelas 12 (XII)', qrCode: 'SISWA-30002-R2sF9W'),
      SiswaModel(id: 22, nis: '30003', nama: 'Wahyu Pratama', jenisKelamin: 'L', kelasId: 3, namaKelas: 'Kelas 12 (XII)', qrCode: 'SISWA-30003-B4tE1Z'),
      SiswaModel(id: 23, nis: '30004', nama: 'Yolanda Permata', jenisKelamin: 'P', kelasId: 3, namaKelas: 'Kelas 12 (XII)', qrCode: 'SISWA-30004-G9hU7M'),
      SiswaModel(id: 24, nis: '30005', nama: 'Zaki Firmansyah', jenisKelamin: 'L', kelasId: 3, namaKelas: 'Kelas 12 (XII)', qrCode: 'SISWA-30005-D3yR8P'),
    ];
  }

  /// Tambah Siswa Baru
  Future<Map<String, dynamic>> addSiswa({
    required String nis,
    required String nama,
    required String jenisKelamin,
    required int kelasId,
  }) async {
    try {
      final response = await http
          .post(
            Uri.parse('$_baseUrl/siswa'),
            headers: _headers,
            body: jsonEncode({
              'nis': nis,
              'nama': nama,
              'jenis_kelamin': jenisKelamin,
              'kelas_id': kelasId,
            }),
          )
          .timeout(const Duration(seconds: 4));

      return jsonDecode(response.body);
    } catch (e) {
      return {'ok': false, 'message': 'Gagal terhubung: $e'};
    }
  }

  /// Regenerate QR Code Token
  Future<Map<String, dynamic>> regenerateQr(int siswaId) async {
    try {
      final response = await http
          .post(Uri.parse('$_baseUrl/siswa/$siswaId/regenerate-qr'), headers: _headers)
          .timeout(const Duration(seconds: 4));

      return jsonDecode(response.body);
    } catch (e) {
      return {'ok': false, 'message': 'Gagal: $e'};
    }
  }

  /// Ambil Daftar Kelas
  Future<List<KelasModel>> getKelas() async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/kelas'), headers: _headers).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final res = jsonDecode(response.body);
        if (res['data'] is List) {
          return (res['data'] as List).map((i) => KelasModel.fromJson(i)).toList();
        }
      }
    } catch (_) {}

    return [
      KelasModel(id: 1, namaKelas: 'Kelas 10 (X)', tahunAjaran: '2026/2027', totalSiswa: 8),
      KelasModel(id: 2, namaKelas: 'Kelas 11 (XI)', tahunAjaran: '2026/2027', totalSiswa: 8),
      KelasModel(id: 3, namaKelas: 'Kelas 12 (XII)', tahunAjaran: '2026/2027', totalSiswa: 8),
    ];
  }

  /// Ambil Riwayat Absensi
  Future<List<AbsensiModel>> getAbsensi({String? tanggal, int? kelasId, String? status}) async {
    try {
      String url = '$_baseUrl/absensi?per_page=50';
      if (tanggal != null) url += '&tanggal=$tanggal';
      if (kelasId != null) url += '&kelas_id=$kelasId';
      if (status != null && status.isNotEmpty) url += '&status=$status';

      final response = await http.get(Uri.parse(url), headers: _headers).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final res = jsonDecode(response.body);
        if (res['data'] != null && res['data']['data'] is List) {
          return (res['data']['data'] as List).map((i) => AbsensiModel.fromJson(i)).toList();
        }
      }
    } catch (_) {}

    return [
      AbsensiModel(id: 1, siswaId: 1, nama: 'Ahmad Fadhil Prasetyo', nis: '10021', namaKelas: 'Kelas 10 (X)', tanggal: tanggal ?? '2026-10-08', jam: '06:52:14', status: 'Hadir', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
      AbsensiModel(id: 2, siswaId: 2, nama: 'Anisa Putri Maharani', nis: '10022', namaKelas: 'Kelas 10 (X)', tanggal: tanggal ?? '2026-10-08', jam: '06:58:30', status: 'Hadir', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
      AbsensiModel(id: 3, siswaId: 3, nama: 'Bagas Arya Pratama', nis: '10023', namaKelas: 'Kelas 10 (X)', tanggal: tanggal ?? '2026-10-08', jam: '07:04:12', status: 'Hadir', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
      AbsensiModel(id: 4, siswaId: 4, nama: 'Cantika Dewi Lestari', nis: '10024', namaKelas: 'Kelas 10 (X)', tanggal: tanggal ?? '2026-10-08', jam: '07:11:45', status: 'Hadir', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
      AbsensiModel(id: 5, siswaId: 5, nama: 'Dimas Wahyu Saputra', nis: '10025', namaKelas: 'Kelas 10 (X)', tanggal: tanggal ?? '2026-10-08', jam: '07:22:10', status: 'Terlambat', keterangan: 'Macet di jalan', dicatatOleh: 'Siti Rahmawati, S.Pd.'),
      AbsensiModel(id: 6, siswaId: 7, nama: 'Gilang Ramadhan', nis: '10027', namaKelas: 'Kelas 10 (X)', tanggal: tanggal ?? '2026-10-08', jam: '07:00:00', status: 'Izin', keterangan: 'Acara keluarga', dicatatOleh: 'Anwar S.pd.G.r'),
      AbsensiModel(id: 7, siswaId: 8, nama: 'Hana Khalisa', nis: '10028', namaKelas: 'Kelas 10 (X)', tanggal: tanggal ?? '2026-10-08', jam: '07:00:00', status: 'Sakit', keterangan: 'Surat dokter', dicatatOleh: 'Budi Darmawan, S.Kom.'),
    ];
  }

  /// Ambil Rekapitulasi Matriks Bulanan per Siswa
  Future<Map<String, dynamic>> getRekapBulanan({int? bulan, int? tahun, int? kelasId}) async {
    final b = bulan ?? DateTime.now().month;
    final y = tahun ?? DateTime.now().year;
    try {
      String url = '$_baseUrl/laporan/bulanan?bulan=$b&tahun=$y';
      if (kelasId != null) url += '&kelas_id=$kelasId';

      final response = await http.get(Uri.parse(url), headers: _headers).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (_) {}

    // Mock response rekap bulanan jika offline
    final mockSiswa = await getSiswa(kelasId: kelasId);
    final daysInMonth = DateTime(y, b + 1, 0).day;
    final data = mockSiswa.map((s) {
      int h = 0, t = 0, i = 0, sa = 0, a = 0;
      final dailyMap = <String, String>{};
      for (int d = 1; d <= daysInMonth; d++) {
        final dt = DateTime(y, b, d);
        if (dt.weekday == DateTime.sunday) {
          dailyMap['$d'] = '-';
          continue;
        }
        final hash = (s.nis.hashCode + y * 100 + b * 10 + d).abs() % 100;
        if (hash < 75) { dailyMap['$d'] = 'H'; h++; }
        else if (hash < 88) { dailyMap['$d'] = 'T'; t++; }
        else if (hash < 93) { dailyMap['$d'] = 'I'; i++; }
        else if (hash < 97) { dailyMap['$d'] = 'S'; sa++; }
        else { dailyMap['$d'] = 'A'; a++; }
      }
      final totalMasuk = h + t;
      final totalHari = totalMasuk + i + sa + a;
      final persen = totalHari > 0 ? ((totalMasuk / totalHari) * 100).round() : 100;

      return {
        'siswa_id': s.id,
        'nis': s.nis,
        'nama': s.nama,
        'kelas': s.namaKelas,
        'hadir': h,
        'terlambat': t,
        'izin': i,
        'sakit': sa,
        'alpa': a,
        'persentase': persen,
        'daily_map': dailyMap,
      };
    }).toList();

    return {
      'ok': true,
      'bulan': b,
      'tahun': y,
      'days_in_month': daysInMonth,
      'data': data,
    };
  }

  /// Input Absensi Manual / Koreksi
  Future<Map<String, dynamic>> submitManualAbsensi({
    required int siswaId,
    required String tanggal,
    required String status,
    String? keterangan,
  }) async {
    try {
      final response = await http
          .post(
            Uri.parse('$_baseUrl/absensi/manual'),
            headers: _headers,
            body: jsonEncode({
              'siswa_id': siswaId,
              'tanggal': tanggal,
              'status': status,
              'keterangan': keterangan,
            }),
          )
          .timeout(const Duration(seconds: 4));

      return jsonDecode(response.body);
    } catch (e) {
      return {'ok': false, 'message': 'Gagal: $e'};
    }
  }

  /// Ambil Pengaturan
  Future<Map<String, dynamic>> getPengaturan() async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/pengaturan'), headers: _headers).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final res = jsonDecode(response.body);
        if (res['data'] != null) return res['data'];
      }
    } catch (_) {}

    return {
      'jam_masuk': '07:00:00',
      'batas_terlambat': '07:15:00',
      'jam_tutup_scan': '09:00:00',
      'nama_sekolah': 'SMA Nurul Hasan Sabuntan',
      'tahun_ajaran_aktif': '2026/2027',
      'alamat_sekolah': 'Jl. Pendidikan No. 45',
    };
  }

  /// Simpan Pengaturan
  Future<Map<String, dynamic>> savePengaturan(Map<String, dynamic> data) async {
    try {
      final response = await http
          .post(Uri.parse('$_baseUrl/pengaturan'), headers: _headers, body: jsonEncode(data))
          .timeout(const Duration(seconds: 4));
      return jsonDecode(response.body);
    } catch (e) {
      return {'ok': false, 'message': 'Gagal: $e'};
    }
  }
}
