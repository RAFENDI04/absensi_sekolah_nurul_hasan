import 'dart:async';
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import '../services/api_service.dart';
import '../services/sound_service.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import '../widgets/qr_scanner_hud.dart';
import '../widgets/status_badge.dart';

class ScannerScreen extends StatefulWidget {
  const ScannerScreen({super.key});

  @override
  State<ScannerScreen> createState() => _ScannerScreenState();
}

class _ScannerScreenState extends State<ScannerScreen> {
  final ApiService _api = ApiService();
  final MobileScannerController _scannerController = MobileScannerController(
    detectionSpeed: DetectionSpeed.normal,
    facing: CameraFacing.back,
    torchEnabled: false,
  );

  bool _isProcessing = false;
  bool _isLocked = false;
  bool _torchOn = false;
  Map<String, dynamic>? _lastResult;

  @override
  void dispose() {
    _scannerController.dispose();
    super.dispose();
  }

  void _onDetect(BarcodeCapture capture) {
    if (_isProcessing) return;

    final barcodes = capture.barcodes;
    for (final barcode in barcodes) {
      final code = barcode.rawValue;
      if (code != null && code.isNotEmpty) {
        _processBarcode(code);
        break;
      }
    }
  }

  Future<void> _processBarcode(String rawCode) async {
    setState(() {
      _isProcessing = true;
      _isLocked = true;
    });

    final res = await _api.scanQr(rawCode);

    if (!mounted) return;

    setState(() {
      _lastResult = res;
    });

    // Audio & Haptic Feedback based on status
    if (res['ok'] == true) {
      if (res['status'] == 'Terlambat') {
        SoundService.playWarningFeedback();
      } else {
        SoundService.playSuccessFeedback();
      }
    } else {
      SoundService.playErrorFeedback();
    }

    _showResultDialog(res);

    // 2 Detik Cooldown sebelum siap scan berikutnya
    await Future.delayed(const Duration(milliseconds: 2000));
    if (mounted) {
      setState(() {
        _isProcessing = false;
        _isLocked = false;
      });
    }
  }

  void _showResultDialog(Map<String, dynamic> res) {
    final bool ok = res['ok'] == true;
    final String status = res['status'] ?? (ok ? 'HADIR' : 'GAGAL');

    Color headerBg;
    IconData headerIcon;

    if (ok) {
      if (status == 'Terlambat') {
        headerBg = AppColors.warning;
        headerIcon = Icons.alarm;
      } else {
        headerBg = AppColors.success;
        headerIcon = Icons.check_circle;
      }
    } else {
      headerBg = AppColors.critical;
      headerIcon = Icons.cancel;
    }

    showModalBottomSheet(
      context: context,
      isDismissible: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Feedback Header Icon
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  color: headerBg.withOpacity(0.15),
                  shape: BoxShape.circle,
                ),
                child: Icon(headerIcon, color: headerBg, size: 32),
              ),
              const SizedBox(height: 12),

              Text(
                ok ? (res['nama'] ?? 'Presensi Berhasil') : 'Presensi Ditolak',
                style: AppTypography.headlineSm(color: AppColors.textPrimary),
                textAlign: TextAlign.center,
              ),

              const SizedBox(height: 6),
              Text(
                res['message'] ?? '',
                style: AppTypography.bodyMd(color: AppColors.textSecondary),
                textAlign: TextAlign.center,
              ),

