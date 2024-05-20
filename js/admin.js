document.addEventListener("DOMContentLoaded", function() {
    let adminModeButton = document.getElementById("admin-mode-button");
    let products = document.querySelectorAll('.product');
    let isAdminMode = false; // Variable para controlar el estado del modo administrador

    adminModeButton.addEventListener("click", function() {
        if (!isAdminMode) { // Verificar si el modo administrador ya está activado
            isAdminMode = true; // Activar el modo administrador
            
            products.forEach(function(product) {
                // Botón "Editar Precio"
                let editPriceButton = document.createElement("button");
                editPriceButton.textContent = "Editar Precio";
                editPriceButton.classList.add("edit-price-button");
                product.appendChild(editPriceButton);
                editPriceButton.addEventListener("click", function() {
                    showModal(product, "Editar Precio", (newPrice) => {
                        if (newPrice !== null && !isNaN(newPrice) && parseFloat(newPrice) >= 0) {
                            let priceElement = product.querySelector('.prices');
                            priceElement.textContent = parseFloat(newPrice).toFixed(2);
                            saveToLocalStorage(product.id, 'price', newPrice); // Aquí guardamos en localStorage
                            
                            // Actualizar el valor en el botón "Agregar al carrito"
                            let addToCartButton = product.querySelector('.add-to-cart');
                            if (addToCartButton) {
                                let lastArgument = product.querySelector('.stock').textContent.trim();
                                addToCartButton.setAttribute('onclick', `addToCart('${product.querySelector('h2').textContent}', '${newPrice}', '${product.querySelector('img').getAttribute('src')}', ${lastArgument})`);
                            }
                        } else {
                            alert("Por favor, introduce un precio válido.");
                        }
                    });
                });

                // Botón "Agregar Descuento"
                let addDiscountButton = document.createElement("button");
                addDiscountButton.textContent = "Agregar Descuento";
                addDiscountButton.classList.add("add-discount-button");
                product.appendChild(addDiscountButton);
                addDiscountButton.addEventListener("click", function() {
                    showModal(product, "Agregar Descuento", (discount) => {
                        if (discount !== null && !isNaN(discount) && parseFloat(discount) >= 0 && parseFloat(discount) <= 100) {
                            let currentPrice = parseFloat(product.querySelector('.prices').textContent);
                            let discountedPrice = currentPrice * (1 - parseFloat(discount) / 100);
                            let priceElement = product.querySelector('.prices');
                            priceElement.textContent = discountedPrice.toFixed(2);
                            saveToLocalStorage(product.id, 'price', discountedPrice.toFixed(2)); // Aquí guardamos en localStorage
                            
                            // Actualizar el valor en el botón "Agregar al carrito"
                            let addToCartButton = product.querySelector('.add-to-cart');
                            if (addToCartButton) {
                                let lastArgument = product.querySelector('.stock').textContent.trim();
                                addToCartButton.setAttribute('onclick', `addToCart('${product.querySelector('h2').textContent}', '${discountedPrice.toFixed(2)}', '${product.querySelector('img').getAttribute('src')}', ${lastArgument})`);
                            }
                        } else {
                            alert("Por favor, introduce un descuento válido (entre 0 y 100).");
                        }
                    });
                });
            });
        } else {
            isAdminMode = false; // Desactivar el modo administrador

            // Eliminar los botones de edición de precio y descuento
            products.forEach(function(product) {
                let editPriceButton = product.querySelector(".edit-price-button");
                if (editPriceButton) {
                    editPriceButton.remove();
                }
                let addDiscountButton = product.querySelector(".add-discount-button");
                if (addDiscountButton) {
                    addDiscountButton.remove();
                }
            });
        }
    });


    // Function to display modal
    function showModal(product, title, callback) {
        let modal = document.getElementById("myModal");
        let modalTitle = document.getElementById("modal-title");
        let modalInput = document.getElementById("modal-input");
        let modalSubmit = document.getElementById("modal-submit");

        modal.style.display = "block";
        modalTitle.textContent = title;
        modalInput.value = "";

        modalSubmit.onclick = function() {
            let newValue = modalInput.value;
            modal.style.display = "none";
            callback(newValue);
        };

        let closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.onclick = function() {
            modal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    // Función para guardar en el almacenamiento local
    function saveToLocalStorage(productId, key, value) {
        let productData = JSON.parse(localStorage.getItem(productId)) || {};
        productData[key] = value;
        localStorage.setItem(productId, JSON.stringify(productData));
    }
    
    // Obtener el precio del producto y guardar en el localStorage
    products.forEach(function(product) {
        let productId = product.id;
        let storedData = JSON.parse(localStorage.getItem(productId));
        if (storedData && storedData.price) {
            let storedPrice = storedData.price;
            let priceElement = product.querySelector('.prices');
            priceElement.textContent = parseFloat(storedPrice).toFixed(2);

            // Obtener el valor específico para el último argumento de addToCart
            let stockElement = product.querySelector('.stock');
            let lastArgument = stockElement.textContent.trim();

            // Actualizar el atributo onclick del botón "Agregar al carrito"
            let addToCartButton = product.querySelector('.add-to-cart');
            if (addToCartButton) {
                addToCartButton.setAttribute('onclick', `addToCart('${product.querySelector('h2').textContent}', '${storedPrice}', '${product.querySelector('img').getAttribute('src')}', ${lastArgument})`);
            }
        }
    });
});


function closeModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
}
