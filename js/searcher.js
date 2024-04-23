document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const products = document.querySelectorAll('.product');

    // Función para filtrar productos
    function filterProducts() {
        const searchText = searchInput.value.trim().toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            if (productName.includes(searchText)) {
                product.style.display = 'block'; // Mostrar el producto si coincide con la búsqueda
            } else {
                product.style.display = 'none'; // Ocultar el producto si no coincide con la búsqueda
            }
        });
    }

    // Agregar evento de cambio al campo de búsqueda
    searchInput.addEventListener('input', filterProducts);
});
