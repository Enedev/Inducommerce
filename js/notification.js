// Obtener referencia al botón de compra
const buyButton = document.getElementById('buy-button');

// Obtener referencia al elemento de la notificación emergente
const popup = document.getElementById('popup');

// Agregar evento click al botón de compra
buyButton.addEventListener('click', function() {
    // Mostrar la notificación emergente
    popup.style.display = 'block';

    // Después de 3 segundos, ocultar la notificación emergente
    setTimeout(function() {
        popup.style.display = 'none';
    }, 5000);
});

// Agregar evento click para cerrar la notificación emergente al hacer clic en el botón de cerrar
document.querySelector('.close-popup').addEventListener('click', function() {
    popup.style.display = 'none';
});
