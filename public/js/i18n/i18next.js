import loginArabic from "./ar/login.js";
import loginEnglish from "./en/login.js";
import navbarArabic from "./ar/navbar.js";
import navbarEnglish from "./en/navbar.js";
import indexArabic from "./ar/index.js";
import indexEnglish from "./en/index.js";
import orderArabic from "./ar/order.js";
import orderEnglish from "./en/order.js";
import printArabic from "./ar/print.js";
import printEnglish from "./en/print.js";
import profileArabic from "./ar/profile.js";
import profileEnglish from "./en/profile.js";
import registerArabic from "./ar/register.js";
import registerEnglish from "./en/register.js";
import menuArabic from "./ar/menu.js";
import menuEnglish from "./en/menu.js";
import reportArabic from "./ar/report.js";
import reportEnglish from "./en/report.js";
import detailsArabic from "./ar/details.js";
import detailsEnglish from "./en/details.js";
import notFoundArabic from "./ar/404.js";
import notFoundEnglish from "./en/404.js";

// Ensure i18nextLng is set in localStorage on first load
if (!localStorage.getItem('i18nextLng')) {
  // Default to Arabic if not set
  localStorage.setItem('i18nextLng', 'ar');
}

function updateContent() {
  const bodyId = document.body.id;
  const navbar = document.getElementById('navbar');
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach((ele) => {
    const key = ele.dataset.i18n;
    let translated = null;
    // If element is inside the navbar, use 'navbar' as the first namespace
    const isNavbarElement = navbar && navbar.contains(ele);
    if (isNavbarElement && i18next.t(`navbar:${key}`) !== `navbar:${key}`) {
      translated = i18next.t(`navbar:${key}`);
    }
    // 1. Try page-specific namespace
    else if (bodyId && i18next.t(`${bodyId}:${key}`) !== `${bodyId}:${key}`) {
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
    }    // 12. Try index namespace
    else if (i18next.t(`index:${key}`) !== `index:${key}`) {
      translated = i18next.t(`index:${key}`);
    }
    // 13. Try not-found namespace
    else if (i18next.t(`not-found:${key}`) !== `not-found:${key}`) {
      translated = i18next.t(`not-found:${key}`);
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

// Make updateContent globally available
window.updateContent = updateContent;

// Automatically update translations when new elements are added to the DOM
const observer = new MutationObserver((mutationsList) => {
  let needsUpdate = false;
  for (const mutation of mutationsList) {
    if ([...mutation.addedNodes].some(node => node.nodeType === 1 && (node.hasAttribute?.('data-i18n') || node.querySelector?.('[data-i18n]')))) {
      needsUpdate = true;
      break;
    }
  }
  if (needsUpdate) {
    updateContent();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

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
        register: registerArabic,        menu: menuArabic,
        report: reportArabic,
        details: detailsArabic,
        'not-found': notFoundArabic,
        notification: (await import('./ar/notification.js')).default
      },
      en: {
        login: loginEnglish,
        navbar: navbarEnglish,
        index: indexEnglish,
        order: orderEnglish,
        print: printEnglish,
        profile: profileEnglish,
        register: registerEnglish,        menu: menuEnglish,
        report: reportEnglish,
        details: detailsEnglish,
        'not-found': notFoundEnglish,
        notification: (await import('./en/notification.js')).default
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
        // Removed window.reloadNavbar(); to prevent breaking navbar events and theme
      });
    });
  }
});

export { updateContent };