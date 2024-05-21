document.addEventListener("DOMContentLoaded", function () {
    const categoryFilters = document.querySelectorAll('input[name="category-filter"]');
    const priceFilters = document.querySelectorAll('input[name="price-filter"]');
    const products = document.querySelectorAll('.product');
  
    function getSelectedCategories() {
        const selectedCategories = [];
        categoryFilters.forEach(checkbox => {
            if (checkbox.checked) {
                selectedCategories.push(checkbox.value);
            }
        });
        return selectedCategories;
    }
  
    function getSelectedPriceRanges() {
        const selectedPriceRanges = [];
        priceFilters.forEach(checkbox => {
            if (checkbox.checked) {
                const selectedRange = checkbox.value;
                if (selectedRange === 'all') {
                    selectedPriceRanges.push(['all']);
                } else {
                    const rangeParts = selectedRange.split('-');
                    const minPrice = parseFloat(rangeParts[0]);
                    const maxPrice = parseFloat(rangeParts[1]);
                    selectedPriceRanges.push([minPrice, maxPrice]);
                }
            }
        });
        return selectedPriceRanges;
    }
  
    function filterByCategory(product, selectedCategories) {
        const productCategory = product.getAttribute('data-category');
        if (selectedCategories.length === 0 || selectedCategories.includes('all')) {
            return true;
        }
        return selectedCategories.includes(productCategory);
    }
  
    function filterByPrice(product, selectedPriceRanges) {
        const productPrice = parseFloat(product.querySelector('.prices').textContent);
        if (selectedPriceRanges.length === 0 || selectedPriceRanges[0][0] === 'all') {
            return true;
        }
        return selectedPriceRanges.some(range => {
            const minPrice = range[0];
            const maxPrice = range[1];
            return productPrice >= minPrice && productPrice <= maxPrice;
        });
    }
  
    function filterProducts() {
        const selectedCategories = getSelectedCategories();
        const selectedPriceRanges = getSelectedPriceRanges();
        
        products.forEach(product => {
            const categoryMatch = filterByCategory(product, selectedCategories);
            const priceMatch = filterByPrice(product, selectedPriceRanges);
  
            if (categoryMatch && priceMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
  
    // Add event listeners to all checkboxes for category and price filtering
    categoryFilters.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
    priceFilters.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
  
    // Initial filtering (show all products by default)
    filterProducts();
});


document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el botón y agregarle un evento de clic
    const clearFiltersButton = document.getElementById('clear-filters-button');
    clearFiltersButton.addEventListener('click', clearFilters);

    // Función para desactivar todos los checkboxes
    function clearFilters() {
        // Seleccionar todos los checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        // Desmarcar todos los checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});
