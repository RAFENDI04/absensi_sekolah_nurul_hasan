import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppTypography {
  // Headlines - Plus Jakarta Sans
  static TextStyle headlineXl({Color color = AppColors.onSurface}) => GoogleFonts.plusJakartaSans(
        fontSize: 32,
        fontWeight: FontWeight.w700,
        height: 1.25,
        letterSpacing: -0.02 * 32,
        color: color,
      );

  static TextStyle headlineLg({Color color = AppColors.onSurface}) => GoogleFonts.plusJakartaSans(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        height: 1.28,
        letterSpacing: -0.01 * 24,
        color: color,
      );

  static TextStyle headlineMd({Color color = AppColors.onSurface}) => GoogleFonts.plusJakartaSans(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        height: 1.3,
        color: color,
      );

  static TextStyle headlineSm({Color color = AppColors.onSurface}) => GoogleFonts.plusJakartaSans(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        height: 1.4,
        color: color,
      );

  // Body - Inter
  static TextStyle bodyLg({Color color = AppColors.textPrimary}) => GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        height: 1.5,
        color: color,
      );

  static TextStyle bodyMd({Color color = AppColors.textPrimary}) => GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        height: 1.45,
        color: color,
      );

  static TextStyle bodySm({Color color = AppColors.textSecondary}) => GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        height: 1.35,
        color: color,
      );

  // Labels & Status Badges
  static TextStyle labelLg({Color color = AppColors.textPrimary}) => GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.01 * 14,
        color: color,
      );

  static TextStyle labelMd({Color color = AppColors.textPrimary}) => GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.02 * 12,
        color: color,
      );

  static TextStyle labelSm({Color color = AppColors.textPrimary}) => GoogleFonts.inter(
        fontSize: 10,
        fontWeight: FontWeight.w700,
        letterSpacing: 0.04 * 10,
        color: color,
      );

  // Monospaced / Tabular for Timestamps, NIS, IP
  static TextStyle tabularNumber({
    double fontSize = 14,
    FontWeight fontWeight = FontWeight.w600,
    Color color = AppColors.textPrimary,
  }) => GoogleFonts.jetBrainsMono(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        fontFeatures: const [FontFeature.tabularFigures()],
      );
}
