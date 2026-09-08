document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HANDLING DARK MODE (Diperbaiki & Disempurnakan) ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Fungsi untuk memperbarui ikon berdasarkan tema aktif
    const updateThemeIcon = (isDark) => {
        themeIcon.innerText = isDark ? '☀️' : '🌙';
        // Animasi rotasi kecil saat ditekan
        themeIcon.style.transform = 'rotate(360deg)';
        themeIcon.style.transition = 'transform 0.5s ease';
        setTimeout(() => themeIcon.style.transform = 'none', 500);
    };

    // Sinkronisasi awal saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

    if (isDarkMode) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    updateThemeIcon(isDarkMode);

    // Event Listener untuk Tombol Toggle
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode; // Balikkan status
        
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        
        updateThemeIcon(isDarkMode);
    });

    // [KODE NAVIGASI SPA & PENCARIAN TETAP SAMA SEPERTI SEBELUMNYA]
});
