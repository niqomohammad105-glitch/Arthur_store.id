document.addEventListener('DOMContentLoaded', () => {
    
    // [KODE DARK MODE & SEARCH SEBELUMNYA TETAP ADA DI SINI]

    // --- HANDLING NAVIGASI SPA (Sistem Perpindahan Halaman) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // 1. Reset semua styling menu (hilangkan warna aktif)
            navLinks.forEach(nav => nav.classList.remove('text-blue-300'));
            // 2. Beri warna pada menu yang sedang diklik
            link.classList.add('text-blue-300');

            // 3. Sembunyikan semua halaman
            pageSections.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('block', 'animate-fade-in');
            });
            
            // 4. Tampilkan halaman yang dituju
            const targetPage = document.getElementById(`page-${targetId}`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('block', 'animate-fade-in');
            }
        });
    });

});

// --- FUNGSI KLIK PEMBELIAN DI TIAP HALAMAN (Fokus Review Keamanan) ---
// Note: Fungsi ini diletakkan di luar DOMContentLoaded agar bisa diakses oleh atribut onclick HTML.
function processTransaction(itemName, price) {
    // Simulasi format harga Rupiah
    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    
    const confirmBuy = confirm(`Apakah Anda yakin ingin memproses ${itemName} seharga ${formattedPrice}? \n\nDana akan ditahan di Escrow Arthur Store ID sampai akun/item diamankan.`);
    
    if (confirmBuy) {
        alert('Mengalihkan ke halaman pembayaran...');
        // Nantinya di sini logika backend API pemotongan saldo / invoice berjalan
    }
}
