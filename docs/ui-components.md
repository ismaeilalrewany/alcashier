# 🎨 UI Components

This guide covers the real design system, components, and styling used in AL-Cashier.

## 🎯 Design System

### Color Palette

AL-Cashier uses a pink/purple color system with automatic light/dark theme switching.

#### Light Theme (Default)

```css
:root {
  --primary: #a4468d;      /* Brand primary - Pink/Purple */
  --secondary: #f8e5f3;    /* Light secondary background */
  --accent: #b95ba1;       /* Accent color for highlights */
  --background: #fdfafc;   /* Main background */
  --text: #2d0426;         /* Primary text color */
  --shadow: #0000001A;     /* Subtle shadows */
}
```

#### Dark Theme

```css
/* Applied via JavaScript theme switching */
{
  --primary: #b95ba1;      /* Adjusted primary for dark */
  --secondary: #3a1534;    /* Dark secondary background */
  --accent: #d782c6;       /* Lighter accent for contrast */
  --background: #1a0b17;   /* Dark background */
  --text: #f8e5f3;         /* Light text on dark */
  --shadow: #FFFFFF1A;     /* Light shadows for dark theme */
}
```

### Typography

AL-Cashier uses **Noto Kufi Arabic** as the primary font family for consistent Arabic/English rendering.

```css
body {
  font-family: 'Noto Kufi Arabic', sans-serif;
  font-weight: 500; /* Medium weight as default */
}
```

## 🧩 Core Components

### Navbar

The main navigation component with theme and language switching.

```html
<nav class="navbar">
  <div class="logo">
    <svg><!-- SVG logo --></svg>
  </div>
  <div class="nav-options">
    <div class="mode">
      <div class="light-mode" id="light">☀️</div>
      <div class="dark-mode" id="dark">🌙</div>
    </div>
    <div class="language">
      <div class="lang-btn">🌐</div>
    </div>
  </div>
</nav>
```

**Styling:**

```css
.navbar {
  background-color: var(--primary);
  color: var(--secondary);
  box-shadow: 0 2px 8px var(--shadow);
}
```

### Buttons

Consistent button styling throughout the application.

```css
button {
  background-color: var(--accent);
  color: var(--text);
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 0 5px 25px var(--shadow);
  transition: transform 0.3s, box-shadow 0.3s;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px var(--shadow);
}
```

### Tables

Restaurant tables and data tables use consistent styling.

```css
.table {
  background-color: var(--accent);
  color: var(--text);
  box-shadow: 0 5px 25px var(--shadow);
  cursor: pointer;
}

.table:hover {
  box-shadow: 0 5px 25px var(--shadow);
}
```

### Cards and Categories

Menu categories and content cards.

```css
.category {
  color: var(--text);
  background-color: var(--background);
  box-shadow: 0 5px 25px var(--shadow);
}

.category.active {
  border: 2px solid var(--primary);
  background-color: var(--secondary);
}
```

### Forms

Input forms throughout the application.

```css
.form-input input {
  border-color: var(--text);
}

.form-input label {
  color: var(--text);
}
```

## 🌐 Theme Switching

AL-Cashier implements dynamic theme switching via JavaScript:

```javascript
const colors = {
  light: {
    "--primary": "#a4468d",
    "--secondary": "#f8e5f3",
    "--accent": "#b95ba1",
    "--background": "#fdfafc",
    "--text": "#2d0426",
    "--shadow": "#0000001A"
  },
  dark: {
    "--primary": "#b95ba1",
    "--secondary": "#3a1534",
    "--accent": "#d782c6", 
    "--background": "#1a0b17",
    "--text": "#f8e5f3",
    "--shadow": "#FFFFFF1A"
  }
};
```

## 📱 Responsive Design

The application uses CSS Grid and Flexbox for responsive layouts:

```css
/* Responsive table grid */
.tables {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

/* Mobile adjustments */
@media (max-width: 576px) {
  .menu .category-items .item {
    width: 293.35px;
  }
}
```

## 🎯 Animations

Smooth transitions and micro-interactions:

```css
/* Button hover animations */
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--shadow);
}

/* Modal animations */
@keyframes showModal {
  0% { transform: translateY(150px); }
  80% { transform: translateY(-50px); }
  100% { transform: translateY(0); }
}
```

## 🌍 Internationalization

RTL support for Arabic language:

```css
/* RTL support when Arabic is selected */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .navbar .logo {
  margin-right: 0;
  margin-left: auto;
}
```

## 🛡️ Component Guidelines

### Usage Best Practices

1. **Consistent Colors**: Always use CSS custom properties
2. **Hover States**: Include hover animations for interactive elements
3. **Shadow System**: Use consistent shadow variables
4. **Responsive**: Ensure components work on all screen sizes
5. **Theme Support**: Components must work in both light and dark themes

### Color Usage

- `--primary`: Main brand color for headers and key elements
- `--secondary`: Background color for cards and sections
- `--accent`: Interactive elements like buttons
- `--background`: Main page background
- `--text`: All text content
- `--shadow`: Consistent shadow opacity

This design system ensures visual consistency while supporting both Arabic and English layouts with automatic theme switching.