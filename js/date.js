document.addEventListener("DOMContentLoaded", function() {
    // ... existing cart functionality ...
  
    const scheduleButton = document.getElementById("schedule-button");
    const deliveryDateInput = document.getElementById("delivery-date");
    const popup = document.getElementById("popup");
    const closePopup = document.querySelector(".close-popup");
  
    scheduleButton.addEventListener("click", function() {
      deliveryDateInput.classList.toggle("hidden"); // Toggle visibility
      popup.classList.remove("hidden"); // Initially show popup
    });
  
    deliveryDateInput.addEventListener("change", function() {
      const selectedDate = this.value; // Get selected date
      if (!selectedDate) {
        return; // No date selected, exit early
      }
  
      // Update popup content with selected date (assuming desired format):
      const formattedDate = new Date(selectedDate).toLocaleDateString();
      const popupContent = document.querySelector(".popup-content p");
      popupContent.textContent = `Gracias por tu compra. Se te enviará una notificación, Tu producto llegara él ${formattedDate}.`;
  
      // Optionally, send the selected date to your server for processing
      // (implement server-side logic as needed)
    });
  
    closePopup.addEventListener("click", function() {
      popup.classList.add("hidden");
      deliveryDateInput.classList.add("hidden"); // Hide date picker on close
    });
  });
  