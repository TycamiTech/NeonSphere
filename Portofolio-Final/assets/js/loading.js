document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');

    // Setelah 4 detik, mulai animasi zoom out
    setTimeout(() => {
        document.body.classList.remove('loading');
        loader.classList.add('zoom-out');

        // Tunggu animasi zoom out selesai (0.8s) sebelum hide loader
        setTimeout(() => {
            loader.classList.add('hide');
        }, 800);
    }, 4000);
});
