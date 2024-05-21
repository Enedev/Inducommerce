function addToCart(productID, productName, productPrice, imagePath, stock) {
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
      ID : productID,
      name: productName, 
      price: parseFloat(productPrice),  // Asegurarse de que el precio sea un número
      image: imagePath, 
      quantity: 1, 
      lastPrice: parseFloat(productPrice),  // Asegurarse de que el precio sea un número
      stock: stock - 1
    };
    cart.push(cartItem);
  
    updateStock(cartItem.ID, cartItem.stock);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
function updateStock(productID, newStock) {

    // esto es porque hay varios cosos donde se muestra el stock de un producto 
    let stockElements = document.querySelectorAll(`.stock${productID}`);
    
    if (stockElements.length > 0) {
        stockElements.forEach(element => {
            element.textContent = newStock;
            console.log(`el Stock ahora es: ${newStock}`);
        });
    } else {
        console.error(`No se encontró ningún elemento con la clase stock${productID}`);
    }
}
  
  // New function to store past purchases
  function storePastPurchase(cart, total, status) {
    let pastPurchases = JSON.parse(localStorage.getItem("pastPurchases")) || [];
    const purchaseDate = new Date().toLocaleDateString(); // Get current date
  
    let purchase = {
      products: cart.map(item => item.name).join(', '), // Join product names with comma
      total: total,
      status: status,
      date: purchaseDate
    };
  
    pastPurchases.push(purchase);
    localStorage.setItem("pastPurchases", JSON.stringify(pastPurchases));
    console.log(pastPurchases);
  }
  
  function handlePurchase() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let products = cart.map(item => item.name).join(', ');
  
    storePastPurchase(cart, total, 'en espera');
  
    // Clear the cart after purchase
    localStorage.setItem("cart", JSON.stringify([]));
  }
  
  document.getElementById('buy-button').addEventListener('click', handlePurchase);