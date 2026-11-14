import 'package:flutter/material.dart';

/// Design Tokens sesuai spesifikasi "Academic Precision" (Image 12.markdown)
class AppColors {
  // Brand & Structural Chrome
  static const Color primary = Color(0xFF00236F);
  static const Color onPrimary = Color(0xFFFFFFFF);
  static const Color primaryContainer = Color(0xFF1E3A8A);
  static const Color onPrimaryContainer = Color(0xFF90A8FF);
  static const Color primaryLight = Color(0xFF2563EB);

  // Success / On-Time / Positive Scan
  static const Color secondary = Color(0xFF006C49);
  static const Color onSecondary = Color(0xFFFFFFFF);
  static const Color secondaryContainer = Color(0xFF6CF8BB);
  static const Color onSecondaryContainer = Color(0xFF00714D);
  static const Color success = Color(0xFF10B981);

  // Warning / Late / Pending
  static const Color tertiary = Color(0xFF442100);
  static const Color tertiaryContainer = Color(0xFF653400);
  static const Color onTertiaryContainer = Color(0xFFFC922B);
  static const Color warning = Color(0xFFD97706);

  // Critical / Error / Unauthorized
  static const Color error = Color(0xFFBA1A1A);
  static const Color onError = Color(0xFFFFFFFF);
  static const Color errorContainer = Color(0xFFFFDAD6);
  static const Color onErrorContainer = Color(0xFF93000A);
  static const Color critical = Color(0xFFE11D48);

  // Surfaces & Background
  static const Color background = Color(0xFFF8F9FF);
  static const Color canvas = Color(0xFFF8FAFC);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceDim = Color(0xFFCBDBF5);
  static const Color surfaceContainerLowest = Color(0xFFFFFFFF);
  static const Color surfaceContainerLow = Color(0xFFEFF4FF);
  static const Color surfaceContainer = Color(0xFFE5EEFF);
  static const Color surfaceContainerHigh = Color(0xFFDCE9FF);
  static const Color surfaceContainerHighest = Color(0xFFD3E4FE);

  // Text & Outlines
  static const Color onSurface = Color(0xFF0B1C30);
  static const Color textPrimary = Color(0xFF0F172A);
  static const Color onSurfaceVariant = Color(0xFF444651);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color outline = Color(0xFF757682);
  static const Color outlineVariant = Color(0xFFC5C5D3);
  static const Color borderSubtle = Color(0xFFE2E8F0);

  // Status Chip Colors
  static const Color statusHadirBg = Color(0xFFECFDF5);
  static const Color statusHadirText = Color(0xFF065F46);
  static const Color statusHadirBorder = Color(0xFFA7F3D0);

  static const Color statusTerlambatBg = Color(0xFFFFFBEB);
  static const Color statusTerlambatText = Color(0xFF92400E);
  static const Color statusTerlambatBorder = Color(0xFFFDE68A);

  static const Color statusAlpaBg = Color(0xFFFFF1F2);
  static const Color statusAlpaText = Color(0xFF9F1239);
  static const Color statusAlpaBorder = Color(0xFFFECDD3);

  static const Color statusIzinBg = Color(0xFFEFF6FF);
  static const Color statusIzinText = Color(0xFF1E40AF);
  static const Color statusIzinBorder = Color(0xFFBFDBFE);

  // Scanner HUD Specific
  static const Color scannerVignette = Color(0x990F172A); // rgba(15, 23, 42, 0.6)
  static const Color laserGradientStart = Color(0xFF2563EB);
  static const Color laserGradientEnd = Color(0xFF60A5FA);
  static const Color cornerBracketIdle = Color(0xFFFFFFFF);
  static const Color cornerBracketLocked = Color(0xFF10B981);
}
