const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydGvUQKH9bxn_sNAF7f3-7f5g1yDSqkKu0L7fFXrLWmefwQL49ucl2m8gXghW3Hq-Z/exec";

const events = [
  { name: "Find the Mr White", teamSize: 3, icon: "fa-magnifying-glass", accent: "green", lineUrl: "#" },
  { name: "Step Together", teamSize: 4, icon: "fa-shoe-prints", accent: "cyan", lineUrl: "#" },
  { name: "Outbound", teamSize: 6, icon: "fa-campground", accent: "purple", lineUrl: "#" },
  { name: "Echo Hunt", teamSize: 5, icon: "fa-ear-listen", accent: "pink", lineUrl: "#" }
];

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

function switchSection(sectionId, element) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active-section'));
  document.getElementById(sectionId).classList.add('active-section');

  if (element) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    element.classList.add('active');
  }

  navMenu.classList.remove('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function autoSlide() {
  slides[currentSlide].classList.remove('active-slide');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active-slide');
}
setInterval(autoSlide, 5000);

const modal = document.getElementById('eventModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalRegisterBtn = document.getElementById('modalRegisterBtn');

function openModal(title, desc) {
  modalTitle.innerText = title;
  modalDesc.innerText = desc;
  modalRegisterBtn.onclick = () => {
    closeModal();
    goToRegister(title);
  };
  modal.classList.add('active-modal');
}

function closeModal() {
  modal.classList.remove('active-modal');
}

let currentStep = 1;
let totalSteps = 2;
const form = document.getElementById('registration-form');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const btnSubmit = document.getElementById('btn-submit');
const statusMsg = document.getElementById('status-msg');
const memberContainer = document.getElementById('member-fields');
const stepLineFill = document.querySelector('.step-line-fill');
const stepDots = document.querySelectorAll('.step-dot');

form.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (currentStep < totalSteps) {
      btnNext.click();
    } else {
      btnSubmit.click();
    }
  }
});

function goToStep(step) {
  currentStep = step;

  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active-step'));
  document.querySelector('.form-step[data-step="' + step + '"]').classList.add('active-step');

  stepDots.forEach(dot => {
    const s = +dot.getAttribute('data-step');
    dot.classList.remove('active', 'done');
    if (s === step) dot.classList.add('active');
    if (s < step) dot.classList.add('done');
  });

  if (step === 2) {
    stepLineFill.classList.add('filled');
  } else {
    stepLineFill.classList.remove('filled');
  }

  btnBack.style.display = step === 1 ? 'none' : 'inline-flex';
  btnNext.style.display = step === 1 ? 'inline-flex' : 'none';
  btnSubmit.style.display = step === 2 ? 'inline-flex' : 'none';
}

const accentMap = {
  green: { bg: 'rgba(0, 255, 170, 0.12)', color: 'var(--aurora-green)', border: 'rgba(0, 255, 170, 0.25)' },
  cyan: { bg: 'rgba(0, 229, 255, 0.12)', color: 'var(--aurora-cyan)', border: 'rgba(0, 229, 255, 0.25)' },
  purple: { bg: 'rgba(189, 0, 255, 0.12)', color: 'var(--aurora-purple)', border: 'rgba(189, 0, 255, 0.25)' },
  pink: { bg: 'rgba(255, 0, 127, 0.12)', color: 'var(--aurora-pink)', border: 'rgba(255, 0, 127, 0.25)' }
};

btnNext.addEventListener('click', () => {
  const lomba = document.getElementById('event-select').value;
  const kelas = document.getElementById('kelas').value.trim();

  if (!lomba || !kelas) {
    statusMsg.innerText = 'Lengkapi semua field sebelum lanjut.';
    statusMsg.className = 'error';
    statusMsg.style.display = 'block';
    return;
  }

  statusMsg.className = '';
  statusMsg.style.display = 'none';

  const ev = events.find(e => e.name === lomba);
  if (!ev) return;

  const iconEl = document.getElementById('step2-icon');
  iconEl.className = 'fa-solid ' + ev.icon;
  const a = accentMap[ev.accent];
  iconEl.style.background = a.bg;
  iconEl.style.color = a.color;
  iconEl.style.border = '1px solid ' + a.border;

  document.getElementById('step2-title').innerText = ev.name;
  const badge = document.getElementById('step2-badge');
  badge.innerText = ev.teamSize + ' Orang / Kelompok';
  badge.className = 'team-badge accent-' + ev.accent;

  memberContainer.innerHTML = '';

  var ketuaDiv = document.createElement('div');
  ketuaDiv.className = 'member-field ketua-field';
  var ketuaLabel = document.createElement('label');
  ketuaLabel.setAttribute('for', 'nama_ketua');
  var crownBadge = document.createElement('span');
  crownBadge.className = 'ketua-badge';
  crownBadge.innerHTML = '<i class="fa-solid fa-crown"></i> KETUA';
  ketuaLabel.appendChild(crownBadge);
  ketuaLabel.appendChild(document.createTextNode(' Nama Ketua'));
  var ketuaInput = document.createElement('input');
  ketuaInput.type = 'text';
  ketuaInput.id = 'nama_ketua';
  ketuaInput.name = 'nama_ketua';
  ketuaInput.placeholder = 'Nama lengkap ketua kelompok';
  ketuaInput.required = false;
  ketuaDiv.appendChild(ketuaLabel);
  ketuaDiv.appendChild(ketuaInput);
  memberContainer.appendChild(ketuaDiv);

  for (let i = 2; i <= ev.teamSize; i++) {
    const div = document.createElement('div');
    div.className = 'member-field';
    div.setAttribute('data-dynamic', '');
    const label = document.createElement('label');
    label.setAttribute('for', 'anggota_' + i);
    label.textContent = 'Anggota ' + i;
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'anggota_' + i;
    input.name = 'anggota_' + i;
    input.placeholder = 'Nama anggota ' + i;
    input.required = false;
    div.appendChild(label);
    div.appendChild(input);
    memberContainer.appendChild(div);
  }

  goToStep(2);
});

