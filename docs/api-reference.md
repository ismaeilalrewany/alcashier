# 🔧 API Reference

This document provides technical details about AL-Cashier's architecture, data structures, and implementation details.

## 🏗️ Architecture Overview

AL-Cashier is built using a client-side architecture with localStorage for data persistence:

```
├── Frontend (Vanilla JavaScript)
│   ├── HTML5 Structure
│   ├── CSS3 Styling (Bootstrap + Custom)
│   ├── JavaScript Modules
│   └── Local Storage (Data Persistence)
├── Assets
│   ├── Fonts (Arabic & Latin)
│   ├── Icons (Font Awesome Pro)
│   └── Images
└── Configuration
    ├── i18n (Internationalization)
    ├── Themes (Light/Dark)
    └── Routing (SPA)
```

## 📊 Data Structures

### User/Client Object

```javascript
{
  name: string,         // User display name
  phone: string,        // Phone number (used as login)
  password: string      // Plain text password
}
```

### Table Object

```javascript
{
  id: number,           // Unique identifier
  name: string,         // Table name/number
  order: OrderItem[],   // Current orders array
  orderTime?: string    // Order timestamp when items added
}
```

### Category Object

```javascript
{
  id: number,           // Unique identifier
  name: string,         // Category name
  content: Item[]       // Array of menu items
}
```

### Item Object

```javascript
{
  id: number,           // Unique identifier
  name: string,         // Item name
  quantity: number,     // Available stock
  price: number         // Price in local currency
}
```

### Order Item Object

```javascript
{
  id: number,           // Item identifier
  name: string,         // Item name
  quantity: number,     // Ordered quantity
  price: number,        // Unit price
  total: number         // quantity * price
}
```

## 🔧 Core Functions

### Authentication

```javascript
// Check if user is logged in
function isLoggedIn() {
  return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Check admin privileges
function isAdmin() {
  const user = JSON.parse(sessionStorage.getItem('onlineClient'));
  return user && user.name === 'admin';
}
```

### Data Management

```javascript
// Generate unique ID
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// Collect form data
function collectData(inputs) {
  let output = {};
  inputs.forEach(input => {
    output[input.dataset.from] = input.value.trim();
  });
  return output;
}
```

### Menu Management

```javascript
// Add new item to category
function addNewItemToCategory(categoryId, itemData) {
  const categories = JSON.parse(localStorage.getItem('menu-categories')) || [];
  const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
  categories[categoryIndex].content.push(itemData);
  localStorage.setItem('menu-categories', JSON.stringify(categories));
}

// Delete item from category
function deleteItemFromCategory(itemId) {
  const categories = JSON.parse(localStorage.getItem('menu-categories')) || [];
  categories.forEach(category => {
    category.content = category.content.filter(item => item.id !== itemId);
  });
  localStorage.setItem('menu-categories', JSON.stringify(categories));
}
```

### Order Management

```javascript
// Add order to table
function addOrder(tableId, orderItem) {
  const tables = JSON.parse(localStorage.getItem('cafeteria-tables')) || [];
  const tableIndex = tables.findIndex(table => table.id === tableId);
  tables[tableIndex].order.push(orderItem);
  localStorage.setItem('cafeteria-tables', JSON.stringify(tables));
}

// Calculate order total
function calculateOrderTotal(orders) {
  return orders.reduce((total, item) => total + item.total, 0);
}
```

## 💾 LocalStorage Keys

The application uses the following localStorage keys:

- `clients`: Array of registered users
- `menu-categories`: Array of menu categories and items
- `cafeteria-tables`: Array of tables and their orders
- `paid-orders`: Array of completed orders by date
- `canceled-tables`: Array of canceled orders by date
- `clients-work`: Cashier work tracking data
- `allIds`: Array of all generated IDs
- `i18nextLng`: Current language setting

## 🌐 Internationalization

### Language Structure

```javascript
{
  "navigation": {
    "home": "Home",
    "menu": "Menu",
    "profile": "Profile"
  },
  "forms": {
    "submit": "Submit",
    "cancel": "Cancel"
  }
}
```

### Implementation

```javascript
// Initialize i18next
i18next.init({
  lng: localStorage.getItem('i18nextLng') || 'ar',
  fallbackLng: 'en',
  resources: { /* language resources */ }
});

// Update content
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });
}
```

## 🎨 CSS Variables

Key CSS custom properties from `master.css`:

```css
:root {
  --primary-color: #6f42c1;
  --secondary-color: #dedcff;
  --accent-color: #433bff;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
}
```

## 📊 Reporting Data

### Paid Orders Structure

```javascript
[{
  date: string,           // Date in local format
  data: [{
    cashier: string,      // Cashier name
    table: Table,         // Complete table object
    paidTime: string,     // Payment timestamp
    ordersNumber: number, // Total items count
    totalPrice: number    // Total amount
  }]
}]
```

### Client Work Tracking

```javascript
{
  clientName: string,
  clientPhone: string,
  work: [{
    date: string,
    sessions: [{
      start: number,      // Timestamp
      end: number         // Timestamp
    }],
    completedTables: number,
    canceledTables: number,
    products: number,
    money: number
  }]
}
```

## 🔄 Data Flow

1. **User Registration/Login**: Store in `clients` localStorage
2. **Menu Management**: Categories and items in `menu-categories`
3. **Table Creation**: Tables stored in `cafeteria-tables`
4. **Order Process**: Orders added to table's order array
5. **Payment**: Move to `paid-orders` with date grouping
6. **Reporting**: Aggregate data from various localStorage keys

## 🛠️ Utility Functions

```javascript
// Find object by ID in array
function findIdInArray(array, id) {
  return array.findIndex(item => item.id === id);
}

// Find nested object in array of arrays
function findIdInArrayInArray(array, property, id) {
  for (let i = 0; i < array.length; i++) {
    const index = array[i][property].findIndex(item => item.id === id);
    if (index !== -1) return [i, index];
  }
  return [-1, -1];
}

// Toggle active class
function toggleActive(trigger, target) {
  trigger.addEventListener('click', () => {
    target.classList.toggle('active');
  });
}
```

## 📱 Responsive Design

The application uses Bootstrap 5 RTL with custom CSS for:

- Mobile-first responsive design
- Arabic/English RTL/LTR support
- Touch-friendly interfaces
- Print-optimized layouts

## 🔐 Security Notes

- Passwords are stored in plain text (development only)
- No server-side validation
- Client-side data persistence only
- Session management via sessionStorage

> **Note**: This is a client-side demonstration application. For production use, implement proper authentication, validation, and server-side data management.
