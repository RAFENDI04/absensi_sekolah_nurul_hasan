import 'package:flutter/material.dart';
import '../models/kelas_model.dart';
import '../models/siswa_model.dart';
import '../services/api_service.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import '../widgets/status_badge.dart';

class ManualAbsensiScreen extends StatefulWidget {
  const ManualAbsensiScreen({super.key});

  @override
  State<ManualAbsensiScreen> createState() => _ManualAbsensiScreenState();
}

class _ManualAbsensiScreenState extends State<ManualAbsensiScreen> {
  final ApiService _api = ApiService();

  List<KelasModel> _kelasList = [];
  List<SiswaModel> _siswaList = [];
  int? _selectedKelasId;
  SiswaModel? _selectedSiswa;
  String _selectedStatus = 'Izin';
  final _keteranganController = TextEditingController();
  DateTime _selectedDate = DateTime.now();

  bool _isLoading = true;
  bool _isSubmitting = false;

  @override
  void initState() {
    super.initState();
    _loadInitialData();
  }

  Future<void> _loadInitialData() async {
    setState(() => _isLoading = true);
    final kelas = await _api.getKelas();
    final siswa = await _api.getSiswa();

    if (mounted) {
      setState(() {
        _kelasList = kelas;
        _siswaList = siswa;
        if (siswa.isNotEmpty) _selectedSiswa = siswa.first;
        _isLoading = false;
      });
    }
  }

  Future<void> _onKelasChanged(int? kelasId) async {
    setState(() {
      _selectedKelasId = kelasId;
      _isLoading = true;
    });

    final siswa = await _api.getSiswa(kelasId: kelasId);
    if (mounted) {
      setState(() {
        _siswaList = siswa;
        _selectedSiswa = siswa.isNotEmpty ? siswa.first : null;
        _isLoading = false;
      });
    }
  }

  Future<void> _submitManual() async {
    if (_selectedSiswa == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Pilih siswa terlebih dahulu.')),
      );
      return;
    }

    setState(() => _isSubmitting = true);

    final dateStr = _selectedDate.toString().split(' ')[0];
    final res = await _api.submitManualAbsensi(
      siswaId: _selectedSiswa!.id,
      tanggal: dateStr,
      status: _selectedStatus,
      keterangan: _keteranganController.text.trim(),
    );

    if (!mounted) return;

    setState(() => _isSubmitting = false);

    if (res['ok'] == true) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: AppColors.secondary,
          content: Text('Presensi ${_selectedSiswa!.nama} berhasil dicatat sebagai $_selectedStatus.'),
        ),
      );
      Navigator.of(context).pop();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: AppColors.error,
          content: Text(res['message'] ?? 'Gagal menyimpan presensi manual.'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Input Absensi Manual', style: AppTypography.headlineSm()),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 500),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Informasi Panduan
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.surfaceContainerLow,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.borderSubtle),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.info_outline, color: AppColors.primaryContainer, size: 20),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              'Gunakan formulir ini untuk mencatat keterangan Izin, Sakit, atau mengoreksi data presensi siswa.',
                              style: AppTypography.bodySm(),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Filter Kelas
                    Text('Filter Berdasarkan Kelas', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<int?>(
                      value: _selectedKelasId,
                      decoration: const InputDecoration(
                        contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      ),
                      items: [
                        const DropdownMenuItem(value: null, child: Text('Semua Kelas')),
                        ..._kelasList.map(
                          (k) => DropdownMenuItem(value: k.id, child: Text(k.namaKelas)),
                        ),
                      ],
                      onChanged: _onKelasChanged,
                    ),

                    const SizedBox(height: 16),

                    // Pilih Siswa
                    Text('Pilih Siswa', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<SiswaModel>(
                      value: _selectedSiswa,
                      isExpanded: true,
                      decoration: const InputDecoration(
                        contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      ),
                      items: _siswaList.map((s) {
                        return DropdownMenuItem(
                          value: s,
                          child: Text('${s.nama} (${s.nis} - ${s.namaKelas ?? ""})'),
                        );
                      }).toList(),
                      onChanged: (val) {
                        setState(() => _selectedSiswa = val);
                      },
                    ),

                    const SizedBox(height: 16),

                    // Tanggal
                    Text('Tanggal Presensi', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    InkWell(
                      onTap: () async {
                        final picked = await showDatePicker(
                          context: context,
                          initialDate: _selectedDate,
                          firstDate: DateTime(2025),
                          lastDate: DateTime(2030),
                        );
                        if (picked != null) {
                          setState(() => _selectedDate = picked);
                        }
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: AppColors.outlineVariant),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.calendar_today, size: 18, color: AppColors.textSecondary),
                            const SizedBox(width: 10),
                            Text(
                              _selectedDate.toString().split(' ')[0],
                              style: AppTypography.tabularNumber(),
                            ),
                            const Spacer(),
                            const Icon(Icons.arrow_drop_down, color: AppColors.textSecondary),
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: 16),

                    // Pilih Status
                    Text('Status Kehadiran', style: AppTypography.labelMd()),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      children: ['Izin', 'Sakit', 'Alpa', 'Hadir', 'Terlambat'].map((st) {
                        final isSelected = _selectedStatus == st;
                        return ChoiceChip(
                          label: Text(st),
                          selected: isSelected,
                          selectedColor: AppColors.primaryContainer,
                          labelStyle: TextStyle(
                            color: isSelected ? Colors.white : AppColors.textPrimary,
                            fontWeight: FontWeight.w600,
                          ),
                          onSelected: (selected) {
                            if (selected) setState(() => _selectedStatus = st);
                          },
                        );
                      }).toList(),
                    ),

                    const SizedBox(height: 16),

                    // Keterangan / Catatan
                    Text('Keterangan / Alasan (Opsional)', style: AppTypography.labelMd()),
                    const SizedBox(height: 6),
                    TextField(
                      controller: _keteranganController,
                      maxLines: 2,
                      decoration: const InputDecoration(
                        hintText: 'Contoh: Surat dokter terlampir / Acara keluarga',
                      ),
                    ),

                    const SizedBox(height: 28),

                    // Tombol Simpan
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        minimumSize: const Size(double.infinity, 48),
                      ),
                      onPressed: _isSubmitting ? null : _submitManual,
                      child: _isSubmitting
                          ? const SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                            )
                          : const Text('SIMPAN PRESENSI MANUAL'),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
