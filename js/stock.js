document.addEventListener("DOMContentLoaded", updateAllStocks);

// Función para actualizar todos los stocks de los productos en el carrito
function updateAllStocks() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach(item => {
        UpdateStockCatalogo(item.ID, item.stock);
    });
}

function UpdateStockCatalogo(productID, newStock) {

    let stockElements = document.querySelectorAll(`.stock${productID}`);
    
    if (stockElements.length > 0) {
        stockElements.forEach(element => {
            element.textContent = newStock;
        });
    } else {
        console.error(`No se encontró ningún elemento con la clase stock${productID}`);
    }
}
