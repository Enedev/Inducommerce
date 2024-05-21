document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");

    if (cart.length > 0) {
        cart.forEach(function(item) {
            var productHTML = "<div class='cart-item'>" +
                              "<img src='"+item.image+"' alt='Imagen Producto'>" +
                              "<p class='item-name'>" + item.name + "</p>" +
                              "<p class='item-price'>$" + (item.price * item.quantity).toFixed(2) + "</p>" +
                              "<button class='remove-button'> - </button>" +
                              "<p class='item-und'>$<span id ='"+item.name+"span"+"'>" + item.quantity + "</span> und</p>" +
                              "<button class='add-button'> + </button>" +
                              "<p class='stock'>Stock: <span id='stock-"+item.name+"'>" + item.stock + "</span></p>" +
                              "</div>";
            cartContainer.innerHTML += productHTML;
        });

        displayBuyButton();
        updateTotal();

        let addButtonList = document.querySelectorAll('.add-button');
        let removeButtonList = document.querySelectorAll('.remove-button');

        addButtonList.forEach(function(addButton) {
            addButton.addEventListener('click', function() {
                let productName = this.parentNode.querySelector('.item-name').textContent;
                let product = cart.find(item => item.name === productName);
                if (product && product.stock>0) {
                    product.quantity++;
                    product.stock--;
                    updateStock(product.ID, product.stock)
                    let totalPrice = (product.price * product.quantity).toFixed(2);
                    this.parentNode.querySelector('.item-price').textContent = '$' + totalPrice;
                    this.parentNode.querySelector('.item-und span').textContent = product.quantity;
                    this.parentNode.querySelector('.stock span').textContent = product.stock;
                    localStorage.setItem("cart", JSON.stringify(cart));
                } else {
                    alert('El producto está fuera de stock.');
                }
                updateTotal();
            });
        });

        removeButtonList.forEach(function(removeButton) {
            removeButton.addEventListener('click', function() {
                let productName = this.parentNode.querySelector('.item-name').textContent;
                let productIndex = cart.findIndex(item => item.name === productName);
                if (productIndex !== -1) {
                    let product = cart[productIndex];
                    if (product.quantity > 1) {
                        product.quantity--;
                        product.stock++;
                        let totalPrice = (product.price * product.quantity).toFixed(2);
                        this.parentNode.querySelector('.item-price').textContent = '$' + totalPrice;
                        this.parentNode.querySelector('.item-und span').textContent = product.quantity;
                        this.parentNode.querySelector('.stock span').textContent = product.stock;
                        localStorage.setItem("cart", JSON.stringify(cart));
                    } else {
                        cart.splice(productIndex, 1);
                        this.parentNode.remove();
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                    updateTotal();
                    if (cart.length === 0) {
                        hideBuyButton();
                        cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
                    }
                }
            });
        });
    } else {
        cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
    }

    document.getElementById('buy-button').addEventListener('click', function() {
        document.getElementById('cart-items').innerHTML = "<p>Compra exitosa</p>";
        localStorage.setItem('cart', JSON.stringify([]));
        hideBuyButton();
        updateTotal();
    });
});

function updateTotal() {
    let totalPrice = 0;
    let itemPrices = document.querySelectorAll('.item-price');
    itemPrices.forEach(function(itemPrice) {
        totalPrice += parseFloat(itemPrice.textContent.slice(1));
    });
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function displayBuyButton() {
    document.getElementById('buy-button').style.display = "block";
}

function hideBuyButton() {
    document.getElementById('buy-button').style.display = "none";
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
