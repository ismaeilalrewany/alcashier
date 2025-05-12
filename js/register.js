import collectData from "./layouts/collectData.js";
import commonValidationCheck from "./layouts/commonValidationCheck.js";

// start work with adding new clients (register)
const register = document.getElementById('register');
const registerInputs = document.querySelectorAll('.register .form-control');
const registerWarnings = document.querySelectorAll('.register .form-text');

// all warning messages if client entered wrong data
const warningMessages = [
  document.querySelector('[data-i18n="warning-name"]'),
  document.querySelector('[data-i18n="warning-phone"]'),
  document.querySelector('[data-i18n="warning-password"]')
];

// submit data and check if it correct then save it
if (register) register.addEventListener('submit', (e) => {
  const data = collectData(registerInputs);
  let clients = [];

  // get any data in local storage first
  if (localStorage.getItem('clients')) {
    const savedData = localStorage.getItem('clients');
    clients.push(...JSON.parse(savedData));
  }

  const { dataCorrect, dataUnique } = commonValidationCheck(data, registerWarnings, warningMessages, clients, true);

  if (!dataCorrect || !dataUnique) {
    e.preventDefault();
    return;
  }

  // if data correct save it in local storage
  clients.push(data);
  localStorage.setItem('clients', JSON.stringify(clients));
});
