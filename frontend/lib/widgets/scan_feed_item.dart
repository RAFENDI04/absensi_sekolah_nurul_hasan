import 'package:flutter/material.dart';
import '../models/absensi_model.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import 'status_badge.dart';

class ScanFeedItem extends StatelessWidget {
  final AbsensiModel absensi;
  final VoidCallback? onTap;

  const ScanFeedItem({
    super.key,
    required this.absensi,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    // Generate initials for avatar
    final nameParts = absensi.nama.trim().split(' ');
    final initials = nameParts.length > 1
        ? '${nameParts[0][0]}${nameParts[1][0]}'.toUpperCase()
        : absensi.nama.isNotEmpty
            ? absensi.nama.substring(0, 1).toUpperCase()
            : 'S';

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: AppColors.borderSubtle, width: 1),
        ),
        child: Row(
          children: [
            // Avatar (40x40 circle)
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.surfaceContainerHigh,
                border: Border.all(color: AppColors.outlineVariant, width: 1),
              ),
              alignment: Alignment.center,
              child: Text(
                initials,
                style: AppTypography.labelMd(color: AppColors.primaryContainer),
              ),
            ),
            const SizedBox(width: 12),

            // Nama & NIS / Kelas
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    absensi.nama,
                    style: AppTypography.labelLg(color: AppColors.textPrimary),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 2),
                  Row(
                    children: [
                      Text(
                        'NIS: ${absensi.nis}',
                        style: AppTypography.tabularNumber(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: AppColors.textSecondary,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceContainerLow,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          absensi.namaKelas,
                          style: AppTypography.labelSm(color: AppColors.textSecondary),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(width: 8),

            // Timestamp (Tabular) & Status Badge
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  absensi.jam,
                  style: AppTypography.tabularNumber(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                StatusBadge(status: absensi.status, compact: true),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
