import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../models/siswa_model.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

class StudentIdCardWidget extends StatelessWidget {
  final SiswaModel siswa;
  final String namaSekolah;

  const StudentIdCardWidget({
    super.key,
    required this.siswa,
    this.namaSekolah = 'SMA NURUL HASAN SABUNTAN',
  });

  @override
  Widget build(BuildContext context) {
    // Rasio standar Kartu Pelajar (ID Card: 85.6mm x 54mm = rasio ~ 1.585)
    return AspectRatio(
      aspectRatio: 85.6 / 54.0,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.borderSubtle, width: 1.5),
          boxShadow: const [
            BoxShadow(
              color: Color.fromRGBO(15, 23, 42, 0.08),
              blurRadius: 8,
              offset: Offset(0, 2),
            ),
          ],
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          children: [
            // Header Kartu
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              color: AppColors.primaryContainer,
              child: Row(
                children: [
                  Container(
                    width: 24,
                    height: 24,
                    padding: const EdgeInsets.all(1.5),
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                    child: ClipOval(
                      child: Image.asset(
                        'assets/images/logo.jpg',
                        fit: BoxFit.contain,
                        errorBuilder: (context, error, stackTrace) => const Icon(
                          Icons.school,
                          size: 14,
                          color: AppColors.primaryContainer,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          namaSekolah.toUpperCase(),
                          style: AppTypography.labelSm(color: Colors.white).copyWith(
                            fontSize: 9.5,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 0.5,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        Text(
                          'KARTU IDENTITAS PRESENSI SISWA',
                          style: AppTypography.labelSm(color: AppColors.onPrimaryContainer).copyWith(
                            fontSize: 7.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Card Body (QR Code & Student Data)
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                child: Row(
                  children: [
                    // High-Density QR Code
                    Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.outlineVariant, width: 1),
                      ),
                      child: QrImageView(
                        data: siswa.qrCode,
                        version: QrVersions.auto,
                        size: 80,
                        backgroundColor: Colors.white,
                        eyeStyle: const QrEyeStyle(
                          eyeShape: QrEyeShape.square,
                          color: AppColors.primaryContainer,
                        ),
                        dataModuleStyle: const QrDataModuleStyle(
                          dataModuleShape: QrDataModuleShape.square,
                          color: AppColors.textPrimary,
                        ),
                      ),
                    ),

                    const SizedBox(width: 14),

                    // Student Information
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            siswa.nama,
                            style: AppTypography.labelLg(color: AppColors.onSurface).copyWith(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 6),
                          _buildDataRow('NIS', siswa.nis, isMonospace: true),
                          const SizedBox(height: 3),
                          _buildDataRow('Kelas', siswa.namaKelas ?? '-'),
                          const SizedBox(height: 3),
                          _buildDataRow('Gender', siswa.jenisKelaminDisplay),
                          const Spacer(),
                          Text(
                            siswa.qrCode,
                            style: AppTypography.tabularNumber(
                              fontSize: 7.5,
                              color: AppColors.textSecondary,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Card Footer Bar
            Container(
              height: 4,
              color: AppColors.secondary,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDataRow(String label, String value, {bool isMonospace = false}) {
    return Row(
      children: [
        SizedBox(
          width: 44,
          child: Text(
            label,
            style: AppTypography.bodySm(color: AppColors.textSecondary).copyWith(fontSize: 10),
          ),
        ),
        Text(
          ': ',
          style: AppTypography.bodySm(color: AppColors.textSecondary).copyWith(fontSize: 10),
        ),
        Expanded(
          child: Text(
            value,
            style: isMonospace
                ? AppTypography.tabularNumber(
                    fontSize: 10.5,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  )
                : AppTypography.labelMd(color: AppColors.textPrimary).copyWith(fontSize: 10),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}