              if (ok) ...[
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceContainerLow,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppColors.borderSubtle),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          Text('KELAS', style: AppTypography.labelSm(color: AppColors.textSecondary)),
                          const SizedBox(height: 2),
                          Text(res['kelas'] ?? '-', style: AppTypography.labelMd()),
                        ],
                      ),
                      Column(
                        children: [
                          Text('JAM MASUK', style: AppTypography.labelSm(color: AppColors.textSecondary)),
                          const SizedBox(height: 2),
                          Text(res['jam'] ?? '-', style: AppTypography.tabularNumber()),
                        ],
                      ),
                      Column(
                        children: [
                          Text('STATUS', style: AppTypography.labelSm(color: AppColors.textSecondary)),
                          const SizedBox(height: 2),
                          StatusBadge(status: status, compact: true),
                        ],
                      ),
                    ],
                  ),
                ),
              ],

              const SizedBox(height: 20),

              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primaryContainer,
                ),
                onPressed: () => Navigator.of(ctx).pop(),
                child: const Text('LANJUTKAN SCAN BERIKUTNYA'),
              ),
            ],
          ),
        );
      },
    );
  }

  void _openManualInputDialog() {
    final textCtrl = TextEditingController();

    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          title: Text('Input Barcode / NIS Manual', style: AppTypography.headlineSm()),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Masukkan NIS atau kode QR jika barcode kartu rusak/kamera bermasalah:',
                style: AppTypography.bodySm(),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: textCtrl,
                autofocus: true,
                decoration: const InputDecoration(
                  hintText: 'Contoh: 10021 atau SISWA-10021-9fA3kQ',
                  prefixIcon: Icon(Icons.qr_code),
                ),
              ),
              const SizedBox(height: 14),
              Text('PILIHAN CONTOH UJI COBA:', style: AppTypography.labelSm(color: AppColors.textSecondary)),
              const SizedBox(height: 6),
              Wrap(
                spacing: 6,
                runSpacing: 6,
                children: [
                  ActionChip(
                    label: const Text('NIS 10021 (Hadir)'),
                    onPressed: () => textCtrl.text = 'SISWA-10021-9fA3kQ',
                  ),
                  ActionChip(
                    label: const Text('NIS 10023 (Hadir)'),
                    onPressed: () => textCtrl.text = 'SISWA-10023-V2mK9J',
                  ),
                  ActionChip(
                    label: const Text('NIS 10025 (Terlambat)'),
                    onPressed: () => textCtrl.text = 'SISWA-10025-L5pT3N',
                  ),
                ],
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(ctx).pop(),
              child: const Text('Batal'),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(minimumSize: const Size(100, 40)),
              onPressed: () {
                final code = textCtrl.text.trim();
                if (code.isNotEmpty) {
                  Navigator.of(ctx).pop();
                  _processBarcode(code);
                }
              },
              child: const Text('Kirim Scan'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        title: Text('Pemindai QR Code Presensi', style: AppTypography.labelLg(color: Colors.white)),
        actions: [
          IconButton(
            icon: Icon(_torchOn ? Icons.flash_on : Icons.flash_off, color: Colors.white),
            tooltip: 'Senter',
            onPressed: () {
              _scannerController.toggleTorch();
              setState(() => _torchOn = !_torchOn);
            },
          ),
          IconButton(
            icon: const Icon(Icons.flip_camera_ios, color: Colors.white),
            tooltip: 'Ganti Kamera',
            onPressed: () => _scannerController.switchCamera(),
          ),
          IconButton(
            icon: const Icon(Icons.keyboard, color: Colors.white),
            tooltip: 'Input Manual',
            onPressed: _openManualInputDialog,
          ),
        ],
      ),
      body: Stack(
        children: [
          // Camera Stream with MobileScanner
          MobileScanner(
            controller: _scannerController,
            onDetect: _onDetect,
            errorBuilder: (context, error, child) {
              return Center(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.videocam_off, color: Colors.white54, size: 64),
                      const SizedBox(height: 16),
                      Text(
                        'Kamera Tidak Terdeteksi atau Izin Belum Diberikan',
                        style: AppTypography.headlineSm(color: Colors.white),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Pada perangkat desktop atau emulator tanpa webcam, gunakan mode Input Barcode Manual untuk menguji absensi.',
                        style: AppTypography.bodySm(color: Colors.white70),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 20),
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primaryLight,
                          minimumSize: const Size(200, 44),
                        ),
                        onPressed: _openManualInputDialog,
                        icon: const Icon(Icons.keyboard),
                        label: const Text('Input Manual Sekarang'),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),

          // Custom Scanner HUD Overlay (L-Brackets + Animated Laser Line)
          QrScannerHud(
            isLocked: _isLocked,
            onManualInputTap: _openManualInputDialog,
          ),
        ],
      ),
    );
  }
}
