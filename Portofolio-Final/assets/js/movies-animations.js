document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const moviesContainer = entry.target;
                const movieCards = moviesContainer.querySelectorAll('.movie-card');
                movieCards.forEach(card => {
                    card.classList.add('animate');
                });
                observer.unobserve(moviesContainer);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    const moviesContainer = document.querySelector('.movies-container');
    if (moviesContainer) {
        observer.observe(moviesContainer);
    }
});