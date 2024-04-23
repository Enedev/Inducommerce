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
