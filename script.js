/* script.js - Arthur Store ID Mobile + TSUNDERE AI (HYBRID CLOUD & OFFLINE BRAIN) */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATABASE AWAL ---
    let sellerStats = { terjual: 3, ulasan: 12 };
    let bannersData = ["images/valorant.jpg", "images/mlbb.jpg"];
    let productsData = [
        {
            id: 0, judul: "Akun Valorant Premium | Full Skin Kuronami",
            harga: "349.110", hargaRaw: 349110, foto: "images/valorant.jpg",
            spesifikasi: "Aman 100%\nRank: Ascendant", tier: "🥇 Gold",
            terjual: "4 rb", rating: "5.0", diskon: "-16%"
        },
        {
            id: 1, judul: "Akun ML Mythic Glory 150 Skin KOF",
            harga: "850.000", hargaRaw: 850000, foto: "images/mlbb.jpg",
            spesifikasi: "Rank: Mythic Glory\nUnbind", tier: "🥈 Silver",
            terjual: "10RB+", rating: "4.9", diskon: ""
        }
    ];

    let activeProductId = null;
    let uploadedImageBase64 = "";

    // --- 1. RENDER TIER PENJUAL ---
    function updateSellerTierUI() {
        const tierNameText = document.getElementById('tierNameText');
        if (!tierNameText) return;

        let currentTier = "Bronze", badge = "🥉", percent = 0;

        if (sellerStats.terjual >= 50 && sellerStats.ulasan >= 100) {
            currentTier = "Gold"; badge = "🥇"; percent = 100;
        } else if (sellerStats.terjual >= 20 && sellerStats.ulasan >= 50) {
            currentTier = "Silver"; badge = "🥈";
            percent = Math.min(Math.round(((sellerStats.terjual/50)*50) + ((sellerStats.ulasan/100)*50)), 99);
        } else {
            percent = Math.min(Math.round(((sellerStats.terjual/5)*50) + ((sellerStats.ulasan/20)*50)), 99);
        }

        tierNameText.innerText = `Tier ${currentTier}`;
        document.getElementById('tierBadgeIcon').innerText = badge;
        document.getElementById('tierPercentText').innerText = `${percent}%`;
        document.getElementById('tierProgressBar').style.width = `${percent}%`;

        if (currentTier === "Bronze") {
            document.getElementById('questTerjualVal').innerText = `${sellerStats.terjual} / 5`;
            document.getElementById('questUlasanVal').innerText = `${sellerStats.ulasan} / 20`;
        } else if (currentTier === "Silver") {
            document.getElementById('questTerjualVal').innerText = `${sellerStats.terjual} / 50`;
            document.getElementById('questUlasanVal').innerText = `${sellerStats.ulasan} / 100`;
        } else {
            document.getElementById('questTerjualVal').innerText = `MAKS (50+)`;
            document.getElementById('questUlasanVal').innerText = `MAKS (100+)`;
        }
    }

    // --- 2. RENDER BANNER & PRODUK ---
    function renderBanners() {
        const slider = document.getElementById('bannerSlider');
        if (!slider) return;
        slider.innerHTML = "";
        bannersData.forEach(src => {
            slider.insertAdjacentHTML('beforeend', `<img src="${src}" class="w-[85%] h-32 object-cover rounded-lg snap-center flex-shrink-0 shadow-sm" onerror="this.src='https://placehold.co/600x250?text=Banner'">`);
        });
    }

    function renderProducts() {
        const grid = document.getElementById('productGrid');
        if (!grid) return;
        grid.innerHTML = "";
        productsData.forEach((prod) => {
            grid.insertAdjacentHTML('beforeend', `
                <div class="product-card bg-white dark:bg-gray-800 relative shadow-sm border border-gray-100 dark:border-gray-700 rounded-md overflow-hidden cursor-pointer" data-id="${prod.id}">
                    ${prod.diskon ? `<div class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-md">${prod.diskon}</div>` : '<div class="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-md">BARU</div>'}
                    <img src="${prod.foto}" class="w-full h-36 object-cover" onerror="this.src='https://placehold.co/400x400?text=Produk'">
                    <div class="p-2 flex flex-col justify-between">
                        <h3 class="text-xs text-gray-800 dark:text-gray-200 line-clamp-2 h-8 font-medium">${prod.judul}</h3>
                        <span class="text-[9px] text-gray-600 dark:text-gray-300 font-semibold mt-1">${prod.tier}</span>
                        <div class="text-blue-700 dark:text-blue-400 font-bold text-sm mt-2">Rp ${prod.harga}</div>
                    </div>
                </div>
            `);
        });
    }

    renderBanners();
    renderProducts();
    updateSellerTierUI();

    // --- 3. NAVIGASI SPA & DARK MODE ---
    const hideAllPages = () => {
        document.querySelectorAll('.page-tab').forEach(page => {
            page.classList.add('hidden'); page.classList.remove('block');
        });
    };

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => {
                b.classList.remove('text-blue-600', 'dark:text-blue-400');
                b.classList.add('text-gray-500');
                b.querySelector('svg')?.setAttribute('fill', 'none');
            });
            btn.classList.add('text-blue-600', 'dark:text-blue-400');
            btn.classList.remove('text-gray-500');
            btn.querySelector('svg')?.setAttribute('fill', 'currentColor');

            hideAllPages();
            const targetPage = document.getElementById(`page-${btn.getAttribute('data-target')}`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('block');
            }
            document.getElementById('main-bottom-nav')?.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    });

    document.getElementById('themeToggle')?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });

    // --- 4. ALUR BELI, LOADING, TUGAS PEMBELI ---
    document.getElementById('productGrid')?.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card) {
            const prod = productsData.find(p => p.id === parseInt(card.getAttribute('data-id')));
            if (prod) {
                activeProductId = prod.id;
                document.getElementById('detailImg').src = prod.foto;
                document.getElementById('detailHarga').innerText = `Rp ${prod.harga}`;
                document.getElementById('detailJudul').innerText = prod.judul;
                document.getElementById('detailSpesifikasi').innerText = prod.spesifikasi;
                
                hideAllPages();
                document.getElementById('page-detail')?.classList.replace('hidden', 'block');
                document.getElementById('main-bottom-nav')?.classList.add('hidden');
                window.scrollTo(0, 0);
            }
        }
    });

    const route = (btnId, pageId) => {
        document.getElementById(btnId)?.addEventListener('click', () => {
            hideAllPages();
            document.getElementById(pageId)?.classList.replace('hidden', 'block');
            window.scrollTo(0, 0);
        });
    };

    route('backBtn', 'page-beranda');
    route('backFromCheckoutBtn', 'page-detail');

    document.getElementById('buyNowBtn')?.addEventListener('click', () => {
        const prod = productsData.find(p => p.id === activeProductId);
        if (prod) {
            document.getElementById('checkoutImg').src = prod.foto;
            document.getElementById('checkoutJudul').innerText = prod.judul;
            document.getElementById('subtotalVal').innerText = `Rp ${prod.harga}`;
            const total = new Intl.NumberFormat('id-ID').format(prod.hargaRaw + 2500);
            document.getElementById('checkoutTotal').innerText = `Rp ${total}`;
            document.getElementById('checkoutTotalBar').innerText = `Rp ${total}`;
        }
        hideAllPages();
        document.getElementById('page-checkout')?.classList.replace('hidden', 'block');
        window.scrollTo(0, 0);
    });

    document.getElementById('processPaymentBtn')?.addEventListener('click', () => {
        const modal = document.getElementById('transactionLoadingModal');
        const text = document.getElementById('loadingStatusText');
        modal?.classList.remove('hidden');
        
        setTimeout(() => text && (text.innerText = "Memverifikasi QRIS..."), 1200);
        setTimeout(() => text && (text.innerText = "Pembayaran Berhasil!"), 2500);
        setTimeout(() => {
            modal?.classList.add('hidden');
            text && (text.innerText = "Sistem QRIS...");
            hideAllPages();
            document.getElementById('page-buyer-tasks')?.classList.replace('hidden', 'block');
            window.scrollTo(0, 0);
        }, 3800);
    });

    const checkBoxes = document.querySelectorAll('.buyer-task-checkbox');
    const completeBtn = document.getElementById('completeBuyerTasksBtn');
    checkBoxes.forEach(chk => {
        chk.addEventListener('change', () => {
            if (Array.from(checkBoxes).every(cb => cb.checked)) {
                completeBtn.removeAttribute('disabled');
                completeBtn.classList.replace('bg-gray-400', 'bg-green-600');
            } else {
                completeBtn.setAttribute('disabled', 'true');
                completeBtn.classList.replace('bg-green-600', 'bg-gray-400');
            }
        });
    });

    completeBtn?.addEventListener('click', () => {
        alert("Transaksi Sukses! Dana diteruskan ke penjual.");
        hideAllPages();
        document.getElementById('page-beranda')?.classList.replace('hidden', 'block');
        document.getElementById('main-bottom-nav')?.classList.remove('hidden');
    });

    // --- 5. JUAL AKUN & BANNER ---
    route('openJualAkunBtn', 'page-jual');
    route('backFromJualBtn', 'page-saya');
    route('openJualBannerBtn', 'page-banner');
    route('backFromBannerBtn', 'page-saya');

    document.getElementById('jualFileFoto')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => { uploadedImageBase64 = event.target.result; };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('formJualAkun')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const hargaNum = parseInt(document.getElementById('jualHarga').value);
        if (hargaNum > 10000000) return alert("Batas maksimal harga Rp 10 Juta!");
        if (!uploadedImageBase64) return alert("Pilih foto dulu!");

        const judul = document.getElementById('jualJudul').value;
        productsData.unshift({
            id: productsData.length, judul, harga: new Intl.NumberFormat('id-ID').format(hargaNum),
            hargaRaw: hargaNum, foto: uploadedImageBase64,
            spesifikasi: document.getElementById('jualSpesifikasi').value,
            tier: "🥉 Bronze", terjual: "0", rating: "0.0", diskon: ""
        });
        
        renderProducts();
        document.getElementById('notificationList')?.insertAdjacentHTML('afterbegin', `
            <div class="p-4 flex items-start gap-3 bg-green-50 dark:bg-green-900/20"><div class="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">🏷️</div><div><h4 class="font-bold text-sm dark:text-white">Produk Tayang!</h4><p class="text-xs dark:text-gray-300">Akun "${judul}" sudah aktif.</p></div></div>
        `);
        
        alert("Sukses Upload Akun!");
        e.target.reset(); uploadedImageBase64 = "";
        document.getElementById('backFromJualBtn').click(); 
    });

    document.getElementById('formBanner')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const file = document.getElementById('bannerFileFoto').files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                bannersData.push(event.target.result);
                renderBanners();
                alert("Banner berhasil ditambah!");
                e.target.reset();
                document.getElementById('backFromBannerBtn').click();
            };
            reader.readAsDataURL(file);
        }
    });

    // --- 6. AI CHATBOT TSUNDERE (DENGAN OTAK OFFLINE CADANGAN) ---
    document.getElementById('aiChatFab')?.addEventListener('click', () => {
        document.getElementById('aiChatModal')?.classList.replace('hidden', 'flex');
    });
    document.getElementById('closeAiChatBtn')?.addEventListener('click', () => {
        document.getElementById('aiChatModal')?.classList.replace('flex', 'hidden');
    });

    // Ini kode API yang kamu kasih (meskipun salah, kita tetap pasang). 
    // Tapi aku udah buatkan sistem penangkalnya agar AI tetap bisa jawab pake Otak Offline!
    const GEMINI_API_KEY = "AQ.Ab8RN6KcqR1ATUwDeL9JkAdTfVkxZWtuP5KHgEePdWHUfqLYSg"; 
    
    // Otak Offline Tsundere (Akan merespon otomatis walau API salah)
    function offlineTsundereBrain(text) {
        const lower = text.toLowerCase();
        if (lower.includes('cara beli') || lower.includes('qris')) return "Hmph! Beli aja gampang, tinggal klik produknya trus bayar pake QRIS! Escrow kita aman 30 hari. Jangan banyak nanya deh, buruan beli!";
        if (lower.includes('jual') || lower.includes('tambah')) return "Mau jualan? Masuk ke menu 'Saya' terus klik Jual Akun Baru. Batas harganya 10 Juta! Awas aja kalau masukin data ngawur!";
        if (lower.includes('garansi') || lower.includes('aman')) return "B-bukan berarti aku khawatir ya, tapi sistem Escrow kita nahan uangnya sampai kamu selesai amankan akun. Jadi 100% aman! Puas?!";
        if (lower.includes('halo') || lower.includes('hai') || lower.includes('pagi')) return "Apa lihat-lihat?! Kalau mau beli akun buruan, jangan buang waktuku buat ngobrol doang!";
        if (lower.includes('nama') || lower.includes('siapa')) return "Namaku Arthur! Penjaga toko Arthur Store ID. Ingat baik-baik, bodoh!";
        if (lower.includes('makasih') || lower.includes('terima kasih') || lower.includes('thanks')) return "Hmph! S-sama-sama... Jangan salah paham, ini emang pekerjaanku tau!";
        if (lower.includes('game') || lower.includes('main')) return "Kita jual akun Valorant, Mobile Legends, Roblox, dan banyak lagi! Semuanya ada di beranda. Cari sendiri sana!";
        
        // Jawaban super random Tsundere
        const randomReplies = [
            "Berisik! Aku lagi sibuk ngurusin transaksi. B-bukan berarti aku nggak mau dengerin ya, tapi tanya yang jelas dong!",
            "Huh? Apa maksudmu? Kalau mau beli akun langsung bayar aja pakai QRIS. Jangan ngawur deh!",
            "Jangan ngajak bercanda! Mending kamu top up atau cek tier akun seller kamu di menu Saya!",
            "Hmph! Aku nggak ngerti maksudmu. Tapi kalau ada kendala transaksi Escrow, aku pasti bakal bantu kok... J-jangan mikir aneh-aneh!"
        ];
        return randomReplies[Math.floor(Math.random() * randomReplies.length)];
    }

    const AI_PERSONA = `Namamu Arthur, penjaga toko Arthur Store ID. Sifatmu TSUNDERE. Jawablah singkat dan gaul.`;

    document.getElementById('aiChatForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('aiChatInput');
        const txt = input.value.trim();
        if (!txt) return;

        const chat = document.getElementById('chatMessages');
        
        chat.insertAdjacentHTML('beforeend', `<div class="self-end max-w-[85%] bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm"><p class="text-xs">${txt}</p></div>`);
        input.value = '';
        chat.scrollTop = chat.scrollHeight;

        const typingId = 'typing-' + Date.now();
        chat.insertAdjacentHTML('beforeend', `<div id="${typingId}" class="self-start max-w-[85%] bg-gray-200 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm"><p class="text-xs text-gray-500 italic dark:text-gray-400">Arthur mengetik dengan kesal...</p></div>`);
        chat.scrollTop = chat.scrollHeight;

        let finalReply = "";

        try {
            // Mencoba panggil API Google
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: AI_PERSONA + "\n\nUser: " + txt + "\nArthur:" }] }]
                })
            });

            if (response.ok) {
                const data = await response.json();
                finalReply = data.candidates[0].content.parts[0].text;
            } else {
                // KETIKA API KEY SALAH, GUNAKAN OTAK OFFLINE TSUNDERE!
                finalReply = offlineTsundereBrain(txt);
            }
        } catch (error) {
            // KETIKA INTERNET MATI, GUNAKAN OTAK OFFLINE TSUNDERE!
            finalReply = offlineTsundereBrain(txt);
        }

        setTimeout(() => {
            document.getElementById(typingId)?.remove();
            const formattedReply = finalReply.replace(/\n/g, '<br>');
            chat.insertAdjacentHTML('beforeend', `<div class="self-start max-w-[85%] bg-gray-200 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700"><p class="text-xs text-gray-800 dark:text-gray-200">${formattedReply}</p></div>`);
            chat.scrollTop = chat.scrollHeight;
        }, 800); // Simulasi delay mengetik
    });

    // --- 7. AUTO-SCROLL BANNER ---
    setInterval(() => {
        const bs = document.getElementById('bannerSlider');
        if (bs) {
            if (bs.scrollLeft >= bs.scrollWidth - bs.clientWidth - 10) bs.scrollTo({ left: 0, behavior: 'smooth' });
            else bs.scrollBy({ left: bs.clientWidth * 0.85, behavior: 'smooth' });
        }
    }, 3000);
});
