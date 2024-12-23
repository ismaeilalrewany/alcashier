import loginArabic from "/js/i18n/ar/login.js";
import loginEnglish from "/js/i18n/en/login.js";

document.addEventListener("DOMContentLoaded", () => {
  i18next.init({
    // to cache the language on the local storage
    lng: localStorage.getItem("i18nextLng") || 'ar',
    resources: {
      ar: {
        login: loginArabic,
      },
      en: {
        login: loginEnglish,
      }
    }
  }, (err, t) => {
    if (err) return console.error('Error initializing i18next:', err);
    updateChangeLangButton();
    updateContent();
  });

  // Update elements content after clicking on the change language button
  function updateContent() {
    const bodyId = document.body.id;
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach((ele) => {
      const key = ele.dataset.i18n;
      // `${bodyId}:${key}` I made this for the namespace for each page
      if (i18next.t(`${bodyId}:${key}`) !== key) {
        ele.textContent = i18next.t(`${bodyId}:${key}`);
      }
    });
  }

  // Change language Button content change after clicking on it
  function updateChangeLangButton() {
    const langButton = document.getElementById('lang');
    if (i18next.language === 'ar') {
      langButton.innerHTML = '<i class="fa-solid fa-e"></i>';
    } else {
      langButton.innerHTML = '<i class="fa-solid fa-a"></i>';
    }
  }

  // Change language Event Button to change language
  document.getElementById('lang').addEventListener('click', () => {
    const newLang = i18next.language === 'en' ? 'ar' : 'en';
    i18next.changeLanguage(newLang, (err) => {
      if (err) return console.error('Error changing language:', err);
      localStorage.setItem('i18nextLng', newLang);
      updateChangeLangButton();
      updateContent();
    });
  });
});