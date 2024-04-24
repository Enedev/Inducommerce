function addToCart(productName, productPrice, imagePath) {
    // Guardar información del producto en el localStorage
    let cartItem = {
        name: productName,
        price: productPrice,
        image: imagePath,
        quantity: 1,
        lastPrice: productPrice //para que guarde el ultimo valor que había
    };

    // Obtener el carrito actual del localStorage o inicializarlo si está vacío
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verificar si el producto ya está en el carrito antes de agregarlo
    if (!cart.some(item => item.name === productName)) {
        // Agregar el nuevo item al carrito
        cart.push(cartItem);

        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        console.log('El producto ya está en el carrito.');
        alert('El producto ya está en el carrito.');
    }
}
