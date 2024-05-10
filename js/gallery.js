let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.slides img');
    const dots = document.querySelectorAll('.dot');
    slideIndex += n;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    const offset = -slideIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    // Actualiza los puntos
    dots.forEach((dot, index) => {
        if (index === slideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Crea los puntos
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slides img');
    const dotsContainer = document.querySelector('.dots');
    slides.forEach((slide, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.onclick = () => moveSlide(index - slideIndex);
        dotsContainer.appendChild(dot);
    });

    // Inicia con el primer punto activo
    document.querySelector('.dot').classList.add('active');
});
