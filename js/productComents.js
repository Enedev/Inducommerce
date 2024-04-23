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
  
    // Función para manejar el envío del comentario
    function submitComment() {
      const userName = userNameInput.value;
      const userComment = commentInput.value;
  
      // Crear elemento HTML para el nuevo comentario
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('user-comment');
      commentDiv.innerHTML = `<span class="user">${userName}:</span><span class="comment">${userComment}</span>`;
  
      // Buscar el contenedor de comentarios del producto actual
      const product = document.querySelector('.product'); // Asumir que solo hay un producto en el contexto
      const commentsContainer = product.querySelector('.comments');
  
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
      button.addEventListener('click', showCommentModal);
    });
  
    // Asignar evento de clic al botón de cierre del modal
    closeButton.addEventListener('click', closeCommentModal);
  
    // Asignar evento de clic al botón de enviar comentario
    submitButton.addEventListener('click', submitComment);
  });
  