document.addEventListener('DOMContentLoaded', () => {
    // --- 0. INISIALISASI TEMA (LOCAL STORAGE) ---
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    }

    // --- 1. INISIALISASI ELEMEN ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const searchBtn = document.getElementById('searchBtn');
    const bookButtons = document.querySelectorAll('.btn-book');

    // --- 2. LOGIKA NAVBAR (MOBILE) ---
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active'); 
        });
    }

    // Otomatis tutup menu saat link navigasi diklik
    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('is-active');
        });
    });

    // Tutup menu jika klik di luar area navbar
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-active');
        }
    });

    // --- 3. LOGIKA FAQ AKORDION ---
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('span');

            // Fitur Auto-Close: Tutup FAQ lain yang terbuka
            document.querySelectorAll('.faq-answer').forEach(el => {
                if (el !== answer) {
                    el.style.maxHeight = null;
                    const otherIcon = el.previousElementSibling.querySelector('span');
                    if (otherIcon) otherIcon.innerText = '+';
                }
            });

            // Toggle Buka/Tutup
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.innerText = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.innerText = '-';
            }
        });
    });

    // --- 4. LOGIKA SEARCH & BOOKING WHATSAPP ---
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const lokasi = document.querySelector('select').value;
            const tglJemput = document.querySelectorAll('input[type="date"]')[0].value;
            
            if (lokasi === "Pilih Lokasi" || !tglJemput) {
                alert('Silakan pilih lokasi dan tanggal terlebih dahulu!');
            } else {
                alert(`Mencari ketersediaan unit di ${lokasi} untuk tanggal ${tglJemput}...`);
            }
        });
    }

    bookButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const carItem = this.closest('.car-item');
            const carName = carItem.querySelector('h3').innerText;
            const carPrice = carItem.querySelector('.price').innerText;
            const statusBadge = carItem.querySelector('.status-badge');
            const isRented = statusBadge ? statusBadge.classList.contains('rented') : false;

            if (isRented) {
                alert(`Maaf, unit ${carName} sedang tidak tersedia.`);
            } else {
                const phone = "6281215726275";
                const message = `Halo Admin, saya ingin menyewa mobil berikut:\n\n` +
                                `🚗 Unit: ${carName}\n` +
                                `💰 Harga: ${carPrice}\n\n` +
                                `Apakah unit ini tersedia untuk disewa?`;

                const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            }
        });
    });

    // --- 5. LOGIKA REVIEWS ---
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const name = card.querySelector('h4');
            if(name) console.log("User membaca ulasan dari: " + name.innerText);
        });
    });
});

// --- 6. FUNGSI THEME SWITCHER (Diletakkan di luar agar bisa dipanggil HTML) ---
function setTheme(themeName) {
    // Hapus semua class tema yang ada sebelumnya
    document.body.classList.remove('theme-dark', 'theme-grey', 'theme-yellow', 'theme-green');
    
    // Tambah class baru berdasarkan pilihan (kecuali default)
    if (themeName !== 'default') {
        document.body.classList.add('theme-' + themeName);
    }
    
    // Simpan pilihan ke LocalStorage agar tema tetap aktif setelah refresh
    localStorage.setItem('selectedTheme', themeName);
}