document.addEventListener('DOMContentLoaded', () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const loader = document.getElementById('loader');
    const body = document.body;
    
    const hideLoader = () => {
        loader.classList.add('zoom-out');
        body.classList.remove('loading');
        
        // Pastikan loader benar-benar hilang setelah animasi
        setTimeout(() => {
            loader.classList.add('hide');
            loader.style.visibility = 'hidden';
            loader.style.zIndex = '-1';
            // Hapus loader dari DOM setelah animasi selesai
            loader.remove();
        }, 400);
    };

    // Mulai proses loading
    const startLoading = () => {
        const letters = document.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            const delay = isMobile ? index * 0.08 : index * 0.1;
            letter.style.animationDelay = `${delay}s`;
        });

        // Waktu loading lebih singkat untuk mobile
        setTimeout(hideLoader, isMobile ? 2000 : 2500);
    };

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && !loader.classList.contains('hide')) {
            hideLoader();
        }
    });

    // Mulai animasi loading
    startLoading();

    // Animate letters with delay
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        const delay = isMobile ? index * 0.08 : index * 0.1;
        letter.style.animationDelay = `${delay}s`;
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            const loader = document.getElementById('loader');
            if (!loader.classList.contains('hide')) {
                // Smooth exit when page is hidden
                loader.style.transition = 'opacity 0.2s ease-out';
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.classList.add('hide');
                    document.body.classList.remove('loading');
                }, 200);
            }
        }
    });
});