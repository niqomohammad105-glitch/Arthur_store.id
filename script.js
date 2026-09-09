document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DARK MODE TEMA ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    if (themeToggle && themeIcon) {
        const savedTheme = localStorage.getItem('theme');
        let isDarkMode = savedTheme === 'dark';
        
        if (isDarkMode) htmlElement.classList.add('dark');
        themeIcon.innerText = isDarkMode ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            themeIcon.innerText = isDarkMode ? '☀️' : '🌙';
        });
    }

    // --- 2. NAVIGASI BAWAH (PINDAH HALAMAN) ---
    const navBtns = document.querySelectorAll('.nav-btn');
    const pageTabs = document.querySelectorAll('.page-tab');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset semua warna ikon ke abu-abu
            navBtns.forEach(b => {
                b.classList.remove('text-blue-600', 'dark:text-blue-400');
                b.classList.add('text-gray-500');
                const svg = b.querySelector('svg');
                if(svg && svg.getAttribute('fill') === 'currentColor') {
                    svg.setAttribute('fill', 'none');
                    svg.setAttribute('stroke', 'currentColor');
                }
            });

            // Aktifkan warna biru untuk tombol yang sedang diklik
            btn.classList.add('text-blue-600', 'dark:text-blue-400');
            btn.classList.remove('text-gray-500');
            const clickedSvg = btn.querySelector('svg');
            if(clickedSvg) {
                clickedSvg.setAttribute('fill', 'currentColor');
                clickedSvg.removeAttribute('stroke');
            }

            // Sembunyikan semua halaman, lalu tampilkan yang sesuai
            const targetId = btn.getAttribute('data-target');
            pageTabs.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('block');
            });
            
            const targetPage = document.getElementById(`page-${targetId}`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('block');
            }
            
            // Gulir otomatis ke atas saat pindah menu
            window.scrollTo(0, 0);
        });
    });

    // --- 3. MODAL POPUP LOGIN ---
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginModalContent = document.getElementById('loginModalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');

    if (loginBtn && loginModal && loginModalContent && closeModalBtn) {
        
        const openModal = () => {
            loginModal.classList.remove('hidden');
            setTimeout(() => {
                loginModal.classList.remove('opacity-0', 'pointer-events-none');
                loginModalContent.classList.remove('scale-95');
            }, 10);
        };

        const closeModal = () => {
            loginModal.classList.add('opacity-0', 'pointer-events-none');
            loginModalContent.classList.add('scale-95');
            setTimeout(() => loginModal.classList.add('hidden'), 300);
        };

        loginBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        // Klik area hitam untuk menutup
        loginModal.addEventListener('click', (e) => { 
            if (e.target === loginModal) closeModal(); 
        });

        // Simulasi submit
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Proses Audit Keamanan Login Berjalan... Akses Diberikan!');
                closeModal();
                loginForm.reset();
            });
        }
    }

    // --- 4. SIMULASI PENCARIAN ---
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputVal = document.getElementById('searchInput').value;
            if (inputVal.trim() !== '') {
                alert(`Mencari data: ${inputVal}\n\nFitur ini akan segera terhubung ke database.`);
            }
        });
    }
});
                   
