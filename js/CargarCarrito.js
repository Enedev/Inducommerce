document.addEventListener("DOMContentLoaded", function() {
    // Obtener el carrito del localStorage
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log("esto es cart: ", cart)
    // Verificar si hay productos en el carrito
    if (cart && cart.length > 0) {
        // Obtener el contenedor del carrito
        let cartContainer = document.getElementById("cart-items");

        // Iterar sobre los productos en el carrito y mostrarlos en el HTML
        cart.forEach(function(item) {
            var productHTML = "<div class='cart-item'>" +
                                  "<img src='"+item.image+"' alt=Imagen Producto>"+
                                  "<p class='item-name'>" + item.name + "</p>" +
                                  "<p class='item-price'>$" + item.lastPrice + "</p>" +
                                  "<button class='remove-button'> - </button>"+
                                  "<p class='item-und'>$<span id ='"+item.name+"span"+"'>"+item.quantity+"</span> und</p>"+
                                  "<button class='add-button'> + </button>"+
                              "</div>";
            cartContainer.innerHTML += productHTML;
        });

        updateTotal()
        // Agregar controladores de eventos a los botones de más y menos
        let addButtonList = document.querySelectorAll('.add-button');
        let removeButtonList = document.querySelectorAll('.remove-button');

        let totalPriceList = document.querySelectorAll('.item-price');
        

        addButtonList.forEach(function(addButton) {
            addButton.addEventListener('click', function() {
                // Obtener el nombre del producto
                let productName = this.parentNode.querySelector('.item-name').textContent;
                
                // Buscar el producto en el carrito
                let product = cart.find(item => item.name === productName);
                if (product) {
                    // Obtener el precio unitario del producto
                    let productPrice = product.price;
                    
                    // Obtener el número de unidades
                    let unitSpan = this.parentNode.querySelector('.item-und span');
                    let unit = parseInt(unitSpan.textContent);
                    
                    // Incrementar el número de unidades
                    unit++;
                    // Actualizar el número de unidades
                    unitSpan.textContent = unit;

                    // Actualizar el precio total
                    let totalPrice = (productPrice * unit).toFixed(2);
                    this.parentNode.querySelector('.item-price').textContent = '$' + totalPrice;

                    // Actualizar la cantidad en el objeto del carrito
                    product.quantity = unit;
                    product.lastPrice = totalPrice

                    // Actualizar el carrito en el localStorage
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
                updateTotal()
            });
        });

        removeButtonList.forEach(function(removeButton) {
            removeButton.addEventListener('click', function() {
                // Obtener el nombre del producto
                let productName = this.parentNode.querySelector('.item-name').textContent;
                
                // Buscar el producto en el carrito
                let productIndex = cart.findIndex(item => item.name === productName);
                if (productIndex !== -1) {
                    // Obtener el número de unidades
                    let unitSpan = this.parentNode.querySelector('.item-und span');
                    let unit = parseInt(unitSpan.textContent);
                    
                    // Si la cantidad es 1, eliminar el producto del carrito
                    if (unit === 1) {
                        cart.splice(productIndex, 1); // Eliminar el producto del carrito
                        // Actualizar el carrito en el localStorage
                        localStorage.setItem("cart", JSON.stringify(cart));
                        // Eliminar el elemento del DOM
                        this.parentNode.remove();
                    } else {
                        // Decrementar el número de unidades si no es 1
                        unit--;
                        // Actualizar el número de unidades
                        unitSpan.textContent = unit;
        
                        // Actualizar el precio total
                        let product = cart[productIndex];
                        let productPrice = product.price;
                        let totalPrice = (productPrice * unit).toFixed(2);
                        this.parentNode.querySelector('.item-price').textContent = '$' + totalPrice;
        
                        // Actualizar la cantidad y el último precio en el objeto del carrito
                        product.quantity = unit;
                        product.lastPrice = totalPrice;
        
                        // Actualizar el carrito en el localStorage
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                }
                updateTotal();
                if(cart && cart.length == 0){
                    // Mostrar un mensaje indicando que el carrito está vacío
                    let cartContainer = document.getElementById("cart-items");
                    cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
                }
            });
        });
        
    } else {
        // Mostrar un mensaje indicando que el carrito está vacío
        let cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
    }
});


function updateTotal(){
    let totalPrice = 0;
        let itemPrices = document.querySelectorAll('.item-price');
        itemPrices.forEach(function(itemPrice) {
            totalPrice += parseFloat(itemPrice.textContent.slice(1));
        });
        // Actualizar el contenido del elemento HTML que muestra el total de la compra
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

