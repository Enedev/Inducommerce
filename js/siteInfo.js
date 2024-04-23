document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const moreInfo = product.querySelector('.more-info');
        const addCommentButton = product.querySelector('.add-comment');

        // Función para posicionar la información adicional
        function positionMoreInfo() {
            const rect = product.getBoundingClientRect();
            const availableSpaceRight = window.innerWidth - rect.right;
            const infoWidth = moreInfo.offsetWidth;
            const isSpaceEnoughRight = availableSpaceRight >= infoWidth;

            if (isSpaceEnoughRight) {
                moreInfo.style.left = '100%';
                moreInfo.style.transform = 'translateX(10px)';
                moreInfo.classList.remove('left');
                moreInfo.classList.add('right');
            } else {
                moreInfo.style.left = 'auto';
                moreInfo.style.right = '100%';
                moreInfo.style.transform = 'translateX(-10px)';
                moreInfo.classList.remove('right');
                moreInfo.classList.add('left');
            }
        }

        // Posicionar la información adicional al cargar la página
        positionMoreInfo();

        // Función para activar la información adicional
        function toggleMoreInfo() {
            moreInfo.classList.toggle('active');
            positionMoreInfo();
        }

        // Asignar el evento de clic para activar la información adicional
        product.addEventListener('click', toggleMoreInfo);
    });
});
