document.addEventListener('DOMContentLoaded', function () {
  // Obtener el modal de comentarios y sus elementos
  const commentModal = document.getElementById('commentModal');
  const userNameInput = document.getElementById('userNameInput');
  const commentInput = document.getElementById('commentInput');
  const submitButton = document.getElementById('submitComment');
  const closeButton = commentModal.querySelector('.close');

  // Función para mostrar el modal de comentarios
  function showCommentModal() {
    commentModal.style.display = 'block';
  }

  // Función para cerrar el modal de comentarios
  function closeCommentModal() {
    commentModal.style.display = 'none';
  }

  // Función para encontrar el contenedor de comentarios del producto actual por su ID
  function findCommentsContainer(productId) {
    // Construir el selector del contenedor de comentarios
    const selector = `#product${productId} .comments`;
    // Encontrar y devolver el contenedor de comentarios
    return document.querySelector(selector);
  }

  // Función para manejar el envío del comentario
  function submitComment() {
    const userName = userNameInput.value;
    const userComment = commentInput.value;
    const productId = this.getAttribute('data-product-id'); // Obtener el ID del producto del botón

    // Buscar el contenedor de comentarios del producto actual
    const commentsContainer = findCommentsContainer(productId);

    // Si no se encuentra el contenedor de comentarios, salir de la función
    if (!commentsContainer) {
      console.error('No se pudo encontrar el contenedor de comentarios.');
      return;
    }

    // Crear elemento HTML para el nuevo comentario
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('user-comment');
    commentDiv.innerHTML = `<span class="user">${userName}:</span><span class="comment">${userComment}</span>`;

    // Agregar el nuevo comentario al contenedor
    commentsContainer.appendChild(commentDiv);

    // Agregar la clase 'new-comment' para resaltar el comentario nuevo
    commentDiv.classList.add('new-comment');

    // Quitar la clase 'new-comment' después de 3 segundos
    setTimeout(() => {
      commentDiv.classList.remove('new-comment');
    }, 3000);

    // Limpiar los campos de entrada del modal
    userNameInput.value = '';
    commentInput.value = '';

    // Cerrar el modal
    closeCommentModal();
  }

  // Asignar eventos de clic a los botones de agregar comentario
  document.querySelectorAll('.add-comment').forEach(button => {
    button.addEventListener('click', function() {
      showCommentModal();
      // Obtener el ID del producto y asignarlo al botón de enviar comentario como un atributo de datos
      submitButton.setAttribute('data-product-id', this.closest('.product').id.slice(-1));
    });
  });

  // Asignar evento de clic al botón de cierre del modal
  closeButton.addEventListener('click', closeCommentModal);

  // Asignar evento de clic al botón de enviar comentario
  submitButton.addEventListener('click', submitComment);
});
