const clients = JSON.parse(localStorage.getItem("clients")) || [];

if (!clients || clients.length === 0) {
  throw new Error("No clients found in local storage.");
}

const adminData = clients[0];
const alert = document.createElement("div");

// Create overlay to darken background
const overlay = document.createElement("div");
overlay.className = "confirmation-alert-overlay";
overlay.style.cssText = "position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1000;";

// Style the alert box
alert.className = "confirmation-alert alert alert-warning rounded shadow";
alert.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 350px; max-width: 90%; z-index: 1001; padding: 20px; background-color: #fff;";

alert.innerHTML = `
  <div dir="ltr" class="confirmation-alert-content">
    <h4 class="mb-3 fw-bold">Login Information</h4>
    <p><strong>User Name:</strong> ${adminData.name}</p>
    <p><strong>Phone Number:</strong> ${adminData.phone || 'Not Found'}</p>
    <p><strong>Password:</strong> ${adminData.password || 'Not Found'}</p>
    <div class="d-flex justify-content-end mt-4">
      <button id="confirm-delete" class="btn btn-warning px-4">Okay</button>
    </div>
  </div>
`;

if (clients.length === 1) {
  document.body.appendChild(overlay);
  document.body.appendChild(alert);
  
  // Add event listener to close when clicking "Okay"
  document.getElementById("confirm-delete").addEventListener("click", function() {
    overlay.remove();
    alert.remove();
  });
}