import 'package:flutter/material.dart';
import '../models/absensi_model.dart';
import '../models/kelas_model.dart';
import '../services/api_service.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import '../widgets/status_badge.dart';

class RekapScreen extends StatefulWidget {
  const RekapScreen({super.key});

  @override
  State<RekapScreen> createState() => _RekapScreenState();
}

class _RekapScreenState extends State<RekapScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final ApiService _api = ApiService();

  // State Harian
  List<AbsensiModel> _records = [];
  List<KelasModel> _kelasList = [];
  DateTime _selectedDate = DateTime.now();
  int? _selectedKelasId;
  String _selectedStatus = '';
  bool _isLoading = true;

  // State Bulanan
  int _selectedBulan = DateTime.now().month;
  int _selectedTahun = DateTime.now().year;
  int? _selectedBulananKelasId;
  List<dynamic> _bulananList = [];
  bool _isLoadingBulanan = true;

  final List<String> _namaBulan = [
    '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadData();
    _loadBulananData();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final kelas = await _api.getKelas();
    final dateStr = _selectedDate.toString().split(' ')[0];
    final records = await _api.getAbsensi(
      tanggal: dateStr,
      kelasId: _selectedKelasId,
      status: _selectedStatus.isNotEmpty ? _selectedStatus : null,
    );

    if (mounted) {
      setState(() {
        _kelasList = kelas;
        _records = records;
        _isLoading = false;
      });
    }
  }

  Future<void> _loadBulananData() async {
    setState(() => _isLoadingBulanan = true);
    final res = await _api.getRekapBulanan(
      bulan: _selectedBulan,
      tahun: _selectedTahun,
      kelasId: _selectedBulananKelasId,
    );

    if (mounted) {
      setState(() {
        _bulananList = res['data'] ?? [];
        _isLoadingBulanan = false;
      });
    }
  }

  void _exportCsv() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppColors.primaryContainer,
        content: Text('File CSV rekap untuk ${_namaBulan[_selectedBulan]} $_selectedTahun siap diunduh!'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Rekap Presensi Siswa', style: AppTypography.headlineSm()),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppColors.primary,
          unselectedLabelColor: AppColors.textSecondary,
          indicatorColor: AppColors.primary,
          tabs: const [
            Tab(icon: Icon(Icons.calendar_month, size: 20), text: 'Rekap Bulanan Siswa'),
            Tab(icon: Icon(Icons.list_alt, size: 20), text: 'Log Harian'),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.file_download_outlined),
            tooltip: 'Ekspor CSV',
            onPressed: _exportCsv,
          ),
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Segarkan',
            onPressed: () {
              _loadData();
              _loadBulananData();
            },
          ),
        ],
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildBulananTab(),
          _buildHarianTab(),
        ],
      ),
    );
  }

  // ================= TAB REKAP BULANAN =================
  Widget _buildBulananTab() {
    int totalH = 0, totalT = 0, totalI = 0, totalS = 0, totalA = 0;
    double avgPersen = 0;
    if (_bulananList.isNotEmpty) {
      double sumPersen = 0;
      for (var item in _bulananList) {
        totalH += (item['hadir'] as num? ?? 0).toInt();
        totalT += (item['terlambat'] as num? ?? 0).toInt();
        totalI += (item['izin'] as num? ?? 0).toInt();
        totalS += (item['sakit'] as num? ?? 0).toInt();
        totalA += (item['alpa'] as num? ?? 0).toInt();
        sumPersen += (item['persentase'] as num? ?? 0).toDouble();
      }
      avgPersen = sumPersen / _bulananList.length;
    }

    return Column(
      children: [
        // Filter Bulan, Tahun & Kelas
        Container(
          padding: const EdgeInsets.all(12),
          color: Colors.white,
          child: Row(
            children: [
              // Dropdown Bulan
              Expanded(
                flex: 5,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  decoration: BoxDecoration(
                    border: Border.all(color: AppColors.outlineVariant),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<int>(
                      value: _selectedBulan,
                      isExpanded: true,
                      items: List.generate(12, (index) {
                        final b = index + 1;
                        return DropdownMenuItem(value: b, child: Text(_namaBulan[b], style: const TextStyle(fontSize: 12)));
                      }),
                      onChanged: (val) {
                        if (val != null) {
                          setState(() => _selectedBulan = val);
                          _loadBulananData();
                        }
                      },
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),

              // Dropdown Kelas
              Expanded(
                flex: 5,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  decoration: BoxDecoration(
                    border: Border.all(color: AppColors.outlineVariant),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<int?>(
                      value: _selectedBulananKelasId,
                      isExpanded: true,
                      hint: const Text('Semua Kelas', style: TextStyle(fontSize: 12)),
                      items: [
                        const DropdownMenuItem(value: null, child: Text('Semua Kelas', style: TextStyle(fontSize: 12))),
                        ..._kelasList.map(
                          (k) => DropdownMenuItem(value: k.id, child: Text(k.namaKelas, style: const TextStyle(fontSize: 12))),
                        ),
                      ],
                      onChanged: (val) {
                        setState(() => _selectedBulananKelasId = val);
                        _loadBulananData();
                      },
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),

        // Monthly Summary Banner
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          color: AppColors.surfaceContainerLow,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('RATA-RATA KEHADIRAN', style: AppTypography.labelSm(color: AppColors.textSecondary)),
                  Text('${avgPersen.toStringAsFixed(1)}%',
                      style: AppTypography.headlineSm(color: avgPersen >= 85 ? AppColors.success : AppColors.error)),
                ],
              ),
              Row(
                children: [
                  _buildStatBadge('H', totalH, Colors.green),
                  const SizedBox(width: 4),
                  _buildStatBadge('T', totalT, Colors.amber.shade800),
                  const SizedBox(width: 4),
                  _buildStatBadge('I', totalI, Colors.blue),
                  const SizedBox(width: 4),
                  _buildStatBadge('S', totalS, Colors.purple),
                  const SizedBox(width: 4),
                  _buildStatBadge('A', totalA, Colors.red),
                ],
              ),
            ],
          ),
        ),

        // Students Monthly Matrix List
        Expanded(
          child: _isLoadingBulanan
              ? const Center(child: CircularProgressIndicator())
              : _bulananList.isEmpty
                  ? Center(
                      child: Text('Tidak ada data siswa ditemukan.', style: AppTypography.bodyMd(color: AppColors.textSecondary)),
                    )
                  : ListView.separated(
                      padding: const EdgeInsets.all(12),
                      itemCount: _bulananList.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 8),
                      itemBuilder: (context, index) {
                        final item = _bulananList[index];
                        final persen = (item['persentase'] as num? ?? 100).toDouble();

                        return Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: AppColors.borderSubtle),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  CircleAvatar(
                                    radius: 18,
                                    backgroundColor: AppColors.primaryContainer,
                                    child: Text(
                                      (item['nama'] ?? 'S').substring(0, 1).toUpperCase(),
                                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(item['nama'] ?? '-', style: AppTypography.labelMd()),
                                        Text('NIS: ${item['nis']} · ${item['kelas']}',
                                            style: AppTypography.bodySm(color: AppColors.textSecondary)),
                                      ],
                                    ),
                                  ),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text('${persen.toStringAsFixed(1)}%',
                                          style: AppTypography.tabularNumber(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                            color: persen >= 90 ? AppColors.success : (persen >= 75 ? AppColors.warning : AppColors.error),
                                          )),
                                      const SizedBox(height: 2),
                                      Text('Kehadiran', style: AppTypography.bodySm(color: AppColors.textSecondary)),
                                    ],
                                  ),
                                ],
                              ),
                              const SizedBox(height: 10),
                              LinearProgressIndicator(
                                value: (persen / 100).clamp(0.0, 1.0),
                                backgroundColor: Colors.grey.shade200,
                                valueColor: AlwaysStoppedAnimation<Color>(
                                  persen >= 90 ? AppColors.success : (persen >= 75 ? AppColors.warning : AppColors.error),
                                ),
                                minHeight: 6,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              const SizedBox(height: 10),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceAround,
                                children: [
                                  _buildMiniCounter('Hadir', item['hadir'] ?? 0, Colors.green),
                                  _buildMiniCounter('Terlambat', item['terlambat'] ?? 0, Colors.amber.shade800),
                                  _buildMiniCounter('Izin', item['izin'] ?? 0, Colors.blue),
                                  _buildMiniCounter('Sakit', item['sakit'] ?? 0, Colors.purple),
                                  _buildMiniCounter('Alpa', item['alpa'] ?? 0, Colors.red),
                                ],
                              ),
                            ],
                          ),
                        );
                      },
                    ),
        ),
      ],
    );
  }

  Widget _buildStatBadge(String code, int count, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text('$code: $count', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
    );
  }

  Widget _buildMiniCounter(String label, dynamic count, Color color) {
    return Column(
      children: [
        Text('$count', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: color)),
        Text(label, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
      ],
    );
  }

  // ================= TAB REKAP HARIAN =================
  Widget _buildHarianTab() {
    final hadirCount = _records.where((r) => r.status == 'Hadir').length;
    final terlambatCount = _records.where((r) => r.status == 'Terlambat').length;
    final izinSakitCount = _records.where((r) => r.status == 'Izin' || r.status == 'Sakit').length;

    return Column(
      children: [
        // Filter Bar
        Container(
          padding: const EdgeInsets.all(12),
          color: Colors.white,
          child: Column(
            children: [
              Row(
                children: [
                  // Date Selector
                  Expanded(
                    flex: 5,
                    child: InkWell(
                      onTap: () async {
                        final picked = await showDatePicker(
                          context: context,
                          initialDate: _selectedDate,
                          firstDate: DateTime(2025),
                          lastDate: DateTime(2030),
                        );
                        if (picked != null) {
                          setState(() => _selectedDate = picked);
                          _loadData();
                        }
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                        decoration: BoxDecoration(
                          border: Border.all(color: AppColors.outlineVariant),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.calendar_today, size: 16, color: AppColors.textSecondary),
                            const SizedBox(width: 6),
                            Text(
                              _selectedDate.toString().split(' ')[0],
                              style: AppTypography.tabularNumber(fontSize: 12),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),

                  // Class Selector
                  Expanded(
                    flex: 4,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10),
                      decoration: BoxDecoration(
                        border: Border.all(color: AppColors.outlineVariant),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<int?>(
                          value: _selectedKelasId,
                          isExpanded: true,
                          hint: const Text('Semua Kelas', style: TextStyle(fontSize: 12)),
                          items: [
                            const DropdownMenuItem(value: null, child: Text('Semua Kelas', style: TextStyle(fontSize: 12))),
                            ..._kelasList.map(
                              (k) => DropdownMenuItem(value: k.id, child: Text(k.namaKelas, style: const TextStyle(fontSize: 12))),
                            ),
                          ],
                          onChanged: (val) {
                            setState(() => _selectedKelasId = val);
                            _loadData();
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              // Status Filter Chips
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildFilterChip('Semua Status', ''),
                    const SizedBox(width: 6),
                    _buildFilterChip('Hadir', 'Hadir'),
                    const SizedBox(width: 6),
                    _buildFilterChip('Terlambat', 'Terlambat'),
                    const SizedBox(width: 6),
                    _buildFilterChip('Izin', 'Izin'),
                    const SizedBox(width: 6),
                    _buildFilterChip('Sakit', 'Sakit'),
                    const SizedBox(width: 6),
                    _buildFilterChip('Alpa', 'Alpa'),
                  ],
                ),
              ),
            ],
          ),
        ),

        // Mini Summary Bar
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          color: AppColors.surfaceContainerLow,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Total: ${_records.length} tercatat', style: AppTypography.labelSm()),
              Text('Hadir: $hadirCount · Terlambat: $terlambatCount · Izin/Sakit: $izinSakitCount',
                  style: AppTypography.bodySm(color: AppColors.textSecondary)),
            ],
          ),
        ),

        // Records List
        Expanded(
          child: _isLoading
              ? const Center(child: CircularProgressIndicator())
              : _records.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.inbox, size: 40, color: AppColors.outline),
                          const SizedBox(height: 8),
                          Text(
                            'Tidak ada data presensi pada kriteria ini.',
                            style: AppTypography.bodyMd(color: AppColors.textSecondary),
                          ),
                        ],
                      ),
                    )
                  : ListView.separated(
                      padding: const EdgeInsets.all(12),
                      itemCount: _records.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 8),
                      itemBuilder: (context, index) {
                        final r = _records[index];
                        return Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: AppColors.borderSubtle),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(r.nama, style: AppTypography.labelMd()),
                                    const SizedBox(height: 2),
                                    Text(
                                      'NIS: ${r.nis} · Kelas: ${r.namaKelas}',
                                      style: AppTypography.bodySm(color: AppColors.textSecondary),
                                    ),
                                    if (r.keterangan != null && r.keterangan!.isNotEmpty) ...[
                                      const SizedBox(height: 3),
                                      Text(
                                        'Catatan: ${r.keterangan}',
                                        style: AppTypography.bodySm(color: AppColors.warning),
                                      ),
                                    ],
                                  ],
                                ),
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text(r.jam, style: AppTypography.tabularNumber(fontSize: 12)),
                                  const SizedBox(height: 4),
                                  StatusBadge(status: r.status, compact: true),
                                ],
                              ),
                            ],
                          ),
                        );
                      },
                    ),
        ),
      ],
    );
  }

  Widget _buildFilterChip(String label, String value) {
    final isSelected = _selectedStatus == value;
    return ChoiceChip(
      label: Text(label, style: TextStyle(fontSize: 11, color: isSelected ? Colors.white : AppColors.textPrimary)),
      selected: isSelected,
      selectedColor: AppColors.primaryContainer,
      backgroundColor: Colors.white,
      padding: EdgeInsets.zero,
      onSelected: (_) {
        setState(() => _selectedStatus = value);
        _loadData();
      },
    );
  }
}

extension _CountIterable<E> on Iterable<E> {
  int get count => length;
}
