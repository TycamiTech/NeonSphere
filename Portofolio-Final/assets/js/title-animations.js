// Fungsi untuk mengamati judul section
function observeTitles() {
    const titles = document.querySelectorAll('section h1, section h2');
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class untuk memulai animasi
                entry.target.classList.add('animate');
                // Hentikan pengamatan setelah animasi dimulai
                titleObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5, // Trigger ketika 50% elemen terlihat
        rootMargin: '-50px' // Offset trigger point
    });

    // Amati setiap judul
    titles.forEach(title => {
        titleObserver.observe(title);
    });
}

// Jalankan setelah DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    observeTitles();
});