btnBack.addEventListener('click', () => {
  goToStep(1);
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (SCRIPT_URL === "URL_GOOGLE_APPS_SCRIPT_ANDA") {
    alert("Silakan atur variabel SCRIPT_URL Google Apps Script Anda terlebih dahulu.");
    return;
  }

  const lomba = document.getElementById('event-select').value;
  const ev = events.find(e => e.name === lomba);
  if (!ev) return;

  const ketuaName = (document.getElementById('nama_ketua') || {}).value || '';
  if (!ketuaName.trim()) {
    statusMsg.innerText = 'Isi nama ketua terlebih dahulu.';
    statusMsg.className = 'error';
    statusMsg.style.display = 'block';
    return;
  }

  for (let i = 2; i <= ev.teamSize; i++) {
    const val = (document.getElementById('anggota_' + i) || {}).value || '';
    if (!val.trim()) {
      statusMsg.innerText = 'Isi nama Anggota ' + i + ' terlebih dahulu.';
      statusMsg.className = 'error';
      statusMsg.style.display = 'block';
      return;
    }
  }

  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

  const fd = new FormData(form);
  fd.append('timestamp', new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }));

  fetch(SCRIPT_URL, { method: 'POST', body: fd })
    .then(() => {
      form.style.display = 'none';
      document.querySelector('.step-indicator').style.display = 'none';

      if (ev && ev.lineUrl && ev.lineUrl !== '#') {
        document.getElementById('success-line-name').innerText = ev.name;
        document.getElementById('success-line-link').href = ev.lineUrl;
        document.getElementById('success-line-group').style.display = 'block';
      } else {
        document.getElementById('success-line-group').style.display = 'none';
      }

      document.getElementById('success-panel').style.display = 'block';
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
    })
    .catch(() => {
      statusMsg.innerText = 'Gagal menyambung ke server. Periksa koneksi internet Anda.';
      statusMsg.className = 'error';
      statusMsg.style.display = 'block';
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
    });
});

function resetForm() {
  form.reset();
  form.style.display = 'block';
  document.querySelector('.step-indicator').style.display = 'flex';
  document.getElementById('success-panel').style.display = 'none';
  document.getElementById('success-line-group').style.display = 'none';
  statusMsg.className = '';
  statusMsg.style.display = 'none';
  memberContainer.innerHTML = '';
  goToStep(1);
}

function goToRegister(eventName) {
  const regNavBtn = Array.from(document.querySelectorAll('.nav-item')).find(a => a.textContent.includes('Registrasi'));
  switchSection('registrasi', regNavBtn);

  if (eventName) {
    document.getElementById('event-select').value = eventName;
  }
}

/* ========== COUNTDOWN TIMER ========== */
// ⬇️ UBAH TANGGAL INI SESUAI TANGGAL ACARA
// Format: new Date(TAHUN, BULAN, TANGGAL, JAM, MENIT)
// Bulan: 0=Jan, 1=Feb, 2=Mar, ... 11=Des
// Contoh: 15 Desember 2026 jam 07:00 WIB → new Date(2026, 11, 15, 7, 0)
// ⚠️ Tanggal ini HARUS di browser lokal (WIB otomatis kalau buka dari Indonesia)
const EVENT_DATE = new Date(2027, 5, 15, 7, 0);

function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ========== LIVE TIM COUNT (JSONP) ========== */
// JSONP callback — dipanggil oleh Google Apps Script doGet
function _auroraLiveCallback(data) {
  const countEl = document.getElementById('live-tim-count');
  if (countEl && typeof data.totalTim === 'number') {
    countEl.textContent = data.totalTim;
  }
}

function fetchLiveTimCount() {
  // JSONP: bikin <script> tag yang manggil GAS doGet dengan callback
  const cbName = '_auroraLiveCallback';
  const base = SCRIPT_URL.split('?')[0];
  const url = base + '?action=count&callback=' + cbName + '&t=' + Date.now();

  const old = document.getElementById('jsonp-live-tim');
  if (old) old.remove();

  const s = document.createElement('script');
  s.id = 'jsonp-live-tim';
  s.src = url;
  s.onerror = function() {
    // Kalau gagal (GAS belum punya doGet), tampilkan '-'
    document.getElementById('live-tim-count').textContent = '-';
  };
  document.body.appendChild(s);
}

// Fetch pertama kali, terus refresh setiap 30 detik
fetchLiveTimCount();
setInterval(fetchLiveTimCount, 30000);