// Function to load past purchases from localStorage
function loadPastPurchases() {
    let pastPurchases = JSON.parse(localStorage.getItem("pastPurchases")) || [];
    return pastPurchases;
  }
  
  // Function to display past purchases in the admin panel
  function displayPastPurchases(isAdminMode = true, ischanging=false) {
    const pastPurchasesTable = document.getElementById('past-purchases');
    pastPurchasesTable.innerHTML = ''; // Clear existing content
  
    const pastPurchasesData = loadPastPurchases();
    pastPurchasesData.forEach(purchase => {
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
        if (!ischanging){
        changeButton.className += ' hidden';
        }
        changeButton.dataset.purchaseDate = purchase.date; // Use purchase date as ID
        changeButton.dataset.products = purchase.products;
        changeButton.addEventListener('click', handleStatusChange);
        changeCell.appendChild(changeButton);
      }
    });
  
    console.log(pastPurchasesData); // Log past purchases data for debugging
  }
  
  // Function to handle status change when the "Cambiar" button is clicked
    function handleStatusChange(event) {
        console.log("Event es "+ event)
        const purchaseName = event.target.dataset.products;
        console.log("purchaseName es "+ purchaseName)
        const pastPurchasesData = loadPastPurchases();

        for (let i = 0; i < pastPurchasesData.length; i++) {
            if (pastPurchasesData[i].products === purchaseName) {
                console.log("pastpurchaseData en la posicion i es:")
                console.log(pastPurchasesData[i])
                console.log("purchaseName es: "+purchaseName)
                const currentStatus = pastPurchasesData[i].status;
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
                pastPurchasesData[i].status = newStatus;
                localStorage.setItem("pastPurchases", JSON.stringify(pastPurchasesData));

                // Update table in admin mode
                displayPastPurchases(true,true);
                break; // Exit the loop after finding the matching purchase
            }
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