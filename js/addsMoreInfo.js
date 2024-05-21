document.addEventListener("DOMContentLoaded", function() {
    let products = document.querySelectorAll('.product');

    // Función para mostrar otros productos aleatorios
    function showOtherProducts(excludeProduct) {
        let otherProductsContainer = excludeProduct.querySelector('#other-products');
        otherProductsContainer.innerHTML = ''; // Limpiar contenido previo

        // Crear una lista de productos excluyendo el actual
        let otherProducts = Array.from(products).filter(product => product.id !== excludeProduct.id);

        // Mezclar productos
        otherProducts.sort(() => 0.5 - Math.random());

        // Seleccionar los dos primeros productos después de mezclar
        let selectedProducts = otherProducts.slice(0, 2);

        // Crear elementos de imagen para los productos seleccionados
        selectedProducts.forEach(product => {
            let img = document.createElement('img');
            img.src = product.querySelector('img').src;
            img.alt = product.querySelector('h2').textContent;
            img.style.width = '100px'; // Ajustar el tamaño de la imagen
            img.style.margin = '10px'; // Añadir algo de espacio entre imágenes
            otherProductsContainer.appendChild(img);
        });
    }

    // Lógica para mostrar información detallada del producto y llamar a showOtherProducts
    products.forEach(function(product) {
        product.addEventListener("click", function() {
            // Aquí iría la lógica para mostrar la información detallada del producto
            let detailedInfoContainer = product.querySelector('.more-info');
            detailedInfoContainer.classList.add('active'); // Muestra la información detallada

            // Mostrar otros productos aleatorios
            showOtherProducts(product);
        });
    });
});
