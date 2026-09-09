/* script.js - Arthur Store ID Mobile + Alur Pembayaran Penuh */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DARK MODE TEMA ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    if (themeToggle && themeIcon) {
        let isDarkMode = localStorage.getItem('theme') === 'dark';
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

    // --- 2. LOGIKA PINDAH HALAMAN (SPA) ---
    const pageTabs = document.querySelectorAll('.page-tab');
    const hideAllPages = () => {
        pageTabs.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('block');
        });
    };

    // --- 3. ALUR PEMBELIAN (DETAIL -> CHECKOUT -> PEMBAYARAN) ---
    const productCards = document.querySelectorAll('.product-card');
    const pageBeranda = document.getElementById('page-beranda');
    const pageDetail = document.getElementById('page-detail');
    const pageCheckout = document.getElementById('page-checkout');
    const pagePayment = document.getElementById('page-payment');
    
    const backBtn = document.getElementById('backBtn');
    const backFromCheckoutBtn = document.getElementById('backFromCheckoutBtn');
    const backFromPaymentBtn = document.getElementById('backFromPaymentBtn');
    
    // A. Beranda -> Detail
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            hideAllPages();
            pageDetail.classList.remove('hidden');
            pageDetail.classList.add('block');
            window.scrollTo(0, 0);
        });
    });

    // B. Kembali ke Beranda
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            hideAllPages();
            pageBeranda.classList.remove('hidden');
            pageBeranda.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    // C. Detail -> Checkout
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            hideAllPages();
            pageCheckout.classList.remove('hidden');
            pageCheckout.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    // D. Checkout -> Kembali ke Detail
    if (backFromCheckoutBtn) {
        backFromCheckoutBtn.addEventListener('click', () => {
            hideAllPages();
            pageDetail.classList.remove('hidden');
            pageDetail.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    // E. Checkout -> Pilih Metode Pembayaran
    const selectPaymentMethodBtn = document.getElementById('selectPaymentMethodBtn');
    if (selectPaymentMethodBtn) {
        selectPaymentMethodBtn.addEventListener('click', () => {
            hideAllPages();
            pagePayment.classList.remove('hidden');
            pagePayment.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    // F. Pembayaran -> Kembali ke Checkout
    if (backFromPaymentBtn) {
        backFromPaymentBtn.addEventListener('click', () => {
            hideAllPages();
            pageCheckout.classList.remove('hidden');
            pageCheckout.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    // G. Konfirmasi Metode Pembayaran Terpilih
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    const selectedPaymentText = document.getElementById('selectedPaymentText');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', () => {
            // Ambil metode pembayaran yang radio button-nya sedang diceklis (checked)
            const selectedOption = document.querySelector('input[name="payment_method"]:checked').value;
            
            // Ubah teks di halaman Checkout
            if(selectedPaymentText) {
                selectedPaymentText.innerText = selectedOption;
                selectedPaymentText.classList.add('text-green-600', 'dark:text-green-400');
            }

            // Balik ke halaman Checkout
            hideAllPages();
            pageCheckout.classList.remove('hidden');
            pageCheckout.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    // H. Proses Pembuatan Pesanan
    const processPaymentBtn = document.getElementById('processPaymentBtn');
    if (processPaymentBtn) {
        processPaymentBtn.addEventListener('click', () => {
            const currentPayment = selectedPaymentText ? selectedPaymentText.innerText : "";
            
            if (currentPayment === "Pilih Metode Pembayaran...") {
                alert("Mohon pilih metode pembayaran terlebih dahulu!");
                return;
            }
            
            alert(`Pesanan Berhasil Dibuat!\nSistem mengalihkan ke Gateway ${currentPayment}...\n\n(Vibe Coding: Di sinilah API Backend bekerja memproses Invoice)`);
        });
    }
});
