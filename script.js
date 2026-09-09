/* =========================================
   script.js - Arthur Store ID Mobile
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOGIKA TEMA GELAP (DARK MODE) ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Cek penyimpanan lokal
    const savedTheme = localStorage.getItem('theme');
    let isDarkMode = savedTheme === 'dark';
    
    if (isDarkMode) htmlElement.classList.add('dark');
    if (themeIcon) themeIcon.innerText = isDarkMode ? '☀️' : '🌙';

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            if (themeIcon) themeIcon.innerText = isDarkMode ? '☀️' : '🌙';
        });
    }

    // --- 2. LOGIKA NAVIGASI BAWAH (SPA) ---
    const navBtns = document.querySelectorAll('.nav-btn');
    const pageTabs = document.querySelectorAll('.page-tab');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            // A. Reset semua tombol navigasi ke warna abu-abu
            navBtns.forEach(b => {
                b.classList.remove('text-blue-600', 'dark:text-blue-400');
                b.classList.add('text-gray-500');
                if(b.querySelector('svg') && b.querySelector('svg').getAttribute('fill') === 'currentColor') {
                    b.querySelector('svg').setAttribute('fill', 'none');
                    b.querySelector('svg').setAttribute('stroke', 'currentColor');
                }
            });

            // B. Aktifkan warna biru untuk tombol yang diklik
            btn.classList.add('text-blue-600', 'dark:text-blue-400');
            btn.classList.remove('text-gray-500');
            if(btn.querySelector('svg')) {
                btn.querySelector('svg').setAttribute('fill', 'currentColor');
                btn.querySelector('svg').removeAttribute('stroke');
            }

            // C. Sembunyikan semua konten halaman
            pageTabs.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('block');
            });
            
            // D. Tampilkan halaman yang dituju
            const targetId = btn.getAttribute('data-target');
            const targetPage = document.getElementById(`page-${targetId}`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('block');
            }
            window.scrollTo(0, 0); // Otomatis gulir ke atas
        });
    });

    // --- 3. LOGIKA MODAL LOGIN ---
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginModalContent = document.getElementById('loginModalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');

    const openModal = () => {
        if(loginModal && loginModalContent) {
            loginModal.classList.remove('hidden');
            setTimeout(() => {
                loginModal.classList.remove('opacity-0', 'pointer-events-none');
                loginModalContent.classList.remove('scale-95');
            }, 10);
        }
    };

    const closeModal = () => {
        if(loginModal && loginModalContent) {
            loginModal.classList.add('opacity-0', 'pointer-events-none');
            loginModalContent.classList.add('scale-95');
            setTimeout(() => loginModal.classList.add('hidden'), 300);
        }
    };

    if (loginBtn) loginBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Tutup modal jika area gelap di sekitarnya diklik
    if (loginModal) {
        loginModal.addEventListener('click', (e) => { 
            if (e.target === loginModal) closeModal(); 
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Simulasi Login Arthur Store ID Berhasil!');
            closeModal();
            loginForm.reset();
        });
    }
    
    // --- 4. LOGIKA PENCARIAN (SIMULASI) ---
    const searchForm = document.getElementById('searchForm');
    if(searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('searchInput')?.value;
            if(query.trim() !== "") {
                alert(`Mencari: ${query}\n\n[Sistem Escrow Siaga]`);
            }
        });
    }

});
                                                        
