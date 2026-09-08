document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SISTEM DARK MODE ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    const updateThemeIcon = (isDark) => {
        themeIcon.innerText = isDark ? '☀️' : '🌙';
    };

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

    if (isDarkMode) htmlElement.classList.add('dark');
    else htmlElement.classList.remove('dark');
    updateThemeIcon(isDarkMode);

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        updateThemeIcon(isDarkMode);
    });


    // --- 2. SISTEM NAVIGASI ANTAR HALAMAN (SPA) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            navLinks.forEach(nav => nav.classList.remove('text-blue-300'));
            link.classList.add('text-blue-300');

            pageSections.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('block', 'animate-fade-in');
            });
            
            const targetPage = document.getElementById(`page-${targetId}`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('block', 'animate-fade-in');
            }
        });
    });


    // --- 3. FITUR PENCARIAN (SIMULASI) ---
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResultArea = document.getElementById('searchResultArea');

    if(searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const query = searchInput.value;
            if(query.trim() === '') return;

            searchResultArea.classList.remove('hidden');
            searchResultArea.innerHTML = `
                <h2 class="text-lg font-bold text-gray-800 dark:text-white">Hasil Pencarian:</h2>
                <p class="text-gray-600 dark:text-gray-300 mt-2">Menampilkan hasil untuk: <strong>${query}</strong></p>
            `;
            searchInput.value = '';
        });
    }


    // --- 4. SISTEM MODAL LOGIN ---
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginModalContent = document.getElementById('loginModalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');

    // Fungsi membuka modal
    const openModal = () => {
        loginModal.classList.remove('hidden');
        setTimeout(() => {
            loginModal.classList.remove('opacity-0', 'pointer-events-none');
            loginModalContent.classList.remove('scale-95');
        }, 10);
    };

    // Fungsi menutup modal
    const closeModal = () => {
        loginModal.classList.add('opacity-0', 'pointer-events-none');
        loginModalContent.classList.add('scale-95');
        setTimeout(() => {
            loginModal.classList.add('hidden');
        }, 300);
    };

    // Event Listeners Modal
    loginBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal();
    });

    // Simulasi Pengiriman Form Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const identifier = document.getElementById('loginIdentifier').value;
        console.log(`Mencoba login dengan: ${identifier}`);
        alert('Simulasi Login Berhasil! (Cek Console)');
        closeModal();
        loginForm.reset(); 
    });

});


// --- 5. FUNGSI TRANSAKSI GLOBAL ---
// Diletakkan di luar DOMContentLoaded agar bisa diakses oleh atribut onclick pada HTML
function processTransaction(itemName, price) {
    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    const confirmBuy = confirm(`Proses pembelian: ${itemName} seharga ${formattedPrice}?`);
    if (confirmBuy) {
        alert('Mengalihkan ke sistem Escrow pembayaran...');
    }
        }
