// Función para guardar el estado de las estrellas en el almacenamiento local
function saveStarState(productId, index, active) {
    localStorage.setItem(`product-${productId}-star-${index}`, active ? 'active' : 'inactive');
}

// Función para obtener el estado de las estrellas desde el almacenamiento local
function loadStarState(productId, index) {
    const state = localStorage.getItem(`product-${productId}-star-${index}`);
    return state === 'active';
}

// Función para gestionar el evento de clic en una estrella
function handleStarClick(event) {
    // Detener la propagación del evento clic para evitar que se active el moreinfo
    event.stopPropagation();

    const productId = event.target.closest('.product').id; // Obtener el id del contenedor del producto
    const stars = event.target.parentNode.querySelectorAll('.star');

    // Obtener el índice de la estrella seleccionada
    const selectedIndex = Array.from(stars).indexOf(event.target);

    // Activar las estrellas hasta el índice seleccionado
    for (let i = 0; i <= selectedIndex; i++) {
        stars[i].classList.add('active');
        saveStarState(productId, i, true); // Guardar el estado de la estrella en el almacenamiento local
    }

    // Desactivar las estrellas después del índice seleccionado
    for (let i = selectedIndex + 1; i < stars.length; i++) {
        stars[i].classList.remove('active');
        saveStarState(productId, i, false); // Guardar el estado de la estrella en el almacenamiento local
    }
}

// Asignar eventos de clic a todas las estrellas y cargar su estado desde el almacenamiento local
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('click', handleStarClick);
    });

    stars.forEach((star) => {
        const productId = star.closest('.product').id;
        const starIndex = Array.from(star.parentNode.querySelectorAll('.star')).indexOf(star);
        star.classList.toggle('active', loadStarState(productId, starIndex)); // Cargar el estado de la estrella desde el almacenamiento local
    });
});
