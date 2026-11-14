import 'package:flutter/material.dart';
import '../models/kelas_model.dart';
import '../models/siswa_model.dart';
import '../services/api_service.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import '../widgets/student_id_card_widget.dart';

class IdCardPrintScreen extends StatefulWidget {
  const IdCardPrintScreen({super.key});

  @override
  State<IdCardPrintScreen> createState() => _IdCardPrintScreenState();
}

class _IdCardPrintScreenState extends State<IdCardPrintScreen> {
  final ApiService _api = ApiService();

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
    final siswa = await _api.getSiswa(kelasId: _selectedKelasId);

    if (mounted) {
      setState(() {
        _kelasList = kelas;
        _siswaList = siswa;
        _isLoading = false;
      });
    }
  }

  void _triggerPrint() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: AppColors.secondary,
        content: Text('Menyiapkan tata letak cetak ID Card (Ukuran 85.6 x 54 mm)...'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Cetak Kartu QR Pelajar', style: AppTypography.headlineSm()),
        actions: [
          IconButton(
            icon: const Icon(Icons.print),
            tooltip: 'Cetak Lembar Kartu',
            onPressed: _triggerPrint,
          ),
        ],
      ),
      body: Column(
        children: [
          // Filter Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: Colors.white,
            child: Row(
              children: [
                Text('Pilih Kelas:', style: AppTypography.labelMd()),
                const SizedBox(width: 12),
                Expanded(
                  child: DropdownButtonFormField<int?>(
                    value: _selectedKelasId,
                    decoration: const InputDecoration(
                      contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    ),
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
              ],
            ),
          ),
          const Divider(height: 1, color: AppColors.borderSubtle),

          // Cards Grid View
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _siswaList.isEmpty
                    ? Center(
                        child: Text('Tidak ada data kartu siswa.', style: AppTypography.bodyMd()),
                      )
                    : LayoutBuilder(
                        builder: (context, constraints) {
                          final crossAxisCount = constraints.maxWidth > 700 ? 2 : 1;
                          return GridView.builder(
                            padding: const EdgeInsets.all(16),
                            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: crossAxisCount,
                              crossAxisSpacing: 16,
                              mainAxisSpacing: 16,
                              childAspectRatio: 85.6 / 54.0,
                            ),
                            itemCount: _siswaList.length,
                            itemBuilder: (context, index) {
                              final s = _siswaList[index];
                              return StudentIdCardWidget(siswa: s);
                            },
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}
