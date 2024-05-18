
/* ELEMENTOS HTML UTILIZADOS */
const slides = document.querySelector(".slides");
let slideImages = document.querySelectorAll(".slides img");
let dots = document.querySelectorAll(".dot");


/* VARIABLES CONTROLADORAS */
let startX, startY, endX, endY;
let counter = 0;


/* FUNCIONES PARA EL DESPLAZAMIENTO DE LAS IMAGENES */

// Avanza a la siguiente imagen con una animación
function slideNext() {
    slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
    counter = (counter + 1) % slideImages.length;
    slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
    updateIndicators();
}

// Retrocede a la imagen anterior con una animación
function slidePrev() {
    slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
    counter = (counter - 1 + slideImages.length) % slideImages.length;
    slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
    updateIndicators();
}

// Actualiza los puntos indicadores, según la imagen en pantalla
function updateIndicators() {
    dots.forEach(dot => {
        dot.className = dot.className.replace(" active", "");
    });
    dots[counter].className += " active";
}

// Cambia la imagen según el punto indicador seleccionado
function switchImage(currentImage) {
    let imageId = parseInt(currentImage.getAttribute("attr"));
    
    if(imageId == counter) {
        return;
    }
    if(imageId > counter) {
        slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
        counter = imageId
        slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
    }
    else {
        slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
        counter = imageId;
        slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
    }

    updateIndicators();
}

// Inicia el desplazamiento automático del slider
function startAutoSliding() {
    deletInterval = setInterval(loop, 4000);

    function loop() {
        slideNext();
        updateIndicators();
    }
}

// Frena el desplazamiento automático del slider
function stopAutoSliding() {
    clearInterval(deletInterval);
}

// Inicia el seguimiento del cursor o del toque
function startDrag(e) {
    if(e.type === "touchstart") {
        e.preventDefault();
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
    else {
        startX = e.clientX;
        startY = e.clientY;
    }
}

// Finaliza el seguimiento del cursor o del toque
function endDrag(e) {
    if(e.type === "touchend") {
        e.preventDefault();
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
    }
    else {
        endX = e.clientX;
        endY = e.clientY;
    }

    handleDrag();
}

// Calcula el desplazamiento y cambia la imagen según la dirección horizontal
function handleDrag() {
    let deltaX = endX - startX;
    let deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0)
            slidePrev();
        else
            slideNext();
    }
}


/* AGREGACIÓN DE EVENT LISTENER A LOS ELEMENTOS HTML*/

// Escucha eventos sobre la interacción del usuario sobre el contenedor del Slider
slides.addEventListener("mouseover", stopAutoSliding);
slides.addEventListener("touchstart", stopAutoSliding);

slides.addEventListener("mouseout", startAutoSliding);
slides.addEventListener("touchend", startAutoSliding);

// Escucha eventos de clic o toque en las imagenes
slideImages.forEach(image => {
    image.addEventListener("mousedown", startDrag);
    image.addEventListener("touchstart", startDrag);
    
    image.addEventListener("mouseup", endDrag);
    image.addEventListener("touchend", endDrag);
});

// Escucha eventos de clic o toque en los puntos indicadores
dots.forEach(dot => {
    dot.addEventListener("click", () => switchImage(dot))
});


/* INICO DEL DESPLAZAMIENTO AUTOMÁTICO */
startAutoSliding();
