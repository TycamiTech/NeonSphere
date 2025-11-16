document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const songsGrid = entry.target;
                const songCards = songsGrid.querySelectorAll('.song-card');
                songCards.forEach(card => {
                    card.classList.add('animate');
                });
                observer.unobserve(songsGrid);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    const songsGrid = document.querySelector('.songs-grid');
    if (songsGrid) {
        observer.observe(songsGrid);
    }
});