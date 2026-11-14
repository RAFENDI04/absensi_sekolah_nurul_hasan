import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

class StatusBadge extends StatelessWidget {
  final String status;
  final bool compact;

  const StatusBadge({
    super.key,
    required this.status,
    this.compact = false,
  });

  @override
  Widget build(BuildContext context) {
    Color bg;
    Color text;
    Color border;

    final normStatus = status.trim().toUpperCase();

    switch (normStatus) {
      case 'HADIR':
        bg = AppColors.statusHadirBg;
        text = AppColors.statusHadirText;
        border = AppColors.statusHadirBorder;
        break;
      case 'TERLAMBAT':
        bg = AppColors.statusTerlambatBg;
        text = AppColors.statusTerlambatText;
        border = AppColors.statusTerlambatBorder;
        break;
      case 'ALPA':
      case 'TIDAK HADIR':
        bg = AppColors.statusAlpaBg;
        text = AppColors.statusAlpaText;
        border = AppColors.statusAlpaBorder;
        break;
      case 'IZIN':
      case 'SAKIT':
      case 'IZIN / SAKIT':
        bg = AppColors.statusIzinBg;
        text = AppColors.statusIzinText;
        border = AppColors.statusIzinBorder;
        break;
      default:
        bg = AppColors.surfaceContainerLow;
        text = AppColors.textSecondary;
        border = AppColors.borderSubtle;
        break;
    }

    return Container(
      height: compact ? 22 : 26,
      padding: EdgeInsets.symmetric(horizontal: compact ? 8 : 12),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(9999),
        border: Border.all(color: border, width: 1),
      ),
      alignment: Alignment.center,
      child: Text(
        normStatus,
        style: AppTypography.labelSm(color: text).copyWith(
          fontSize: compact ? 9.5 : 11,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}
