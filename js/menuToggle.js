function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}
// Función para obtener el título de la página actual
function getPageTitle() {
    // Obtener el título de la página actual
    var title = document.title;
    
    // Obtener el elemento #page-title
    var pageTitleElement = document.getElementById('page-title');
    
    // Asignar el título de la página al elemento #page-title
    pageTitleElement.textContent = title;
}

// Llamar a la función cuando se cargue la página
window.onload = getPageTitle;

document.getElementById('supportBtn').addEventListener('click', function() {
    var alert = document.getElementById('supportAlert');
    alert.style.display = 'block';
    setTimeout(function() {
        alert.style.display = 'none';
    }, 3000); // La alerta se oculta después de 3 segundos
});