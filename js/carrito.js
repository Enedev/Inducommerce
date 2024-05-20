function addToCart(productName, productPrice, imagePath, stock) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        alert('El producto ya está en el carrito.');
        return;
    }

    if (stock <= 0) {
        alert('El producto está fuera de stock.');
        return;
    }

    let cartItem = { 
        name: productName, 
        price: parseFloat(productPrice),  // Asegurarse de que el precio sea un número
        image: imagePath, 
        quantity: 1, 
        lastPrice: parseFloat(productPrice),  // Asegurarse de que el precio sea un número
        stock: stock - 1
    };
    cart.push(cartItem);
  
    updateStock(productName, cartItem.stock);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateStock(productID, newStock) {
    let stockElement = document.getElementById(productID);
    if (stockElement) {
        stockElement.textContent = newStock;
    } else {
        console.error(`No se encontró ningún elemento con el ID ${productID}`);
    }
}
