/* script.js - Arthur Store ID Mobile + Slider Banner Berjalan */

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
    const navBtns = document.querySelectorAll('.nav-btn');
    const pageTabs = document.querySelectorAll('.page-tab');
    const mainBottomNav = document.getElementById('main-bottom-nav');

    const hideAllPages = () => {
        pageTabs.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('block');
        });
    };

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => {
                b.classList.remove('text-blue-600', 'dark:text-blue-400');
                b.classList.add('text-gray-500');
                const svg = b.querySelector('svg');
                if(svg && svg.getAttribute('fill') === 'currentColor') {
                    svg.setAttribute('fill', 'none');
                    svg.setAttribute('stroke', 'currentColor');
                }
            });

            btn.classList.add('text-blue-600', 'dark:text-blue-400');
            btn.classList.remove('text-gray-500');
            const clickedSvg = btn.querySelector('svg');
            if(clickedSvg) {
                clickedSvg.setAttribute('fill', 'currentColor');
                clickedSvg.removeAttribute('stroke');
            }

            hideAllPages();
            
            const targetId = btn.getAttribute('data-target');
            document.getElementById(`page-${targetId}`).classList.remove('hidden');
            document.getElementById(`page-${targetId}`).classList.add('block');
            
            if (mainBottomNav) {
                mainBottomNav.classList.remove('hidden');
                mainBottomNav.classList.add('flex');
            }
            window.scrollTo(0, 0);
        });
    });


    // --- 3. ALUR PEMBELIAN (DETAIL -> CHECKOUT -> PEMBAYARAN) ---
    const productCards = document.querySelectorAll('.product-card');
    const pageBeranda = document.getElementById('page-beranda');
    const pageDetail = document.getElementById('page-detail');
    const pageCheckout = document.getElementById('page-checkout');
    const pagePayment = document.getElementById('page-payment');
    
    const backBtn = document.getElementById('backBtn');
    const backFromCheckoutBtn = document.getElementById('backFromCheckoutBtn');
    const backFromPaymentBtn = document.getElementById('backFromPaymentBtn');
    
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            hideAllPages();
            pageDetail.classList.remove('hidden');
            pageDetail.classList.add('block');
            if (mainBottomNav) {
                mainBottomNav.classList.add('hidden');
                mainBottomNav.classList.remove('flex');
            }
            window.scrollTo(0, 0);
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            hideAllPages();
            pageBeranda.classList.remove('hidden');
            pageBeranda.classList.add('block');
            if (mainBottomNav) {
                mainBottomNav.classList.remove('hidden');
                mainBottomNav.classList.add('flex');
            }
            window.scrollTo(0, 0);
        });
    }

    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            hideAllPages();
            pageCheckout.classList.remove('hidden');
            pageCheckout.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    if (backFromCheckoutBtn) {
        backFromCheckoutBtn.addEventListener('click', () => {
            hideAllPages();
            pageDetail.classList.remove('hidden');
            pageDetail.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    const selectPaymentMethodBtn = document.getElementById('selectPaymentMethodBtn');
    if (selectPaymentMethodBtn) {
        selectPaymentMethodBtn.addEventListener('click', () => {
            hideAllPages();
            pagePayment.classList.remove('hidden');
            pagePayment.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    if (backFromPaymentBtn) {
        backFromPaymentBtn.addEventListener('click', () => {
            hideAllPages();
            pageCheckout.classList.remove('hidden');
            pageCheckout.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    const selectedPaymentText = document.getElementById('selectedPaymentText');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', () => {
            const selectedOption = document.querySelector('input[name="payment_method"]:checked').value;
            if(selectedPaymentText) {
                selectedPaymentText.innerText = selectedOption;
                selectedPaymentText.classList.add('text-green-600', 'dark:text-green-400');
            }
            hideAllPages();
            pageCheckout.classList.remove('hidden');
            pageCheckout.classList.add('block');
            window.scrollTo(0, 0);
        });
    }

    const processPaymentBtn = document.getElementById('processPaymentBtn');
    if (processPaymentBtn) {
        processPaymentBtn.addEventListener('click', () => {
            const currentPayment = selectedPaymentText ? selectedPaymentText.innerText : "";
            if (currentPayment === "Pilih Metode Pembayaran...") {
                alert("Mohon pilih metode pembayaran terlebih dahulu!");
                return;
            }
            alert(`Pesanan Berhasil Dibuat!\nMengalihkan ke sistem pembayaran ${currentPayment}...`);
        });
    }

    // --- 4. LOGIKA MODAL LOGIN ---
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginModalContent = document.getElementById('loginModalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');

    if (loginBtn && loginModal && loginModalContent) {
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
            setTimeout(() => {
                loginModal.classList.add('hidden');
            }, 300);
        };

        loginBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        loginModal.addEventListener('click', (e) => { 
            if (e.target === loginModal) closeModal();
        });

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Login Berhasil ke sistem Arthur Store ID!');
                closeModal();
                loginForm.reset();
            });
        }
    }

    // --- 5. LOGIKA AI CHATBOT ---
    const aiChatFab = document.getElementById('aiChatFab');
    const aiChatModal = document.getElementById('aiChatModal');
    const aiChatContent = document.getElementById('aiChatContent');
    const closeAiChatBtn = document.getElementById('closeAiChatBtn');
    const aiChatForm = document.getElementById('aiChatForm');
    const aiChatInput = document.getElementById('aiChatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (aiChatFab && aiChatModal) {
        aiChatFab.addEventListener('click', () => {
            aiChatModal.classList.remove('hidden');
            setTimeout(() => {
                aiChatModal.classList.remove('opacity-0');
                aiChatContent.classList.remove('translate-y-full');
            }, 10);
        });

        const closeChat = () => {
            aiChatModal.classList.add('opacity-0');
            aiChatContent.classList.add('translate-y-full');
            setTimeout(() => aiChatModal.classList.add('hidden'), 300);
        };

        closeAiChatBtn.addEventListener('click', closeChat);
        aiChatModal.addEventListener('click', (e) => {
            if (e.target === aiChatModal) closeChat();
        });

        aiChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userText = aiChatInput.value.trim();
            if (!userText) return;

            const userMsgHtml = `<div class="self-end max-w-[85%] bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm"><p class="text-xs">${userText}</p></div>`;
            chatMessages.insertAdjacentHTML('beforeend', userMsgHtml);
            aiChatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            const typingId = 'typing-' + Date.now();
            const typingHtml = `<div id="${typingId}" class="self-start max-w-[85%] bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700"><p class="text-xs text-gray-500 italic">Arthur AI sedang mengetik...</p></div>`;
            chatMessages.insertAdjacentHTML('beforeend', typingHtml);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                document.getElementById(typingId).remove();
                let aiResponse = "Maaf, sistem AI sedang offline. Sistem akan dihubungkan ke backend segera!";
                const lowerText = userText.toLowerCase();
                
                if (lowerText.includes('garansi') || lowerText.includes('aman')) {
                    aiResponse = "Tenang saja! Semua transaksi dilindungi garansi Escrow 30 hari. Dana penjual ditahan sampai kamu konfirmasi akun 100% aman.";
                }

                const aiMsgHtml = `<div class="self-start max-w-[85%] bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700 fade-in"><p class="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">${aiResponse}</p></div>`;
                chatMessages.insertAdjacentHTML('beforeend', aiMsgHtml);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1200);
        });
    }

    // --- 6. LOGIKA BANNER SLIDER OTOMATIS ---
    const bannerSlider = document.getElementById('bannerSlider');
    if (bannerSlider) {
        setInterval(() => {
            const maxScroll = bannerSlider.scrollWidth - bannerSlider.clientWidth;
            if (bannerSlider.scrollLeft >= maxScroll - 10) {
                bannerSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                bannerSlider.scrollBy({ left: bannerSlider.clientWidth * 0.85, behavior: 'smooth' });
            }
        }, 3000); // Geser setiap 3 detik
    }

});
