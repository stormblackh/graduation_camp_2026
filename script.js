const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaQ4g9qZ0hgUAK4HwDSQFPXReEQgxue_wNo6-oh8pTyaVkrApi2bl3fkkMhO0xfFQv/exec";

const events = [
  { name: "Find the Mr White", teamSize: 3, icon: "fa-magnifying-glass", accent: "green", lineUrl: "https://line.me/R/ti/g/zxjFdbcJB6" },
  { name: "Step Together", teamSize: 4, icon: "fa-shoe-prints", accent: "cyan", lineUrl: "https://line.me/R/ti/g/y6bQ_F5aJ7" },
  { name: "Outbound", teamSize: 6, icon: "fa-campground", accent: "purple", lineUrl: "https://line.me/R/ti/g/csn_9gma6c" },
  { name: "Echo Hunt", teamSize: 5, icon: "fa-ear-listen", accent: "pink", lineUrl: "https://line.me/R/ti/g/R5zrhCUwdU" },
  { name: "Speed Number", teamSize: 5, icon: "fa-bolt-lightning", accent: "amber", lineUrl: "https://line.me/R/ti/g/-DLeGrrcwA" },
  { name: "Tail Relay", teamSize: 5, icon: "fa-people-arrows", accent: "blue", lineUrl: "https://line.me/R/ti/g/DtGSUEkWtM" }
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

function switchSection(sectionId) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active-section'));
  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active-section');

  // Auto-detect the correct nav link based on sectionId
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(a => {
    const onclick = a.getAttribute('onclick') || '';
    if (onclick.includes("'" + sectionId + "'")) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  navMenu.classList.remove('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const accentMap = {
  green: { bg: 'rgba(0, 255, 170, 0.12)', color: 'var(--aurora-green)', border: 'rgba(0, 255, 170, 0.25)' },
  cyan: { bg: 'rgba(0, 229, 255, 0.12)', color: 'var(--aurora-cyan)', border: 'rgba(0, 229, 255, 0.25)' },
  purple: { bg: 'rgba(189, 0, 255, 0.12)', color: 'var(--aurora-purple)', border: 'rgba(189, 0, 255, 0.25)' },
  pink: { bg: 'rgba(255, 0, 127, 0.12)', color: 'var(--aurora-pink)', border: 'rgba(255, 0, 127, 0.25)' },
  amber: { bg: 'rgba(255, 167, 38, 0.12)', color: 'var(--aurora-amber)', border: 'rgba(255, 167, 38, 0.25)' },
  blue: { bg: 'rgba(68, 138, 255, 0.12)', color: 'var(--aurora-blue)', border: 'rgba(68, 138, 255, 0.25)' }
};

const registerModal = document.getElementById('registerModal');
const regFormView = document.getElementById('reg-form-view');
const regSuccessView = document.getElementById('reg-success-view');
const memberContainer = document.getElementById('member-fields');
const form = document.getElementById('registration-form');
const btnSubmit = document.getElementById('btn-submit');
const statusMsg = document.getElementById('status-msg');

let currentRegEvent = null;

function openRegisterModal(eventName) {
  const ev = events.find(e => e.name === eventName);
  if (!ev) return;

  currentRegEvent = ev;

  document.getElementById('event-select').value = ev.name;

  const iconEl = document.getElementById('reg-modal-icon');
  iconEl.className = 'fa-solid ' + ev.icon;
  const a = accentMap[ev.accent];
  iconEl.style.background = a.bg;
  iconEl.style.color = a.color;
  iconEl.style.border = '1px solid ' + a.border;

  document.getElementById('reg-modal-title').innerText = ev.name;
  const badge = document.getElementById('reg-modal-badge');
  badge.innerText = ev.teamSize + ' Orang / Kelas';
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
  ketuaInput.placeholder = 'Nama lengkap ketua';
  ketuaDiv.appendChild(ketuaLabel);
  ketuaDiv.appendChild(ketuaInput);
  memberContainer.appendChild(ketuaDiv);

  for (let i = 1; i < ev.teamSize; i++) {
    const div = document.createElement('div');
    div.className = 'member-field';
    const label = document.createElement('label');
    label.setAttribute('for', 'anggota_' + i);
    label.textContent = 'Anggota ' + i;
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'anggota_' + i;
    input.name = 'anggota_' + i;
    input.placeholder = 'Nama anggota ' + i;
    div.appendChild(label);
    div.appendChild(input);
    memberContainer.appendChild(div);
  }

  regFormView.style.display = 'block';
  regSuccessView.style.display = 'none';
  statusMsg.className = '';
  statusMsg.style.display = 'none';
  btnSubmit.disabled = false;
  btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
  form.reset();
  document.getElementById('event-select').value = ev.name;

  registerModal.classList.add('active-modal');
  document.body.style.overflow = 'hidden';

  setTimeout(() => document.getElementById('kelas').focus(), 300);
}

function closeRegisterModal() {
  registerModal.classList.remove('active-modal');
  document.body.style.overflow = '';
}

registerModal.addEventListener('click', function(e) {
  if (e.target === registerModal) {
    closeRegisterModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && registerModal.classList.contains('active-modal')) {
    closeRegisterModal();
  }
});

form.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnSubmit.click();
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (SCRIPT_URL === "URL_GOOGLE_APPS_SCRIPT_ANDA") {
    alert("Silakan atur variabel SCRIPT_URL Google Apps Script Anda terlebih dahulu.");
    return;
  }

  if (!currentRegEvent) return;

  const ev = currentRegEvent;
  const kelas = document.getElementById('kelas').value.trim();

  if (!kelas) {
    statusMsg.innerText = 'Isi kelas / tingkat terlebih dahulu.';
    statusMsg.className = 'error';
    statusMsg.style.display = 'block';
    document.getElementById('kelas').focus();
    return;
  }

  const ketuaName = (document.getElementById('nama_ketua') || {}).value || '';
  if (!ketuaName.trim()) {
    statusMsg.innerText = 'Isi nama ketua terlebih dahulu.';
    statusMsg.className = 'error';
    statusMsg.style.display = 'block';
    document.getElementById('nama_ketua').focus();
    return;
  }

  for (let i = 1; i < ev.teamSize; i++) {
    const val = (document.getElementById('anggota_' + i) || {}).value || '';
    if (!val.trim()) {
      statusMsg.innerText = 'Isi nama Anggota ' + i + ' terlebih dahulu.';
      statusMsg.className = 'error';
      statusMsg.style.display = 'block';
      const el = document.getElementById('anggota_' + i);
      if (el) el.focus();
      return;
    }
  }

  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

  const fd = new FormData(form);
  const now = new Date();
  fd.append('timestamp', now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }));
  fd.append('jam', String(now.getHours()).padStart(2, '0'));
  fd.append('menit', String(now.getMinutes()).padStart(2, '0'));
  fd.append('detik', String(now.getSeconds()).padStart(2, '0'));

  fetch(SCRIPT_URL, { method: 'POST', body: fd })
    .then(() => {
      regFormView.style.display = 'none';

      document.getElementById('success-line-name').innerText = ev.name;
      document.getElementById('success-line-link').href = ev.lineUrl || '#';

      regSuccessView.style.display = 'block';
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
  if (!currentRegEvent) {
    closeRegisterModal();
    return;
  }
  openRegisterModal(currentRegEvent.name);
}

const EVENT_DATE = new Date(2026, 10, 13, 13, 30);

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

function _auroraLiveCallback(data) {
  const countEl = document.getElementById('live-tim-count');
  if (countEl && typeof data.totalTim === 'number') {
    countEl.textContent = data.totalTim;
  }
}

function fetchLiveTimCount() {
  const cbName = '_auroraLiveCallback';
  const base = SCRIPT_URL.split('?')[0];
  const url = base + '?action=count&callback=' + cbName + '&t=' + Date.now();

  const old = document.getElementById('jsonp-live-tim');
  if (old) old.remove();

  const s = document.createElement('script');
  s.id = 'jsonp-live-tim';
  s.src = url;
  s.onerror = function() {
    document.getElementById('live-tim-count').textContent = '-';
  };
  document.body.appendChild(s);
}

fetchLiveTimCount();
setInterval(fetchLiveTimCount, 30000);
