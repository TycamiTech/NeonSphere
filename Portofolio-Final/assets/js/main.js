// Intersection Observer untuk animasi saat scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('project-card')) {
                entry.target.classList.add('show-card');
            } else if (entry.target.tagName.toLowerCase() === 'h2') {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            observer.unobserve(entry.target); // Hentikan observasi setelah animasi
        }
    });
}, observerOptions);

// Tambahkan class dan observer ke semua project cards dan headings
document.addEventListener('DOMContentLoaded', () => {
    // Animasi untuk project cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });

    // Animasi untuk semua h2 headings
    const headings = document.querySelectorAll('h2');
    headings.forEach((heading) => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(30px)';
        observer.observe(heading);
    });
});

// Fungsi untuk toggle genre musik
function toggleGenre(genreId) {
    const songList = document.getElementById(`${genreId}-songs`);
    const expandIcon = songList.previousElementSibling.querySelector('.expand-icon');
    
    if (songList.classList.contains('expanded')) {
        songList.classList.remove('expanded');
        expandIcon.textContent = '+';
    } else {
        songList.classList.add('expanded');
        expandIcon.textContent = '-';
    }
}
