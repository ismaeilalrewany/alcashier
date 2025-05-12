import collectData from './layouts/collectData.js';
import commonValidationCheck from './layouts/commonValidationCheck.js';

// start work with edit profiles data
const profile = document.getElementById('profile');
const profileName = document.getElementById('profile-cashier-name');
const profilePhone = document.getElementById('profile-cashier-phone');
const profilePassword = document.getElementById('profile-cashier-password');
const profileNewPassword = document.getElementById('profile-cashier-newpassword');
const profileWarnings = document.querySelectorAll('#profile .form-text');

// all warning messages if client entered wrong data
const warningMessages = [
  document.querySelector('[data-i18n="warning-name"]'),
  document.querySelector('[data-i18n="warning-phone"]'),
  document.querySelector('[data-i18n="warning-password"]')
];

// set cashier data
const profileData = JSON.parse(sessionStorage.getItem('onlineClient'));
if (profileName) profileName.value = profileData.name;
if (profilePhone) profilePhone.value = profileData.phone;
if (profilePassword) profilePassword.value = '*'.repeat(profileData.password.length);

// get the clientIndex (cashier) after comparing it with local storage
const getClientIndex = (arr, client) => {
  let index = undefined;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === client.name && arr[i].phone === client.phone && arr[i].password === client.password) {
      index = i;
      break;
    }
  }
  return index;
};

// submit new data will be after clicking on edit profile button
if (profile) profile.addEventListener('submit', (e) => {
  const data = collectData([profileName, profilePhone, profileNewPassword]);
  const oldPassword = profilePassword.value.trim();
  let clients = JSON.parse(localStorage.getItem('clients')) || [];
  let clientIndex = getClientIndex(clients, profileData);
  let uniqueCheck = true;

  if (oldPassword === profileData.password) {
    profileWarnings[2].innerHTML = '';

    // Only check uniqueness if name or phone changed
    if ((data.name && data.name !== profileData.name) || (data.phone && data.phone !== profileData.phone)) {
      uniqueCheck = true;
    } else {
      uniqueCheck = false;
    }

    const { dataCorrect, dataUnique } = commonValidationCheck(data, profileWarnings, warningMessages, clients, uniqueCheck);

    if (!dataCorrect || (uniqueCheck && !dataUnique)) {
      e.preventDefault();
      return;
    }

    for (const prop in clients[clientIndex]) {
      if (data[prop]) clients[clientIndex][prop] = data[prop];
    }

    localStorage.setItem('clients', JSON.stringify(clients));
    sessionStorage.setItem('onlineClient', JSON.stringify(clients[clientIndex]));
    profile.submit();
  } else {
    e.preventDefault();
    profileWarnings[2].setAttribute('data-i18n', 'wrong-password');
    updateContent && updateContent();
  }
});

// delete cashier account
const deleteProfile = document.getElementById('profile-cashier-delete');

if (deleteProfile) deleteProfile.addEventListener('click', () => {
  const clients = JSON.parse(localStorage.getItem('clients'));
  let clientIndex = getClientIndex(clients, profileData);

  // set data in session storage
  sessionStorage.removeItem('onlineClient');
  sessionStorage.setItem('isLoggedIn', false);

  // set data in local storage
  clients.splice(clientIndex, 1);
  localStorage.setItem('clients', JSON.stringify(clients));

  // redirect to login page
  location.href = '../login.html';
});
