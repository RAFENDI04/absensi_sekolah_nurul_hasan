import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

class QrScannerHud extends StatefulWidget {
  final bool isLocked;
  final String? overlayText;
  final VoidCallback? onManualInputTap;

  const QrScannerHud({
    super.key,
    this.isLocked = false,
    this.overlayText,
    this.onManualInputTap,
  });

  @override
  State<QrScannerHud> createState() => _QrScannerHudState();
}

class _QrScannerHudState extends State<QrScannerHud> with SingleTickerProviderStateMixin {
  late AnimationController _laserController;

  @override
  void initState() {
    super.initState();
    _laserController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2200),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _laserController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final boxSize = (constraints.maxWidth * 0.72).clamp(240.0, 320.0);

        return Stack(
          alignment: Alignment.center,
          children: [
            // Dark Vignette Overlay
            ColorFiltered(
              colorFilter: const ColorFilter.mode(
                AppColors.scannerVignette,
                BlendMode.srcOut,
              ),
              child: Stack(
                children: [
                  Container(
                    decoration: const BoxDecoration(
                      color: Colors.transparent,
                      backgroundBlendMode: BlendMode.dstOut,
                    ),
                  ),
                  Center(
                    child: Container(
                      width: boxSize,
                      height: boxSize,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Target Frame & 4 L-Brackets
            Center(
              child: SizedBox(
                width: boxSize,
                height: boxSize,
                child: CustomPaint(
                  painter: _ScannerBracketPainter(
                    isLocked: widget.isLocked,
                    bracketColor: widget.isLocked
                        ? AppColors.cornerBracketLocked
                        : AppColors.cornerBracketIdle,
                  ),
                  child: Stack(
                    children: [
                      // Animated Laser Beam
                      if (!widget.isLocked)
                        AnimatedBuilder(
                          animation: _laserController,
                          builder: (context, child) {
                            return Positioned(
                              top: _laserController.value * (boxSize - 4),
                              left: 12,
                              right: 12,
                              child: Container(
                                height: 2.5,
                                decoration: BoxDecoration(
                                  gradient: const LinearGradient(
                                    colors: [
                                      Colors.transparent,
                                      AppColors.laserGradientStart,
                                      AppColors.laserGradientEnd,
                                      Colors.transparent,
                                    ],
                                  ),
                                  boxShadow: [
                                    BoxShadow(
                                      color: AppColors.primaryLight.withOpacity(0.6),
                                      blurRadius: 8,
                                      spreadRadius: 1,
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                    ],
                  ),
                ),
              ),
            ),

            // Top Guidance Text
            Positioned(
              top: (constraints.maxHeight / 2) - (boxSize / 2) - 48,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.6),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  widget.isLocked
                      ? 'TARGET TERKUNCI'
                      : (widget.overlayText ?? 'Arahkan kamera ke QR Code Siswa'),
                  style: AppTypography.labelMd(
                    color: widget.isLocked ? AppColors.cornerBracketLocked : Colors.white,
                  ),
                ),
              ),
            ),

            // Bottom Manual Input Trigger
            if (widget.onManualInputTap != null)
              Positioned(
                bottom: 32,
                child: TextButton.icon(
                  onPressed: widget.onManualInputTap,
                  icon: const Icon(Icons.keyboard, color: Colors.white, size: 18),
                  label: Text(
                    'Input Barcode / NIS Manual',
                    style: AppTypography.labelMd(color: Colors.white),
                  ),
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.black.withOpacity(0.5),
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24),
                      side: const BorderSide(color: Colors.white38),
                    ),
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

class _ScannerBracketPainter extends CustomPainter {
  final bool isLocked;
  final Color bracketColor;

  _ScannerBracketPainter({
    required this.isLocked,
    required this.bracketColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = bracketColor
      ..strokeWidth = 3.5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    const cornerLength = 28.0;
    const radius = 12.0;

    final path = Path();

    // Top-Left
    path.moveTo(0, cornerLength);
    path.lineTo(0, radius);
    path.arcToPoint(const Offset(radius, 0), radius: const Radius.circular(radius));
    path.lineTo(cornerLength, 0);

    // Top-Right
    path.moveTo(size.width - cornerLength, 0);
    path.lineTo(size.width - radius, 0);
    path.arcToPoint(Offset(size.width, radius), radius: const Radius.circular(radius));
    path.lineTo(size.width, cornerLength);

    // Bottom-Left
    path.moveTo(0, size.height - cornerLength);
    path.lineTo(0, size.height - radius);
    path.arcToPoint(Offset(radius, size.height), radius: const Radius.circular(radius));
    path.lineTo(cornerLength, size.height);

    // Bottom-Right
    path.moveTo(size.width - cornerLength, size.height);
    path.lineTo(size.width - radius, size.height);
    path.arcToPoint(Offset(size.width, size.height - radius), radius: const Radius.circular(radius));
    path.lineTo(size.width, size.height - cornerLength);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant _ScannerBracketPainter oldDelegate) {
    return oldDelegate.isLocked != isLocked || oldDelegate.bracketColor != bracketColor;
  }
}
