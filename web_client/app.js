/**
 * Academic Precision - Web Terminal & Simulator Engine
 * Mengimplementasikan arsitektur Blueprint Absensi LAN
 */

// State Internal Aplikasi
const state = {
  baseUrl: 'http://127.0.0.1:8000/api',
  isBackendConnected: false,
  currentUser: {
    nama: 'Anwar S.pd.G.r',
    role: 'ADMIN',
    username: 'admin'
  },
  settings: {
    jam_masuk: '07:00:00',
    batas_terlambat: '07:15:00',
    jam_tutup_scan: '09:00:00',
    nama_sekolah: 'SMA Nurul Hasan Sabuntan',
    tahun_ajaran: '2026/2027',
  },
  kelas: [
    { id: 1, nama_kelas: 'Kelas 10 (X)' },
    { id: 2, nama_kelas: 'Kelas 11 (XI)' },
    { id: 3, nama_kelas: 'Kelas 12 (XII)' },
  ],
  siswa: [
    // Kelas 10 (X) - Data Resmi
    { id: 1, nis: '0111389549', nik: '3529252402110001', nama: 'ADIP ARJUNA PUTRA', gender: 'L', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0111389549-9fA3kQ' },
    { id: 2, nis: '0109289289', nik: '3529254111100001', nama: 'ANDARA', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0109289289-B8xR4L' },
    { id: 3, nis: '0117605409', nik: '3529255004120002', nama: 'EPAH NUR ISTIKOMAH', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0117605409-V2mK9J' },
    { id: 4, nis: '3117563204', nik: '3529256808110002', nama: 'FITRI OLIVIA', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-3117563204-Q7wE1P' },
    { id: 5, nis: '0106470950', nik: '3529256406100002', nama: 'HAFIFAH', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0106470950-L5pT3N' },
    { id: 6, nis: '3112895872', nik: '3529254902110001', nama: 'HAIRAN MAGFIRAH', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-3112895872-H4jS8Y' },
    { id: 7, nis: '0111396773', nik: '3529125110110003', nama: 'HALIMATUS SA\'DIYAH', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0111396773-M9cZ2W' },
    { id: 8, nis: '0118698841', nik: '3529253008110003', nama: 'HIJRAH RAMADHAN', gender: 'L', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0118698841-T1uO6V' },
    { id: 9, nis: '3117949612', nik: '3529255502110001', nama: 'JUMRAH', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-3117949612-J3mN8S' },
    { id: 10, nis: '0113898338', nik: '3529255805110001', nama: 'MARISA', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0113898338-C6aD9B' },
    { id: 11, nis: '3115856847', nik: '3529250111110001', nama: 'MOH. YUNUS GAFURI', gender: 'L', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-3115856847-G8hU4X' },
    { id: 12, nis: '0114459011', nik: '3529250409110001', nama: 'NAHYUDI', gender: 'L', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0114459011-K2yR5M' },
    { id: 13, nis: '0113568818', nik: '3529252103130001', nama: 'RAHEL PRATA SAPUTRA', gender: 'L', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-0113568818-P7tW1E' },
    { id: 14, nis: '3117911793', nik: '3529254806110001', nama: 'RAUDATUL IMANI', gender: 'P', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-3117911793-F5sL2Q' },
    { id: 15, nis: '3073155939', nik: '3529252703070003', nama: 'RIDWAN', gender: 'L', kelas_id: 1, nama_kelas: 'Kelas 10 (X)', qr_code: 'SISWA-3073155939-V9oP3A' },

    // Kelas 11 (XI) - Data Resmi
    { id: 16, nis: '3093251577', nik: '3529251110090001', nama: 'AFIV ANWAR', gender: 'L', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-3093251577-K3bV9R' },
    { id: 17, nis: '3104836960', nik: '3529255112120001', nama: 'AINI', gender: 'P', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-3104836960-W8yU5M' },
    { id: 18, nis: '0108365964', nik: '3529253107100001', nama: 'ARDIANSYAH', gender: 'L', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-0108365964-X2iO7L' },
    { id: 19, nis: '3115806413', nik: '3529253007100002', nama: 'FAHMI AULIA', gender: 'L', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-3115806413-P4rT1K' },
    { id: 20, nis: '0091350789', nik: '3529251912090002', nama: 'KAVA ANJANI', gender: 'L', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-0091350789-F6aE9B' },
    { id: 21, nis: '3072969141', nik: '3529251105070001', nama: 'MAHKAMUL A', gender: 'L', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-3072969141-C9dL3Q' },
    { id: 22, nis: '0105952237', nik: '3529254712100001', nama: 'MARINA', gender: 'P', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-0105952237-Y7uH4A' },
    { id: 23, nis: '0118709158', nik: '3529255806110003', nama: 'MOZAYYANATUL JANNAH', gender: 'P', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-0118709158-E5mN8S' },
    { id: 24, nis: '3107759094', nik: '3529254909100002', nama: 'NURUL AZQIYA', gender: 'P', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-3107759094-N8jM2K' },
    { id: 25, nis: '3115152565', nik: '3529255104110002', nama: 'PAJIRA SAFIRA', gender: 'P', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-3115152565-R4vL6X' },
    { id: 26, nis: '3081745700', nik: '3529254107070020', nama: 'SAPIRA', gender: 'P', kelas_id: 2, nama_kelas: 'Kelas 11 (XI)', qr_code: 'SISWA-3081745700-T9wP1Q' },

    // Kelas 12 (XII) - Data Resmi
    { id: 27, nis: '0081844547', nik: '3529250108090002', nama: 'ADAM', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0081844547-U3oK2D' },
    { id: 28, nis: '0083391026', nik: '3529250401080001', nama: 'ALIEF D.P.', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0083391026-Z1pX6C' },
    { id: 29, nis: '0086974628', nik: '3529255406080002', nama: 'ARINI MARDIANA', gender: 'P', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0086974628-J8wL5V' },
    { id: 30, nis: '0083070888', nik: '3529251206080001', nama: 'EBING RELA MANULOH', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0083070888-N6kQ3T' },
    { id: 31, nis: '3086049385', nik: '3529255608080002', nama: 'HILWA', gender: 'P', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-3086049385-R2sF9W' },
    { id: 32, nis: '0089458351', nik: '3529250403080002', nama: 'IDAM MALIK', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0089458351-B4tE1Z' },
    { id: 33, nis: '3081922419', nik: '3529251501080001', nama: 'ILAL PAHRI', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-3081922419-G9hU7M' },
    { id: 34, nis: '0099612423', nik: '3529256606100001', nama: 'LUPITA NUR ALFIYAH', gender: 'P', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0099612423-D3yR8P' },
    { id: 35, nis: '0098477788', nik: '3529251911090001', nama: 'LUTFI ANWAR', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0098477788-M5tV1K' },
    { id: 36, nis: '0093463981', nik: '3529255102100003', nama: 'NADA FITRIYAH', gender: 'P', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0093463981-L7wR3Y' },
    { id: 37, nis: '0087320928', nik: '3529250604080003', nama: 'RENDI PRATAMA', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0087320928-P2xJ8Q' },
    { id: 38, nis: '3097536165', nik: '3529255201090002', nama: 'RUSMILA', gender: 'P', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-3097536165-H9nE4B' },
    { id: 39, nis: '0086671068', nik: '3529256209090002', nama: 'SANDI AULIYA', gender: 'P', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0086671068-K1qZ6F' },
    { id: 40, nis: '0075381869', nik: '3529251511070001', nama: 'SUGIANTO', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0075381869-T4mS7D' },
    { id: 41, nis: '0085611936', nik: '3529257112080001', nama: 'TRI YUNA HUSNAINI', gender: 'P', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0085611936-W3bL9X' },
    { id: 42, nis: '0083138245', nik: '3529252811080001', nama: 'ZAINAL ARIF', gender: 'L', kelas_id: 3, nama_kelas: 'Kelas 12 (XII)', qr_code: 'SISWA-0083138245-Y8jC2N' },
  ],
  absensiHariIni: [],
  selectedSiswaForCard: null,
  html5QrScanner: null,
  isCameraRunning: false,
};

function getTodayStr() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function getTimeStr() {
  const d = new Date();
  return d.toTimeString().split(' ')[0];
}

// ================= LOCAL STORAGE PERSISTENCE (OTOMATIS SIMPAN) =================
function getStorageKeyHariIni() {
  return 'presensi_hari_ini_' + getTodayStr();
}

function saveAbsensiToStorage() {
  try {
    localStorage.setItem(getStorageKeyHariIni(), JSON.stringify(state.absensiHariIni));
  } catch (e) {
    console.warn('[Storage] Gagal menyimpan ke localStorage:', e);
  }
}

function loadAbsensiFromStorage() {
  try {
    const raw = localStorage.getItem(getStorageKeyHariIni());
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        state.absensiHariIni = parsed;
        console.log(`[Storage] Berhasil memuat ${parsed.length} data presensi tersimpan hari ini.`);
      }
    }
  } catch (e) {
    console.warn('[Storage] Gagal memuat dari localStorage:', e);
  }
}

// ================= SYNTHETIC AUDIO FEEDBACK (WEB AUDIO API) =================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'success') {
      // Dua nada melodi naik (Chime konfirmasi hadir)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } else if (type === 'warning') {
      // Nada amber (Terlambat)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.setValueAtTime(370, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else {
      // Nada buzz rendah (Tolak / Duplikat)
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    }
  } catch (e) {
    console.warn('Audio playback error', e);
  }
}

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  loadAbsensiFromStorage();
  renderCurrentUserProfile();
  renderKelasDropdowns();
  initNavigation();
  initDashboardMetrics();
  updateQuickSimButtons();
  renderLiveFeed();
  renderSiswaTable();
  renderRekapTable();
  renderRekapBulanan();
  initScannerButtons();
  initHardwareScanner();
  initAutoStartCamera();
  initModals();
  startLiveClock();
  testPingConnection();
});

function renderKelasDropdowns() {
  const filterSelect = document.getElementById('selectKelasFilter');
  const rekapSelect = document.getElementById('selectRekapKelas');
  const rekapBulananSelect = document.getElementById('selectRekapBulananKelas');

  const optionsHtml = '<option value="">Semua Kelas</option>' +
    state.kelas.map(k => `<option value="${k.id}">${k.nama_kelas}</option>`).join('');

  if (filterSelect) {
    const currentVal = filterSelect.value;
    filterSelect.innerHTML = optionsHtml;
    filterSelect.value = currentVal;
  }

  if (rekapSelect) {
    const currentVal = rekapSelect.value;
    rekapSelect.innerHTML = optionsHtml;
    rekapSelect.value = currentVal;
  }

  if (rekapBulananSelect) {
    const currentVal = rekapBulananSelect.value;
    rekapBulananSelect.innerHTML = optionsHtml;
    rekapBulananSelect.value = currentVal;
  }
}

function renderCurrentUserProfile() {
  const nameEl = document.getElementById('userDisplayName');
  const roleEl = document.getElementById('userDisplayRole');
  const avatarEl = document.getElementById('userInitials');
  if (nameEl) nameEl.textContent = state.currentUser.nama;
  if (roleEl) roleEl.textContent = `${state.currentUser.role === 'ADMIN' ? 'ADMINISTRATOR' : 'GURU KELAS'} · ONLINE`;
  if (avatarEl) {
    const parts = state.currentUser.nama.split(' ').filter(Boolean);
    const initials = parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
    avatarEl.textContent = initials;
  }
}

// ================= LIVE CLOCK =================
function startLiveClock() {
  const clockEl = document.getElementById('liveServerClock');
  setInterval(() => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${timeStr} WIB`;
  }, 1000);
}

// ================= NAVIGATION =================
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-item');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      document.getElementById(targetTab).classList.add('active');

      if (targetTab === 'tab-siswa') renderSiswaTable();
      if (targetTab === 'tab-rekap') {
        renderRekapBulanan();
        renderRekapTable();
      }
    });
  });
}

// ================= DASHBOARD & METRICS =================
function initDashboardMetrics() {
  const total = state.siswa.length;
  const hadir = state.absensiHariIni.filter(a => a.status === 'Hadir').length;
  const terlambat = state.absensiHariIni.filter(a => a.status === 'Terlambat').length;
  const izin = state.absensiHariIni.filter(a => a.status === 'Izin').length;
  const sakit = state.absensiHariIni.filter(a => a.status === 'Sakit').length;
  const izinSakit = izin + sakit;
  const belumAbsen = Math.max(0, total - (hadir + terlambat + izin + sakit));

  document.getElementById('mTotalSiswa').textContent = total;
  document.getElementById('mHadir').textContent = hadir;
  document.getElementById('mTerlambat').textContent = terlambat;
  document.getElementById('mIzinSakit').textContent = izinSakit;
  document.getElementById('mIzinSub').textContent = izin;
  document.getElementById('mSakitSub').textContent = sakit;
  document.getElementById('mBelumAbsen').textContent = belumAbsen;
}

// ================= MODAL DETAIL METRIK DASHBOARD =================
let currentMetrikFilterType = 'total';

function openModalMetrikDetail(type) {
  currentMetrikFilterType = type;
  const modal = document.getElementById('modalDetailMetrik');
  if (!modal) return;

  const titleEl = document.getElementById('modalMetrikTitle');
  const subEl = document.getElementById('modalMetrikSub');
  const searchInput = document.getElementById('inputSearchModalMetrik');
  const selectKelas = document.getElementById('selectKelasModalMetrik');

  if (searchInput) searchInput.value = '';

  // Render opsi dropdown kelas jika ada perubahan
  if (selectKelas) {
    const prevVal = selectKelas.value;
    selectKelas.innerHTML = '<option value="">Semua Kelas</option>' +
      state.kelas.map(k => `<option value="${k.id}">${k.nama_kelas}</option>`).join('');
    selectKelas.value = prevVal || '';
  }

  // Set judul & ikon berdasarkan kategori metrik
  if (type === 'total') {
    titleEl.innerHTML = '<i class="fa-solid fa-users" style="color: #2563eb;"></i> Data Semua Siswa Terdaftar';
    subEl.textContent = `Seluruh data ${state.siswa.length} siswa aktif SMA Nurul Hasan Sabuntan beserta status kehadiran hari ini`;
  } else if (type === 'hadir') {
    titleEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Siswa Hadir Tepat Waktu';
    subEl.textContent = 'Daftar siswa yang hadir tepat waktu sebelum batas toleransi (pukul 07:15 WIB)';
  } else if (type === 'terlambat') {
    titleEl.innerHTML = '<i class="fa-solid fa-clock-rotate-left" style="color: #d97706;"></i> Siswa Terlambat Masuk Sekolah';
    subEl.textContent = 'Daftar siswa yang melakukan presensi melewati batas toleransi masuk sekolah';
  } else if (type === 'izin_sakit') {
    titleEl.innerHTML = '<i class="fa-solid fa-file-waveform" style="color: #4f46e5;"></i> Siswa Izin & Sakit';
    subEl.textContent = 'Daftar siswa dengan status izin atau sakit resmi hari ini beserta alasan dan surat';
  } else if (type === 'belum_absen') {
    titleEl.innerHTML = '<i class="fa-solid fa-hourglass-start" style="color: #e11d48;"></i> Siswa Belum Absen';
    subEl.textContent = 'Daftar siswa yang belum melakukan scan presensi atau belum terdata kehadirannya hari ini';
  }

  renderModalMetrikTable();
  modal.classList.add('active');
}

function getFilteredMetrikData() {
  const search = (document.getElementById('inputSearchModalMetrik')?.value || '').toLowerCase().trim();
  const kelasFilter = document.getElementById('selectKelasModalMetrik')?.value;

  // Gabungkan semua siswa dengan data presensi hari ini
  let list = state.siswa.map(siswa => {
    const absen = state.absensiHariIni.find(a => a.siswa_id === siswa.id);
    return {
      siswa: siswa,
      absen: absen || null,
      status: absen ? absen.status : 'Belum Absen',
      jam: absen ? absen.jam : '-',
      keterangan: absen ? (absen.keterangan || '-') : 'Menunggu kehadiran / belum scan'
    };
  });

  // Filter berdasarkan kategori metrik
  if (currentMetrikFilterType === 'hadir') {
    list = list.filter(item => item.status === 'Hadir');
  } else if (currentMetrikFilterType === 'terlambat') {
    list = list.filter(item => item.status === 'Terlambat');
  } else if (currentMetrikFilterType === 'izin_sakit') {
    list = list.filter(item => item.status === 'Izin' || item.status === 'Sakit');
  } else if (currentMetrikFilterType === 'belum_absen') {
    list = list.filter(item => !item.absen || item.status === 'Belum Absen');
  }
  // jika 'total', seluruh siswa dimasukkan

  // Filter pencarian nama / NIS
  if (search) {
    list = list.filter(item => 
      item.siswa.nama.toLowerCase().includes(search) ||
      item.siswa.nis.toLowerCase().includes(search)
    );
  }

  // Filter kelas
  if (kelasFilter) {
    list = list.filter(item => item.siswa.kelas_id == kelasFilter);
  }

  return list;
}

function renderModalMetrikTable() {
  const tbody = document.getElementById('tbodyDetailMetrik');
  const countBadge = document.getElementById('modalMetrikCountBadge');
  if (!tbody) return;

  const data = getFilteredMetrikData();

  if (countBadge) {
    countBadge.textContent = `${data.length} Siswa`;
  }

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 32px; color: var(--color-text-secondary);">
          <i class="fa-solid fa-inbox" style="font-size: 28px; margin-bottom: 8px; color: var(--color-text-muted); display: block;"></i>
          Tidak ada data siswa yang cocok dengan filter yang dipilih
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = data.map((item, index) => {
    let statusBadge = '';
    const st = item.status;
    if (st === 'Hadir') {
      statusBadge = '<span class="status-badge status-hadir"><i class="fa-solid fa-circle-check"></i> Hadir</span>';
    } else if (st === 'Terlambat') {
      statusBadge = '<span class="status-badge status-terlambat"><i class="fa-solid fa-clock"></i> Terlambat</span>';
    } else if (st === 'Izin') {
      statusBadge = '<span class="status-badge status-izin"><i class="fa-solid fa-file-lines"></i> Izin</span>';
    } else if (st === 'Sakit') {
      statusBadge = '<span class="status-badge status-sakit"><i class="fa-solid fa-notes-medical"></i> Sakit</span>';
    } else {
      statusBadge = '<span class="status-badge" style="background: #fff1f2; color: #be123c; border-color: #fecdd3;"><i class="fa-solid fa-hourglass-start"></i> Belum Absen</span>';
    }

    const jamDisplay = item.jam !== '-' 
      ? `<span class="tabular-nums" style="font-weight: 600; color: var(--color-text-primary);"><i class="fa-regular fa-clock" style="font-size: 11px; opacity: 0.7;"></i> ${item.jam}</span>` 
      : '<span style="color: var(--color-text-muted); font-style: italic;">-</span>';

    return `
      <tr>
        <td style="text-align: center; font-weight: 600; color: var(--color-text-secondary);">${index + 1}</td>
        <td><span class="tabular-nums font-mono" style="font-weight: 600; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${item.siswa.nis}</span></td>
        <td style="font-weight: 600; color: var(--color-text-primary);">${item.siswa.nama}</td>
        <td><span class="badge-neutral" style="font-size: 11.5px;">${item.siswa.nama_kelas}</span></td>
        <td style="text-align: center;">${jamDisplay}</td>
        <td style="text-align: center;">${statusBadge}</td>
        <td style="font-size: 12px; color: var(--color-text-secondary); max-width: 220px; white-space: normal;">${item.keterangan}</td>
        <td style="text-align: center;">
          <div style="display: inline-flex; gap: 6px; align-items: center; justify-content: center;">
            <button class="btn btn-sm btn-outline btn-metrik-card" onclick="openStudentCardModal(${item.siswa.id})" title="Lihat Kartu QR Siswa Ini" style="padding: 4px 8px; font-size: 11px; white-space: nowrap;">
              <i class="fa-solid fa-id-card"></i> Kartu QR
            </button>
            ${item.absen ? `
              <button class="btn btn-sm btn-danger-outline btn-hapus-absen" onclick="hapusAbsensiSiswa(${item.siswa.id})" title="Hapus Data Absensi (Siswa dapat absen ulang)" style="padding: 4px 8px; font-size: 11px; white-space: nowrap;">
                <i class="fa-solid fa-trash-can"></i> Hapus
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ================= HAPUS ABSENSI SISWA (BISA ABSEN ULANG) =================
function hapusAbsensiSiswa(siswaId) {
  const siswa = state.siswa.find(s => s.id === siswaId);
  const absenIndex = state.absensiHariIni.findIndex(a => a.siswa_id === siswaId);

  if (absenIndex === -1) {
    showToastNotification('Data absensi siswa tidak ditemukan atau sudah dibatalkan.', 'warning');
    return;
  }

  const absenRecord = state.absensiHariIni[absenIndex];
  const namaSiswa = siswa ? siswa.nama : absenRecord.nama;
  const nisSiswa = siswa ? siswa.nis : absenRecord.nis;
  const statusSiswa = absenRecord.status;
  const jamSiswa = absenRecord.jam;

  const konfirmasi = confirm(
    `KONFIRMASI HAPUS DATA PRESENSI:\n\n` +
    `Siswa: ${namaSiswa}\n` +
    `NIS: ${nisSiswa}\n` +
    `Status Kehadiran: ${statusSiswa} (Pukul ${jamSiswa})\n\n` +
    `Apakah Anda yakin ingin menghapus data absensi siswa ini?\n\n` +
    `Setelah dihapus, status siswa kembali menjadi 'Belum Absen' dan siswa dapat melakukan presensi / scan QR kembali hari ini.`
  );

  if (!konfirmasi) return;

  // 1. Hapus catatan absensi dari memori/state lokal
  state.absensiHariIni.splice(absenIndex, 1);
  saveAbsensiToStorage();

  // 2. Jika backend terhubung, sinkronisasikan request DELETE ke server API
  if (state.isBackendConnected) {
    sinkronisasiHapusBackend(absenRecord.id, siswaId);
  }

  // 3. Audio feedback
  playSound('warning');

  // 4. Segarkan seluruh komponen antarmuka yang terdampak
  initDashboardMetrics();
  renderLiveFeed();
  renderRekapTable();
  renderRekapBulanan();
  renderModalMetrikTable();
  updateQuickSimButtons();

  // 5. Sembunyikan banner scan terakhir jika menampilkan siswa ini
  const confirmNamaEl = document.getElementById('confirmNama');
  const lastCard = document.getElementById('lastConfirmCard');
  if (confirmNamaEl && lastCard && confirmNamaEl.textContent === namaSiswa) {
    lastCard.classList.add('hidden');
  }

  // 6. Umpan balik notifikasi toast
  showToastNotification(`Data absensi ${namaSiswa} (${statusSiswa}) berhasil dihapus. Siswa kini dapat absen kembali!`, 'danger');
}
window.hapusAbsensiSiswa = hapusAbsensiSiswa;

// Sinkronisasi hapus ke REST API Laravel (Jika backend dijalankan)
async function sinkronisasiHapusBackend(absensiId, siswaId) {
  try {
    if (absensiId) {
      await fetch(`${state.baseUrl}/public/absensi/${absensiId}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      });
    }
    await fetch(`${state.baseUrl}/public/absensi/siswa/${siswaId}?tanggal=${getTodayStr()}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' }
    });
  } catch (e) {
    console.warn('Gagal sinkronisasi hapus ke backend server:', e);
  }
}

// Komponen notifikasi toast modern
function showToastNotification(message, type = 'info') {
  let container = document.getElementById('appToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'appToastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;

  let icon = '<i class="fa-solid fa-circle-check" style="color: #34d399;"></i>';
  if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation" style="color: #fbbf24;"></i>';
  if (type === 'danger') icon = '<i class="fa-solid fa-trash-can" style="color: #f87171;"></i>';

  toast.innerHTML = `
    ${icon}
    <div style="flex: 1; line-height: 1.4;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastFadeOut 0.3s ease-in forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}
window.showToastNotification = showToastNotification;

// Perbarui label tombol uji cepat simulator agar sesuai status terkini siswa
function updateQuickSimButtons() {
  const btnAdip = document.querySelector('.btn-sim[data-qr="SISWA-0111389549-9fA3kQ"]');
  if (btnAdip) {
    const isAdipAbsen = state.absensiHariIni.some(a => a.siswa_id === 1);
    if (isAdipAbsen) {
      btnAdip.textContent = 'Adip (Sudah Absen)';
      btnAdip.title = 'Siswa sudah tercatat hadir hari ini (klik untuk uji tolak scan ganda)';
      btnAdip.style.opacity = '0.75';
    } else {
      btnAdip.textContent = 'Adip (Scan Ulang)';
      btnAdip.title = 'Absensi dihapus. Klik untuk scan presensi lagi!';
      btnAdip.style.opacity = '1';
    }
  }

  const btnFitri = document.querySelector('.btn-sim[data-qr="SISWA-3117563204-Q7wE1P"]');
  if (btnFitri) {
    const isFitriAbsen = state.absensiHariIni.some(a => a.siswa_id === 4);
    if (isFitriAbsen) {
      btnFitri.textContent = 'Fitri (Terlambat)';
      btnFitri.title = 'Siswa tercatat terlambat hari ini';
      btnFitri.style.opacity = '0.75';
    } else {
      btnFitri.textContent = 'Fitri (Scan Ulang)';
      btnFitri.title = 'Absensi dihapus. Klik untuk scan presensi lagi!';
      btnFitri.style.opacity = '1';
    }
  }
}
window.updateQuickSimButtons = updateQuickSimButtons;

function exportModalMetrikCsv() {
  const data = getFilteredMetrikData();
  if (data.length === 0) {
    alert('Tidak ada data untuk diekspor!');
    return;
  }

  let csvContent = 'No,NIS,Nama Siswa,Kelas,Jenis Kelamin,Jam Masuk,Status,Keterangan\n';
  data.forEach((item, idx) => {
    const s = item.siswa;
    const jk = s.gender === 'L' ? 'Laki-laki' : 'Perempuan';
    const jam = item.jam;
    const status = item.status;
    const ket = (item.keterangan || '').replace(/,/g, ';').replace(/\n/g, ' ');
    csvContent += `${idx + 1},"${s.nis}","${s.nama}","${s.nama_kelas}","${jk}","${jam}","${status}","${ket}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Presensi_${currentMetrikFilterType.toUpperCase()}_${getTodayStr()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ================= LIVE FEED RENDERING =================
function renderLiveFeed() {
  const feedList = document.getElementById('feedList');
  feedList.innerHTML = '';

  const sorted = [...state.absensiHariIni].reverse();
  if (sorted.length === 0) {
    feedList.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--color-text-secondary);">
        <i class="fa-solid fa-qrcode" style="font-size: 32px; margin-bottom: 8px; color: var(--color-text-muted);"></i>
        <div>Belum ada aktivitas scan tercatat hari ini</div>
      </div>
    `;
    return;
  }

  sorted.forEach(item => {
    const initials = item.nama.split(' ').map(n => n[0]).slice(0, 2).join('');
    const statusClass = item.status.toLowerCase();

    const el = document.createElement('div');
    el.className = 'feed-item';
    el.innerHTML = `
      <div class="feed-avatar">${initials}</div>
      <div class="feed-content">
        <div class="feed-name">${item.nama}</div>
        <div class="feed-meta">
          <span>NIS: <strong class="tabular-nums">${item.nis}</strong></span>
          <span class="feed-class-badge">${item.nama_kelas}</span>
          ${item.keterangan ? `<span>· <em>${item.keterangan}</em></span>` : ''}
        </div>
      </div>
      <div class="feed-time-col">
        <span class="feed-time tabular-nums">${item.jam}</span>
        <span class="status-pill ${statusClass}">${item.status}</span>
      </div>
      <button class="btn-feed-delete" onclick="hapusAbsensiSiswa(${item.siswa_id})" title="Hapus catatan presensi ini (Siswa bisa absen ulang)">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    feedList.appendChild(el);
  });
}

// ================= QR SCAN LOGIC (CORE ENGINE) =================
let isScanCooldown = false;
let lastScannedCode = '';
let lastScanTimestamp = 0;
let availableCamerasList = [];
let activeCameraId = null;

/**
 * Mencari siswa secara fleksibel berdasarkan:
 * 1. qr_code lengkap (contoh: SISWA-0111389549-9fA3kQ)
 * 2. NIS siswa (10 digit)
 * 3. NIK siswa (16 digit)
 * 4. Token unik siswa (6 karakter)
 * 5. String / URL yang memuat NIS atau token siswa
 */
function findSiswaByQrOrNis(rawCode) {
  if (!rawCode) return null;
  // Bersihkan karakter kontrol / spasi tak terlihat
  const code = String(rawCode).replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
  if (!code) return null;

  const codeClean = code.replace(/^0+/, ''); // Nomor tanpa awalan angka 0

  // 1. Pencocokan tepat pada qr_code (case-insensitive)
  let s = state.siswa.find(x => x.qr_code && x.qr_code.toLowerCase() === code.toLowerCase());
  if (s) return s;

  // 2. Pencocokan tepat pada NIS (lengkap 10 digit)
  s = state.siswa.find(x => x.nis === code);
  if (s) return s;

  // 3. Pencocokan NIS tanpa awalan 0 (misal barcode mencetak 111389549 bukan 0111389549)
  if (codeClean.length >= 7) {
    s = state.siswa.find(x => x.nis.replace(/^0+/, '') === codeClean);
    if (s) return s;
  }

  // 4. Pencocokan tepat pada NIK (16 digit)
  s = state.siswa.find(x => x.nik && x.nik === code);
  if (s) return s;

  // 5. Pencocokan tepat pada token
  s = state.siswa.find(x => x.token && x.token.toLowerCase() === code.toLowerCase());
  if (s) return s;

  // 6. String memuat NIS siswa (misal barcode scanner membaca URL atau prefix tambahan)
  s = state.siswa.find(x => x.nis && x.nis.length >= 8 && code.includes(x.nis));
  if (s) return s;

  // 7. String memuat token siswa
  s = state.siswa.find(x => x.token && x.token.length >= 5 && code.includes(x.token));
  if (s) return s;

  return null;
}

/**
 * Umpan balik visual real-time di atas viewfinder kamera HUD
 */
function triggerHudFeedback(type, messageText) {
  const hudContainer = document.getElementById('hudContainer');
  const hudBox = document.getElementById('hudTargetBox');
  const hudInstruction = document.getElementById('hudInstruction');
  const floatingAlert = document.getElementById('hudFloatingAlert');

  if (hudBox) {
    hudBox.classList.remove('locked', 'locked-success', 'locked-warning', 'locked-error');
    if (type === 'success') {
      hudBox.classList.add('locked-success');
    } else if (type === 'warning') {
      hudBox.classList.add('locked-warning');
    } else {
      hudBox.classList.add('locked-error');
    }
  }

  if (hudContainer && type === 'success') {
    hudContainer.classList.add('flash-success');
    setTimeout(() => hudContainer.classList.remove('flash-success'), 600);
  }

  if (floatingAlert) {
    floatingAlert.className = `hud-floating-alert ${type} show`;
    floatingAlert.innerHTML = type === 'success' 
      ? `<i class="fa-solid fa-circle-check"></i> <span>${messageText}</span>`
      : type === 'warning'
        ? `<i class="fa-solid fa-triangle-exclamation"></i> <span>${messageText}</span>`
        : `<i class="fa-solid fa-circle-xmark"></i> <span>${messageText}</span>`;
  }

  if (hudInstruction) {
    hudInstruction.textContent = messageText;
  }
}

/**
 * Cooldown anti-flood: mencegah frame video beruntun mendeteksi kartu yang sama berulang kali
 */
function setScanCooldown(durationMs = 2800) {
  isScanCooldown = true;
  setTimeout(() => {
    isScanCooldown = false;
    const hudBox = document.getElementById('hudTargetBox');
    const floatingAlert = document.getElementById('hudFloatingAlert');
    const hudInstruction = document.getElementById('hudInstruction');

    if (hudBox) {
      hudBox.classList.remove('locked', 'locked-success', 'locked-warning', 'locked-error');
    }
    if (floatingAlert) {
      floatingAlert.classList.remove('show');
    }
    if (hudInstruction) {
      hudInstruction.textContent = state.isCameraRunning 
        ? 'Arahkan QR Code Kartu Siswa ke Kamera'
        : 'Klik Aktifkan Kamera untuk Mulai Scan';
    }
  }, durationMs);
}

/**
 * Handler hasil scan dari frame kamera video HTML5 QR
 */
function handleCameraScan(decodedText) {
  if (!decodedText) return;
  const rawCode = String(decodedText).trim();
  if (!rawCode) return;

  console.log('[Terminal Scanner] Barcode/QR berhasil dibaca kamera:', rawCode);

  // Jika sedang masa cooldown setelah scan baru saja berhasil, lewati frame
  if (isScanCooldown) return;

  const now = Date.now();
  // Jika kode yang persis sama diarahkan terus menerus dalam 4 detik, cegah spam
  if (rawCode === lastScannedCode && (now - lastScanTimestamp) < 4000) {
    return;
  }

  lastScannedCode = rawCode;
  lastScanTimestamp = now;

  // Eksekusi input absensi langsung secara instan!
  processScan(rawCode);
}

function processScan(qrCode) {
  const rawCode = String(qrCode || '').trim();
  if (!rawCode) return;

  // 1. Cari siswa berdasarkan kode QR, NIS, token, dsb.
  const siswa = findSiswaByQrOrNis(rawCode);

  if (!siswa) {
    playSound('error');
    console.warn('[Terminal Scanner] Kode barcode tidak cocok dengan siswa manapun:', rawCode);
    triggerHudFeedback('error', `Kode: ${rawCode.length > 18 ? rawCode.substring(0, 18) + '...' : rawCode} (Tidak Terdaftar)`);
    showConfirmationBanner({
      ok: false,
      nama: 'Barcode Tidak Terdaftar',
      sub: `Kode terbaca: ${rawCode}`,
      message: `Barcode / QR Code "${rawCode}" berhasil dibaca kamera, namun belum terdaftar di basis data siswa sekolah.`,
      status: 'DITOLAK',
      type: 'rejected'
    });
    showToastNotification(`⚠️ Barcode "${rawCode}" terbaca kamera, namun tidak terdaftar pada data siswa.`, 'warning');
    setScanCooldown(2200);
    return;
  }

  // 2. Cek apakah sudah absen hari ini (Cegah absensi ganda)
  const existing = state.absensiHariIni.find(a => a.siswa_id === siswa.id);
  if (existing) {
    playSound('warning');
    triggerHudFeedback('warning', `⚠️ ${siswa.nama}: SUDAH ABSEN (${existing.status})`);
    showConfirmationBanner({
      ok: false,
      nama: siswa.nama,
      sub: `NIS: ${siswa.nis} · Kelas ${siswa.nama_kelas} · Tercatat pukul ${existing.jam}`,
      message: `Siswa ini sudah melakukan presensi hari ini (${existing.status}). Scan ganda ditolak.`,
      status: 'SUDAH ABSEN',
      type: 'late'
    });
    setScanCooldown(2500);
    return;
  }

  // 3. Hitung status: Hadir vs Terlambat berdasarkan batas jam server
  const jamServer = getTimeStr();
  const batasTerlambat = state.settings.batas_terlambat || '07:15:00';
  const isTerlambat = jamServer > batasTerlambat;
  const statusKehadiran = isTerlambat ? 'Terlambat' : 'Hadir';

  // 4. Tambah ke record absensi hari ini secara instan
  const newRecord = {
    id: state.absensiHariIni.length + 1,
    siswa_id: siswa.id,
    nama: siswa.nama,
    nis: siswa.nis,
    nama_kelas: siswa.nama_kelas,
    tanggal: getTodayStr(),
    jam: jamServer,
    status: statusKehadiran,
    keterangan: isTerlambat ? 'Terlambat masuk sekolah' : 'Tepat waktu via Kamera Terminal',
    dicatat_oleh: state.currentUser.nama || 'Operator Scanner',
  };

  state.absensiHariIni.push(newRecord);
  saveAbsensiToStorage();

  // 5. Umpan balik audio & visual instan
  playSound(isTerlambat ? 'warning' : 'success');

  // Trigger feedback kamera HUD
  triggerHudFeedback(
    isTerlambat ? 'warning' : 'success', 
    `✓ ${siswa.nama} (${statusKehadiran.toUpperCase()}) - ${jamServer}`
  );

  // Banner konfirmasi di panel kanan
  showConfirmationBanner({
    ok: true,
    nama: siswa.nama,
    sub: `NIS: ${siswa.nis} · Kelas ${siswa.nama_kelas} · Masuk ${jamServer}`,
    message: isTerlambat ? 'Presensi masuk tercatat (Terlambat).' : 'Presensi tepat waktu berhasil dicatat.',
    status: statusKehadiran.toUpperCase(),
    type: isTerlambat ? 'late' : 'success'
  });

  // Notifikasi Toast
  showToastNotification(`✓ Presensi masuk ${siswa.nama} (${statusKehadiran}) berhasil dicatat pukul ${jamServer}!`, isTerlambat ? 'warning' : 'success');

  // Sinkronisasi scan ke backend jika aktif
  if (state.isBackendConnected) {
    try {
      fetch(`${state.baseUrl}/public/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ qr_code: siswa.qr_code || siswa.nis })
      }).catch(e => console.warn('Sync scan backend error:', e));
    } catch(e) {}
  }

  // Segarkan seluruh metrik dan tabel
  initDashboardMetrics();
  renderLiveFeed();
  renderRekapTable();
  renderRekapBulanan();
  renderModalMetrikTable();
  updateQuickSimButtons();

  // Cooldown agar konfirmasi terlihat jelas sebelum siswa selanjutnya scan
  setScanCooldown(2800);
}

function showConfirmationBanner(data) {
  const card = document.getElementById('lastConfirmCard');
  const namaEl = document.getElementById('confirmNama');
  const subEl = document.getElementById('confirmSub');
  const msgEl = document.getElementById('confirmMsg');
  const badgeEl = document.getElementById('confirmBadge');
  const iconEl = document.getElementById('confirmIcon');

  card.className = `last-confirmation-card ${data.type}`;
  namaEl.textContent = data.nama;
  subEl.textContent = data.sub;
  msgEl.textContent = data.message;
  badgeEl.textContent = data.status;

  if (data.type === 'success') {
    iconEl.innerHTML = '<i class="fa-solid fa-check"></i>';
  } else if (data.type === 'late') {
    iconEl.innerHTML = '<i class="fa-solid fa-clock"></i>';
  } else {
    iconEl.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  }

  card.classList.remove('hidden');
}

// ================= SCANNER CONTROLS & CAMERA =================
async function getAvailableCameras() {
  if (!window.Html5Qrcode) return [];
  try {
    const devices = await Html5Qrcode.getCameras();
    availableCamerasList = devices || [];
    return availableCamerasList;
  } catch (err) {
    console.warn('Gagal membaca daftar kamera:', err);
    return [];
  }
}

function setupCameraDropdown(cameras) {
  const row = document.getElementById('cameraSelectRow');
  const select = document.getElementById('selectCameraDevice');
  if (!row || !select) return;

  if (cameras.length > 1) {
    row.style.display = 'block';
    select.innerHTML = cameras.map((c, idx) => 
      `<option value="${c.id}">${c.label || 'Kamera ' + (idx + 1)}</option>`
    ).join('');

    if (activeCameraId) {
      select.value = activeCameraId;
    }

    select.onchange = () => {
      activeCameraId = select.value;
      if (state.isCameraRunning) {
        startCamera(false);
      }
    };
  } else {
    row.style.display = 'none';
  }
}

async function startCamera(isAuto = false) {
  const btn = document.getElementById('btnToggleCamera');
  const kioskBadge = document.getElementById('kioskBadge');
  const hudInstruction = document.getElementById('hudInstruction');
  const hudStartPrompt = document.getElementById('hudStartPrompt');

  if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Membuka Kamera...';

  try {
    if (!window.Html5Qrcode) {
      if (!isAuto) alert('Library kamera HTML5 QR belum termuat.');
      if (btn) btn.innerHTML = '<i class="fa-solid fa-video"></i> Aktifkan Kamera';
      return;
    }

    // Hentikan dan bersihkan instance sebelumnya jika ada
    if (state.html5QrScanner) {
      try {
        if (state.isCameraRunning) {
          await state.html5QrScanner.stop();
        }
        state.html5QrScanner.clear();
      } catch (e) {}
    }

    state.html5QrScanner = new Html5Qrcode("qrReader");

    const scanConfig = {
      fps: 15,
      qrbox: { width: 250, height: 250 }
    };

    const onScanSuccess = (decodedText) => {
      console.log('[Terminal Scanner] Terdeteksi kamera:', decodedText);
      handleCameraScan(decodedText);
    };

    try {
      // Coba buka kamera default / environment
      await state.html5QrScanner.start(
        { facingMode: "environment" },
        scanConfig,
        onScanSuccess,
        () => {}
      );
    } catch (errFacing) {
      console.warn("Mencoba kamera webcam laptop (facingMode 'user'):", errFacing);
      // Fallback ke webcam depan laptop
      await state.html5QrScanner.start(
        { facingMode: "user" },
        scanConfig,
        onScanSuccess,
        () => {}
      );
    }

    state.isCameraRunning = true;
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-video-slash"></i> Matikan Kamera';
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline');
    }
    if (kioskBadge) {
      kioskBadge.className = 'badge-status-kiosk live';
      kioskBadge.innerHTML = '<span class="kiosk-live-dot"></span> LIVE SCANNER AKTIF';
    }
    if (hudInstruction) {
      hudInstruction.textContent = 'Arahkan Barcode / QR Kartu ke Kotak Bidik (Jarak 15-25 cm)';
    }
    if (hudStartPrompt) {
      hudStartPrompt.style.display = 'none';
    }

    showToastNotification('Kamera scanner aktif! Siap menerima absensi barcode kartu.', 'success');

  } catch (err) {
    console.warn("Gagal membuka kamera:", err);
    state.isCameraRunning = false;
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-video"></i> Aktifkan Kamera';
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline');
    }
    if (kioskBadge) {
      kioskBadge.className = 'badge-status-kiosk';
      kioskBadge.textContent = 'STANDBY';
    }
    if (hudStartPrompt) {
      hudStartPrompt.style.display = 'flex';
    }

    if (!isAuto) {
      alert('Tidak dapat mengakses kamera perangkat. Pastikan izin kamera telah diberikan di browser (klik ikon gembok di samping alamat web) atau gunakan tombol "Input Barcode / NIS".');
    }
  }
}

async function stopCamera() {
  const btn = document.getElementById('btnToggleCamera');
  const kioskBadge = document.getElementById('kioskBadge');
  const hudInstruction = document.getElementById('hudInstruction');
  const hudStartPrompt = document.getElementById('hudStartPrompt');

  if (state.html5QrScanner) {
    try {
      if (state.isCameraRunning) {
        await state.html5QrScanner.stop();
      }
    } catch (e) {
      console.warn('Error saat mematikan kamera:', e);
    }
  }

  state.isCameraRunning = false;
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-video"></i> Aktifkan Kamera';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  }
  if (kioskBadge) {
    kioskBadge.className = 'badge-status-kiosk';
    kioskBadge.textContent = 'STANDBY';
  }
  if (hudInstruction) {
    hudInstruction.textContent = 'Arahkan QR Code Kartu ke Kotak Bidik';
  }
  if (hudStartPrompt) {
    hudStartPrompt.style.display = 'flex';
  }
}

function initScannerButtons() {
  // Quick Sim Buttons
  document.querySelectorAll('.btn-sim').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-qr');
      processScan(code);
    });
  });

  // Toggle Camera Button
  const btnToggleCamera = document.getElementById('btnToggleCamera');
  if (btnToggleCamera) {
    btnToggleCamera.addEventListener('click', async () => {
      if (!state.isCameraRunning) {
        startCamera(false);
      } else {
        stopCamera();
      }
    });
  }

  // HUD Container Click to Start
  const hudContainer = document.getElementById('hudContainer');
  if (hudContainer) {
    hudContainer.addEventListener('click', (e) => {
      // Hanya jika kamera belum berjalan
      if (!state.isCameraRunning) {
        startCamera(false);
      }
    });
  }

  // Reset / Kosongkan Seluruh Absensi Hari Ini Button
  const btnReset = document.getElementById('btnResetHariIni');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      const confirmReset = confirm(
        'Kosongkan semua data absensi hari ini?\n\n' +
        'Status seluruh 42 siswa akan kembali menjadi "Belum Absen", sehingga setiap siswa dapat dipindai/scan baru dari awal.'
      );
      if (!confirmReset) return;

      state.absensiHariIni = [];
      saveAbsensiToStorage();
      playSound('warning');

      // Sembunyikan banner konfirmasi scan terakhir
      const lastCard = document.getElementById('lastConfirmCard');
      if (lastCard) lastCard.classList.add('hidden');

      initDashboardMetrics();
      renderLiveFeed();
      renderRekapTable();
      renderRekapBulanan();
      renderModalMetrikTable();
      updateQuickSimButtons();

      showToastNotification('Seluruh data absensi hari ini telah dikosongkan. Siap untuk scan baru!', 'info');
    });
  }

  // Refresh Feed Button
  const btnRefresh = document.getElementById('btnRefreshFeed');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      renderLiveFeed();
      initDashboardMetrics();
    });
  }
}

// Global Hardware Barcode / QR Scanner Gun Listener (USB / Wireless Scanner)
function initHardwareScanner() {
  let hardwareBuffer = '';
  let lastKeyTime = Date.now();

  window.addEventListener('keydown', (e) => {
    const targetTag = (e.target.tagName || '').toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
      if (e.target.id !== 'inputManualQrCode') return;
    }

    const now = Date.now();
    if (now - lastKeyTime > 200) {
      hardwareBuffer = '';
    }
    lastKeyTime = now;

    if (e.key === 'Enter') {
      if (hardwareBuffer.trim().length >= 3) {
        processScan(hardwareBuffer.trim());
        hardwareBuffer = '';
      }
    } else if (e.key && e.key.length === 1) {
      hardwareBuffer += e.key;
    }
  });
}

function initAutoStartCamera() {
  // Percobaan otomatis mengaktifkan kamera setelah antarmuka selesai dimuat
  setTimeout(() => {
    startCamera(true);
  }, 600);
}

// ================= DATA SISWA TABLE & ID CARD PREVIEW =================
function renderSiswaTable() {
  const tbody = document.getElementById('siswaTableBody');
  const filterKId = document.getElementById('selectKelasFilter').value;
  const searchQ = document.getElementById('inputSearchSiswa').value.trim().toLowerCase();

  tbody.innerHTML = '';

  const filtered = state.siswa.filter(s => {
    const matchKelas = !filterKId || s.kelas_id == filterKId;
    const matchSearch = !searchQ || s.nama.toLowerCase().includes(searchQ) || s.nis.includes(searchQ);
    return matchKelas && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-secondary); padding: 24px;">Tidak ada siswa ditemukan</td></tr>`;
    return;
  }

  filtered.forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="tabular-nums">${idx + 1}</td>
      <td class="tabular-nums"><strong>${s.nis}</strong></td>
      <td><strong>${s.nama}</strong></td>
      <td>${s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
      <td><span class="feed-class-badge">${s.nama_kelas}</span></td>
      <td class="tabular-nums" style="font-size: 11px; color: var(--color-text-secondary);">${s.qr_code}</td>
      <td style="text-align: center;">
        <button class="btn btn-sm btn-outline btn-view-card" data-id="${s.id}">
          <i class="fa-solid fa-qrcode"></i> Lihat Kartu QR
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.btn-view-card').forEach(b => {
    b.addEventListener('click', () => {
      const id = parseInt(b.getAttribute('data-id'));
      openStudentCardModal(id);
    });
  });
}

function openStudentCardModal(siswaId) {
  const s = state.siswa.find(item => item.id === siswaId);
  if (!s) return;

  state.selectedSiswaForCard = s;

  document.getElementById('cardNama').textContent = s.nama;
  document.getElementById('cardNis').textContent = s.nis;
  document.getElementById('cardKelas').textContent = s.nama_kelas;
  document.getElementById('cardGender').textContent = s.gender === 'L' ? 'Laki-laki' : 'Perempuan';
  document.getElementById('cardToken').textContent = s.qr_code;
  document.getElementById('cardSchool').textContent = state.settings.nama_sekolah.toUpperCase();
  document.getElementById('cardYear').textContent = `TA. ${state.settings.tahun_ajaran}`;

  // Generate QR Code
  const qrBox = document.getElementById('cardQrContainer');
  qrBox.innerHTML = '';
  new QRCode(qrBox, {
    text: s.qr_code,
    width: 90,
    height: 90,
    colorDark: "#00236f",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });

  document.getElementById('modalCard').classList.add('active');
}

/**
 * Helper untuk menggambar rounded rectangle pada HTML5 Canvas
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Cetak / Ekspor Kartu Siswa Langsung Menjadi File Gambar JPG dengan Ukuran Standar Kartu Pelajar (CR80: 85.6mm x 53.98mm)
 */
function cetakKartuSiswaJpg() {
  const s = state.selectedSiswaForCard;
  if (!s) {
    alert('Pilih siswa terlebih dahulu!');
    return;
  }

  // Ukuran standar kartu pelajar ID-1 / CR80 (85.6 mm x 53.98 mm resolusi cetak tinggi 300 DPI: 1012px x 638px)
  const width = 1012;
  const height = 638;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background utama kartu (putih bersih)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Background gradient halus kartu
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.7, '#f8fafc');
  bgGrad.addColorStop(1, '#edf2f7');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Border kartu luar standar cetak
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, width - 4, height - 4);

  // Header Bar Kartu (Warna Biru Khas SMA Nurul Hasan Sabuntan)
  const headerHeight = 125;
  const headerGrad = ctx.createLinearGradient(0, 0, width, 0);
  headerGrad.addColorStop(0, '#00236f');
  headerGrad.addColorStop(0.6, '#003399');
  headerGrad.addColorStop(1, '#001a53');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, 0, width, headerHeight);

  // Garis aksen emas di bawah header
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(0, headerHeight, width, 6);

  // Load dan gambar logo sekolah
  const logoImg = new Image();
  logoImg.crossOrigin = 'anonymous';
  logoImg.src = 'logo.jpg';

  const finishDrawingAndDownload = () => {
    // 1. Gambar Logo Sekolah di Header
    try {
      if (logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(75, headerHeight / 2, 44, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#f59e0b';
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(logoImg, 31, (headerHeight / 2) - 44, 88, 88);
        ctx.restore();
      }
    } catch (e) {
      console.warn('Gagal render logo sekolah ke canvas', e);
    }

    // 2. Teks Nama Sekolah & Identitas Kartu
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.settings.nama_sekolah.toUpperCase(), 140, 50);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 17px "Inter", Arial, sans-serif';
    ctx.fillText('KARTU IDENTITAS PRESENSI RESMI SISWA', 140, 88);

    // 3. Sisi Kiri: Kotak QR Code
    const qrBoxX = 55;
    const qrBoxY = 165;
    const qrBoxSize = 255;

    // Background kotak putih QR Code
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 12);
    ctx.fill();
    ctx.stroke();

    // Gambar QR Code
    const qrContainer = document.getElementById('cardQrContainer');
    const qrCanvas = qrContainer ? qrContainer.querySelector('canvas') : null;
    const qrImage = qrContainer ? qrContainer.querySelector('img') : null;

    if (qrCanvas) {
      ctx.drawImage(qrCanvas, qrBoxX + 16, qrBoxY + 16, qrBoxSize - 32, qrBoxSize - 32);
    } else if (qrImage && qrImage.complete && qrImage.naturalWidth > 0) {
      ctx.drawImage(qrImage, qrBoxX + 16, qrBoxY + 16, qrBoxSize - 32, qrBoxSize - 32);
    }

    // Kode Token di bawah QR
    ctx.fillStyle = '#00236f';
    ctx.font = 'bold 16px "JetBrains Mono", Courier, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(s.qr_code, qrBoxX + (qrBoxSize / 2), qrBoxY + qrBoxSize + 32);

    // 4. Sisi Kanan: Biodata Siswa
    const bioX = 355;
    let bioY = 195;

    // Nama Siswa
    ctx.textAlign = 'left';
    ctx.fillStyle = '#00236f';
    ctx.font = 'bold 34px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText(s.nama, bioX, bioY);

    // Garis aksen bawah nama
    bioY += 16;
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(bioX, bioY, 480, 4);

    // Data Biodata Baris per Baris
    bioY += 46;
    const drawBioItem = (label, value) => {
      ctx.font = '600 22px "Inter", Arial, sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(label, bioX, bioY);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px "Inter", Arial, sans-serif';
      ctx.fillText(`:  ${value}`, bioX + 175, bioY);
      bioY += 46;
    };

    drawBioItem('NIS', s.nis);
    drawBioItem('Kelas', s.nama_kelas);
    drawBioItem('Jenis Kelamin', s.gender === 'L' ? 'Laki-laki' : 'Perempuan');
    drawBioItem('Status', 'Siswa Aktif Terdaftar');

    // 5. Footer Kartu
    const footerY = height - 54;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, footerY, width, 54);

    ctx.fillStyle = '#475569';
    ctx.font = '500 16px "Inter", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Berlaku resmi selama menjadi siswa aktif', 40, footerY + 27);

    ctx.textAlign = 'right';
    ctx.font = 'bold 16px "Inter", Arial, sans-serif';
    ctx.fillStyle = '#00236f';
    ctx.fillText(`Tahun Ajaran: ${state.settings.tahun_ajaran}`, width - 40, footerY + 27);

    // 6. Langsung trigger unduhan file JPG
    try {
      const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const downloadLink = document.createElement('a');
      downloadLink.href = jpgDataUrl;
      downloadLink.download = `Kartu_Siswa_${s.nis}_${s.nama.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error('Error export canvas to JPG', err);
      alert('Kartu gagal diekspor ke JPG. Pastikan browser mendukung Canvas export.');
    }
  };

  if (logoImg.complete && logoImg.naturalWidth > 0) {
    finishDrawingAndDownload();
  } else {
    logoImg.onload = finishDrawingAndDownload;
    logoImg.onerror = finishDrawingAndDownload;
  }
}

// ================= REKAP BULANAN PER SISWA & MATRIKS KEHADIRAN =================

const NAMA_BULAN = [
  '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Hash deterministik untuk generator kehadiran offline yang konsisten
 */
function getDeterministicHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Render Matriks Rekap Kehadiran Bulanan per Siswa
 */
async function renderRekapBulanan() {
  const bulanEl = document.getElementById('selectRekapBulan');
  const tahunEl = document.getElementById('selectRekapTahun');
  const kelasEl = document.getElementById('selectRekapBulananKelas');
  const searchEl = document.getElementById('inputSearchRekapBulanan');

  if (!bulanEl || !tahunEl) return;

  const bulan = parseInt(bulanEl.value) || 10;
  const tahun = parseInt(tahunEl.value) || 2026;
  const kelasId = kelasEl ? kelasEl.value : '';
  const searchQ = searchEl ? searchEl.value.trim().toLowerCase() : '';

  const thead = document.getElementById('matrixTableHead');
  const tbody = document.getElementById('matrixTableBody');
  if (!thead || !tbody) return;

  const daysInMonth = new Date(tahun, bulan, 0).getDate();
  const today = new Date();
  const isCurrentMonthYear = (today.getMonth() + 1 === bulan && today.getFullYear() === tahun);
  const currentDayNum = today.getDate();

  // 1. Render Header Table
  let headerHtml = `
    <tr>
      <th class="col-sticky col-no">No</th>
      <th class="col-sticky col-nis">NIS</th>
      <th class="col-sticky col-nama">Nama Siswa</th>
      <th style="min-width: 100px;">Kelas</th>
  `;

  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = new Date(tahun, bulan - 1, d).getDay(); // 0 = Minggu
    const isSunday = (dayOfWeek === 0);
    const isToday = isCurrentMonthYear && (d === currentDayNum);
    const styleAttr = isToday ? 'style="background: #e0e7ff; color: #1e3a8a; font-weight: 700;"' : '';
    headerHtml += `<th class="cell-date-hdr ${isSunday ? 'cell-sunday-hdr' : ''}" ${styleAttr} title="Tgl ${d} ${NAMA_BULAN[bulan]} ${isSunday ? '(Minggu / Libur)' : ''}">${d}</th>`;
  }

  headerHtml += `
      <th title="Total Hadir (H)" style="background: #dcfce7; color: #15803d;">H</th>
      <th title="Total Terlambat (T)" style="background: #fef3c7; color: #b45309;">T</th>
      <th title="Total Izin (I)" style="background: #dbeafe; color: #1d4ed8;">I</th>
      <th title="Total Sakit (S)" style="background: #ede9fe; color: #6d28d9;">S</th>
      <th title="Total Alpa (A)" style="background: #ffe4e6; color: #be123c;">A</th>
      <th style="min-width: 120px;">% Kehadiran</th>
      <th style="min-width: 90px; text-align: center;">Aksi</th>
    </tr>
  `;
  thead.innerHTML = headerHtml;

  // 2. Filter Siswa
  const filteredSiswa = state.siswa.filter(s => {
    const matchKelas = !kelasId || s.kelas_id == kelasId;
    const matchSearch = !searchQ || s.nama.toLowerCase().includes(searchQ) || s.nis.includes(searchQ);
    return matchKelas && matchSearch;
  });

  if (filteredSiswa.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${daysInMonth + 11}" style="text-align: center; color: var(--color-text-secondary); padding: 30px;">Tidak ada data siswa ditemukan untuk kriteria ini.</td></tr>`;
    return;
  }

  // 3. Render Baris Siswa & Agregasi Statistik
  tbody.innerHTML = '';
  let grandTotalH = 0;
  let grandTotalT = 0;
  let grandTotalI = 0;
  let grandTotalS = 0;
  let grandTotalA = 0;
  let totalPersenSum = 0;

  filteredSiswa.forEach((s, idx) => {
    let countH = 0;
    let countT = 0;
    let countI = 0;
    let countS = 0;
    let countA = 0;

    let rowDaysHtml = '';

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(tahun, bulan - 1, d);
      const isSunday = (dayDate.getDay() === 0);

      if (isSunday) {
        rowDaysHtml += `<td class="cell-date-val cell-sunday"><span class="badge-off">-</span></td>`;
        continue;
      }

      // Tentukan status presensi siswa ini pada hari tsb
      let statusChar = 'H';
      let badgeClass = 'badge-h';

      // Jika hari ini, cek absensiHariIni
      if (isCurrentMonthYear && d === currentDayNum) {
        const todayRec = state.absensiHariIni.find(a => a.siswa_id === s.id);
        if (todayRec) {
          if (todayRec.status === 'Hadir') { statusChar = 'H'; badgeClass = 'badge-h'; countH++; }
          else if (todayRec.status === 'Terlambat') { statusChar = 'T'; badgeClass = 'badge-t'; countT++; }
          else if (todayRec.status === 'Izin') { statusChar = 'I'; badgeClass = 'badge-i'; countI++; }
          else if (todayRec.status === 'Sakit') { statusChar = 'S'; badgeClass = 'badge-s'; countS++; }
          else { statusChar = 'A'; badgeClass = 'badge-a'; countA++; }
        } else {
          // Belum absen hari ini
          statusChar = '-';
          badgeClass = 'badge-off';
        }
      } else if (isCurrentMonthYear && d > currentDayNum) {
        // Hari masa depan di bulan berjalan
        statusChar = '-';
        badgeClass = 'badge-off';
      } else {
        // Riwayat lampau (deterministik realistis)
        const hash = getDeterministicHash(`${s.nis}_${tahun}_${bulan}_${d}`) % 100;
        if (hash < 75) {
          statusChar = 'H'; badgeClass = 'badge-h'; countH++;
        } else if (hash < 88) {
          statusChar = 'T'; badgeClass = 'badge-t'; countT++;
        } else if (hash < 93) {
          statusChar = 'I'; badgeClass = 'badge-i'; countI++;
        } else if (hash < 97) {
          statusChar = 'S'; badgeClass = 'badge-s'; countS++;
        } else {
          statusChar = 'A'; badgeClass = 'badge-a'; countA++;
        }
      }

      rowDaysHtml += `<td class="cell-date-val"><span class="${badgeClass}" title="Tgl ${d}: ${statusChar}">${statusChar}</span></td>`;
    }

    const totalHadirMasuk = countH + countT;
    const totalHariEfektif = totalHadirMasuk + countI + countS + countA;
    const persen = totalHariEfektif > 0 ? Math.round((totalHadirMasuk / totalHariEfektif) * 1000) / 10 : 100;

    grandTotalH += countH;
    grandTotalT += countT;
    grandTotalI += countI;
    grandTotalS += countS;
    grandTotalA += countA;
    totalPersenSum += persen;

    let barColor = 'persen-bar-green';
    let textClass = 'text-green';
    if (persen < 75) {
      barColor = 'persen-bar-rose';
      textClass = 'text-rose';
    } else if (persen < 85) {
      barColor = 'persen-bar-amber';
      textClass = 'text-amber';
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-sticky col-no tabular-nums">${idx + 1}</td>
      <td class="col-sticky col-nis tabular-nums">${s.nis}</td>
      <td class="col-sticky col-nama"><strong>${s.nama}</strong></td>
      <td><span class="feed-class-badge">${s.nama_kelas}</span></td>
      ${rowDaysHtml}
      <td class="cell-rekap-val" style="color: #15803d;">${countH}</td>
      <td class="cell-rekap-val" style="color: #b45309;">${countT}</td>
      <td class="cell-rekap-val" style="color: #1d4ed8;">${countI}</td>
      <td class="cell-rekap-val" style="color: #6d28d9;">${countS}</td>
      <td class="cell-rekap-val" style="color: #be123c;">${countA}</td>
      <td class="cell-persen">
        <div class="persen-badge-box">
          <span class="persen-label ${textClass}">${persen}%</span>
          <div class="persen-bar-bg">
            <div class="persen-bar-fill ${barColor}" style="width: ${Math.min(persen, 100)}%;"></div>
          </div>
        </div>
      </td>
      <td style="text-align: center;">
        <button class="btn btn-sm btn-outline btn-rapor-siswa" data-id="${s.id}" title="Lihat Raport 12 Bulan Siswa Ini">
          <i class="fa-solid fa-user-graduate"></i> Raport
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // 4. Update Summary Cards
  const avgPersen = filteredSiswa.length > 0 ? (totalPersenSum / filteredSiswa.length).toFixed(1) : 0;
  const avgEl = document.getElementById('sumAvgPersen');
  const sumHEl = document.getElementById('sumTotalHadir');
  const sumTEl = document.getElementById('sumTotalTerlambat');
  const sumISEl = document.getElementById('sumTotalIzinSakit');
  const sumAEl = document.getElementById('sumTotalAlpa');

  if (avgEl) avgEl.textContent = `${avgPersen}%`;
  if (sumHEl) sumHEl.textContent = grandTotalH;
  if (sumTEl) sumTEl.textContent = grandTotalT;
  if (sumISEl) sumISEl.textContent = `${grandTotalI} / ${grandTotalS}`;
  if (sumAEl) sumAEl.textContent = grandTotalA;

  // 5. Attach Rapor Modal Listeners
  document.querySelectorAll('.btn-rapor-siswa').forEach(btn => {
    btn.addEventListener('click', () => {
      const siswaId = parseInt(btn.getAttribute('data-id'));
      openStudentRaporModal(siswaId);
    });
  });
}

const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/**
 * Buka Modal Rapor Presensi Siswa per Periode (Pilihan Bulan Tertentu atau 1 Tahun)
 */
function openStudentRaporModal(siswaId) {
  const siswa = state.siswa.find(item => item.id === siswaId);
  if (!siswa) return;

  state.selectedSiswaForRapor = siswa;

  // Sinkronkan default bulan & tahun dengan filter rekap dashboard saat ini
  const filterBulanEl = document.getElementById('selectRekapBulan');
  const defaultBulan = filterBulanEl ? parseInt(filterBulanEl.value) : 2; // Default Februari jika tersedia

  const filterTahunEl = document.getElementById('selectRekapTahun');
  const defaultTahun = filterTahunEl ? parseInt(filterTahunEl.value) : 2026;

  // Set nilai dropdown modal (Default ke Ringkasan 12 Bulan agar guru dapat memilih aksi per bulan)
  const modeEl = document.getElementById('selectRaporMode');
  if (modeEl) modeEl.value = 'tahunan';

  const selectBulanTarget = document.getElementById('selectRaporBulanTarget');
  if (selectBulanTarget) selectBulanTarget.value = String(defaultBulan);

  const selectTahunTarget = document.getElementById('selectRaporTahunTarget');
  if (selectTahunTarget) selectTahunTarget.value = String(defaultTahun);

  // Set profil dasar
  document.getElementById('raporNama').textContent = siswa.nama;
  document.getElementById('raporNis').textContent = siswa.nis;
  document.getElementById('raporKelas').textContent = siswa.nama_kelas;

  const parts = siswa.nama.split(' ').filter(Boolean);
  const initials = parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
  document.getElementById('raporAvatar').textContent = initials;

  // Update tanggal cetak resmi saat ini
  const printDateEl = document.getElementById('printDateNow');
  if (printDateEl) {
    const dNow = new Date();
    printDateEl.textContent = `${dNow.getDate()} ${NAMA_BULAN[dNow.getMonth() + 1]} ${dNow.getFullYear()}`;
  }

  // Render isi tabel & metrik sesuai filter yang aktif
  renderRaporContent();

  document.getElementById('modalRaporSiswa').classList.add('active');
}

/**
 * Render Konten Rapor Presensi Siswa (Bulanan Harian vs Tahunan)
 */
function renderRaporContent() {
  const s = state.selectedSiswaForRapor;
  if (!s) return;

  const mode = document.getElementById('selectRaporMode')?.value || 'bulanan';
  const bulan = parseInt(document.getElementById('selectRaporBulanTarget')?.value) || 2;
  const tahun = parseInt(document.getElementById('selectRaporTahunTarget')?.value) || 2026;

  const boxHarian = document.getElementById('boxTableHarianBulanan');
  const boxTahunan = document.getElementById('boxTableTahunan');
  const boxSelectBulan = document.getElementById('boxRaporSelectBulan');

  if (mode === 'bulanan') {
    // Mode BULAN TERTENTU (misal Februari)
    if (boxSelectBulan) boxSelectBulan.style.display = 'flex';
    if (boxHarian) boxHarian.style.display = 'block';
    if (boxTahunan) boxTahunan.style.display = 'none';

    const namaBulan = NAMA_BULAN[bulan] || 'Februari';
    const periodeStr = `${namaBulan} ${tahun}`;

    document.getElementById('raporPeriodeText').textContent = periodeStr;
    document.getElementById('raporScoreLabel').textContent = `KEHADIRAN ${namaBulan.toUpperCase()}`;

    if (document.getElementById('printDocTitle')) {
      document.getElementById('printDocTitle').textContent = `LEMBAR REKAPITULASI PRESENSI SISWA - BULAN ${namaBulan.toUpperCase()} ${tahun}`;
    }

    const daysInMonth = new Date(tahun, bulan, 0).getDate();
    let countH = 0, countT = 0, countI = 0, countS = 0, countA = 0;
    const tbodyHarian = document.getElementById('tbodyRaporHarian');
    tbodyHarian.innerHTML = '';

    let noUrut = 1;
    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(tahun, bulan - 1, d);
      const dayOfWeek = dayDate.getDay();
      const namaHari = NAMA_HARI[dayOfWeek];
      const tglFormatted = `${String(d).padStart(2, '0')}/${String(bulan).padStart(2, '0')}/${tahun}`;

      if (dayOfWeek === 0) {
        // Hari Libur Akhir Pekan (Minggu)
        const tr = document.createElement('tr');
        tr.style.background = '#f8fafc';
        tr.style.color = '#94a3b8';
        tr.innerHTML = `
          <td style="text-align: center; color: #94a3b8;">-</td>
          <td>${namaHari}, ${tglFormatted}</td>
          <td style="text-align: center;">-</td>
          <td style="text-align: center;"><span class="badge-off" style="padding: 2px 8px; border-radius: 12px; font-size: 11px;">Libur</span></td>
          <td style="font-size: 12px; font-style: italic;">Libur Akhir Pekan</td>
        `;
        tbodyHarian.appendChild(tr);
        continue;
      }

      const hash = getDeterministicHash(`${s.nis}_${tahun}_${bulan}_${d}`) % 100;
      let status = 'Hadir';
      let jamMasuk = '06:45 WIB';
      let ket = 'Hadir tepat waktu';
      let badgeClass = 'hadir';

      const menitRandom = (getDeterministicHash(`min_${s.nis}_${d}`) % 25);

      if (hash < 76) {
        status = 'Hadir';
        jamMasuk = `06:${String(30 + (menitRandom % 25)).padStart(2, '0')} WIB`;
        ket = 'Hadir tepat waktu';
        badgeClass = 'hadir';
        countH++;
      } else if (hash < 89) {
        status = 'Terlambat';
        const lateMenit = 10 + (menitRandom % 20);
        jamMasuk = `07:${String(lateMenit).padStart(2, '0')} WIB`;
        ket = `Terlambat ${lateMenit} menit`;
        badgeClass = 'terlambat';
        countT++;
      } else if (hash < 94) {
        status = 'Izin';
        jamMasuk = '-';
        ket = 'Surat izin urusan keluarga terlampir';
        badgeClass = 'izin';
        countI++;
      } else if (hash < 98) {
        status = 'Sakit';
        jamMasuk = '-';
        ket = 'Surat keterangan sakit dari dokter/puskesmas';
        badgeClass = 'sakit';
        countS++;
      } else {
        status = 'Alpa';
        jamMasuk = '-';
        ket = 'Tanpa keterangan / tidak hadir';
        badgeClass = 'alpa';
        countA++;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="tabular-nums" style="text-align: center;">${noUrut++}</td>
        <td><strong>${namaHari}</strong>, ${tglFormatted}</td>
        <td class="tabular-nums" style="text-align: center; font-weight: 500;">${jamMasuk}</td>
        <td style="text-align: center;"><span class="status-pill ${badgeClass}">${status}</span></td>
        <td style="font-size: 12.5px;">${ket}</td>
      `;
      tbodyHarian.appendChild(tr);
    }

    const totalMasuk = countH + countT;
    const totalHariEfektif = totalMasuk + countI + countS + countA;
    const persen = totalHariEfektif > 0 ? ((totalMasuk / totalHariEfektif) * 100).toFixed(1) : 0;

    // Render Footer Harian
    const tfootHarian = document.getElementById('tfootRaporHarian');
    if (tfootHarian) {
      tfootHarian.innerHTML = `
        <tr>
          <td colspan="2" style="text-align: right; padding-right: 12px; font-weight: 800;">TOTAL REKAP ${namaBulan.toUpperCase()} ${tahun}:</td>
          <td colspan="2" style="text-align: center; font-weight: 800; color: #15803d;">H: ${countH} | T: ${countT} | I: ${countI} | S: ${countS} | A: ${countA}</td>
          <td style="font-weight: 800; color: var(--color-primary);">${persen}% Kehadiran (${totalMasuk} dari ${totalHariEfektif} hari efektif)</td>
        </tr>
      `;
    }

    // Update Mini badges & overall score
    document.getElementById('raporTotalH').textContent = countH;
    document.getElementById('raporTotalT').textContent = countT;
    document.getElementById('raporTotalI').textContent = countI;
    document.getElementById('raporTotalS').textContent = countS;
    document.getElementById('raporTotalA').textContent = countA;
    document.getElementById('raporPersenTahunan').textContent = `${persen}%`;

    const scoreBadge = document.getElementById('raporScoreBadge');
    if (scoreBadge) {
      if (persen >= 90) {
        scoreBadge.textContent = 'Sangat Disiplin';
        scoreBadge.style.background = '#dcfce7';
        scoreBadge.style.color = '#15803d';
      } else if (persen >= 80) {
        scoreBadge.textContent = 'Baik';
        scoreBadge.style.background = '#dbeafe';
        scoreBadge.style.color = '#1e40af';
      } else if (persen >= 70) {
        scoreBadge.textContent = 'Cukup';
        scoreBadge.style.background = '#fef3c7';
        scoreBadge.style.color = '#b45309';
      } else {
        scoreBadge.textContent = 'Perlu Pembinaan';
        scoreBadge.style.background = '#ffe4e6';
        scoreBadge.style.color = '#be123c';
      }
    }

  } else {
    // Mode TAHUNAN (12 Bulan Penuh)
    if (boxSelectBulan) boxSelectBulan.style.display = 'none';
    if (boxHarian) boxHarian.style.display = 'none';
    if (boxTahunan) boxTahunan.style.display = 'block';

    document.getElementById('raporPeriodeText').textContent = `Tahun ${tahun} (Januari - Desember)`;
    document.getElementById('raporScoreLabel').textContent = 'RATA-RATA TAHUNAN';

    if (document.getElementById('printDocTitle')) {
      document.getElementById('printDocTitle').textContent = `LEMBAR REKAPITULASI PRESENSI SISWA - TAHUN ${tahun}`;
    }

    const tbody = document.getElementById('tbodyRaporBulanan');
    tbody.innerHTML = '';

    let totalHadirTahun = 0, totalTerlambatTahun = 0, totalIzinTahun = 0, totalSakitTahun = 0, totalAlpaTahun = 0;

    for (let b = 1; b <= 12; b++) {
      const daysInMonth = new Date(tahun, b, 0).getDate();
      let bHadir = 0, bTerlambat = 0, bIzin = 0, bSakit = 0, bAlpa = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        const dayDate = new Date(tahun, b - 1, d);
        if (dayDate.getDay() === 0) continue;

        const hash = getDeterministicHash(`${s.nis}_${tahun}_${b}_${d}`) % 100;
        if (hash < 76) bHadir++;
        else if (hash < 89) bTerlambat++;
        else if (hash < 94) bIzin++;
        else if (hash < 98) bSakit++;
        else bAlpa++;
      }

      const totalMasuk = bHadir + bTerlambat;
      const totalHari = totalMasuk + bIzin + bSakit + bAlpa;
      const persenBulan = totalHari > 0 ? ((totalMasuk / totalHari) * 100).toFixed(1) : 0;

      totalHadirTahun += bHadir;
      totalTerlambatTahun += bTerlambat;
      totalIzinTahun += bIzin;
      totalSakitTahun += bSakit;
      totalAlpaTahun += bAlpa;

      let kepatuhanBadge = '<span class="status-pill hadir">Sangat Disiplin</span>';
      if (persenBulan < 75) {
        kepatuhanBadge = '<span class="status-pill alpa">Perlu Pembinaan</span>';
      } else if (persenBulan < 85) {
        kepatuhanBadge = '<span class="status-pill terlambat">Cukup</span>';
      } else if (persenBulan < 92) {
        kepatuhanBadge = '<span class="status-pill izin">Baik</span>';
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="tabular-nums" style="text-align: center;">${b}</td>
        <td><strong>${NAMA_BULAN[b]} ${tahun}</strong></td>
        <td class="tabular-nums" style="text-align: center; color: #15803d; font-weight: 600;">${bHadir}</td>
        <td class="tabular-nums" style="text-align: center; color: #b45309; font-weight: 600;">${bTerlambat}</td>
        <td class="tabular-nums" style="text-align: center; color: #1d4ed8; font-weight: 600;">${bIzin}</td>
        <td class="tabular-nums" style="text-align: center; color: #6d28d9; font-weight: 600;">${bSakit}</td>
        <td class="tabular-nums" style="text-align: center; color: #be123c; font-weight: 600;">${bAlpa}</td>
        <td class="tabular-nums" style="text-align: center; font-weight: 600;">${totalHari} hari</td>
        <td class="tabular-nums" style="text-align: center; font-weight: 700; color: var(--color-primary);">${persenBulan}%</td>
        <td>${kepatuhanBadge}</td>
        <td style="text-align: center; white-space: nowrap; padding: 5px 6px;">
          <button class="btn btn-sm btn-word btn-rekap-word-item" data-bulan="${b}" title="Ekspor Rekap ${NAMA_BULAN[b]} ${tahun} ke Dokumen Word (.doc)" style="padding: 3px 8px; font-size: 11px;">
            <i class="fa-solid fa-file-word"></i> Word
          </button>
          <button class="btn btn-sm btn-excel btn-rekap-excel-item" data-bulan="${b}" title="Ekspor Rekap ${NAMA_BULAN[b]} ${tahun} ke Lembar Kerja Excel (.xls)" style="padding: 3px 8px; font-size: 11px; margin-left: 2px;">
            <i class="fa-solid fa-file-excel"></i> Excel
          </button>
          <button class="btn btn-sm btn-primary btn-rekap-print-item" data-bulan="${b}" title="Cetak Rekap Resmi ${NAMA_BULAN[b]} ${tahun}" style="padding: 3px 8px; font-size: 11px; margin-left: 2px;">
            <i class="fa-solid fa-print"></i> Cetak
          </button>
          <button class="btn btn-sm btn-outline btn-rekap-detail-item" data-bulan="${b}" title="Lihat Hasil Absen Harian ${NAMA_BULAN[b]} ${tahun}" style="padding: 3px 8px; font-size: 11px; margin-left: 2px;">
            <i class="fa-solid fa-calendar-day"></i> Rincian
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    }

    // Attach listeners untuk tombol aksi per bulan (Word, Excel, Cetak, Rincian)
    tbody.querySelectorAll('.btn-rekap-word-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const bln = parseInt(btn.getAttribute('data-bulan'));
        exportRaporWordSpesifik(s, bln, tahun);
      });
    });

    tbody.querySelectorAll('.btn-rekap-excel-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const bln = parseInt(btn.getAttribute('data-bulan'));
        exportRaporExcelSpesifik(s, bln, tahun);
      });
    });

    tbody.querySelectorAll('.btn-rekap-print-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const bln = parseInt(btn.getAttribute('data-bulan'));
        printRaporBulanSpesifik(s, bln, tahun);
      });
    });

    tbody.querySelectorAll('.btn-rekap-detail-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const bln = parseInt(btn.getAttribute('data-bulan'));
        viewRaporBulanSpesifik(bln);
      });
    });

    const totalMasukTahun = totalHadirTahun + totalTerlambatTahun;
    const totalHariTahun = totalMasukTahun + totalIzinTahun + totalSakitTahun + totalAlpaTahun;
    const persenTahun = totalHariTahun > 0 ? ((totalMasukTahun / totalHariTahun) * 100).toFixed(1) : 0;

    const tfoot = document.getElementById('tfootRaporBulanan');
    if (tfoot) {
      tfoot.innerHTML = `
        <tr>
          <td colspan="2" style="text-align: right; padding-right: 12px; font-weight: 800;">TOTAL AKUMULASI TAHUNAN:</td>
          <td style="text-align: center; color: #15803d; font-weight: 800;">${totalHadirTahun}</td>
          <td style="text-align: center; color: #b45309; font-weight: 800;">${totalTerlambatTahun}</td>
          <td style="text-align: center; color: #1d4ed8; font-weight: 800;">${totalIzinTahun}</td>
          <td style="text-align: center; color: #6d28d9; font-weight: 800;">${totalSakitTahun}</td>
          <td style="text-align: center; color: #be123c; font-weight: 800;">${totalAlpaTahun}</td>
          <td style="text-align: center; font-weight: 800;">${totalHariTahun} hari</td>
          <td style="text-align: center; font-weight: 800; color: var(--color-primary);">${persenTahun}%</td>
          <td style="font-weight: 800; color: #15803d;">Tuntas Evaluasi</td>
          <td style="text-align: center; font-weight: 700; color: var(--color-text-secondary); font-size: 11px;">12 Bulan Tersedia</td>
        </tr>
      `;
    }

    document.getElementById('raporTotalH').textContent = totalHadirTahun;
    document.getElementById('raporTotalT').textContent = totalTerlambatTahun;
    document.getElementById('raporTotalI').textContent = totalIzinTahun;
    document.getElementById('raporTotalS').textContent = totalSakitTahun;
    document.getElementById('raporTotalA').textContent = totalAlpaTahun;
    document.getElementById('raporPersenTahunan').textContent = `${persenTahun}%`;

    const scoreBadge = document.getElementById('raporScoreBadge');
    if (scoreBadge) {
      if (persenTahun >= 90) {
        scoreBadge.textContent = 'Sangat Baik';
        scoreBadge.style.background = '#dcfce7';
        scoreBadge.style.color = '#15803d';
      } else if (persenTahun >= 75) {
        scoreBadge.textContent = 'Cukup Baik';
        scoreBadge.style.background = '#fef3c7';
        scoreBadge.style.color = '#b45309';
      } else {
        scoreBadge.textContent = 'Perlu Perhatian';
        scoreBadge.style.background = '#ffe4e6';
        scoreBadge.style.color = '#be123c';
      }
    }
  }
}

/**
 * Lihat Rincian Absen Harian Khusus Bulan Tertentu
 */
function viewRaporBulanSpesifik(bulan) {
  const selectMode = document.getElementById('selectRaporMode');
  if (selectMode) selectMode.value = 'bulanan';
  const selectBulan = document.getElementById('selectRaporBulanTarget');
  if (selectBulan) selectBulan.value = String(bulan);

  const labelRincian = document.getElementById('labelRincianBulanAktif');
  const tahun = parseInt(document.getElementById('selectRaporTahunTarget')?.value) || 2026;
  if (labelRincian) {
    labelRincian.textContent = `Rincian Harian: ${NAMA_BULAN[bulan]} ${tahun}`;
  }

  renderRaporContent();
}

/**
 * Cetak Resmi Rekap Presensi Khusus Bulan Tertentu
 */
function printRaporBulanSpesifik(s, bulan, tahun) {
  const selectMode = document.getElementById('selectRaporMode');
  if (selectMode) selectMode.value = 'bulanan';
  const selectBulan = document.getElementById('selectRaporBulanTarget');
  if (selectBulan) selectBulan.value = String(bulan);

  renderRaporContent();
  window.print();
}

/**
 * Ekspor Rekap Presensi Khusus Bulan Tertentu ke Microsoft Word (.doc)
 */
function exportRaporWordSpesifik(s, bulan, tahun) {
  const dNow = new Date();
  const tanggalHariIni = `${dNow.getDate()} ${NAMA_BULAN[dNow.getMonth() + 1]} ${dNow.getFullYear()}`;
  const namaBulan = NAMA_BULAN[bulan] || 'Februari';

  const judulLaporan = `LEMBAR REKAPITULASI PRESENSI SISWA - BULAN ${namaBulan.toUpperCase()} ${tahun}`;
  const periodeInfo = `${namaBulan} ${tahun}`;
  const downloadFilename = `Rekap_Presensi_${s.nis}_${s.nama.replace(/\s+/g, '_')}_${namaBulan}_${tahun}.doc`;

  const daysInMonth = new Date(tahun, bulan, 0).getDate();
  let countH = 0, countT = 0, countI = 0, countS = 0, countA = 0;
  let noUrut = 1;
  let tableBodyHtml = '';

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(tahun, bulan - 1, d);
    const dayOfWeek = dayDate.getDay();
    const namaHari = NAMA_HARI[dayOfWeek];
    const tglFormatted = `${String(d).padStart(2, '0')}/${String(bulan).padStart(2, '0')}/${tahun}`;

    if (dayOfWeek === 0) {
      tableBodyHtml += `
        <tr style="background-color: #f8fafc; color: #64748b;">
          <td align="center">-</td>
          <td>${namaHari}, ${tglFormatted}</td>
          <td align="center">-</td>
          <td align="center"><em>Libur</em></td>
          <td>Libur Akhir Pekan</td>
        </tr>
      `;
      continue;
    }

    const hash = getDeterministicHash(`${s.nis}_${tahun}_${bulan}_${d}`) % 100;
    let status = 'Hadir';
    let jamMasuk = '06:45 WIB';
    let ket = 'Hadir tepat waktu';
    let colorStatus = '#166534';
    const menitRandom = (getDeterministicHash(`min_${s.nis}_${d}`) % 25);

    if (hash < 76) {
      status = 'Hadir';
      jamMasuk = `06:${String(30 + (menitRandom % 25)).padStart(2, '0')} WIB`;
      ket = 'Hadir tepat waktu';
      colorStatus = '#166534';
      countH++;
    } else if (hash < 89) {
      status = 'Terlambat';
      const lateMenit = 10 + (menitRandom % 20);
      jamMasuk = `07:${String(lateMenit).padStart(2, '0')} WIB`;
      ket = `Terlambat ${lateMenit} menit`;
      colorStatus = '#b45309';
      countT++;
    } else if (hash < 94) {
      status = 'Izin';
      jamMasuk = '-';
      ket = 'Surat izin keperluan keluarga';
      colorStatus = '#1e40af';
      countI++;
    } else if (hash < 98) {
      status = 'Sakit';
      jamMasuk = '-';
      ket = 'Surat keterangan sakit dokter/puskesmas';
      colorStatus = '#6d28d9';
      countS++;
    } else {
      status = 'Alpa';
      jamMasuk = '-';
      ket = 'Tanpa keterangan';
      colorStatus = '#9f1239';
      countA++;
    }

    tableBodyHtml += `
      <tr>
        <td align="center">${noUrut++}</td>
        <td><strong>${namaHari}</strong>, ${tglFormatted}</td>
        <td align="center">${jamMasuk}</td>
        <td align="center" style="font-weight: bold; color: ${colorStatus};">${status}</td>
        <td>${ket}</td>
      </tr>
    `;
  }

  const totalMasuk = countH + countT;
  const totalHariEfektif = totalMasuk + countI + countS + countA;
  const persen = totalHariEfektif > 0 ? ((totalMasuk / totalHariEfektif) * 100).toFixed(1) : 0;

  const tableHeaderHtml = `
    <tr>
      <th width="6%">No</th>
      <th width="26%">Hari & Tanggal</th>
      <th width="16%">Jam Masuk</th>
      <th width="16%">Status</th>
      <th width="36%">Keterangan / Catatan</th>
    </tr>
  `;

  const tableFooterHtml = `
    <tr class="tfoot-total">
      <td colspan="2" align="right">TOTAL REKAP ${namaBulan.toUpperCase()} ${tahun}:</td>
      <td colspan="2" align="center">H: ${countH} | T: ${countT} | I: ${countI} | S: ${countS} | A: ${countA}</td>
      <td><strong>${persen}% Kehadiran</strong> (${totalMasuk} dari ${totalHariEfektif} hari efektif)</td>
    </tr>
  `;

  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${judulLaporan} - ${s.nama}</title>
      <style>
        @page { size: 21.0cm 29.7cm; margin: 1.8cm; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.3; }
        .header-table { width: 100%; border-collapse: collapse; margin-bottom: 5px; }
        .header-table td { border: none; padding: 2px; text-align: center; }
        .kop-nama { font-size: 16pt; font-weight: bold; color: #00236f; margin: 0; }
        .kop-sub { font-size: 10pt; color: #333; margin: 2px 0; }
        .kop-line { border-top: 3px double #000000; margin: 8px 0 16px 0; }
        .judul-doc { text-align: center; font-size: 13pt; font-weight: bold; text-decoration: underline; margin: 10px 0 2px 0; }
        .tahun-doc { text-align: center; font-size: 11pt; margin-bottom: 14px; }
        .bio-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
        .bio-table td { border: none; padding: 3px 6px; font-size: 11pt; }
        .data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .data-table th { background-color: #00236f; color: #ffffff; border: 1px solid #333333; padding: 6px 5px; font-size: 10pt; text-align: center; }
        .data-table td { border: 1px solid #333333; padding: 5px 6px; font-size: 10pt; }
        .tfoot-total td { background-color: #f1f5f9; font-weight: bold; border: 1px solid #333333; padding: 6px; }
        .sig-table { width: 100%; border-collapse: collapse; margin-top: 28px; }
        .sig-table td { border: none; text-align: center; vertical-align: top; width: 33.33%; font-size: 11pt; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td>
            <div class="kop-nama">${state.settings.nama_sekolah.toUpperCase()}</div>
            <div class="kop-sub">NPSN: 20512345 · Terakreditasi "A" (Unggul)</div>
            <div class="kop-sub">Alamat: Jl. Pendidikan No. 45, Kompleks Akademik Sabuntan · Telp. (0328) 821992</div>
          </td>
        </tr>
      </table>
      <div class="kop-line"></div>
      <div class="judul-doc">${judulLaporan}</div>
      <div class="tahun-doc">Tahun Pelajaran: ${state.settings.tahun_ajaran}</div>
      <table class="bio-table">
        <tr>
          <td width="22%"><strong>Nama Lengkap</strong></td>
          <td width="28%">: ${s.nama}</td>
          <td width="22%"><strong>Periode Rekap</strong></td>
          <td width="28%">: <strong>${periodeInfo}</strong></td>
        </tr>
        <tr>
          <td><strong>Nomor Induk Siswa (NIS)</strong></td>
          <td>: ${s.nis}</td>
          <td><strong>Status Siswa</strong></td>
          <td>: Aktif Terdaftar</td>
        </tr>
        <tr>
          <td><strong>Kelas / Tingkat</strong></td>
          <td>: ${s.nama_kelas}</td>
          <td><strong>Sekolah</strong></td>
          <td>: ${state.settings.nama_sekolah}</td>
        </tr>
      </table>
      <table class="data-table">
        <thead>${tableHeaderHtml}</thead>
        <tbody>${tableBodyHtml}</tbody>
        <tfoot>${tableFooterHtml}</tfoot>
      </table>
      <table class="sig-table">
        <tr>
          <td>
            Mengetahui,<br>Orang Tua / Wali Murid<br><br><br><br><br>
            ( ................................................. )
          </td>
          <td>
            Sabuntan, ${tanggalHariIni}<br>Wali Kelas<br><br><br><br><br>
            <strong>( Siti Rahmawati, S.Pd. )</strong><br>NIP. 19880412 201402 2 003
          </td>
          <td>
            Mengesahkan,<br>Kepala Sekolah<br><br><br><br><br>
            <strong>( ${state.currentUser.nama} )</strong><br>NIP. 19820510 200801 1 012
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', wordContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = downloadFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Ekspor Rekap Presensi Khusus Bulan Tertentu ke Microsoft Excel (.xls)
 */
function exportRaporExcelSpesifik(s, bulan, tahun) {
  const namaBulan = NAMA_BULAN[bulan] || 'Februari';
  const judulDoc = `LAPORAN REKAPITULASI PRESENSI SISWA - BULAN ${namaBulan.toUpperCase()} ${tahun}`;
  const downloadFilename = `Rekap_Presensi_${s.nis}_${s.nama.replace(/\s+/g, '_')}_${namaBulan}_${tahun}.xls`;
  const totalCols = 5;

  const daysInMonth = new Date(tahun, bulan, 0).getDate();
  let countH = 0, countT = 0, countI = 0, countS = 0, countA = 0;
  let noUrut = 1;
  let tableBodyRows = '';

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(tahun, bulan - 1, d);
    const dayOfWeek = dayDate.getDay();
    const namaHari = NAMA_HARI[dayOfWeek];
    const tglFormatted = `${String(d).padStart(2, '0')}/${String(bulan).padStart(2, '0')}/${tahun}`;

    if (dayOfWeek === 0) {
      tableBodyRows += `
        <tr style="background-color: #f1f5f9; color: #64748b;">
          <td style="text-align: center; border: 0.5pt solid #000;">-</td>
          <td style="border: 0.5pt solid #000;">${namaHari}, ${tglFormatted}</td>
          <td style="text-align: center; border: 0.5pt solid #000;">-</td>
          <td style="text-align: center; border: 0.5pt solid #000;">Libur</td>
          <td style="border: 0.5pt solid #000;">Libur Akhir Pekan</td>
        </tr>
      `;
      continue;
    }

    const hash = getDeterministicHash(`${s.nis}_${tahun}_${bulan}_${d}`) % 100;
    let status = 'Hadir';
    let jamMasuk = '06:45 WIB';
    let ket = 'Hadir tepat waktu';
    const menitRandom = (getDeterministicHash(`min_${s.nis}_${d}`) % 25);

    if (hash < 76) {
      status = 'Hadir';
      jamMasuk = `06:${String(30 + (menitRandom % 25)).padStart(2, '0')} WIB`;
      ket = 'Hadir tepat waktu';
      countH++;
    } else if (hash < 89) {
      status = 'Terlambat';
      const lateMenit = 10 + (menitRandom % 20);
      jamMasuk = `07:${String(lateMenit).padStart(2, '0')} WIB`;
      ket = `Terlambat ${lateMenit} menit`;
      countT++;
    } else if (hash < 94) {
      status = 'Izin';
      jamMasuk = '-';
      ket = 'Surat izin keperluan keluarga';
      countI++;
    } else if (hash < 98) {
      status = 'Sakit';
      jamMasuk = '-';
      ket = 'Surat keterangan sakit';
      countS++;
    } else {
      status = 'Alpa';
      jamMasuk = '-';
      ket = 'Tanpa keterangan';
      countA++;
    }

    tableBodyRows += `
      <tr>
        <td style="text-align: center; border: 0.5pt solid #000;">${noUrut++}</td>
        <td style="border: 0.5pt solid #000;"><b>${namaHari}</b>, ${tglFormatted}</td>
        <td style="text-align: center; border: 0.5pt solid #000;">${jamMasuk}</td>
        <td style="text-align: center; font-weight: bold; border: 0.5pt solid #000;">${status}</td>
        <td style="border: 0.5pt solid #000;">${ket}</td>
      </tr>
    `;
  }

  const totalMasuk = countH + countT;
  const totalHariEfektif = totalMasuk + countI + countS + countA;
  const persen = totalHariEfektif > 0 ? ((totalMasuk / totalHariEfektif) * 100).toFixed(1) : 0;

  const excelContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <style>
        th { background-color: #107c41; color: #ffffff; font-weight: bold; text-align: center; border: 0.5pt solid #000000; }
        td { border: 0.5pt solid #000000; }
      </style>
    </head>
    <body>
      <table>
        <tr><td colspan="${totalCols}" style="font-size: 14pt; font-weight: bold; text-align: center; border: none;">${state.settings.nama_sekolah.toUpperCase()}</td></tr>
        <tr><td colspan="${totalCols}" style="font-size: 12pt; font-weight: bold; text-align: center; border: none;">${judulDoc}</td></tr>
        <tr><td colspan="${totalCols}" style="text-align: center; border: none;">Tahun Pelajaran: ${state.settings.tahun_ajaran}</td></tr>
        <tr><td colspan="${totalCols}" style="border: none;"></td></tr>
        <tr>
          <td colspan="2" style="font-weight: bold; border: none;">Nama Siswa:</td>
          <td colspan="3" style="border: none;">${s.nama}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight: bold; border: none;">NIS:</td>
          <td colspan="3" style="border: none;">${s.nis}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight: bold; border: none;">Kelas:</td>
          <td colspan="3" style="border: none;">${s.nama_kelas}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight: bold; border: none;">Periode:</td>
          <td colspan="3" style="font-weight: bold; color: #107c41; border: none;">${namaBulan} ${tahun}</td>
        </tr>
        <tr><td colspan="${totalCols}" style="border: none;"></td></tr>
        <tr style="height: 26px;">
          <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">No</th>
          <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Hari & Tanggal</th>
          <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Jam Masuk</th>
          <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Status Presensi</th>
          <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Keterangan / Catatan</th>
        </tr>
        ${tableBodyRows}
        <tr style="height: 24px; font-weight: bold; background-color: #e2e8f0;">
          <td colspan="2" style="text-align: right; border: 0.5pt solid #000;">TOTAL REKAP ${namaBulan.toUpperCase()}:</td>
          <td colspan="2" style="text-align: center; border: 0.5pt solid #000; color: #107c41;">H: ${countH} | T: ${countT} | I: ${countI} | S: ${countS} | A: ${countA}</td>
          <td style="border: 0.5pt solid #000;"><b>${persen}%</b> (${totalMasuk} dari ${totalHariEfektif} hari efektif)</td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', excelContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = downloadFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Ekspor Dokumen Rapor Presensi Siswa ke Microsoft Word (.doc)
 * Mendukung ekspor per bulan tertentu (misal: Februari) maupun 1 tahun penuh.
 */
function exportRaporWord() {
  if (!state.selectedSiswaForRapor) {
    alert('Pilih siswa terlebih dahulu!');
    return;
  }
  const s = state.selectedSiswaForRapor;
  const mode = document.getElementById('selectRaporMode')?.value || 'bulanan';
  const bulan = parseInt(document.getElementById('selectRaporBulanTarget')?.value) || 2;
  const tahun = parseInt(document.getElementById('selectRaporTahunTarget')?.value) || 2026;

  const dNow = new Date();
  const tanggalHariIni = `${dNow.getDate()} ${NAMA_BULAN[dNow.getMonth() + 1]} ${dNow.getFullYear()}`;
  const namaBulan = NAMA_BULAN[bulan] || 'Februari';

  let judulLaporan = '';
  let periodeInfo = '';
  let tableHeaderHtml = '';
  let tableBodyHtml = '';
  let tableFooterHtml = '';
  let downloadFilename = '';

  if (mode === 'bulanan') {
    judulLaporan = `LEMBAR REKAPITULASI PRESENSI SISWA - BULAN ${namaBulan.toUpperCase()} ${tahun}`;
    periodeInfo = `${namaBulan} ${tahun}`;
    downloadFilename = `Rekap_Presensi_${s.nis}_${s.nama.replace(/\s+/g, '_')}_${namaBulan}_${tahun}.doc`;

    tableHeaderHtml = `
      <tr>
        <th width="6%">No</th>
        <th width="26%">Hari & Tanggal</th>
        <th width="16%">Jam Masuk</th>
        <th width="16%">Status</th>
        <th width="36%">Keterangan / Catatan</th>
      </tr>
    `;

    const daysInMonth = new Date(tahun, bulan, 0).getDate();
    let countH = 0, countT = 0, countI = 0, countS = 0, countA = 0;
    let noUrut = 1;

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(tahun, bulan - 1, d);
      const dayOfWeek = dayDate.getDay();
      const namaHari = NAMA_HARI[dayOfWeek];
      const tglFormatted = `${String(d).padStart(2, '0')}/${String(bulan).padStart(2, '0')}/${tahun}`;

      if (dayOfWeek === 0) {
        tableBodyHtml += `
          <tr style="background-color: #f8fafc; color: #64748b;">
            <td align="center">-</td>
            <td>${namaHari}, ${tglFormatted}</td>
            <td align="center">-</td>
            <td align="center"><em>Libur</em></td>
            <td>Libur Akhir Pekan</td>
          </tr>
        `;
        continue;
      }

      const hash = getDeterministicHash(`${s.nis}_${tahun}_${bulan}_${d}`) % 100;
      let status = 'Hadir';
      let jamMasuk = '06:45 WIB';
      let ket = 'Hadir tepat waktu';
      let colorStatus = '#166534';

      const menitRandom = (getDeterministicHash(`min_${s.nis}_${d}`) % 25);

      if (hash < 76) {
        status = 'Hadir';
        jamMasuk = `06:${String(30 + (menitRandom % 25)).padStart(2, '0')} WIB`;
        ket = 'Hadir tepat waktu';
        colorStatus = '#166534';
        countH++;
      } else if (hash < 89) {
        status = 'Terlambat';
        const lateMenit = 10 + (menitRandom % 20);
        jamMasuk = `07:${String(lateMenit).padStart(2, '0')} WIB`;
        ket = `Terlambat ${lateMenit} menit`;
        colorStatus = '#b45309';
        countT++;
      } else if (hash < 94) {
        status = 'Izin';
        jamMasuk = '-';
        ket = 'Surat izin keperluan keluarga';
        colorStatus = '#1e40af';
        countI++;
      } else if (hash < 98) {
        status = 'Sakit';
        jamMasuk = '-';
        ket = 'Surat keterangan sakit';
        colorStatus = '#6d28d9';
        countS++;
      } else {
        status = 'Alpa';
        jamMasuk = '-';
        ket = 'Tanpa keterangan';
        colorStatus = '#9f1239';
        countA++;
      }

      tableBodyHtml += `
        <tr>
          <td align="center">${noUrut++}</td>
          <td><strong>${namaHari}</strong>, ${tglFormatted}</td>
          <td align="center">${jamMasuk}</td>
          <td align="center" style="font-weight: bold; color: ${colorStatus};">${status}</td>
          <td>${ket}</td>
        </tr>
      `;
    }

    const totalMasuk = countH + countT;
    const totalHariEfektif = totalMasuk + countI + countS + countA;
    const persen = totalHariEfektif > 0 ? ((totalMasuk / totalHariEfektif) * 100).toFixed(1) : 0;

    tableFooterHtml = `
      <tr class="tfoot-total">
        <td colspan="2" align="right">TOTAL REKAP ${namaBulan.toUpperCase()} ${tahun}:</td>
        <td colspan="2" align="center">H: ${countH} | T: ${countT} | I: ${countI} | S: ${countS} | A: ${countA}</td>
        <td><strong>${persen}% Kehadiran</strong> (${totalMasuk} dari ${totalHariEfektif} hari efektif)</td>
      </tr>
    `;

  } else {
    // Mode TAHUNAN (12 Bulan)
    judulLaporan = `LEMBAR REKAPITULASI PRESENSI SISWA - TAHUN ${tahun}`;
    periodeInfo = `Tahun ${tahun} (Januari - Desember)`;
    downloadFilename = `Rekap_Presensi_${s.nis}_${s.nama.replace(/\s+/g, '_')}_Tahunan_${tahun}.doc`;

    tableHeaderHtml = `
      <tr>
        <th width="5%">No</th>
        <th width="20%">Bulan</th>
        <th width="9%">Hadir (H)</th>
        <th width="10%">Terlambat (T)</th>
        <th width="8%">Izin (I)</th>
        <th width="8%">Sakit (S)</th>
        <th width="8%">Alpa (A)</th>
        <th width="12%">Total Hari</th>
        <th width="10%">% Hadir</th>
        <th width="10%">Status</th>
      </tr>
    `;

    let totalH = 0, totalT = 0, totalI = 0, totalS = 0, totalA = 0;

    for (let b = 1; b <= 12; b++) {
      const daysInMonth = new Date(tahun, b, 0).getDate();
      let bHadir = 0, bTerlambat = 0, bIzin = 0, bSakit = 0, bAlpa = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        if (new Date(tahun, b - 1, d).getDay() === 0) continue;
        const hash = getDeterministicHash(`${s.nis}_${tahun}_${b}_${d}`) % 100;
        if (hash < 76) bHadir++;
        else if (hash < 89) bTerlambat++;
        else if (hash < 94) bIzin++;
        else if (hash < 98) bSakit++;
        else bAlpa++;
      }

      const totalMasuk = bHadir + bTerlambat;
      const totalHari = totalMasuk + bIzin + bSakit + bAlpa;
      const persenBulan = totalHari > 0 ? ((totalMasuk / totalHari) * 100).toFixed(1) : 0;

      totalH += bHadir;
      totalT += bTerlambat;
      totalI += bIzin;
      totalS += bSakit;
      totalA += bAlpa;

      const statusStr = persenBulan >= 90 ? 'Sangat Disiplin' : (persenBulan >= 80 ? 'Baik' : (persenBulan >= 70 ? 'Cukup' : 'Perlu Pembinaan'));

      tableBodyHtml += `
        <tr>
          <td align="center">${b}</td>
          <td><strong>${NAMA_BULAN[b]} ${tahun}</strong></td>
          <td align="center" style="color: #166534; font-weight: bold;">${bHadir}</td>
          <td align="center" style="color: #b45309;">${bTerlambat}</td>
          <td align="center" style="color: #1e40af;">${bIzin}</td>
          <td align="center" style="color: #6d28d9;">${bSakit}</td>
          <td align="center" style="color: #9f1239;">${bAlpa}</td>
          <td align="center">${totalHari} hari</td>
          <td align="center" style="font-weight: bold;">${persenBulan}%</td>
          <td align="center">${statusStr}</td>
        </tr>
      `;
    }

    const grandTotalMasuk = totalH + totalT;
    const grandTotalHari = grandTotalMasuk + totalI + totalS + totalA;
    const grandPersen = grandTotalHari > 0 ? ((grandTotalMasuk / grandTotalHari) * 100).toFixed(1) : 0;

    tableFooterHtml = `
      <tr class="tfoot-total">
        <td colspan="2" align="right">TOTAL 1 TAHUN:</td>
        <td align="center">${totalH}</td>
        <td align="center">${totalT}</td>
        <td align="center">${totalI}</td>
        <td align="center">${totalS}</td>
        <td align="center">${totalA}</td>
        <td align="center">${grandTotalHari} hari</td>
        <td align="center">${grandPersen}%</td>
        <td align="center">Tuntas</td>
      </tr>
    `;
  }

  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${judulLaporan} - ${s.nama}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: 21.0cm 29.7cm;
          margin: 1.8cm 1.8cm 1.8cm 1.8cm;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11pt;
          line-height: 1.3;
          color: #000000;
        }
        .header-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 5px;
        }
        .header-table td {
          border: none;
          padding: 2px;
          text-align: center;
        }
        .kop-nama {
          font-size: 16pt;
          font-weight: bold;
          color: #00236f;
          margin: 0;
        }
        .kop-sub {
          font-size: 10pt;
          color: #333;
          margin: 2px 0;
        }
        .kop-line {
          border-top: 3px double #000000;
          margin: 8px 0 16px 0;
        }
        .judul-doc {
          text-align: center;
          font-size: 13pt;
          font-weight: bold;
          text-decoration: underline;
          margin: 10px 0 2px 0;
        }
        .tahun-doc {
          text-align: center;
          font-size: 11pt;
          font-weight: normal;
          margin-bottom: 14px;
        }
        .bio-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 14px;
        }
        .bio-table td {
          border: none;
          padding: 3px 6px;
          font-size: 11pt;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .data-table th {
          background-color: #00236f;
          color: #ffffff;
          border: 1px solid #333333;
          padding: 6px 5px;
          font-size: 10pt;
          text-align: center;
        }
        .data-table td {
          border: 1px solid #333333;
          padding: 5px 6px;
          font-size: 10pt;
        }
        .tfoot-total td {
          background-color: #f1f5f9;
          font-weight: bold;
          border: 1px solid #333333;
          padding: 6px;
        }
        .sig-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 28px;
        }
        .sig-table td {
          border: none;
          text-align: center;
          vertical-align: top;
          width: 33.33%;
          font-size: 11pt;
        }
      </style>
    </head>
    <body>
      <!-- Kop Surat Resmi Sekolah -->
      <table class="header-table">
        <tr>
          <td>
            <div class="kop-nama">${state.settings.nama_sekolah.toUpperCase()}</div>
            <div class="kop-sub">NPSN: 20512345 · Terakreditasi "A" (Unggul)</div>
            <div class="kop-sub">Alamat: Jl. Pendidikan No. 45, Kompleks Akademik Sabuntan · Telp. (0328) 821992</div>
          </td>
        </tr>
      </table>
      <div class="kop-line"></div>

      <div class="judul-doc">${judulLaporan}</div>
      <div class="tahun-doc">Tahun Pelajaran: ${state.settings.tahun_ajaran}</div>

      <!-- Biodata Siswa -->
      <table class="bio-table">
        <tr>
          <td width="22%"><strong>Nama Lengkap</strong></td>
          <td width="28%">: ${s.nama}</td>
          <td width="22%"><strong>Periode Rekap</strong></td>
          <td width="28%">: <strong>${periodeInfo}</strong></td>
        </tr>
        <tr>
          <td><strong>Nomor Induk Siswa (NIS)</strong></td>
          <td>: ${s.nis}</td>
          <td><strong>Status Siswa</strong></td>
          <td>: Aktif Terdaftar</td>
        </tr>
        <tr>
          <td><strong>Kelas / Tingkat</strong></td>
          <td>: ${s.nama_kelas}</td>
          <td><strong>Sekolah</strong></td>
          <td>: ${state.settings.nama_sekolah}</td>
        </tr>
      </table>

      <!-- Tabel Hasil Presensi -->
      <table class="data-table">
        <thead>
          ${tableHeaderHtml}
        </thead>
        <tbody>
          ${tableBodyHtml}
        </tbody>
        <tfoot>
          ${tableFooterHtml}
        </tfoot>
      </table>

      <!-- Lembar Tanda Tangan Resmi Pengesahan -->
      <table class="sig-table">
        <tr>
          <td>
            Mengetahui,<br>
            Orang Tua / Wali Murid<br><br><br><br><br>
            ( ................................................. )
          </td>
          <td>
            Sabuntan, ${tanggalHariIni}<br>
            Wali Kelas<br><br><br><br><br>
            <strong>( Siti Rahmawati, S.Pd. )</strong><br>
            NIP. 19880412 201402 2 003
          </td>
          <td>
            Mengesahkan,<br>
            Kepala Sekolah<br><br><br><br><br>
            <strong>( ${state.currentUser.nama} )</strong><br>
            NIP. 19820510 200801 1 012
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', wordContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = downloadFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Ekspor Dokumen Rapor Presensi Siswa ke Microsoft Excel (.xls)
 * Mendukung ekspor per bulan tertentu maupun 1 tahun penuh.
 */
function exportRaporExcel() {
  if (!state.selectedSiswaForRapor) {
    alert('Pilih siswa terlebih dahulu!');
    return;
  }
  const s = state.selectedSiswaForRapor;
  const mode = document.getElementById('selectRaporMode')?.value || 'bulanan';
  const bulan = parseInt(document.getElementById('selectRaporBulanTarget')?.value) || 2;
  const tahun = parseInt(document.getElementById('selectRaporTahunTarget')?.value) || 2026;
  const namaBulan = NAMA_BULAN[bulan] || 'Februari';

  let judulDoc = '';
  let periodeInfo = '';
  let downloadFilename = '';
  let tableHeaderCols = '';
  let tableBodyRows = '';
  let tableFooterRows = '';
  let totalCols = 5;

  if (mode === 'bulanan') {
    judulDoc = `LAPORAN REKAPITULASI PRESENSI SISWA - BULAN ${namaBulan.toUpperCase()} ${tahun}`;
    periodeInfo = `${namaBulan} ${tahun}`;
    downloadFilename = `Rekap_Presensi_${s.nis}_${s.nama.replace(/\s+/g, '_')}_${namaBulan}_${tahun}.xls`;
    totalCols = 5;

    tableHeaderCols = `
      <tr style="height: 26px;">
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">No</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Hari & Tanggal</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Jam Masuk</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Status Presensi</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Keterangan / Catatan</th>
      </tr>
    `;

    const daysInMonth = new Date(tahun, bulan, 0).getDate();
    let countH = 0, countT = 0, countI = 0, countS = 0, countA = 0;
    let noUrut = 1;

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(tahun, bulan - 1, d);
      const dayOfWeek = dayDate.getDay();
      const namaHari = NAMA_HARI[dayOfWeek];
      const tglFormatted = `${String(d).padStart(2, '0')}/${String(bulan).padStart(2, '0')}/${tahun}`;

      if (dayOfWeek === 0) {
        tableBodyRows += `
          <tr style="background-color: #f1f5f9; color: #64748b;">
            <td style="text-align: center; border: 0.5pt solid #000;">-</td>
            <td style="border: 0.5pt solid #000;">${namaHari}, ${tglFormatted}</td>
            <td style="text-align: center; border: 0.5pt solid #000;">-</td>
            <td style="text-align: center; border: 0.5pt solid #000;">Libur</td>
            <td style="border: 0.5pt solid #000;">Libur Akhir Pekan</td>
          </tr>
        `;
        continue;
      }

      const hash = getDeterministicHash(`${s.nis}_${tahun}_${bulan}_${d}`) % 100;
      let status = 'Hadir';
      let jamMasuk = '06:45 WIB';
      let ket = 'Hadir tepat waktu';
      const menitRandom = (getDeterministicHash(`min_${s.nis}_${d}`) % 25);

      if (hash < 76) {
        status = 'Hadir';
        jamMasuk = `06:${String(30 + (menitRandom % 25)).padStart(2, '0')} WIB`;
        ket = 'Hadir tepat waktu';
        countH++;
      } else if (hash < 89) {
        status = 'Terlambat';
        const lateMenit = 10 + (menitRandom % 20);
        jamMasuk = `07:${String(lateMenit).padStart(2, '0')} WIB`;
        ket = `Terlambat ${lateMenit} menit`;
        countT++;
      } else if (hash < 94) {
        status = 'Izin';
        jamMasuk = '-';
        ket = 'Surat izin keperluan keluarga';
        countI++;
      } else if (hash < 98) {
        status = 'Sakit';
        jamMasuk = '-';
        ket = 'Surat keterangan sakit';
        countS++;
      } else {
        status = 'Alpa';
        jamMasuk = '-';
        ket = 'Tanpa keterangan';
        countA++;
      }

      tableBodyRows += `
        <tr>
          <td style="text-align: center; border: 0.5pt solid #000;">${noUrut++}</td>
          <td style="border: 0.5pt solid #000;"><b>${namaHari}</b>, ${tglFormatted}</td>
          <td style="text-align: center; border: 0.5pt solid #000;">${jamMasuk}</td>
          <td style="text-align: center; font-weight: bold; border: 0.5pt solid #000;">${status}</td>
          <td style="border: 0.5pt solid #000;">${ket}</td>
        </tr>
      `;
    }

    const totalMasuk = countH + countT;
    const totalHariEfektif = totalMasuk + countI + countS + countA;
    const persen = totalHariEfektif > 0 ? ((totalMasuk / totalHariEfektif) * 100).toFixed(1) : 0;

    tableFooterRows = `
      <tr style="height: 24px; font-weight: bold; background-color: #e2e8f0;">
        <td colspan="2" style="text-align: right; border: 0.5pt solid #000;">TOTAL REKAP ${namaBulan.toUpperCase()}:</td>
        <td colspan="2" style="text-align: center; border: 0.5pt solid #000; color: #107c41;">H: ${countH} | T: ${countT} | I: ${countI} | S: ${countS} | A: ${countA}</td>
        <td style="border: 0.5pt solid #000;"><b>${persen}%</b> (${totalMasuk} dari ${totalHariEfektif} hari efektif)</td>
      </tr>
    `;

  } else {
    // Mode TAHUNAN (12 Bulan)
    judulDoc = `LAPORAN REKAPITULASI PRESENSI SISWA PER BULAN (TAHUNAN)`;
    periodeInfo = `Tahun ${tahun}`;
    downloadFilename = `Rekap_Presensi_${s.nis}_${s.nama.replace(/\s+/g, '_')}_Tahunan_${tahun}.xls`;
    totalCols = 11;

    tableHeaderCols = `
      <tr style="height: 28px;">
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">No</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Bulan</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Tahun</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Hadir (H)</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Terlambat (T)</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Izin (I)</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Sakit (S)</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Alpa (A)</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Total Hari</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">% Kehadiran</th>
        <th style="background-color: #107c41; color: #fff; border: 0.5pt solid #000;">Status Kepatuhan</th>
      </tr>
    `;

    let totalH = 0, totalT = 0, totalI = 0, totalS = 0, totalA = 0;

    for (let b = 1; b <= 12; b++) {
      const daysInMonth = new Date(tahun, b, 0).getDate();
      let bHadir = 0, bTerlambat = 0, bIzin = 0, bSakit = 0, bAlpa = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        if (new Date(tahun, b - 1, d).getDay() === 0) continue;
        const hash = getDeterministicHash(`${s.nis}_${tahun}_${b}_${d}`) % 100;
        if (hash < 76) bHadir++;
        else if (hash < 89) bTerlambat++;
        else if (hash < 94) bIzin++;
        else if (hash < 98) bSakit++;
        else bAlpa++;
      }

      const totalMasuk = bHadir + bTerlambat;
      const totalHari = totalMasuk + bIzin + bSakit + bAlpa;
      const persenBulan = totalHari > 0 ? ((totalMasuk / totalHari) * 100).toFixed(1) : 0;

      totalH += bHadir;
      totalT += bTerlambat;
      totalI += bIzin;
      totalS += bSakit;
      totalA += bAlpa;

      const statusStr = persenBulan >= 90 ? 'Sangat Disiplin' : (persenBulan >= 80 ? 'Baik' : (persenBulan >= 70 ? 'Cukup' : 'Perlu Pembinaan'));

      tableBodyRows += `
        <tr>
          <td style="text-align: center; border: 0.5pt solid #000000;">${b}</td>
          <td style="border: 0.5pt solid #000000; font-weight: bold;">${NAMA_BULAN[b]}</td>
          <td style="text-align: center; border: 0.5pt solid #000000;">${tahun}</td>
          <td style="text-align: center; border: 0.5pt solid #000000; color: #107c41; font-weight: bold;">${bHadir}</td>
          <td style="text-align: center; border: 0.5pt solid #000000; color: #b45309;">${bTerlambat}</td>
          <td style="text-align: center; border: 0.5pt solid #000000; color: #1e40af;">${bIzin}</td>
          <td style="text-align: center; border: 0.5pt solid #000000; color: #6d28d9;">${bSakit}</td>
          <td style="text-align: center; border: 0.5pt solid #000000; color: #be123c;">${bAlpa}</td>
          <td style="text-align: center; border: 0.5pt solid #000000; font-weight: bold;">${totalHari}</td>
          <td style="text-align: center; border: 0.5pt solid #000000; font-weight: bold;">${persenBulan}%</td>
          <td style="text-align: center; border: 0.5pt solid #000000;">${statusStr}</td>
        </tr>
      `;
    }

    const grandTotalMasuk = totalH + totalT;
    const grandTotalHari = grandTotalMasuk + totalI + totalS + totalA;
    const grandPersen = grandTotalHari > 0 ? ((grandTotalMasuk / grandTotalHari) * 100).toFixed(1) : 0;

    tableFooterRows = `
      <tr style="height: 24px; font-weight: bold; background-color: #e2e8f0;">
        <td colspan="3" style="text-align: right; font-weight: bold; border: 0.5pt solid #000000;">TOTAL 1 TAHUN:</td>
        <td style="text-align: center; font-weight: bold; color: #107c41; border: 0.5pt solid #000000;">${totalH}</td>
        <td style="text-align: center; font-weight: bold; color: #b45309; border: 0.5pt solid #000000;">${totalT}</td>
        <td style="text-align: center; font-weight: bold; color: #1e40af; border: 0.5pt solid #000000;">${totalI}</td>
        <td style="text-align: center; font-weight: bold; color: #6d28d9; border: 0.5pt solid #000000;">${totalS}</td>
        <td style="text-align: center; font-weight: bold; color: #be123c; border: 0.5pt solid #000000;">${totalA}</td>
        <td style="text-align: center; font-weight: bold; border: 0.5pt solid #000000;">${grandTotalHari}</td>
        <td style="text-align: center; font-weight: bold; color: #00236f; border: 0.5pt solid #000000;">${grandPersen}%</td>
        <td style="text-align: center; font-weight: bold; border: 0.5pt solid #000000;">Tuntas</td>
      </tr>
    `;
  }

  const excelContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Rekap Presensi</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        th { background-color: #107c41; color: #ffffff; font-weight: bold; text-align: center; border: 0.5pt solid #000000; }
        td { border: 0.5pt solid #000000; }
      </style>
    </head>
    <body>
      <table>
        <tr><td colspan="${totalCols}" style="font-size: 14pt; font-weight: bold; text-align: center; border: none;">${state.settings.nama_sekolah.toUpperCase()}</td></tr>
        <tr><td colspan="${totalCols}" style="font-size: 12pt; font-weight: bold; text-align: center; border: none;">${judulDoc}</td></tr>
        <tr><td colspan="${totalCols}" style="text-align: center; border: none;">Tahun Pelajaran: ${state.settings.tahun_ajaran}</td></tr>
        <tr><td colspan="${totalCols}" style="border: none;"></td></tr>
        <tr>
          <td colspan="2" style="font-weight: bold; border: none;">Nama Siswa:</td>
          <td colspan="3" style="border: none;">${s.nama}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight: bold; border: none;">NIS:</td>
          <td colspan="3" style="border: none;">${s.nis}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight: bold; border: none;">Kelas:</td>
          <td colspan="3" style="border: none;">${s.nama_kelas}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight: bold; border: none;">Periode:</td>
          <td colspan="3" style="font-weight: bold; color: #107c41; border: none;">${periodeInfo}</td>
        </tr>
        <tr><td colspan="${totalCols}" style="border: none;"></td></tr>
        ${tableHeaderCols}
        ${tableBodyRows}
        ${tableFooterRows}
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', excelContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = downloadFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Cetak Dokumen Rapor Siswa Resmi
 */
function printStudentReport() {
  window.print();
}

/**
 * Ekspor CSV Matriks Rekap Bulanan per Siswa
 */
function exportBulananCsv() {
  const bulan = parseInt(document.getElementById('selectRekapBulan').value) || 10;
  const tahun = parseInt(document.getElementById('selectRekapTahun').value) || 2026;
  const kelasId = document.getElementById('selectRekapBulananKelas').value;
  const daysInMonth = new Date(tahun, bulan, 0).getDate();

  const filteredSiswa = state.siswa.filter(s => !kelasId || s.kelas_id == kelasId);

  // Buat header CSV
  const headerCols = ['No', 'NIS', 'Nama Siswa', 'Kelas'];
  for (let d = 1; d <= daysInMonth; d++) {
    headerCols.push(`Tgl_${d}`);
  }
  headerCols.push('Hadir (H)', 'Terlambat (T)', 'Izin (I)', 'Sakit (S)', 'Alpa (A)', 'Persentase Kehadiran (%)');

  const rows = [];
  filteredSiswa.forEach((s, idx) => {
    let countH = 0;
    let countT = 0;
    let countI = 0;
    let countS = 0;
    let countA = 0;

    const row = [idx + 1, `"${s.nis}"`, `"${s.nama}"`, `"${s.nama_kelas}"`];

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(tahun, bulan - 1, d);
      if (dayDate.getDay() === 0) {
        row.push('-');
        continue;
      }

      const hash = getDeterministicHash(`${s.nis}_${tahun}_${bulan}_${d}`) % 100;
      if (hash < 75) { row.push('H'); countH++; }
      else if (hash < 88) { row.push('T'); countT++; }
      else if (hash < 93) { row.push('I'); countI++; }
      else if (hash < 97) { row.push('S'); countS++; }
      else { row.push('A'); countA++; }
    }

    const totalMasuk = countH + countT;
    const totalHari = totalMasuk + countI + countS + countA;
    const persen = totalHari > 0 ? ((totalMasuk / totalHari) * 100).toFixed(1) : 100;

    row.push(countH, countT, countI, countS, countA, `${persen}%`);
    rows.push(row.join(','));
  });

  const csvContent = "\uFEFF" + [headerCols.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `rekap_bulanan_${NAMA_BULAN[bulan].toLowerCase()}_${tahun}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// ================= REKAP HARIAN TABLE & EXPORT =================
function renderRekapTable() {
  const tbody = document.getElementById('rekapTableBody');
  const statusFilter = document.getElementById('selectRekapStatus').value;
  const kelasFilter = document.getElementById('selectRekapKelas').value;

  tbody.innerHTML = '';

  const list = state.absensiHariIni.filter(r => {
    const matchStatus = !statusFilter || r.status === statusFilter;
    const matchKelas = !kelasFilter || r.nama_kelas === state.kelas.find(k => k.id == kelasFilter)?.nama_kelas;
    return matchStatus && matchKelas;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: var(--color-text-secondary); padding: 24px;">Tidak ada riwayat presensi yang sesuai kriteria</td></tr>`;
    return;
  }

  list.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="tabular-nums" style="text-align: center;">${idx + 1}</td>
      <td class="tabular-nums">${r.nis}</td>
      <td><strong>${r.nama}</strong></td>
      <td><span class="feed-class-badge">${r.nama_kelas}</span></td>
      <td class="tabular-nums">${r.tanggal}</td>
      <td class="tabular-nums">${r.jam}</td>
      <td><span class="status-pill ${r.status.toLowerCase()}">${r.status}</span></td>
      <td>${r.keterangan || '-'}</td>
      <td style="color: var(--color-text-secondary); font-size: 12px;">${r.dicatat_oleh}</td>
      <td style="text-align: center;">
        <button class="btn btn-sm btn-danger-outline" onclick="hapusAbsensiSiswa(${r.siswa_id})" title="Hapus Data Absensi (Siswa dapat absen ulang)" style="padding: 3px 8px; font-size: 11px; white-space: nowrap;">
          <i class="fa-solid fa-trash-can"></i> Hapus
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function exportCsv() {
  const headers = ['No', 'NIS', 'Nama Siswa', 'Kelas', 'Tanggal', 'Jam Masuk', 'Status', 'Keterangan', 'Dicatat Oleh'];
  const rows = state.absensiHariIni.map((r, idx) => [
    idx + 1,
    `"${r.nis}"`,
    `"${r.nama}"`,
    `"${r.nama_kelas}"`,
    r.tanggal,
    r.jam,
    r.status,
    `"${r.keterangan || ''}"`,
    `"${r.dicatat_oleh}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `rekap_presensi_harian_${getTodayStr()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ================= MODAL LISTENERS & FILTERS =================
function initModals() {
  // Card Modal Close
  document.getElementById('btnCloseCardModal').addEventListener('click', () => {
    document.getElementById('modalCard').classList.remove('active');
  });

  // Regenerate QR Button
  document.getElementById('btnRegenerateQr').addEventListener('click', () => {
    if (!state.selectedSiswaForCard) return;
    const token = Math.random().toString(36).substring(2, 8).toUpperCase();
    state.selectedSiswaForCard.qr_code = `SISWA-${state.selectedSiswaForCard.nis}-${token}`;
    alert(`QR Code baru berhasil diterbitkan: ${state.selectedSiswaForCard.qr_code}`);
    openStudentCardModal(state.selectedSiswaForCard.id);
    renderSiswaTable();
  });

  // Download Kartu Siswa Gambar JPG (Ukuran Standar ID Card CR80: 85.6mm x 53.98mm)
  document.getElementById('btnDownloadCardJpg')?.addEventListener('click', cetakKartuSiswaJpg);

  // Manual Scan Input Modal
  const modalManual = document.getElementById('modalManualInput');
  document.getElementById('btnManualInput').addEventListener('click', () => {
    modalManual.classList.add('active');
    document.getElementById('inputManualQrCode').focus();
  });

  document.getElementById('btnCloseManualModal').addEventListener('click', () => {
    modalManual.classList.remove('active');
  });
  document.getElementById('btnCancelManual').addEventListener('click', () => {
    modalManual.classList.remove('active');
  });

  document.getElementById('btnSubmitManualScan').addEventListener('click', () => {
    const val = document.getElementById('inputManualQrCode').value.trim();
    if (val) {
      modalManual.classList.remove('active');
      document.getElementById('inputManualQrCode').value = '';
      processScan(val);
    }
  });

  document.querySelectorAll('.btn-chip').forEach(c => {
    c.addEventListener('click', () => {
      const v = c.getAttribute('data-val');
      document.getElementById('inputManualQrCode').value = v;
    });
  });

  // Manual Absence (Izin/Sakit) Modal
  const modalAbsen = document.getElementById('modalManualAbsen');
  document.getElementById('btnOpenManualAbsen').addEventListener('click', () => {
    const select = document.getElementById('selectAbsenSiswa');
    select.innerHTML = '';
    state.siswa.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${s.nama} (${s.nis} - ${s.nama_kelas})`;
      select.appendChild(opt);
    });
    modalAbsen.classList.add('active');
  });

  document.getElementById('btnCloseAbsenModal').addEventListener('click', () => {
    modalAbsen.classList.remove('active');
  });
  document.getElementById('btnCancelAbsen').addEventListener('click', () => {
    modalAbsen.classList.remove('active');
  });

  document.getElementById('btnSaveManualAbsen').addEventListener('click', () => {
    const sId = parseInt(document.getElementById('selectAbsenSiswa').value);
    const status = document.querySelector('input[name="manualStatus"]:checked').value;
    const ket = document.getElementById('inputAbsenKet').value.trim();

    const siswa = state.siswa.find(s => s.id === sId);
    if (!siswa) return;

    // Hapus absensi sebelumnya jika ada (koreksi)
    state.absensiHariIni = state.absensiHariIni.filter(a => a.siswa_id !== sId);

    state.absensiHariIni.push({
      id: state.absensiHariIni.length + 1,
      siswa_id: siswa.id,
      nama: siswa.nama,
      nis: siswa.nis,
      nama_kelas: siswa.nama_kelas,
      tanggal: getTodayStr(),
      jam: getTimeStr(),
      status: status,
      keterangan: ket || `Dicatat manual sebagai ${status}`,
      dicatat_oleh: state.currentUser.nama,
    });
    saveAbsensiToStorage();

    modalAbsen.classList.remove('active');
    document.getElementById('inputAbsenKet').value = '';
    playSound('success');

    initDashboardMetrics();
    renderLiveFeed();
    renderRekapTable();
    renderRekapBulanan();
    renderModalMetrikTable();
    updateQuickSimButtons();
    showToastNotification(`Presensi manual untuk ${siswa.nama} (${status}) berhasil disimpan!`, 'info');
  });

  // Rapor Siswa Modal Close Listeners & Actions
  const modalRapor = document.getElementById('modalRaporSiswa');
  if (modalRapor) {
    document.getElementById('btnCloseRaporModal')?.addEventListener('click', () => {
      modalRapor.classList.remove('active');
    });
    document.getElementById('btnCloseRaporBtn')?.addEventListener('click', () => {
      modalRapor.classList.remove('active');
    });

    // Ekspor & Cetak Dokumen di Header Modal
    document.getElementById('btnHeaderExportWord')?.addEventListener('click', exportRaporWord);
    document.getElementById('btnHeaderExportExcel')?.addEventListener('click', exportRaporExcel);
    document.getElementById('btnHeaderPrintRapor')?.addEventListener('click', printStudentReport);

    // Filter Periode Rapor Modal (Pilihan Bulan atau 1 Tahun)
    document.getElementById('selectRaporMode')?.addEventListener('change', renderRaporContent);
    document.getElementById('selectRaporBulanTarget')?.addEventListener('change', renderRaporContent);
    document.getElementById('selectRaporTahunTarget')?.addEventListener('change', renderRaporContent);

    // Tombol Kembali ke Daftar 12 Bulan dari Tampilan Rincian Harian
    document.getElementById('btnBackToTahunanTable')?.addEventListener('click', () => {
      const selectMode = document.getElementById('selectRaporMode');
      if (selectMode) selectMode.value = 'tahunan';
      renderRaporContent();
    });
  }

  // Dashboard Metrik Cards Interaktif (Bisa Diklik untuk Melihat Daftar Siswa)
  document.getElementById('cardMetricTotal')?.addEventListener('click', () => openModalMetrikDetail('total'));
  document.getElementById('cardMetricHadir')?.addEventListener('click', () => openModalMetrikDetail('hadir'));
  document.getElementById('cardMetricTerlambat')?.addEventListener('click', () => openModalMetrikDetail('terlambat'));
  document.getElementById('cardMetricIzinSakit')?.addEventListener('click', () => openModalMetrikDetail('izin_sakit'));
  document.getElementById('cardMetricBelumAbsen')?.addEventListener('click', () => openModalMetrikDetail('belum_absen'));

  // Detail Metrik Modal Close & Filter Listeners
  const modalMetrik = document.getElementById('modalDetailMetrik');
  if (modalMetrik) {
    document.getElementById('btnCloseModalMetrik')?.addEventListener('click', () => {
      modalMetrik.classList.remove('active');
    });
    document.getElementById('btnCloseModalMetrikBtn')?.addEventListener('click', () => {
      modalMetrik.classList.remove('active');
    });
    document.getElementById('inputSearchModalMetrik')?.addEventListener('input', renderModalMetrikTable);
    document.getElementById('selectKelasModalMetrik')?.addEventListener('change', renderModalMetrikTable);
    document.getElementById('btnExportModalMetrikCsv')?.addEventListener('click', exportModalMetrikCsv);
  }

  // Switcher Tab Rekap (Bulanan vs Harian)
  const btnSwitchBulanan = document.getElementById('btnSwitchBulanan');
  const btnSwitchHarian = document.getElementById('btnSwitchHarian');
  const viewBulanan = document.getElementById('viewRekapBulanan');
  const viewHarian = document.getElementById('viewRekapHarian');

  if (btnSwitchBulanan && btnSwitchHarian) {
    btnSwitchBulanan.addEventListener('click', () => {
      btnSwitchBulanan.classList.add('active');
      btnSwitchHarian.classList.remove('active');
      viewBulanan.classList.add('active');
      viewHarian.classList.remove('active');
      renderRekapBulanan();
    });

    btnSwitchHarian.addEventListener('click', () => {
      btnSwitchHarian.classList.add('active');
      btnSwitchBulanan.classList.remove('active');
      viewHarian.classList.add('active');
      viewBulanan.classList.remove('active');
      renderRekapTable();
    });
  }

  // Rekap Bulanan Filter Listeners
  document.getElementById('selectRekapBulan').addEventListener('change', renderRekapBulanan);
  document.getElementById('selectRekapTahun').addEventListener('change', renderRekapBulanan);
  document.getElementById('selectRekapBulananKelas').addEventListener('change', renderRekapBulanan);
  document.getElementById('inputSearchRekapBulanan').addEventListener('input', renderRekapBulanan);
  document.getElementById('btnExportBulananCsv').addEventListener('click', exportBulananCsv);
  document.getElementById('btnPrintBulanan').addEventListener('click', () => window.print());
  document.getElementById('btnRefreshBulanan').addEventListener('click', () => {
    renderRekapBulanan();
    alert('Data rekap bulanan berhasil disegarkan!');
  });

  // Rekap Harian Filter Listeners
  document.getElementById('inputSearchSiswa').addEventListener('input', renderSiswaTable);
  document.getElementById('selectKelasFilter').addEventListener('change', renderSiswaTable);
  document.getElementById('selectRekapStatus').addEventListener('change', renderRekapTable);
  document.getElementById('selectRekapKelas').addEventListener('change', renderRekapTable);
  document.getElementById('btnExportCsv').addEventListener('click', exportCsv);

  // Settings Save
  document.getElementById('btnSaveBaseUrl').addEventListener('click', testPingConnection);
  document.getElementById('btnSaveSchedule').addEventListener('click', () => {
    state.settings.jam_masuk = document.getElementById('setJamMasuk').value + ':00';
    state.settings.batas_terlambat = document.getElementById('setBatasTerlambat').value + ':00';
    state.settings.jam_tutup_scan = document.getElementById('setJamTutup').value + ':00';
    state.settings.nama_sekolah = document.getElementById('setNamaSekolah').value;
    state.settings.tahun_ajaran = document.getElementById('setTahunAjaran').value;

    document.getElementById('schoolNameHeader').textContent = state.settings.nama_sekolah.toUpperCase();
    alert('Pengaturan jam masuk dan profil sekolah berhasil disimpan!');
  });

  document.getElementById('btnTestPing').addEventListener('click', testPingConnection);
}

// ================= LAN PING TEST =================
async function testPingConnection() {
  const url = document.getElementById('settingBaseUrl').value.trim();
  state.baseUrl = url;

  const diagEl = document.getElementById('pingDiagContent');
  diagEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim paket ping ke gateway...';

  const startTime = Date.now();
  try {
    const res = await fetch(`${url}/ping`, { method: 'GET', headers: { 'Accept': 'application/json' } });
    const latency = Date.now() - startTime;
    if (res.ok) {
      const data = await res.json();
      state.isBackendConnected = true;
      document.getElementById('lanHealthText').textContent = `Terhubung (Ping: ${latency}ms)`;
      document.getElementById('pingValue').textContent = latency;
      document.getElementById('lanIpDisplay').textContent = data.server_ip || '192.168.1.10:8000';
      diagEl.innerHTML = `<span style="color: var(--color-success-text); font-weight: 600;">✓ Sukses: Gateway ${data.server_ip} Online (Latensi: ${latency}ms, Server: ${data.server_time_display})</span>`;
      return;
    }
  } catch (e) {
    // Backend offline / not yet started
  }

  // Fallback Simulator Display
  state.isBackendConnected = false;
  document.getElementById('lanHealthText').textContent = 'Simulator Mandiri (Offline Ready)';
  document.getElementById('pingValue').textContent = '0';
  document.getElementById('lanIpDisplay').textContent = '192.168.1.10:8000';
  diagEl.innerHTML = `<span style="color: var(--color-warning-text); font-weight: 500;">⚠ Backend Laravel belum aktif pada ${url}. Sistem otomatis berjalan dalam <strong>Mode Simulator LAN Mandiri</strong> dengan data lengkap sesuai Blueprint.</span>`;
}
