// start with changing mode (light - dark)
const light = document.getElementById('light');
const dark = document.getElementById('dark');

// container of colors
const colors = {
  light: {
    "--primary": "#a4468d",
    "--secondary": "#f8e5f3",
    "--accent": "#b95ba1",
    "--background": "#fdfafc",
    "--text": "#2d0426",
    "--shadow": "#0000001A"
  },  dark: {
    "--primary": "#b95ba1",
    "--secondary": "#3a1534",
    "--accent": "#d782c6", 
    "--background": "#1a0b17",
    "--text": "#f8e5f3",
    "--shadow": "#FFFFFF1A"
  }
};

// change css variables function and save in local storage
const changeVar = (colors, mode) => {
  for (const prop in colors) {
    // Object.prototype.hasOwnProperty.call(colors, prop) is considered a safer and more reliable approach.
    if (Object.prototype.hasOwnProperty.call(colors, prop)) {
      document.documentElement.style.setProperty(prop, colors[prop]);
      localStorage.setItem('mode', mode);
    }
  }
};

if (light) light.addEventListener('click', () => {
  changeVar(colors.light, 'light');
});

if (dark) dark.addEventListener('click', () => {
  changeVar(colors.dark, 'dark');
});

// check mode while loading pages
// I use this event listener in document to change mode before I see the default one
document.addEventListener('DOMContentLoaded', () => {
  const colorsMode = localStorage.getItem('mode');

  if (colorsMode)
    if (colorsMode === 'light') changeVar(colors.light, 'light');
    else if (colorsMode === 'dark') changeVar(colors.dark, 'dark');
});
