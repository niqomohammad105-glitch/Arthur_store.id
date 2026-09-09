document.addEventListener('DOMContentLoaded', () => {
    // Menangkap semua tombol di navigasi bawah dan semua halaman
    const navBtns = document.querySelectorAll('.nav-btn');
    const pageTabs = document.querySelectorAll('.page-tab');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            // 1. Reset warna semua tombol navigasi menjadi abu-abu
            navBtns.forEach(b => {
                b.classList.remove('text-[#ee4d2d]');
                b.classList.add('text-gray-500');
                
                // Ubah ikon SVG yang solid (aktif) menjadi garis tepi (tidak aktif)
                if(b.querySelector('svg').getAttribute('fill') === 'currentColor') {
                    b.querySelector('svg').setAttribute('fill', 'none');
                    b.querySelector('svg').setAttribute('stroke', 'currentColor');
                }
            });

            // 2. Beri warna oranye pada tombol yang baru saja diklik
            btn.classList.add('text-[#ee4d2d]');
            btn.classList.remove('text-gray-500');
            
            // Ubah ikon garis tepi menjadi solid
            btn.querySelector('svg').setAttribute('fill', 'currentColor');
            btn.querySelector('svg').removeAttribute('stroke');

            // 3. Sembunyikan semua konten halaman
            pageTabs.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('block');
            });

            // 4. Munculkan hanya halaman yang ID-nya sesuai dengan tombol
            const targetId = btn.getAttribute('data-target');
            document.getElementById(`page-${targetId}`).classList.remove('hidden');
            document.getElementById(`page-${targetId}`).classList.add('block');
            
            // Otomatis menggulir ke atas saat halaman baru terbuka
            window.scrollTo(0, 0);
        });
    });
});
                
