// Function to load past purchases from localStorage
function loadPastPurchases() {
    let pastPurchases = JSON.parse(localStorage.getItem("pastPurchases")) || [];
    return pastPurchases;
  }
  
  // Function to display past purchases in the admin panel
  function displayPastPurchases(isAdminMode = true, ischanging = false) {
    const pastPurchasesTable = document.getElementById('past-purchases');
    pastPurchasesTable.innerHTML = ''; // Clear existing content

    const pastPurchasesData = loadPastPurchases();
    pastPurchasesData.forEach((purchase, index) => { // Use index as unique identifier
        const row = pastPurchasesTable.insertRow();

        const productsCell = row.insertCell();
        productsCell.textContent = purchase.products;

        const totalCell = row.insertCell();
        totalCell.textContent = `$${purchase.total}`;

        const statusCell = row.insertCell();
        statusCell.textContent = purchase.status;

        if (isAdminMode) {
            const changeCell = row.insertCell();
            const changeButton = document.createElement('button');
            changeButton.textContent = 'Cambiar';
            changeButton.classList.add('change-button-class'); // Add class to the button
            if (!ischanging) {
                changeButton.className += ' hidden';
            }
            changeButton.dataset.purchaseIndex = index; // Use array index as identifier
            changeButton.addEventListener('click', handleStatusChange);
            changeCell.appendChild(changeButton);
        }
    });

    console.log(pastPurchasesData); // Log past purchases data for debugging
  }
  
  // Function to handle status change when the "Cambiar" button is clicked
  function handleStatusChange(event) {
    const purchaseIndex = event.target.dataset.purchaseIndex; // Get index from data attribute
    const pastPurchasesData = loadPastPurchases();

    if (purchaseIndex !== undefined && pastPurchasesData[purchaseIndex]) {
        const currentStatus = pastPurchasesData[purchaseIndex].status;
        let newStatus;
        switch (currentStatus) {
            case 'en espera':
                newStatus = 'en camino';
                break;
            case 'en camino':
                newStatus = 'entregado';
                break;
            default:
                newStatus = 'en espera';
        }
        pastPurchasesData[purchaseIndex].status = newStatus;
        localStorage.setItem("pastPurchases", JSON.stringify(pastPurchasesData));

        // Actualiza la tabla en modo administrador
        displayPastPurchases(true, true);
    }
  }

  
  // Event listener to display past purchases when entering admin mode
  document.getElementById('admin-mode-button').addEventListener('click', () => {
    const adminPol = document.getElementById('admin-odioapol');
    const changeButtons = document.getElementsByClassName('change-button-class');
    adminPol.classList.toggle('hidden'); // Update table based on admin mode state
    for (let button of changeButtons) {
        button.classList.toggle('hidden');
    } 
    });
  
  // Initial display of past purchases when the page loads
  displayPastPurchases();