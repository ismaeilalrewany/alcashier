// start with changing mode (light - dark)
const light = document.getElementById('light');
const dark = document.getElementById('dark');

// container of colors
const colors = {
  light: {
    "--primary": "#2f27ce",
    "--secondary": "#dddbff",
    "--accent": "#443dff",
    "--background": "#fbfbfe",
    "--text": "#050316",
    // still didn't change the others
    "--secondary-hover": "#57bfef",
    "--gray": "#ccc",
    "--accent-hover": "#f15389"
  },
  dark: {
    "--primary": "#3a31d8",
    "--secondary": "#020024",
    "--accent": "#0600c2",
    "--background": "#010104",
    "--text": "#eae9fc",
    // still didn't change the others
    "--secondary-hover": "#035486",
    "--gray": "#333",
    "--accent-hover": "#f9a43c"
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
