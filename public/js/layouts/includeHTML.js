const includeHTML = async (url, container, script = false) => {
  const response = await fetch(url);
  const htmlContent = await response.text();
  document.querySelector(container).innerHTML = htmlContent;

  // Evaluate the scripts in the implemented file 
  if (script) {
    const scripts = document.querySelector(container).querySelectorAll("script");
    for (const script of scripts) { eval(script.textContent); };
  }

  // After including HTML, update i18n translations if available
  if (typeof window.updateContent === 'function') {
    window.updateContent();
  }
};

// Global function to reload the navbar and re-translate it
window.reloadNavbar = async function() {
  await includeHTML('./components/navbar.html', '.navbar', false);
  if (typeof window.updateContent === 'function') {
    window.updateContent();
  }
};
