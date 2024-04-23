document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        // Función para agregar un nuevo comentario
        function addComment() {
            const userName = prompt('Ingresa tu nombre:');
            const userComment = prompt('Escribe tu comentario:');

            // Crear elementos HTML para mostrar el nuevo comentario
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('user-comment');

            const userNameSpan = document.createElement('span');
            userNameSpan.classList.add('user');
            userNameSpan.textContent = userName + ': ';

            const commentSpan = document.createElement('span');
            commentSpan.classList.add('comment');
            commentSpan.textContent = userComment;

            commentDiv.appendChild(userNameSpan);
            commentDiv.appendChild(commentSpan);

            // Agregar el nuevo comentario al producto
            product.querySelector('.comments').appendChild(commentDiv);
        }

        // Asignar el evento de clic al botón para agregar comentario
        const addCommentButton = product.querySelector('.more-info .add-comment');
        addCommentButton.addEventListener('click', addComment);
    });
});
