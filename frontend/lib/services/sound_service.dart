import 'package:flutter/services.dart';

class SoundService {
  /// Umpan balik haptic vibrasi dan audio
  static Future<void> playSuccessFeedback() async {
    try {
      await HapticFeedback.mediumImpact();
      SystemSound.play(SystemSoundType.click);
    } catch (_) {}
  }

  static Future<void> playWarningFeedback() async {
    try {
      await HapticFeedback.heavyImpact();
      SystemSound.play(SystemSoundType.alert);
    } catch (_) {}
  }

  static Future<void> playErrorFeedback() async {
    try {
      await HapticFeedback.vibrate();
      SystemSound.play(SystemSoundType.alert);
    } catch (_) {}
  }
}
