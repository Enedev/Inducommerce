document.addEventListener('DOMContentLoaded', function() {
    const packageButtons = document.querySelectorAll('.package-button');
    const products = document.querySelectorAll('.product');

    // Función para agregar productos al carrito basados en la categoría especificada
    function addToCartBasedOnCategory(category) {
        products.forEach(product => {
            const productCategory = product.dataset.category.toLowerCase();
            if (productCategory.includes(category)) {
                const productID = product.id.replace('product', ''); // Extrae el número del ID del producto
                const productName = product.querySelector('h2').textContent;
                const productPrice = product.querySelector('.prices').textContent;
                const productImage = product.querySelector('img').src;
                const productStock = parseInt(product.querySelector('.stock').textContent);
                addToCart(productID, productName, productPrice, productImage, productStock);
            }
        });
    }

    // Agregar evento de clic a los botones de paquete
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category.toLowerCase();
            addToCartBasedOnCategory(category);
        });
    });
});
