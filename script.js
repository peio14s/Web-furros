document.addEventListener('DOMContentLoaded', () => {
    // Lógica para el menú hamburguesa (si ya estaba, lo reforzamos)
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('change', () => {
            // Esto lo maneja CSS con :checked, pero es bueno tener la referencia
            // si se quisieran añadir más interacciones JS con el menú.
        });
    }

    // Lógica para todos los carruseles en la página
    document.querySelectorAll('.carousel-container').forEach(container => {
        const track = container.querySelector('.carousel-track');
        const images = Array.from(track.children); // Convierte NodeList a Array
        const nextButton = container.querySelector('.carousel-button.next');
        const prevButton = container.querySelector('.carousel-button.prev');
        const dotsContainer = container.querySelector('.carousel-dots');
        let currentIndex = 0;
        let slideWidth = images[0].clientWidth; // Ancho de una imagen (asumiendo que todas son iguales)

        // Crear los puntos (dots) de navegación
        if (dotsContainer) {
            images.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('carousel-dot');
                if (index === 0) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    moveToSlide(index);
                });
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

        // Función para mover el carrusel a un slide específico
        const moveToSlide = (targetIndex) => {
            if (targetIndex < 0) {
                targetIndex = images.length - 1; // Vuelve al final si se va al principio
            } else if (targetIndex >= images.length) {
                targetIndex = 0; // Vuelve al principio si se va al final
            }

            track.style.transform = 'translateX(-' + (targetIndex * slideWidth) + 'px)';
            currentIndex = targetIndex;
            updateDots();
            updateThumbnails(); // Actualiza también las miniaturas si existen
        };

        // Función para actualizar los puntos (dots) activos
        const updateDots = () => {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        };

        // Función para actualizar las miniaturas activas (solo en galeria.html)
        const updateThumbnails = () => {
            const thumbnails = document.querySelectorAll('.thumbnail-grid .thumbnail');
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            const activeThumb = document.querySelector(`.thumbnail[data-index="${currentIndex}"]`);
            if (activeThumb) {
                activeThumb.classList.add('active');
            }
        };

        // Event Listeners para los botones de navegación
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                moveToSlide(currentIndex + 1);
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                moveToSlide(currentIndex - 1);
            });
        }

        // Si es el carrusel de la galería principal (con miniaturas)
        if (container.classList.contains('main-gallery-carousel')) {
            const thumbnails = document.querySelectorAll('.thumbnail-grid .thumbnail');
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    moveToSlide(index);
                });
            });

            // Ajustar el ancho del slide cuando la ventana cambia de tamaño
            window.addEventListener('resize', () => {
                slideWidth = images[0].clientWidth;
                moveToSlide(currentIndex); // Reajusta la posición
            });
        }

        // Inicializar el carrusel en la primera imagen y actualizar dots/thumbnails
        moveToSlide(0);
    });
});