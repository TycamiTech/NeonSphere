document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                // Wrap text in span if not already wrapped
                if (!title.querySelector('span')) {
                    const text = title.textContent;
                    title.textContent = '';
                    const span = document.createElement('span');
                    span.textContent = text;
                    title.appendChild(span);
                }
                title.classList.add('animate-title');
                observer.unobserve(title);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-50px'
    });

    // Observe all section titles
    const titles = document.querySelectorAll('section h1, section h2');
    titles.forEach(title => {
        observer.observe(title);
    });
});