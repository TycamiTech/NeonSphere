document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const techGrid = entry.target;
                const items = techGrid.querySelectorAll('.tech-item');
                items.forEach(item => {
                    item.classList.add('animate');
                });
                observer.unobserve(techGrid);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    const techGrid = document.querySelector('.tech-grid');
    if (techGrid) {
        observer.observe(techGrid);
    }
});