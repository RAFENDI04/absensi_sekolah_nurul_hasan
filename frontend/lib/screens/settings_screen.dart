import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import 'login_screen.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final ApiService _api = ApiService();
  final _urlController = TextEditingController();

  bool _isTesting = false;
  Map<String, dynamic>? _pingResult;
  Map<String, dynamic>? _settings;

  @override
  void initState() {
    super.initState();
    _urlController.text = _api.baseUrl;
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final s = await _api.getPengaturan();
    if (mounted) setState(() => _settings = s);
  }

  Future<void> _testConnection() async {
    setState(() => _isTesting = true);
    await _api.setBaseUrl(_urlController.text.trim());
    final res = await _api.checkPing();
    if (mounted) {
      setState(() {
        _isTesting = false;
        _pingResult = res;
      });
    }
  }

  Future<void> _handleLogout() async {
    await _api.logout();
    if (mounted) {
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (_) => const LoginScreen()),
        (route) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = _api.currentUser;

    return Scaffold(
      appBar: AppBar(
        title: Text('Pengaturan Jaringan LAN', style: AppTypography.headlineSm()),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 540),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Pengguna Aktif
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.borderSubtle),
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      backgroundColor: AppColors.primaryContainer,
                      child: const Icon(Icons.person, color: Colors.white),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(user?.nama ?? 'Pengguna', style: AppTypography.labelMd()),
                          Text('Peran: ${user?.role.toUpperCase() ?? "GURU"}', style: AppTypography.bodySm(color: AppColors.textSecondary)),
                        ],
                      ),
                    ),
                    OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppColors.error,
                        side: const BorderSide(color: AppColors.error),
                        minimumSize: const Size(80, 36),
                      ),
                      onPressed: _handleLogout,
                      child: const Text('Keluar'),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Konfigurasi IP Gateway LAN
              Text('KONFIGURASI SERVER LAN', style: AppTypography.labelSm(color: AppColors.textSecondary)),
              const SizedBox(height: 8),

              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.borderSubtle),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Alamat Base URL API:', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    TextField(
                      controller: _urlController,
                      decoration: const InputDecoration(
                        hintText: 'Contoh: http://192.168.1.10:8000/api',
                        prefixIcon: Icon(Icons.lan_outlined),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Pilihan Cepat Presets:',
                      style: AppTypography.labelSm(color: AppColors.textSecondary),
                    ),
                    const SizedBox(height: 6),
                    Wrap(
                      spacing: 6,
                      runSpacing: 6,
                      children: [
                        ActionChip(
                          label: const Text('Localhost (PC)', style: TextStyle(fontSize: 11)),
                          onPressed: () => _urlController.text = 'http://127.0.0.1:8000/api',
                        ),
                        ActionChip(
                          label: const Text('Wi-Fi LAN (192.168.1.10)', style: TextStyle(fontSize: 11)),
                          onPressed: () => _urlController.text = 'http://192.168.1.10:8000/api',
                        ),
                        ActionChip(
                          label: const Text('Emulator Android (10.0.2.2)', style: TextStyle(fontSize: 11)),
                          onPressed: () => _urlController.text = 'http://10.0.2.2:8000/api',
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),

                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primaryContainer,
                      ),
                      onPressed: _isTesting ? null : _testConnection,
                      icon: _isTesting
                          ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                          : const Icon(Icons.network_check, size: 18),
                      label: const Text('SIMPAN & TES KONEKSI LAN'),
                    ),

                    if (_pingResult != null) ...[
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: _pingResult!['online'] == true
                              ? AppColors.statusHadirBg
                              : AppColors.statusAlpaBg,
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(
                            color: _pingResult!['online'] == true
                                ? AppColors.statusHadirBorder
                                : AppColors.statusAlpaBorder,
                          ),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              _pingResult!['online'] == true ? Icons.check_circle : Icons.error,
                              size: 18,
                              color: _pingResult!['online'] == true ? AppColors.secondary : AppColors.critical,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                _pingResult!['online'] == true
                                    ? 'Server Online! Latensi: ${_pingResult!["latency_ms"]} ms · Waktu: ${_pingResult!["server_time"]}'
                                    : 'Gagal menghubungi server LAN. Pastikan HP dan Laptop di Wi-Fi yang sama.',
                                style: AppTypography.bodySm(
                                  color: _pingResult!['online'] == true ? AppColors.secondary : AppColors.critical,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Parameter Waktu Presensi
              Text('KEBIJAKAN JAM PRESENSI SEKOLAH', style: AppTypography.labelSm(color: AppColors.textSecondary)),
              const SizedBox(height: 8),

              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.borderSubtle),
                ),
                child: Column(
                  children: [
                    _buildInfoRow('Nama Sekolah', _settings?['nama_sekolah'] ?? 'SMA Nurul Hasan Sabuntan'),
                    const Divider(height: 16, color: AppColors.borderSubtle),
                    _buildInfoRow('Jam Masuk', _settings?['jam_masuk'] ?? '07:00:00 WIB'),
                    const Divider(height: 16, color: AppColors.borderSubtle),
                    _buildInfoRow('Batas Terlambat', _settings?['batas_terlambat'] ?? '07:15:00 WIB'),
                    const Divider(height: 16, color: AppColors.borderSubtle),
                    _buildInfoRow('Jam Tutup Scan', _settings?['jam_tutup_scan'] ?? '09:00:00 WIB'),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: AppTypography.bodySm(color: AppColors.textSecondary)),
        Text(value, style: AppTypography.labelMd()),
      ],
    );
  }
}
