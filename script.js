const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, .project-card, .skill-tag, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

const stars = document.querySelectorAll('.star');
const ratingMessage = document.querySelector('.rating-message');
const totalRatingsEl = document.getElementById('total-ratings');

if (stars.length > 0) {
    let ratings = JSON.parse(localStorage.getItem('pageRatings')) || [];
    let currentRating = 0;

    function updateRatingDisplay() {
        totalRatingsEl.textContent = ratings.length;
    }
    updateRatingDisplay();

    stars.forEach(star => {
        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value);
            ratings.push(currentRating);
            localStorage.setItem('pageRatings', JSON.stringify(ratings));
            
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < currentRating);
            });

            const messages = [
                '¡Gracias! 🥺',
                '¡Me alegra que te guste! 😊',
                '¡Te agradezco mucho! 🎉',
                '¡Eres increíble! 🌟',
                '¡Wow, 5 estrellas! ¡¡Gracias!! 🙌'
            ];
            
            ratingMessage.textContent = messages[currentRating - 1];
            ratingMessage.classList.add('show');
            updateRatingDisplay();
        });

        star.addEventListener('mouseenter', () => {
            const value = parseInt(star.dataset.value);
            stars.forEach((s, i) => {
                s.style.color = i < value ? '#f7c59f' : '#333';
            });
        });
    });

    const ratingSection = document.querySelector('.rating-section');
    if (ratingSection) {
        ratingSection.addEventListener('mouseleave', () => {
            stars.forEach((s, i) => {
                s.style.color = i < currentRating ? '#f7c59f' : '#333';
            });
        });
    }
}

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .gallery-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

setTimeout(() => {
    document.querySelectorAll('.project-card, .gallery-item').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}, 100);
