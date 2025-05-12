// Common validation for register and profile forms
export default function commonValidationCheck(data, warnings, warningMessages, clients, uniqueCheck = true) {
  let dataCorrect = false;
  let dataUnique = true;

  // Name validation
  if (data.name.length < 3 || Number(data.name)) {
    warnings[0].setAttribute('data-i18n', 'warning-name');
    updateContent && updateContent();
    dataCorrect = false;
  } else {
    warnings[0].innerHTML = '';
    // Phone validation
    if (data.phone.length !== 11 || !Number(data.phone)) {
      warnings[1].setAttribute('data-i18n', 'warning-phone');
      updateContent && updateContent();
      dataCorrect = false;
    } else {
      warnings[1].innerHTML = '';
      // Password validation
      if (data.password.length < 7 || Number(data.password)) {
        warnings[2].setAttribute('data-i18n', 'warning-password');
        updateContent && updateContent();
        dataCorrect = false;
      } else {
        dataCorrect = true;
        warnings[2].innerHTML = '';
      }
    }
  }

  // Uniqueness check (for register, and for profile if uniqueCheck is true)
  if (uniqueCheck && clients && dataCorrect) {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].name === data.name || clients[i].phone === data.phone) {
        dataUnique = false;
        break;
      }
    }
    if (!dataUnique) {
      warnings.forEach(w => {
        w.setAttribute('data-i18n', 'unique-warning');
        updateContent && updateContent();
      });
    }
  }

  return { dataCorrect, dataUnique };
}
