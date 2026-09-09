/* script.js - Arthur Store ID Mobile + AI Chatbot */

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
            
            window.scrollTo(0, 0);
        });
    });

    // --- 3. LOGIKA HALAMAN DETAIL PRODUK ---
    const productCards = document.querySelectorAll('.product-card');
    const pageDetail = document.getElementById('page-detail');
    const backBtn = document.getElementById('backBtn');
    
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
            document.getElementById('page-beranda').classList.remove('hidden');
            document.getElementById('page-beranda').classList.add('block');
            
            if (mainBottomNav) {
                mainBottomNav.classList.remove('hidden');
                mainBottomNav.classList.add('flex');
            }
            window.scrollTo(0, 0);
        });
    }

    // --- 4. MODAL LOGIN ---
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        });
        closeModalBtn.addEventListener('click', () => {
            loginModal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
        });
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Proses Login Berhasil!');
                loginModal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
            });
        }
    }

    // --- 5. LOGIKA AI CHATBOT (FITUR BARU) ---
    const aiChatFab = document.getElementById('aiChatFab');
    const aiChatModal = document.getElementById('aiChatModal');
    const aiChatContent = document.getElementById('aiChatContent');
    const closeAiChatBtn = document.getElementById('closeAiChatBtn');
    const aiChatForm = document.getElementById('aiChatForm');
    const aiChatInput = document.getElementById('aiChatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (aiChatFab && aiChatModal) {
        // Buka Chat Modal
        aiChatFab.addEventListener('click', () => {
            aiChatModal.classList.remove('hidden');
            setTimeout(() => {
                aiChatModal.classList.remove('opacity-0');
                aiChatContent.classList.remove('translate-y-full');
            }, 10);
        });

        // Tutup Chat Modal
        const closeChat = () => {
            aiChatModal.classList.add('opacity-0');
            aiChatContent.classList.add('translate-y-full');
            setTimeout(() => aiChatModal.classList.add('hidden'), 300);
        };

        closeAiChatBtn.addEventListener('click', closeChat);
        aiChatModal.addEventListener('click', (e) => {
            if (e.target === aiChatModal) closeChat();
        });

        // Simulasi Percakapan AI
        aiChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userText = aiChatInput.value.trim();
            if (!userText) return;

            // Render Pesan User
            const userMsgHtml = `
                <div class="self-end max-w-[85%] bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm">
                    <p class="text-xs">${userText}</p>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', userMsgHtml);
            aiChatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Indikator AI Mengetik
            const typingId = 'typing-' + Date.now();
            const typingHtml = `
                <div id="${typingId}" class="self-start max-w-[85%] bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700">
                    <p class="text-xs text-gray-500 italic">Arthur AI sedang mengetik...</p>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', typingHtml);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Jeda waktu berfikir AI
            setTimeout(() => {
                const typingEl = document.getElementById(typingId);
                if (typingEl) typingEl.remove();
                
                // Deteksi kata kunci sederhana
                let aiResponse = "Maaf, sistem Arthur AI belum terhubung ke database. Nanti bagian ini akan merespons menggunakan API backend!";
                const lowerText = userText.toLowerCase();
                
                if (lowerText.includes('garansi') || lowerText.includes('aman')) {
                    aiResponse = "Tenang saja! Semua transaksi dilindungi garansi Escrow 30 hari. Dana penjual ditahan sampai kamu konfirmasi akun 100% aman.";
                } else if (lowerText.includes('ready') || lowerText.includes('ada')) {
                    aiResponse = "Akun yang masih bisa dicheckout berarti statusnya Ready Stock. Ingin dibantu proses transaksinya?";
                }

                // Render Pesan Balasan AI
                const aiMsgHtml = `
                    <div class="self-start max-w-[85%] bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700 fade-in">
                        <p class="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">${aiResponse}</p>
                    </div>
                `;
                chatMessages.insertAdjacentHTML('beforeend', aiMsgHtml);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1200);
        });
    }
});
