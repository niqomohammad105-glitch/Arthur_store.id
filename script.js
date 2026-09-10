/* script.js - Arthur Store ID Mobile + Stabilized Fix */

document.addEventListener('DOMContentLoaded', () => {
    
    let sellerStats = {
        terjual: 3,     
        ulasan: 12      
    };

    let productsData = [
        {
            id: 0,
            judul: "Akun Valorant Premium | Full Skin Kuronami & Reaver",
            harga: "349.110",
            hargaRaw: 349110,
            foto: "images/valorant.jpg",
            spesifikasi: "Status: Aman / Anti-Hack\nRank: Ascendant 1\nSkin: 34 Premium Skins\nLogin: Riot ID (Unbind)",
            tier: "🥇 Gold",
            terjual: "4 rb",
            rating: "5.0",
            diskon: "-16%"
        },
        {
            id: 1,
            judul: "Akun ML Mythic Glory 150 Skin KOF Chou Unbind",
            harga: "850.000",
            hargaRaw: 850000,
            foto: "images/mlbb.jpg",
            spesifikasi: "Status: Aman 100%\nRank: Mythic Glory\nSkin: 150 (KOF Chou, Epic Limited)\nLogin: Moonton (Unbind)",
            tier: "🥈 Silver",
            terjual: "10RB+",
            rating: "4.9",
            diskon: ""
        }
    ];

    let bannersData = [
        "images/valorant.jpg",
        "images/mlbb.jpg"
    ];

    let activeProductId = null;
    let uploadedImageBase64 = "";

    // --- 1. TIER PENJUAL ---
    function updateSellerTierUI() {
        const tierNameText = document.getElementById('tierNameText');
        const tierBadgeIcon = document.getElementById('tierBadgeIcon');
        const tierProgressBar = document.getElementById('tierProgressBar');
        const tierPercentText = document.getElementById('tierPercentText');
        const questTerjualVal = document.getElementById('questTerjualVal');
        const questUlasanVal = document.getElementById('questUlasanVal');
        const detailStoreTier = document.getElementById('detailStoreTier');

        if (!tierNameText) return;

        let currentTier = "Bronze";
        let badge = "🥉";
        let percent = 0;

        if (sellerStats.terjual >= 50 && sellerStats.ulasan >= 100) {
            currentTier = "Gold";
            badge = "🥇";
            percent = 100;
        } else if (sellerStats.terjual >= 20 && sellerStats.ulasan >= 50) {
            currentTier = "Silver";
            badge = "🥈";
            percent = Math.min(Math.round(((sellerStats.terjual/50)*50) + ((sellerStats.ulasan/100)*50)), 99);
        } else {
            percent = Math.min(Math.round(((sellerStats.terjual/5)*50) + ((sellerStats.ulasan/20)*50)), 99);
        }

        tierNameText.innerText = `Tier ${currentTier}`;
        tierBadgeIcon.innerText = badge;
        tierPercentText.innerText = `${percent}%`;
        tierProgressBar.style.width = `${percent}%`;

        if (currentTier === "Bronze") {
            questTerjualVal.innerText = `${sellerStats.terjual} / 5`;
            questUlasanVal.innerText = `${sellerStats.ulasan} / 20`;
        } else if (currentTier === "Silver") {
            questTerjualVal.innerText = `${sellerStats.terjual} / 50`;
            questUlasanVal.innerText = `${sellerStats.ulasan} / 100`;
        } else {
            questTerjualVal.innerText = `MAKSIMAL (50+)`;
            questUlasanVal.innerText = `MAKSIMAL (100+)`;
        }

        if (detailStoreTier) {
            detailStoreTier.innerText = `${badge} Penjual ${currentTier}`;
        }
    }

    // --- 2. DARK MODE ---
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

    // --- 3. RENDER BANNER & PRODUK ---
    const bannerSlider = document.getElementById('bannerSlider');
    function renderBanners() {
        if (!bannerSlider) return;
        bannerSlider.innerHTML = "";
        bannersData.forEach(src => {
            const imgHtml = `<img src="${src}" class="w-[85%] h-32 object-cover rounded-lg snap-center flex-shrink-0 shadow-sm" onerror="this.src='https://placehold.co/600x250/1e40af/white?text=Banner+Arthur+Store'">`;
            bannerSlider.insertAdjacentHTML('beforeend', imgHtml);
        });
    }
    renderBanners();

    const productGrid = document.getElementById('productGrid');
    function renderProducts() {
        if (!productGrid) return;
        productGrid.innerHTML = "";

        productsData.forEach((prod) => {
            const cardHtml = `
                <div class="product-card bg-white dark:bg-gray-800 relative shadow-sm border border-gray-100 dark:border-gray-700 rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-all group" data-id="${prod.id}">
                    ${prod.diskon ? `<div class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 z-10 rounded-bl-md shadow-sm">${prod.diskon}</div>` : '<div class="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 z-10 rounded-bl-md shadow-sm">BARU</div>'}
                    <div class="overflow-hidden"><img src="${prod.foto}" class="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://placehold.co/400x400?text=Kosong'"></div>
                    <div class="p-2 flex flex-col justify-between">
                        <div>
                            <h3 class="text-xs text-gray-800 dark:text-gray-200 line-clamp-2 h-8 leading-tight font-medium">${prod.judul}</h3>
                            <div class="mt-1.5 flex flex-wrap gap-1">
                                <span class="text-[9px] text-gray-600 dark:text-gray-300 border border-gray-400/50 px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-semibold">${prod.tier}</span>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div class="text-blue-700 dark:text-blue-400 font-bold text-sm">Rp ${prod.harga}</div>
                            <div class="flex items-center justify-between mt-1.5 text-[10px] text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-1.5">
                                <div class="flex items-center gap-0.5"><span class="text-yellow-400 text-xs">★</span> ${prod.rating}</div><span>${prod.terjual} Terjual</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productGrid.insertAdjacentHTML('beforeend', cardHtml);
        });
    }
    renderProducts();
    updateSellerTierUI();

    // --- 4. NAVIGASI SPA ---
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

    // --- 5. DETAIL & CHECKOUT ---
    const pageBeranda = document.getElementById('page-beranda');
    const pageDetail = document.getElementById('page-detail');
    const pageCheckout = document.getElementById('page-checkout');
    const pageBuyerTasks = document.getElementById('page-buyer-tasks');
    const transactionLoadingModal = document.getElementById('transactionLoadingModal');
    const loadingStatusText = document.getElementById('loadingStatusText');
    
    const backBtn = document.getElementById('backBtn');
    const backFromCheckoutBtn = document.getElementById('backFromCheckoutBtn');
    
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                const prodId = parseInt(card.getAttribute('data-id'));
                activeProductId = prodId;
                const selectedProd = productsData.find(p => p.id === prodId);

                if (selectedProd) {
                    document.getElementById('detailImg').src = selectedProd.foto;
                    document.getElementById('detailHarga').innerText = `Rp ${selectedProd.harga}`;
                    document.getElementById('detailJudul').innerText = selectedProd.judul;
                    document.getElementById('detailSpesifikasi').innerText = selectedProd.spesifikasi;
                }

                hideAllPages();
                pageDetail.classList.remove('hidden');
                pageDetail.classList.add('block');
                if (mainBottomNav) mainBottomNav.classList.add('hidden');
                window.scrollTo(0, 0);
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            hideAllPages();
            pageBeranda.classList.remove('hidden');
            pageBeranda.classList.add('block');
            if (mainBottomNav) mainBottomNav.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }

    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const selectedProd = productsData.find(p => p.id === activeProductId);
            if (selectedProd) {
                document.getElementById('checkoutImg').src = selectedProd.foto;
                document.getElementById('checkoutJudul').innerText = selectedProd.judul;
                document.getElementById('subtotalVal').innerText = `Rp ${selectedProd.harga}`;
                
                const totalNum = selectedProd.hargaRaw + 2500;
                const totalFormatted = new Intl.NumberFormat('id-ID').format(totalNum);
                document.getElementById('checkoutTotal').innerText = `Rp ${totalFormatted}`;
                document.getElementById('checkoutTotalBar').innerText = `Rp ${totalFormatted}`;
            }

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

    const processPaymentBtn = document.getElementById('processPaymentBtn');
    if (processPaymentBtn && transactionLoadingModal) {
        processPaymentBtn.addEventListener('click', () => {
            transactionLoadingModal.classList.remove('hidden');
            
            setTimeout(() => {
                loadingStatusText.innerText = "Memverifikasi pembayaran QRIS...";
            }, 1000);

            setTimeout(() => {
                loadingStatusText.innerText = "Pembayaran berhasil! Menyiapkan data akun...";
            }, 2200);

            setTimeout(() => {
                transactionLoadingModal.classList.add('hidden');
                loadingStatusText.innerText = "Menghubungkan ke sistem gateway QRIS...";

                hideAllPages();
                pageBuyerTasks.classList.remove('hidden');
                pageBuyerTasks.classList.add('block');
                window.scrollTo(0, 0);
            }, 3200);
        });
    }

    // --- CHECKLIST TUGAS PEMBELI ---
    const buyerTaskCheckboxes = document.querySelectorAll('.buyer-task-checkbox');
    const completeBuyerTasksBtn = document.getElementById('completeBuyerTasksBtn');

    if (buyerTaskCheckboxes.length > 0 && completeBuyerTasksBtn) {
        buyerTaskCheckboxes.forEach(chk => {
            chk.addEventListener('change', () => {
                const allChecked = Array.from(buyerTaskCheckboxes).every(cb => cb.checked);
                if (allChecked) {
                    completeBuyerTasksBtn.removeAttribute('disabled');
                    completeBuyerTasksBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
                    completeBuyerTasksBtn.classList.add('bg-green-600', 'hover:bg-green-700', 'shadow-md');
                } else {
                    completeBuyerTasksBtn.setAttribute('disabled', 'true');
                    completeBuyerTasksBtn.classList.remove('bg-green-600', 'hover:bg-green-700', 'shadow-md');
                    completeBuyerTasksBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
                }
            });
        });

        completeBuyerTasksBtn.addEventListener('click', () => {
            alert("Transaksi Sukses! Akun telah diverifikasi aman.");
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

    // --- 6. UPLOAD AKUN & VALIDASI ---
    const openJualAkunBtn = document.getElementById('openJualAkunBtn');
    const pageJual = document.getElementById('page-jual');
    const backFromJualBtn = document.getElementById('backFromJualBtn');
    const formJualAkun = document.getElementById('formJualAkun');
    const notificationList = document.getElementById('notificationList');
    
    const jualFileFoto = document.getElementById('jualFileFoto');
    const dropZoneContent = document.getElementById('dropZoneContent');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');

    if (jualFileFoto) {
        jualFileFoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    uploadedImageBase64 = event.target.result;
                    imagePreview.src = uploadedImageBase64;
                    dropZoneContent.classList.add('hidden');
                    imagePreviewContainer.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (openJualAkunBtn) {
        openJualAkunBtn.addEventListener('click', () => {
            hideAllPages();
            pageJual.classList.remove('hidden');
            pageJual.classList.add('block');
            if (mainBottomNav) mainBottomNav.classList.add('hidden');
            window.scrollTo(0, 0);
        });
    }

    if (backFromJualBtn) {
        backFromJualBtn.addEventListener('click', () => {
            hideAllPages();
            document.getElementById('page-saya').classList.remove('hidden');
            document.getElementById('page-saya').classList.add('block');
            if (mainBottomNav) mainBottomNav.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }

    if (formJualAkun) {
        formJualAkun.addEventListener('submit', (e) => {
            e.preventDefault();
            const hargaNum = parseInt(document.getElementById('jualHarga').value);

            if (hargaNum > 10000000) {
                alert("Batas maksimal harga produk adalah Rp 10.000.000!");
                return;
            }

            if (!uploadedImageBase64) {
                alert("Mohon sertakan foto produk!");
                return;
            }

            const judul = document.getElementById('jualJudul').value;
            const hargaFormatted = new Intl.NumberFormat('id-ID').format(hargaNum);
            const spesifikasi = document.getElementById('jualSpesifikasi').value;

            const newProd = {
                id: productsData.length,
                judul: judul,
                harga: hargaFormatted,
                hargaRaw: hargaNum,
                foto: uploadedImageBase64,
                spesifikasi: spesifikasi,
                tier: "🥉 Bronze",
                terjual: "0",
                rating: "0.0",
                diskon: ""
            };

            productsData.unshift(newProd);
            renderProducts();

            const notifHtml = `
                <div class="p-4 flex items-start gap-3 bg-green-50 dark:bg-green-900/20 fade-in">
                    <div class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">🏷️</div>
                    <div>
                        <h4 class="text-sm font-bold text-gray-800 dark:text-white">Produk Berhasil Ditayangkan!</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">Akun "${judul}" sudah aktif.</p>
                        <span class="text-[9px] text-gray-400 mt-1 block">Baru saja</span>
                    </div>
                </div>
            `;
            if (notificationList) notificationList.insertAdjacentHTML('afterbegin', notifHtml);

            alert('Sukses! Akun Anda berhasil di-upload.');
            formJualAkun.reset();
            uploadedImageBase64 = "";
            imagePreviewContainer.classList.add('hidden');
            dropZoneContent.classList.remove('hidden');

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

    // --- 7. UPLOAD BANNER ---
    const openJualBannerBtn = document.getElementById('openJualBannerBtn');
    const pageBanner = document.getElementById('page-banner');
    const backFromBannerBtn = document.getElementById('backFromBannerBtn');
    const formBanner = document.getElementById('formBanner');

    if (openJualBannerBtn) {
        openJualBannerBtn.addEventListener('click', () => {
            hideAllPages();
            pageBanner.classList.remove('hidden');
            pageBanner.classList.add('block');
            if (mainBottomNav) mainBottomNav.classList.add('hidde
