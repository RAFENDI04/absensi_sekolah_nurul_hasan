import 'package:flutter/material.dart';
import 'services/api_service.dart';
import 'theme/app_theme.dart';
import 'screens/login_screen.dart';
import 'screens/main_navigation_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final api = ApiService();
  await api.init();

  runApp(const AbsensiApp());
}

class AbsensiApp extends StatelessWidget {
  const AbsensiApp({super.key});

  @override
  Widget build(BuildContext context) {
    final api = ApiService();
    final bool hasLoggedIn = api.currentUser != null;

    return MaterialApp(
      title: 'Sistem Absensi Siswa LAN',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: hasLoggedIn ? const MainNavigationScreen() : const LoginScreen(),
    );
  }
}
