document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        product.addEventListener('click', function () {
            // Toggle la clase 'active' al producto clicado
            this.classList.toggle('active');

            // Remover la clase 'active' de los otros productos
            products.forEach(p => {
                if (p !== this) {
                    p.classList.remove('active');
                }
            });
        });
    });
});

// Agregar controladores de eventos a los botones de "Añadir al carrito"
let addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(function(addButton) {
    addButton.addEventListener('click', function() {
        // Agregar una clase "added-to-cart" al botón al hacer clic
        this.classList.add('added-to-cart');

        // Aquí puedes agregar el resto del código relacionado con agregar el producto al carrito
    });
});
