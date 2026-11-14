import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

class LanConnectivityHeader extends StatefulWidget {
  final VoidCallback? onSettingsTap;
  const LanConnectivityHeader({super.key, this.onSettingsTap});

  @override
  State<LanConnectivityHeader> createState() => _LanConnectivityHeaderState();
}

class _LanConnectivityHeaderState extends State<LanConnectivityHeader>
    with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  final ApiService _api = ApiService();
  bool _testing = false;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  Future<void> _refreshPing() async {
    setState(() => _testing = true);
    await _api.checkPing();
    if (mounted) {
      setState(() => _testing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isOnline = _api.isOnline;
    final latency = _api.lastPingMs;
    final ipStr = _api.baseUrl.replaceAll('http://', '').replaceAll('https://', '');

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border(
          bottom: BorderSide(color: AppColors.borderSubtle, width: 1),
        ),
      ),
      child: Row(
        children: [
          // Indicator Dot
          AnimatedBuilder(
            animation: _pulseController,
            builder: (context, child) {
              return Container(
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isOnline ? AppColors.success : AppColors.warning,
                  boxShadow: isOnline
                      ? [
                          BoxShadow(
                            color: AppColors.success.withOpacity(0.3 + 0.4 * _pulseController.value),
                            blurRadius: 6,
                            spreadRadius: 2 * _pulseController.value,
                          )
                        ]
                      : null,
                ),
              );
            },
          ),
          const SizedBox(width: 8),

          // LAN IP & Gateway Info
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    Text(
                      'LAN Gateway: ',
                      style: AppTypography.labelSm(color: AppColors.textSecondary),
                    ),
                    Flexible(
                      child: Text(
                        ipStr,
                        style: AppTypography.tabularNumber(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textPrimary,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                Text(
                  isOnline ? 'Terhubung (Ping: ${latency}ms)' : 'Mode Lokal Mandiri (Offline Sync)',
                  style: AppTypography.bodySm(
                    color: isOnline ? AppColors.secondary : AppColors.warning,
                  ),
                ),
              ],
            ),
          ),

          // Tombol Tes / Konfigurasi
          IconButton(
            icon: _testing
                ? const SizedBox(
                    width: 14,
                    height: 14,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Icon(Icons.sync, size: 18, color: AppColors.primaryContainer),
            tooltip: 'Cek Koneksi LAN',
            onPressed: _refreshPing,
          ),
          if (widget.onSettingsTap != null)
            IconButton(
              icon: const Icon(Icons.tune, size: 18, color: AppColors.textSecondary),
              tooltip: 'Atur IP LAN',
              onPressed: widget.onSettingsTap,
            ),
        ],
      ),
    );
  }
}
