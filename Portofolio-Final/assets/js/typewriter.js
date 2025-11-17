document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aboutContent = entry.target;
                const paragraphs = aboutContent.querySelectorAll('.about-text p');
                
                // Wrap text in spans for animation
                paragraphs.forEach(p => {
                    const text = p.textContent;
                    p.textContent = '';
                    const span = document.createElement('span');
                    span.textContent = text;
                    p.appendChild(span);
                    p.classList.add('animate-text');
                });

                observer.unobserve(aboutContent);
            }
        });
    }, {
        threshold: 0.5
    });

    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        observer.observe(aboutContent);
    }
});
