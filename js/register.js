import collectData from "./layouts/collectData.js";

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
  let dataCorrect = false;
  let dataUnique = false;
  let clients = [];

  // get any data in local storage first
  if (localStorage.getItem('clients')) {
    const savedData = localStorage.getItem('clients');
    clients.push(...JSON.parse(savedData));
  }

  // check name, phone and password if are correct
  if (data.name.length < 3 || Number(data.name)) {
    e.preventDefault();
    dataCorrect = false;
    registerWarnings[0].setAttribute('data-i18n', 'warning-name');
    updateContent();
  } else {
    registerWarnings[0].innerHTML = '';

    if (data.phone.length !== 11 || !Number(data.phone)) {
      e.preventDefault();
      dataCorrect = false;
      registerWarnings[1].setAttribute('data-i18n', 'warning-phone');
      updateContent();
    } else {
      registerWarnings[1].innerHTML = '';

      if (data.password.length < 7 || Number(data.password)) {
        e.preventDefault();
        dataCorrect = false;
        registerWarnings[2].setAttribute('data-i18n', 'warning-password');
        updateContent();
      } else {
        dataCorrect = true;
        registerWarnings[2].innerHTML = '';
      }
    }
  }

  // check if data is unique
  if (clients.length !== 0)
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].name === data.name || clients[i].phone === data.phone) {
        dataUnique = false;
        break;
      } else {
        dataUnique = true;
      }
    }
  else dataUnique = true;

  if (!dataUnique) {
    e.preventDefault();
    registerWarnings.forEach(w => {
      w.setAttribute('data-i18n', 'unique-warning');
      updateContent();
    });
  }

  // if data correct save it in local storage
  if (dataUnique && dataCorrect) {
    clients.push(data);
    localStorage.setItem('clients', JSON.stringify(clients));
  }
});
