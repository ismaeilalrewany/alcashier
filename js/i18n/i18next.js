import loginArabic from "/js/i18n/ar/login.js";
import loginEnglish from "/js/i18n/en/login.js";
import navbarArabic from "/js/i18n/ar/navbar.js";
import navbarEnglish from "/js/i18n/en/navbar.js";
import indexArabic from "/js/i18n/ar/index.js";
import indexEnglish from "/js/i18n/en/index.js";
import orderArabic from "/js/i18n/ar/order.js";
import orderEnglish from "/js/i18n/en/order.js";
import printArabic from "/js/i18n/ar/print.js";
import printEnglish from "/js/i18n/en/print.js";
import profileArabic from "/js/i18n/ar/profile.js";
import profileEnglish from "/js/i18n/en/profile.js";
import registerArabic from "/js/i18n/ar/register.js";
import registerEnglish from "/js/i18n/en/register.js";
import menuArabic from "/js/i18n/ar/menu.js";
import menuEnglish from "/js/i18n/en/menu.js";
import reportArabic from "/js/i18n/ar/report.js";
import reportEnglish from "/js/i18n/en/report.js";
import detailsArabic from "/js/i18n/ar/details.js";
import detailsEnglish from "/js/i18n/en/details.js";

// Ensure i18nextLng is set in localStorage on first load
if (!localStorage.getItem('i18nextLng')) {
  // Default to Arabic if not set
  localStorage.setItem('i18nextLng', 'ar');
}

function updateContent() {
  const bodyId = document.body.id;
  const elements = document.querySelectorAll('[data-i18n]');
  const navbar = document.querySelector('.navbar');

  elements.forEach((ele) => {
    const key = ele.dataset.i18n;
    // Try all namespaces for the key
    let translated = null;
    // 1. Try page-specific namespace
    if (bodyId && i18next.t(`${bodyId}:${key}`) !== `${bodyId}:${key}`) {
      translated = i18next.t(`${bodyId}:${key}`);
    }
    // 2. Try navbar namespace
    else if (i18next.t(`navbar:${key}`) !== `navbar:${key}`) {
      translated = i18next.t(`navbar:${key}`);
    }
    // 3. Try notification namespace
    else if (i18next.t(`notification:${key}`) !== `notification:${key}`) {
      translated = i18next.t(`notification:${key}`);
    }
    // 4. Try report namespace
    else if (i18next.t(`report:${key}`) !== `report:${key}`) {
      translated = i18next.t(`report:${key}`);
    }
    // 5. Try menu namespace
    else if (i18next.t(`menu:${key}`) !== `menu:${key}`) {
      translated = i18next.t(`menu:${key}`);
    }
    // 6. Try order namespace
    else if (i18next.t(`order:${key}`) !== `order:${key}`) {
      translated = i18next.t(`order:${key}`);
    }
    // 7. Try details namespace
    else if (i18next.t(`details:${key}`) !== `details:${key}`) {
      translated = i18next.t(`details:${key}`);
    }
    // 8. Try login namespace
    else if (i18next.t(`login:${key}`) !== `login:${key}`) {
      translated = i18next.t(`login:${key}`);
    }
    // 9. Try profile namespace
    else if (i18next.t(`profile:${key}`) !== `profile:${key}`) {
      translated = i18next.t(`profile:${key}`);
    }
    // 10. Try register namespace
    else if (i18next.t(`register:${key}`) !== `register:${key}`) {
      translated = i18next.t(`register:${key}`);
    }
    // 11. Try print namespace
    else if (i18next.t(`print:${key}`) !== `print:${key}`) {
      translated = i18next.t(`print:${key}`);
    }
    // 12. Try index namespace
    else if (i18next.t(`index:${key}`) !== `index:${key}`) {
      translated = i18next.t(`index:${key}`);
    }
    // fallback: use key as is
    else {
      translated = key;
    }
    if (translated) ele.textContent = translated;
  });
  // Also update placeholders if data-i18n-placeholder is present
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach((ele) => {
    const key = ele.dataset.i18nPlaceholder;
    let translated = null;
    if (bodyId && i18next.t(`${bodyId}:${key}`) !== `${bodyId}:${key}`) {
      translated = i18next.t(`${bodyId}:${key}`);
    } else if (i18next.t(`menu:${key}`) !== `menu:${key}`) {
      translated = i18next.t(`menu:${key}`);
    } else if (i18next.t(`order:${key}`) !== `order:${key}`) {
      translated = i18next.t(`order:${key}`);
    } else if (i18next.t(`details:${key}`) !== `details:${key}`) {
      translated = i18next.t(`details:${key}`);
    } else {
      translated = key;
    }
    if (translated) ele.placeholder = translated;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // Always use i18nextLng from localStorage for language
  const lng = localStorage.getItem("i18nextLng") || 'ar';
  i18next.init({
    lng,
    resources: {
      ar: {
        login: loginArabic,
        navbar: navbarArabic,
        index: indexArabic,
        order: orderArabic,
        print: printArabic,
        profile: profileArabic,
        register: registerArabic,
        menu: menuArabic,
        report: reportArabic,
        details: detailsArabic,
        notification: (await import('/js/i18n/ar/notification.js')).default
      },
      en: {
        login: loginEnglish,
        navbar: navbarEnglish,
        index: indexEnglish,
        order: orderEnglish,
        print: printEnglish,
        profile: profileEnglish,
        register: registerEnglish,
        menu: menuEnglish,
        report: reportEnglish,
        details: detailsEnglish,
        notification: (await import('/js/i18n/en/notification.js')).default
      }
    }
  }, (err, t) => {
    if (err) return console.error('Error initializing i18next:', err);
    updateChangeLangButton();
    updateContent();
  });

  // Change language Button content change after clicking on it
  function updateChangeLangButton() {
    const langButton = document.getElementById('lang');
    if (langButton) {
      if (i18next.language === 'ar') {
        langButton.innerHTML = '<i class="fa-solid fa-e"></i>';
      } else {
        langButton.innerHTML = '<i class="fa-solid fa-a"></i>';
      }
    }
  }

  // Change language Event Button to change language
  if (document.getElementById('lang')) {
    document.getElementById('lang').addEventListener('click', () => {
      const newLang = i18next.language === 'en' ? 'ar' : 'en';
      i18next.changeLanguage(newLang, (err) => {
        if (err) return console.error('Error changing language:', err);
        localStorage.setItem('i18nextLng', newLang);
        updateChangeLangButton();
        updateContent();
      });
    });
  }
});

export { updateContent };