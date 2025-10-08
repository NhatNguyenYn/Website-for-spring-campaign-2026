document.addEventListener('DOMContentLoaded', function() {
    
    // TÍNH NĂNG 1: PRE-LOADER
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    // POPUP
    const popup = document.getElementById('welcome-popup');
    const closeBtn = document.getElementById('close-popup');
    if (popup && closeBtn) {
        setTimeout(() => popup.classList.add('show'), 1500); // Hiện sau 1.5s
        closeBtn.addEventListener('click', () => popup.classList.remove('show'));
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup.classList.remove('show');
        });
    }

    // HOA RƠI
    function createFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerHTML = '🌸'; 
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = Math.random() * 3 + 5 + 's';
        flower.style.opacity = Math.random();
        flower.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 8000);
    }
    setInterval(createFlower, 500);

    // ANIMATION CUỘN TRANG
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
            } else {
                // entry.target.classList.remove('show-animate');
            }
        });
    }, { threshold: 0.1 }); // Hiện khi 10% element vào màn hình
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // DARK MODE
    const themeToggle = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') themeToggle.checked = true;
    }
    function switchTheme(e) {
        const theme = e.target.checked ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    themeToggle.addEventListener('change', switchTheme, false);

    // ĐỒNG HỒ ĐẾM NGƯỢC
    const campaignDate = new Date('Jan 15, 2026 00:00:00').getTime();
    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = campaignDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
            if (distance < 0) {
                clearInterval(countdownFunction);
                countdownElement.innerHTML = "<h3>Chiến dịch đã bắt đầu!</h3>";
            }
        }
    }, 1000);

    // BACK-TO-TOP
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // HAMBURGER MENU
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });
    // Đóng menu khi click vào 1 link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });

    // CONTACT BUBBLE
    const contactBubbleContainer = document.getElementById('contact-bubble-container');
    const contactBubble = document.querySelector('.contact-bubble');
    if (contactBubble) {
        contactBubble.addEventListener('click', () => {
            contactBubbleContainer.classList.toggle('active');
        });
    }

    // FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });
    // KHỞI TẠO TEAM SLIDER (SWIPER JS)
    const teamSwiper = new Swiper('.team-slider', {
        // Tùy chọn
        loop: true,
        spaceBetween: 30,
        
        slidesPerView: 1,
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        },

        // === THÊM KHỐI CODE MỚI TẠI ĐÂY ===
        autoplay: {
            delay: 2500, // Dừng 2.5 giây ở mỗi slide
            disableOnInteraction: false, // Vẫn tự chạy lại sau khi người dùng tương tác (click)
            pauseOnMouseEnter: true, // Tạm dừng khi di chuột vào slider
        },
        // ===================================

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    // KHỞI TẠO LIGHTBOX GALLERY (CHO NHIỀU GALLERY RIÊNG BIỆT)
    const lightbox2024 = new SimpleLightbox('.gallery-2024 a', {
        captionsData: 'alt',
        captionDelay: 250,
    });

    const lightbox2025 = new SimpleLightbox('.gallery-2025 a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
        // HIỆU ỨNG ĐẾM SỐ TỰ ĐỘNG
    const statsSection = document.getElementById('stats');
    const counters = document.querySelectorAll('.stat-number');
    let hasStartedCounting = false; // Biến này để đảm bảo hiệu ứng chỉ chạy 1 lần

    function startCounter() {
        if (hasStartedCounting) return; // Nếu đã chạy rồi thì không làm gì cả
        hasStartedCounting = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = 200; // Tốc độ chung, có thể điều chỉnh

            const updateCount = () => {
                const increment = target / speed;
                
                if(count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target; // Đảm bảo con số cuối cùng là chính xác
                }
            };
            updateCount();
        });
    }

    // Tạo một observer để theo dõi khi nào mục "stats" đi vào màn hình
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(); // Bắt đầu đếm khi người dùng cuộn tới
            }
        });
    }, { threshold: 0.5 }); // Kích hoạt khi 50% mục được nhìn thấy

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    // TÍNH NĂNG CHIA SẺ MẠNG XÃ HỘI
    const pageUrl = window.location.href; // Tự động lấy URL của trang hiện tại
    const pageTitle = document.title; // Tự động lấy tiêu đề của trang

    const facebookBtn = document.getElementById('share-facebook');
    const zaloBtn = document.getElementById('share-zalo');

    if (facebookBtn) {
        facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    }

    if (zaloBtn) {
        zaloBtn.href = `https://zalo.me/share?u=${encodeURIComponent(pageUrl)}`;
    }
    // TÍNH NĂNG 1: TỰ ĐỘNG HIGHLIGHT MỤC MENU ĐANG XEM
    const sections = document.querySelectorAll('section[id]'); // Lấy tất cả các section có id
    const navLi = document.querySelectorAll('.nav-links li a');

    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Lấy id của section đang hiển thị
                const currentId = entry.target.id;

                // Xóa class 'active-link' khỏi tất cả các link
                navLi.forEach(link => {
                    link.classList.remove('active-link');
                });

                // Tìm link tương ứng với section và thêm class 'active-link'
                const activeLink = document.querySelector(`.nav-links a[href*="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, {
        threshold: 0.5, // Kích hoạt khi 50% section vào màn hình
        rootMargin: "-100px 0px -100px 0px" // Thu hẹp vùng "nhìn thấy" một chút để highlight chính xác hơn
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });
});
