import 'package:flutter/material.dart';
import '../models/dashboard_data_model.dart';
import '../services/api_service.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import '../widgets/lan_connectivity_header.dart';
import '../widgets/scan_feed_item.dart';
import '../widgets/stat_card.dart';
import 'manual_absensi_screen.dart';
import 'rekap_screen.dart';
import 'scanner_screen.dart';
import 'id_card_print_screen.dart';
import 'settings_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiService _api = ApiService();
  DashboardDataModel? _data;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadDashboard();
  }

  Future<void> _loadDashboard() async {
    setState(() => _isLoading = true);
    final data = await _api.getDashboard();
    if (mounted) {
      setState(() {
        _data = data;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = _api.currentUser;

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 34,
              height: 34,
              padding: const EdgeInsets.all(2),
              decoration: BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.borderSubtle, width: 1),
              ),
              child: ClipOval(
                child: Image.asset(
                  'assets/images/logo.jpg',
                  fit: BoxFit.contain,
                  errorBuilder: (context, error, stackTrace) => const Icon(
                    Icons.school,
                    size: 18,
                    color: AppColors.primaryContainer,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _data?.sekolah ?? 'SMA Nurul Hasan Sabuntan',
                    style: AppTypography.labelLg(color: AppColors.primaryContainer),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    'Tahun Ajaran ${_data?.tahunAjaran ?? "2026/2027"}',
                    style: AppTypography.bodySm(color: AppColors.textSecondary),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: AppColors.textPrimary),
            tooltip: 'Segarkan Data',
            onPressed: _loadDashboard,
          ),
          IconButton(
            icon: const Icon(Icons.tune, color: AppColors.textPrimary),
            tooltip: 'Pengaturan LAN',
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const SettingsScreen()),
              ).then((_) => _loadDashboard());
            },
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            const LanConnectivityHeader(),
            Expanded(
              child: _isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : RefreshIndicator(
                      onRefresh: _loadDashboard,
                      child: SingleChildScrollView(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                        physics: const AlwaysScrollableScrollPhysics(),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Greeting Banner
                            Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                gradient: const LinearGradient(
                                  colors: [AppColors.primary, AppColors.primaryContainer],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                ),
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'Halo, ${user?.nama ?? "Bapak/Ibu Guru"}',
                                          style: AppTypography.headlineSm(color: Colors.white),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          'Sistem siap mencatat presensi via QR LAN',
                                          style: AppTypography.bodySm(color: AppColors.surfaceContainerHigh),
                                        ),
                                        const SizedBox(height: 8),
                                        Row(
                                          children: [
                                            const Icon(Icons.access_time, size: 14, color: Colors.white70),
                                            const SizedBox(width: 4),
                                            Text(
                                              'Jam Server: ${_data?.serverTime ?? "07:00:00"} WIB',
                                              style: AppTypography.tabularNumber(
                                                fontSize: 12,
                                                fontWeight: FontWeight.w600,
                                                color: Colors.white,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                  ElevatedButton.icon(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: AppColors.secondary,
                                      foregroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                                      minimumSize: const Size(0, 42),
                                    ),
                                    onPressed: () {
                                      Navigator.of(context).push(
                                        MaterialPageRoute(builder: (_) => const ScannerScreen()),
                                      ).then((_) => _loadDashboard());
                                    },
                                    icon: const Icon(Icons.qr_code_scanner, size: 18),
                                    label: const Text('SCAN SEKARANG'),
                                  ),
                                ],
                              ),
                            ),

                            const SizedBox(height: 18),

                            // Attendance Summary Metrics
                            Text('RINGKASAN KEHADIRAN HARI INI', style: AppTypography.labelSm(color: AppColors.textSecondary)),
                            const SizedBox(height: 10),

                            LayoutBuilder(
                              builder: (context, constraints) {
                                return GridView.count(
                                  shrinkWrap: true,
                                  physics: const NeverScrollableScrollPhysics(),
                                  crossAxisCount: constraints.maxWidth > 600 ? 5 : 2,
                                  crossAxisSpacing: 10,
                                  mainAxisSpacing: 10,
                                  childAspectRatio: constraints.maxWidth > 600 ? 1.6 : 1.5,
                                  children: [
                                    StatCard(
                                      title: 'Total Siswa',
                                      value: '${_data?.totalSiswa ?? 0}',
                                      icon: Icons.groups,
                                      accentColor: AppColors.primaryLight,
                                    ),
                                    StatCard(
                                      title: 'Hadir',
                                      value: '${_data?.hadir ?? 0}',
                                      icon: Icons.check_circle_outline,
                                      accentColor: AppColors.success,
                                      subtitle: 'Tepat waktu',
                                    ),
                                    StatCard(
                                      title: 'Terlambat',
                                      value: '${_data?.terlambat ?? 0}',
                                      icon: Icons.alarm,
                                      accentColor: AppColors.warning,
                                      subtitle: 'Lewat 07:15',
                                    ),
                                    StatCard(
                                      title: 'Izin / Sakit',
                                      value: '${_data?.izinSakit ?? 0}',
                                      icon: Icons.medical_services_outlined,
                                      accentColor: AppColors.primaryContainer,
                                      subtitle: '${_data?.izin ?? 0} Izin / ${_data?.sakit ?? 0} Sakit',
                                    ),
                                    StatCard(
                                      title: 'Belum Absen',
                                      value: '${_data?.belumAbsen ?? 0}',
                                      icon: Icons.hourglass_empty,
                                      accentColor: AppColors.critical,
                                      subtitle: 'Menunggu scan',
                                    ),
                                  ],
                                );
                              },
                            ),

                            const SizedBox(height: 14),

                            // Percentage Bar
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
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text('Tingkat Kehadiran', style: AppTypography.labelMd()),
                                      Text(
                                        '${_data?.persentaseKehadiran ?? 0}%',
                                        style: AppTypography.tabularNumber(
                                          fontSize: 16,
                                          fontWeight: FontWeight.w700,
                                          color: AppColors.secondary,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  LinearProgressIndicator(
                                    value: (_data?.persentaseKehadiran ?? 0) / 100.0,
                                    backgroundColor: AppColors.surfaceContainerHigh,
                                    color: AppColors.secondary,
                                    minHeight: 8,
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                ],
                              ),
                            ),

                            const SizedBox(height: 20),

                            // Quick Action Tools
                            Text('AKSI CEPAT', style: AppTypography.labelSm(color: AppColors.textSecondary)),
                            const SizedBox(height: 10),
                            Row(
                              children: [
                                Expanded(
                                  child: OutlinedButton.icon(
                                    style: OutlinedButton.styleFrom(
                                      backgroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(vertical: 12),
                                    ),
                                    onPressed: () {
                                      Navigator.of(context).push(
                                        MaterialPageRoute(builder: (_) => const ManualAbsensiScreen()),
                                      ).then((_) => _loadDashboard());
                                    },
                                    icon: const Icon(Icons.edit_note, size: 18, color: AppColors.primaryContainer),
                                    label: const Text('Input Manual', style: TextStyle(fontSize: 13)),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: OutlinedButton.icon(
                                    style: OutlinedButton.styleFrom(
                                      backgroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(vertical: 12),
                                    ),
                                    onPressed: () {
                                      Navigator.of(context).push(
                                        MaterialPageRoute(builder: (_) => const RekapScreen()),
                                      );
                                    },
                                    icon: const Icon(Icons.table_chart_outlined, size: 18, color: AppColors.primaryContainer),
                                    label: const Text('Rekap Laporan', style: TextStyle(fontSize: 13)),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: OutlinedButton.icon(
                                    style: OutlinedButton.styleFrom(
                                      backgroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(vertical: 12),
                                    ),
                                    onPressed: () {
                                      Navigator.of(context).push(
                                        MaterialPageRoute(builder: (_) => const IdCardPrintScreen()),
                                      );
                                    },
                                    icon: const Icon(Icons.badge_outlined, size: 18, color: AppColors.primaryContainer),
                                    label: const Text('Kartu QR', style: TextStyle(fontSize: 13)),
                                  ),
                                ),
                              ],
                            ),

                            const SizedBox(height: 24),

                            // Live Scan Feed
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    Text('LIVE SCAN FEED', style: AppTypography.labelSm(color: AppColors.textSecondary)),
                                    const SizedBox(width: 6),
                                    Container(
                                      width: 8,
                                      height: 8,
                                      decoration: const BoxDecoration(
                                        color: AppColors.success,
                                        shape: BoxShape.circle,
                                      ),
                                    ),
                                  ],
                                ),
                                Text(
                                  'Terakhir Diperbarui: ${_data?.serverTime ?? "-"}',
                                  style: AppTypography.tabularNumber(
                                    fontSize: 11,
                                    color: AppColors.textSecondary,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 10),

                            if (_data == null || _data!.recentScans.isEmpty) ...[
                              Container(
                                padding: const EdgeInsets.all(24),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: AppColors.borderSubtle),
                                ),
                                child: Center(
                                  child: Column(
                                    children: [
                                      const Icon(Icons.qr_code_2, size: 40, color: AppColors.outline),
                                      const SizedBox(height: 8),
                                      Text(
                                        'Belum ada aktivitas scan hari ini',
                                        style: AppTypography.bodyMd(color: AppColors.textSecondary),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ] else ...[
                              ListView.separated(
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                itemCount: _data!.recentScans.length,
                                separatorBuilder: (_, __) => const SizedBox(height: 8),
                                itemBuilder: (context, index) {
                                  final item = _data!.recentScans[index];
                                  return ScanFeedItem(absensi: item);
                                },
                              ),
                            ],
                          ],
                        ),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
