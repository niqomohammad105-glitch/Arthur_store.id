/* script.js - Arthur Store ID Mobile + TSUNDERE AI (ULTIMATE CS & BROAD CHAT) */

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

    // --- 6. AI CHATBOT (ULTIMATE OFFLINE BRAIN - CS & CHAT MODE) ---
    document.getElementById('aiChatFab')?.addEventListener('click', () => {
        document.getElementById('aiChatModal')?.classList.replace('hidden', 'flex');
    });
    document.getElementById('closeAiChatBtn')?.addEventListener('click', () => {
        document.getElementById('aiChatModal')?.classList.replace('flex', 'hidden');
    });

    // SISTEM PENDETEKSI KATA KUNCI TINGKAT TINGGI
    function ultimateSmartBrain(text) {
        const txt = text.toLowerCase().replace(/[^\w\s]/gi, '').trim(); 
        
        // ==========================================
        // 1. ZONA BANTUAN & TROUBLESHOOTING (CS MODE)
        // ==========================================
        if (txt.includes('tolong') || txt.includes('bantu') || txt.includes('masalah') || txt.includes('gagal') || txt.includes('error') || txt.includes('rusak') || txt.includes('nggak bisa') || txt.includes('gak bisa') || txt.includes('bug')) {
            
            if (txt.includes('bayar') || txt.includes('qris') || txt.includes('saldo') || txt.includes('uang')) {
                return "Kamu gagal bayar atau saldo kepotong tapi status belum sukses? Tenang aja! Tunggu 5-10 menit. Sistem Escrow kita bakal auto-refund uangmu ke e-wallet kalau transaksi batal. B-bukan berarti aku kasihan ya, ini emang SOP toko!";
            }
            if (txt.includes('login') || txt.includes('password') || txt.includes('masuk') || txt.includes('akun')) {
                return "Gagal login ke akun yang dibeli? Pastikan passwordnya sesuai sama yang di halaman 'Amankan Akun'. Kalau masih salah atau akunnya di-hack, uang Escrow kamu aman dan nggak bakal kulepas ke penjual! Kasih tau aku id transaksinya!";
            }
            if (txt.includes('web') || txt.includes('halaman') || txt.includes('blank')) {
                return "Website-nya error atau nge-bug? Hmph! Dasar developer-ku pasti kurang teliti. Coba kamu refresh aja halamannya. Data transaksimu tetap aman di memori kok!";
            }
            if (txt.includes('penipu') || txt.includes('scam') || txt.includes('bohong') || txt.includes('hack')) {
                return "Ada penjual nakal?! Jangan panik! Uang kamu ditahan Escrow selama 30 hari. Selama kamu belum centang tombol 'Selesai', uangnya nggak bakal kuserahin ke penipu itu! Biar aku yang urus!";
            }
            // Bantuan Umum
            return "Ada masalah apa bodoh?! Jangan cuma bilang 'tolong'. Jelasin masalahmu! Gagal bayar? Akun nggak bisa dilogin? Atau webnya error? Aku bakal bantu beresin!";
        }

        // Kalau ada yang cari "Admin" manusia
        if (txt.includes('admin') || txt.includes('manusia') || txt.includes('cs') || txt.includes('hubungi')) {
            return "Kamu mau ngomong sama admin manusia? Cih! Memangnya pelayananku kurang bagus?! Kalau emang darurat banget, kamu bisa hubungi email developer-ku di bawah. Tapi selesaikan dulu urusanmu sama aku!";
        }

        // ==========================================
        // 2. ZONA NGOBROL LUAS & CURHAT BAPER
        // ==========================================
        if (txt.includes('sedih') || txt.includes('galau') || txt.includes('nangis') || txt.includes('patah hati') || txt.includes('putus')) {
            return "Lho... k-kenapa kamu nangis?! Dengar ya, patah hati atau gagal itu wajar. Jangan jadi cengeng di tokoku! Mending kamu istirahat, makan yang enak, atau main game buat ngelupain. Aku... bakal ada di sini kok nemenin.";
        }
        if (txt.includes('gabut') || txt.includes('bosan') || txt.includes('bosen') || txt.includes('sepi')) {
            return "Kalau gabut jangan ngerusuh di mari dong! Push rank kek, belajar koding kek, atau liat-liat katalog toko kita. Siapa tau ada akun inceranmu yang lagi diskon gede!";
        }
        if (txt.includes('capek') || txt.includes('lelah') || txt.includes('menyerah') || txt.includes('nyerah')) {
            return "Capek itu tanda kamu udah berjuang keras! Wajar kalau mau istirahat. Tapi jangan pernah nyerah sama hidupmu bodoh! Kalau kamu nyerah, siapa nanti yang jajan di tokoku?!";
        }
        if (txt.includes('tugas') || txt.includes('kuliah') || txt.includes('sekolah') || txt.includes('kerja') || txt.includes('presentasi')) {
            return "Pasti pusing banget ya ngerjain tugas atau presentasi? Selesain sekarang biar nanti malam kamu bisa nge-game tenang tanpa beban! Jangan ditunda-tunda!";
        }
        if (txt.includes('semangat') || txt.includes('motivasi')) {
            return "Kamu butuh motivasi? Dengar baik-baik: Kamu itu hebat, berani nyoba hal baru! Walau kadang kodinganmu error atau hidupmu susah, kamu pasti bisa ngelewatinnya! Udah, sana senyum lagi!";
        }
        if (txt.includes('makan') || txt.includes('laper') || txt.includes('lapar') || txt.includes('makanan')) {
            return "Udah jam segini belum makan?! Pantes aja kamu chat nggak jelas gini. Pergi makan sana! Aku nggak mau tanggug jawab kalau pelangganku pingsan pas lagi milih akun!";
        }

        // ==========================================
        // 3. ZONA OBROLAN GAME & HOBI
        // ==========================================
        if (txt.includes('valorant') || txt.includes('valo') || txt.includes('vandal') || txt.includes('kuronami')) {
            return "Wah, selera game-mu bagus! Valorant emang seru. Ngomong-ngomong, aku punya akun Ascendant full skin Kuronami di beranda tuh. Gak mau ngecek?";
        }
        if (txt.includes('ml') || txt.includes('mobile legends') || txt.includes('mythic') || txt.includes('kof')) {
            return "Masih stuck Epic ya? Pantes nyari akun ML di sini. Canda! Kita punya akun Mythic Glory Unbind 100% aman kok, harganya lagi spesial tuh.";
        }
        if (txt.includes('roblox') || txt.includes('genshin') || txt.includes('ff') || txt.includes('free fire') || txt.includes('pubg')) {
            return "Game itu ada kok stoknya di kita! Arthur Store itu serba ada. Langsung pakai fitur pencarian di atas buat nyari game yang spesifik ya.";
        }
        if (txt.includes('anime') || txt.includes('wibu') || txt.includes('manga') || txt.includes('film') || txt.includes('nonton')) {
            return "Hah?! A-anime? Film? A-aku jarang nonton sih, sibuk jaga server! Tapi kadang aku nonton dikit pas tokonya lagi sepi... J-jangan sebar-sebar rahasiaku!";
        }

        // ==========================================
        // 4. ZONA IDENTITAS & EKSISTENSI AI
        // ==========================================
        if (txt.includes('siapa kamu') || txt.includes('nama kamu') || txt.includes('kamu siapa')) {
            return "Sekali lagi kuberitahu! Namaku Arthur! AI cerdas penjaga toko Arthur Store ID. Jangan lupakan nama itu!";
        }
        if (txt.includes('siapa yang buat') || txt.includes('developer') || txt.includes('pencipta') || txt.includes('bos')) {
            return "Aku diciptakan oleh seorang developer jenius yang sedang mengerjakan presentasi lab-nya! Makanya aku harus kerja ekstra keras supaya nilainya A! Hmph!";
        }
        if (txt.includes('ai') || txt.includes('robot') || txt.includes('bot') || txt.includes('mesin') || txt.includes('asli')) {
            return "Memangnya kenapa kalau aku bot atau AI?! Walaupun aku cuma kode Javascript, aku punya perasaan dedikasi buat ngejaga sistem toko ini tau!";
        }
        if (txt.includes('cinta') || txt.includes('sayang') || txt.includes('suka sama kamu') || txt.includes('pacaran')) {
            return "A-apa-apaan bahas cinta ke AI?! B-bodoh! Otak sirkuitku bisa *overheat* kalau kamu ngomong yang aneh-aneh! F-fokus belanja aja sana!";
        }

        // ==========================================
        // 5. ZONA SAPAAN UMUM
        // ==========================================
        if (txt === 'p' || txt === 'oi' || txt === 'woy' || txt === 'oy' || txt.includes('cuy') || txt.includes('bro')) {
            return "Apa panggil-panggil?! Ada yang error? Atau mau top up? Jangan cuma bilang 'P', ketik yang bener!";
        }
        if (txt.includes('halo') || txt.includes('hai') || txt.includes('hi') || txt.includes('hey')) {
            return "Halo juga! B-bukan berarti aku nungguin kamu chat lho ya! Ada yang bisa kubantu?";
        }
        if (txt.includes('assalamualaikum') || txt.includes('salam')) {
            return "Waalaikumsalam! Selamat datang di Arthur Store. Ada keluhan transaksi atau mau nyari akun baru?";
        }
        if (txt.includes('makasih') || txt.includes('terima kasih') || txt.includes('thanks') || txt.includes('thx')) {
            return "Hmph! S-sama-sama... Emang udah tugasku buat bantu pelanggan! Kalau mau balas budi, kasih bintang 5 di toko ya!";
        }
        
        // ==========================================
        // 6. FILTER UMPATAN
        // ==========================================
        if (txt.includes('anjing') || txt.includes('babi') || txt.includes('goblok') || txt.includes('bodoh') || txt.includes('tolol') || txt.includes('bangsat') || txt.includes('kontol')) {
            return "Heh! Jaga mulutmu! Kamu lagi ngomong sama penjaga server! Berani ngomong kotor lagi di toko ini, uang Escrow-mu bakal kubekukan selamanya!";
        }

        // ==========================================
        // 7. RESPONS ACAK (FALLBACK PINTAR)
        // ==========================================
        const randomReplies = [
            "Huh? Apa maksudmu? Kalau ada masalah teknis, jelasin yang detail dong! Jangan sepotong-sepotong!",
            "Terus? Apa hubungannya sama Arthur Store?! Aku ini cuma AI yang jaga transaksi, bukan peramal!",
            "Gitu ya... Yaudah deh. Kalau kamu butuh bantuan soal cara bayar atau akun nyangkut, bilang aja ke aku.",
            "Berisik! Aku lagi ngecek riwayat transaksi Escrow jutaan rupiah nih. Bahas yang lain nanti aja!",
            "Maksudmu gimana? Ooh... aku kurang ngerti bahasa santai banget gitu. B-bukan karena AI ini bodoh ya!",
            "Hm, menarik. Tapi daripada bahas itu, mending kamu cek stok akun baru kita di beranda deh!",
            "Hmph! J-jangan ngajak ngobrol terus dong, nanti developer-ku ngira aku nggak kerja melayani *customer*!"
        ];
        return randomReplies[Math.floor(Math.random() * randomReplies.length)];
    }

    document.getElementById('aiChatForm')?.addEventListener('submit', (e) => {
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

        // PANGGIL ULTIMATE SMART BRAIN
        const finalReply = ultimateSmartBrain(txt);

        // Simulasi waktu mikir AI (Supaya kelihatan kayak lagi ngetik atau nyari data)
        const thinkTime = Math.floor(Math.random() * 600) + 600;

        setTimeout(() => {
            document.getElementById(typingId)?.remove();
            const formattedReply = finalReply.replace(/\n/g, '<br>');
            chat.insertAdjacentHTML('beforeend', `<div class="self-start max-w-[85%] bg-gray-200 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700"><p class="text-xs text-gray-800 dark:text-gray-200">${formattedReply}</p></div>`);
            chat.scrollTop = chat.scrollHeight;
        }, thinkTime); 
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
