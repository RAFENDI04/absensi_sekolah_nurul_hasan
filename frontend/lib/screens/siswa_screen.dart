import 'package:flutter/material.dart';
import '../models/kelas_model.dart';
import '../models/siswa_model.dart';
import '../services/api_service.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import '../widgets/student_id_card_widget.dart';
import 'id_card_print_screen.dart';

class SiswaScreen extends StatefulWidget {
  const SiswaScreen({super.key});

  @override
  State<SiswaScreen> createState() => _SiswaScreenState();
}

class _SiswaScreenState extends State<SiswaScreen> {
  final ApiService _api = ApiService();
  final _searchController = TextEditingController();

  List<SiswaModel> _siswaList = [];
  List<KelasModel> _kelasList = [];
  int? _selectedKelasId;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final kelas = await _api.getKelas();
    final siswa = await _api.getSiswa(
      query: _searchController.text.trim(),
      kelasId: _selectedKelasId,
    );

    if (mounted) {
      setState(() {
        _kelasList = kelas;
        _siswaList = siswa;
        _isLoading = false;
      });
    }
  }

  void _showStudentDetail(SiswaModel s) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('KARTU IDENTITAS SISWA', style: AppTypography.labelSm(color: AppColors.textSecondary)),
                  IconButton(
                    icon: const Icon(Icons.close, size: 20),
                    onPressed: () => Navigator.of(ctx).pop(),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              // Preview Kartu Pelajar dengan QR Code
              StudentIdCardWidget(siswa: s),

              const SizedBox(height: 20),

              // Tombol Reset / Terbitkan Ulang QR Code
              OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.warning,
                  side: const BorderSide(color: AppColors.warning),
                ),
                onPressed: () async {
                  final confirm = await showDialog<bool>(
                    context: ctx,
                    builder: (dCtx) => AlertDialog(
                      title: const Text('Terbitkan Ulang QR Code?'),
                      content: const Text(
                        'Token lama akan langsung hangus dan kartu lama tidak bisa dipakai absen lagi. Lanjutkan?',
                      ),
                      actions: [
                        TextButton(onPressed: () => Navigator.of(dCtx).pop(false), child: const Text('Batal')),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(backgroundColor: AppColors.warning),
                          onPressed: () => Navigator.of(dCtx).pop(true),
                          child: const Text('Terbitkan Ulang'),
                        ),
                      ],
                    ),
                  );

                  if (confirm == true) {
                    Navigator.of(ctx).pop();
                    await _api.regenerateQr(s.id);
                    _loadData();
                    if (mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('QR Code baru berhasil dibuat!')),
                      );
                    }
                  }
                },
                icon: const Icon(Icons.refresh, size: 18),
                label: const Text('Terbitkan Ulang Token QR (Kartu Hilang)'),
              ),
            ],
          ),
        );
      },
    );
  }

  void _showAddStudentDialog() {
    final nisCtrl = TextEditingController();
    final namaCtrl = TextEditingController();
    String gender = 'L';
    int? kId = _kelasList.isNotEmpty ? _kelasList.first.id : null;

    showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setDialogState) {
            return AlertDialog(
              title: Text('Tambah Data Siswa', style: AppTypography.headlineSm()),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Nomor Induk Siswa (NIS)', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    TextField(
                      controller: nisCtrl,
                      decoration: const InputDecoration(hintText: 'Contoh: 10055'),
                    ),
                    const SizedBox(height: 14),

                    Text('Nama Lengkap Siswa', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    TextField(
                      controller: namaCtrl,
                      decoration: const InputDecoration(hintText: 'Nama lengkap'),
                    ),
                    const SizedBox(height: 14),

                    Text('Kelas', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<int>(
                      value: kId,
                      items: _kelasList.map((k) => DropdownMenuItem(value: k.id, child: Text(k.namaKelas))).toList(),
                      onChanged: (val) => setDialogState(() => kId = val),
                    ),
                    const SizedBox(height: 14),

                    Text('Jenis Kelamin', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        Expanded(
                          child: RadioListTile<String>(
                            title: const Text('Laki-laki', style: TextStyle(fontSize: 13)),
                            value: 'L',
                            groupValue: gender,
                            contentPadding: EdgeInsets.zero,
                            onChanged: (val) => setDialogState(() => gender = val!),
                          ),
                        ),
                        Expanded(
                          child: RadioListTile<String>(
                            title: const Text('Perempuan', style: TextStyle(fontSize: 13)),
                            value: 'P',
                            groupValue: gender,
                            contentPadding: EdgeInsets.zero,
                            onChanged: (val) => setDialogState(() => gender = val!),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(onPressed: () => Navigator.of(ctx).pop(), child: const Text('Batal')),
                ElevatedButton(
                  onPressed: () async {
                    if (nisCtrl.text.isEmpty || namaCtrl.text.isEmpty || kId == null) {
                      return;
                    }
                    Navigator.of(ctx).pop();
                    await _api.addSiswa(
                      nis: nisCtrl.text.trim(),
                      nama: namaCtrl.text.trim(),
                      jenisKelamin: gender,
                      kelasId: kId!,
                    );
                    _loadData();
                  },
                  child: const Text('Simpan Siswa'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Data Siswa & Kartu QR', style: AppTypography.headlineSm()),
        actions: [
          IconButton(
            icon: const Icon(Icons.print_outlined),
            tooltip: 'Cetak Massal Kartu',
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const IdCardPrintScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.person_add_alt_1),
            tooltip: 'Tambah Siswa',
            onPressed: _showAddStudentDialog,
          ),
        ],
      ),
      body: Column(
        children: [
          // Filter & Search Header
          Container(
            padding: const EdgeInsets.all(12),
            color: Colors.white,
            child: Row(
              children: [
                // Search Field
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      hintText: 'Cari nama atau NIS...',
                      prefixIcon: const Icon(Icons.search, size: 20),
                      suffixIcon: _searchController.text.isNotEmpty
                          ? IconButton(
                              icon: const Icon(Icons.clear, size: 18),
                              onPressed: () {
                                _searchController.clear();
                                _loadData();
                              },
                            )
                          : null,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    ),
                    onSubmitted: (_) => _loadData(),
                  ),
                ),
                const SizedBox(width: 8),

                // Class Filter Dropdown
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppColors.outlineVariant),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<int?>(
                      value: _selectedKelasId,
                      hint: const Text('Semua Kelas', style: TextStyle(fontSize: 13)),
                      items: [
                        const DropdownMenuItem(value: null, child: Text('Semua Kelas')),
                        ..._kelasList.map(
                          (k) => DropdownMenuItem(value: k.id, child: Text(k.namaKelas)),
                        ),
                      ],
                      onChanged: (val) {
                        setState(() => _selectedKelasId = val);
                        _loadData();
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: AppColors.borderSubtle),

          // Student List
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _siswaList.isEmpty
                    ? Center(
                        child: Text(
                          'Tidak ada data siswa ditemukan.',
                          style: AppTypography.bodyMd(color: AppColors.textSecondary),
                        ),
                      )
                    : ListView.separated(
                        padding: const EdgeInsets.all(12),
                        itemCount: _siswaList.length,
                        separatorBuilder: (_, __) => const SizedBox(height: 8),
                        itemBuilder: (context, index) {
                          final s = _siswaList[index];
                          return Container(
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: AppColors.borderSubtle),
                            ),
                            child: ListTile(
                              contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                              leading: CircleAvatar(
                                backgroundColor: AppColors.surfaceContainerHigh,
                                child: Text(
                                  s.nama.isNotEmpty ? s.nama[0] : 'S',
                                  style: AppTypography.labelMd(color: AppColors.primaryContainer),
                                ),
                              ),
                              title: Text(s.nama, style: AppTypography.labelMd()),
                              subtitle: Row(
                                children: [
                                  Text('NIS: ${s.nis}', style: AppTypography.tabularNumber(fontSize: 12)),
                                  const SizedBox(width: 8),d
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                                    decoration: BoxDecoration(
                                      color: AppColors.surfaceContainerLow,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      s.namaKelas ?? '-',
                                      style: AppTypography.labelSm(color: AppColors.textSecondary),
                                    ),
                                  ),
                                ],
                              ),
                              trailing: IconButton(
                                icon: const Icon(Icons.qr_code, color: AppColors.primaryContainer),
                                tooltip: 'Lihat Kartu QR',
                                onPressed: () => _showStudentDetail(s),
                              ),
                              onTap: () => _showStudentDetail(s),
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}
