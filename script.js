// --- INTEGRASI GOOGLE APPS SCRIPT ---
const SCRIPT_URL = "URL_GOOGLE_APPS_SCRIPT_ANDA";

// --- NAVBAR DYNAMIC SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
    } else {
    navbar.classList.remove('scrolled');
    }
});

// --- RESPONSIVE HAMBURGER MENU ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// --- NAVIGASI SWITCH SECTION WITH ANIMATION ---
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

// --- AUTOMATIC HERO SLIDER ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function autoSlide() {
    slides[currentSlide].classList.remove('active-slide');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active-slide');
}
setInterval(autoSlide, 5000);

// --- ANIMATED COUNTER ---
const counters = document.querySelectorAll('.counter');

function startCounters() {
    counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const speed = 150;
    const updateCount = () => {
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 25);
        } else {
        counter.innerText = target;
        }
    };
    updateCount();
    });
}
window.addEventListener('load', startCounters);

// --- FILTER CATEGORY EVENT ---
function filterEvents(category, button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
    } else {
        card.style.display = 'none';
    }
    });
}

// --- MODAL POPUP DETAILED INFO ---
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

// --- AUTO-SELECT FORM EVENT ---
function goToRegister(eventName) {
    const regNavBtn = document.querySelectorAll('.nav-links a')[2];
    switchSection('registrasi', regNavBtn);
    
    if (eventName) {
    document.getElementById('event').value = eventName;
    }
}

// --- SUBMIT FORM REAL-TIME KE SPREADSHEET ---
const form = document.getElementById('registration-form');
const statusMsg = document.getElementById('status-msg');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', e => {
    e.preventDefault();

    if (SCRIPT_URL === "URL_GOOGLE_APPS_SCRIPT_ANDA") {
    alert("Silakan atur variabel SCRIPT_URL Google Apps Script Anda terlebih dahulu.");
    return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Data...';
    statusMsg.style.display = 'none';

    fetch(SCRIPT_URL, { method: 'POST', body: new FormData(form) })
    .then(response => {
        statusMsg.innerText = "Pendaftaran berhasil dikirim! Panitia akan menghubungi via WhatsApp.";
        statusMsg.className = "success";
        statusMsg.style.display = 'block';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
    })
    .catch(error => {
        statusMsg.innerText = "Gagal menyambung ke server. Periksa koneksi internet Anda.";
        statusMsg.className = "error";
        statusMsg.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
    });
});