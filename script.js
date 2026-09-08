// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HANDLING DARK MODE (AUDIT POINT: LocalStorage Access) ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Cek preferensi tema sebelumnya dari localStorage atau dari preferensi sistem OS
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
        themeIcon.innerText = '☀️'; // Ikon matahari untuk beralih ke mode terang
    }

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        // Simpan preferensi pengguna ke localStorage (Aman dari XSS, tapi rentan jika di-inject script lain)
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.innerText = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.innerText = '🌙';
        }
    });

    // --- 2. HANDLING FORM PENCARIAN (AUDIT POINT: XSS & Sanitization) ---
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResultArea = document.getElementById('searchResultArea');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const query = searchInput.value;
        
        if(query.trim() === '') {
            alert('Masukkan kata kunci pencarian terlebih dahulu!');
            return;
        }

        // PERHATIAN SECURITY: InnerHTML + Input Pengguna = Risiko XSS
        // Bisakah kamu menemukan cara untuk menginjeksi <script> atau <img onerror=""> melalui input ini?
        searchResultArea.classList.remove('hidden');
        searchResultArea.innerHTML = `
            <h2 class="text-lg font-bold text-gray-800 dark:text-white">Hasil Pencarian:</h2>
            <p class="text-gray-600 dark:text-gray-300 mt-2">Menampilkan hasil untuk: <strong>${query}</strong></p>
            <p class="text-sm text-red-500 mt-2 text-xs">*Simulasi data kosong. API pencarian belum dihubungkan.</p>
        `;
        
        searchInput.value = '';
    });


    // --- 3. HANDLING TOMBOL MASUK/LOGIN ---
    const loginBtn = document.getElementById('loginBtn');
    
    loginBtn.addEventListener('click', () => {
        const isConfirmed = confirm('Mengarahkan ke halaman Login/Register. Lanjutkan?');
        if(isConfirmed) {
            console.log("Navigasi ke /login...");
        }
    });
});
