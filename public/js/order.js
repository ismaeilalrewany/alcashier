import findIdInArray from './layouts/findIdInArray.js';
import findIdInArrayInArray from './layouts/findIdInArrayInArray.js';
import selectFromMenu from './layouts/selectFromMenu.js';

// get all tables that are saved in local storage
let tables = JSON.parse(localStorage.getItem('cafeteria-tables')) || [];

// get all categories that are saved in local storage
let allCategories = JSON.parse(localStorage.getItem('menu-categories')) || [];

// work on order page starting with taking the table name
// add order page section label depends on the table data
const sectionLabel = document.querySelector('.order-menu h2 span');
const tableData = JSON.parse(sessionStorage.getItem('selected-table'));

if (!tableData) {
  // if there is no table data in session storage redirect to index page
  location.href = 'index.html';
  console.error('No table data found in session storage.');
}

if (sectionLabel) sectionLabel.innerHTML = tableData.name;

// display all categories in order menu in order page
const categoriesListElement = document.querySelector('.order-menu .menu-categories');
let displayCategories = `
  <li class="m-0 p-0 d-flex justify-content-center align-items-center w-100 rounded" data-i18n="nodata"></li>`;

if (allCategories.length > 0)
  displayCategories = allCategories.map((category, index) => `
  <li class="m-0 me-3 p-0 rounded d-flex align-items-center justify-content-center ${index === 0 ? 'active' : ''}" role="button" data-id="${category.id}">${category.name}</li>`);

if (categoriesListElement && allCategories.length > 0)
  categoriesListElement.innerHTML = displayCategories.join(' ');

if (categoriesListElement && allCategories.length <= 0)
  categoriesListElement.innerHTML = displayCategories;

// display first category content in order menu in order page
const itemsListElement = document.querySelector('.order-menu .category-items');
const itemsElementArray = (array) => {
  return array.map(item => `
  <li class="m-0 py-3 px-4 rounded d-flex align-items-center justify-content-center flex-column overflow-hidden" role="button" data-id="${item.id}">
    <h6 class="m-0 mb-2 p-0">${item.name}</h6>
    <div class="d-flex flex-column align-items-start">
      <p class="m-0 p-0 mb-1"><span data-i18n="price"></span>: ${item.price} <span data-i18n="currency"></span></p>
      <p class="m-0 p-0"><span data-i18n="quantity"></span>: ${item.quantity}</p>
    </div>
  </li>`);
};

if (itemsListElement && allCategories.length > 0)
  itemsListElement.innerHTML = itemsElementArray(allCategories[0].content).join(' ');

if (itemsListElement && allCategories.length <= 0)
  itemsListElement.remove();

// change the selected category and display its items
const listItemElements = document.querySelectorAll('.order-menu .menu-categories li');
if (listItemElements) selectFromMenu(listItemElements, (index) => {
  itemsListElement.innerHTML = itemsElementArray(allCategories[index].content).join(' ');

  addOrder();
});

// add orders to the table by clicking on items
function addOrder() {
  const allItemsInList = document.querySelectorAll('.order-menu .category-items li');

  allItemsInList.forEach(item => {
    item.addEventListener('click', () => {
      const itemId = Number(item.dataset.id);
      const [categoryIndex, itemIndex] = findIdInArrayInArray(allCategories, 'content', itemId);

      // first get all item data and decrement the quantity
      const { id, name, price } = allCategories[categoryIndex].content[itemIndex];
      let unique = true;

      // check if this item is already added in order to not repeat it
      JSON.parse(sessionStorage.getItem('selected-table')).order.forEach(ele => {
        if (ele.id === id) unique = false;
      });

      if (unique) {
        allCategories[categoryIndex].content[itemIndex].quantity--;
        localStorage.setItem('menu-categories', JSON.stringify(allCategories));

        // second add the selected item into table order array
        const table = JSON.parse(sessionStorage.getItem('selected-table'));
        const tableIndex = findIdInArray(tables, table.id);
        tables[tableIndex].order.push({ id, name, quantity: 1, total: price, price });
        localStorage.setItem('cafeteria-tables', JSON.stringify(tables));
        sessionStorage.setItem('selected-table', JSON.stringify(tables[tableIndex]));

        displayOrders(true);
        refreshMenuDisplay();
      }
    });
  });
}

addOrder();

// increment function to the order quantity and total price
const incrementQuantity = (tableData) => {
  const addElements = document.querySelectorAll('[data-functionality="add"]');

  addElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      const clickedElementId = Number(element.parentElement.dataset.id);

      // change data in the selected table visually
      tableData.order[index].quantity += 1;
      tableData.order[index].total = Number(tableData.order[index].price) * Number(tableData.order[index].quantity);
      sessionStorage.setItem('selected-table', JSON.stringify(tableData));

      // save the new data in local storage
      tables[findIdInArrayInArray(tables, 'order', clickedElementId)[0]] = tableData;
      localStorage.setItem('cafeteria-tables', JSON.stringify(tables));

      // change data in categories and save it
      const [categoryIndex, itemIndex] = findIdInArrayInArray(allCategories, 'content', clickedElementId);
      allCategories[categoryIndex].content[itemIndex].quantity--;
      localStorage.setItem('menu-categories', JSON.stringify(allCategories));

      displayOrders(true);
      refreshMenuDisplay();
    });
  });
};

// decrement function to the order quantity and total price
const decrementQuantity = (tableData) => {
  const subElements = document.querySelectorAll('[data-functionality="sub"]');

  subElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      const clickedElementId = Number(element.parentElement.dataset.id);

      tableData.order[index].quantity -= 1;

      // check if the order becomes zero it must be deleted
      if (Number(tableData.order[index].quantity) <= 0) {
        tableData.order[index].quantity++;
        deleteFunction(index, tableData, clickedElementId);
      } else {
        tableData.order[index].total = Number(tableData.order[index].total) - Number(tableData.order[index].price);
        sessionStorage.setItem('selected-table', JSON.stringify(tableData));
        tables[findIdInArrayInArray(tables, 'order', clickedElementId)[0]] = tableData;
        localStorage.setItem('cafeteria-tables', JSON.stringify(tables));

        // change data in categories and save it
        const [categoryIndex, itemIndex] = findIdInArrayInArray(allCategories, 'content', clickedElementId);
        allCategories[categoryIndex].content[itemIndex].quantity++;
        localStorage.setItem('menu-categories', JSON.stringify(allCategories));
      }

      displayOrders(true);
      refreshMenuDisplay();
    });
  });
};

// delete function to the order from session and local storage and DOM

// I made this function because I am gonna use it in decrement function
function deleteFunction(index, tableData, elementId) {
  // change data in categories and save it
  const [categoryIndex, itemIndex] = findIdInArrayInArray(allCategories, 'content', elementId);
  allCategories[categoryIndex].content[itemIndex].quantity = Number(allCategories[categoryIndex].content[itemIndex].quantity) + Number(tableData.order[index].quantity);
  localStorage.setItem('menu-categories', JSON.stringify(allCategories));

  // delete order at all from table
  tableData.order.splice(index, 1);
  sessionStorage.setItem('selected-table', JSON.stringify(tableData));
  tables[findIdInArrayInArray(tables, 'order', elementId)[0]] = tableData;
  localStorage.setItem('cafeteria-tables', JSON.stringify(tables));
}

const deleteOrder = (tableData) => {
  const delElements = document.querySelectorAll('[data-functionality="del"]');
  delElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      const clickedElementId = Number(element.parentElement.dataset.id);
      deleteFunction(index, tableData, clickedElementId);
      displayOrders(true);
      refreshMenuDisplay();
    });
  });
};

// work on display all orders in the orders place in page (in table)
function displayOrders(edit) {
  let tableBody = document.querySelector('.orders table tbody');
  let tableFoot = document.querySelector('.orders table tfoot');

  if (edit) {
    tableBody = document.querySelector('.orders-display table tbody');
    tableFoot = document.querySelector('.orders-display table tfoot');
  }

  const tableData = JSON.parse(sessionStorage.getItem('selected-table'));
  let totalArray = [];

  if (tableData.order.length) {
    tableBody.innerHTML = '';
    tableData.order.forEach((ele, index) => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', ele.id);

      const elementData = [index + 1, ele.name, `${ele.price} <span data-i18n='currency'></span>`, ele.quantity, `${ele.total} <span data-i18n='currency'></span>`];
      // check if edit add last three elements
      if (edit) elementData.push('+', '-', 'x');

      for (let i = 0; i < elementData.length; i++) {
        const td = document.createElement('td');
        td.className = 'py-2 px-3 text-nowrap text-center';
        td.innerHTML = elementData[i];

        if (elementData[i] === '+' || elementData[i] === '-' || elementData[i] === 'x') {
          td.setAttribute('role', 'button');

          if (elementData[i] === '+') td.dataset.functionality = 'add';
          if (elementData[i] === '-') td.dataset.functionality = 'sub';
          if (elementData[i] === 'x') td.dataset.functionality = 'del';
        }

        // push all these elements inside tr element
        tr.appendChild(td);
      }

      // save all elements price in an array will be totalArray
      totalArray.push(ele.total);

      // push tr element inside table body
      tableBody.appendChild(tr);
    });

    // add the last tr in the table which it will be the total
    const tr = document.createElement('tr');
    const tdData = [
      '#',
      '<span data-i18n="total-price"></span>',
      totalArray.reduce((total, val) => Number(total) + Number(val)) + ' <span data-i18n="currency"></span>'
    ];

    for (let i = 0; i < tdData.length; i++) {
      const td = document.createElement('td');
      td.className = 'py-2 px-3 text-nowrap';
      td.innerHTML = tdData[i];
      td.style.fontWeight = 'bold';
      td.style.fontSize = '14px';

      if (i === 1)
        if (edit) td.setAttribute('colspan', '6');
        else td.setAttribute('colspan', '3');
      else td.classList.add('text-center');

      tr.appendChild(td);
    }

    tableFoot.innerHTML = '';
    tableFoot.appendChild(tr);
  } else {
    tableBody.innerHTML = `<tr>
      <th colspan="8" class="py-2 px-3 text-nowrap text-center" data-i18n="no-orders"></th>
    </tr>`;
    tableFoot.innerHTML = '';
  }

  incrementQuantity(tableData);
  decrementQuantity(tableData);
  deleteOrder(tableData);
  updateContent();
}
if (document.querySelector('.orders-display table tbody')) displayOrders(true);

// work on order page buttons remove table button
const removeTable = document.querySelector('.orders-display .remove-table');
if (removeTable) removeTable.addEventListener('click', () => {
  // what if I already ordered some items and want to delete
  // in this case I must increment quantity in menu categories for each item
  const table = JSON.parse(sessionStorage.getItem('selected-table'));
  if (table.order.length > 0)
    table.order.forEach(element => {
      const [categoryIndex, itemIndex] = findIdInArrayInArray(allCategories, 'content', element.id);
      allCategories[categoryIndex].content[itemIndex].quantity += Number(element.quantity);
      localStorage.setItem('menu-categories', JSON.stringify(allCategories));
    });

  // Refresh menu display to show updated quantities
  refreshMenuDisplay();

  // save table in canceled tables in local storage
  const onlineClient = JSON.parse(sessionStorage.getItem('onlineClient'));
  let canceledTables = JSON.parse(localStorage.getItem('canceled-tables')) || [];
  const dateAndTime = new Date().toLocaleString();
  const dateOnly = dateAndTime.slice(0, dateAndTime.indexOf(','));
  const getMonth = (string) => {
    // return string.slice(dateOnly.indexOf('/') + 1, dateOnly.lastIndexOf('/'));
    return new Date(string).getMonth() + 1;
  };

  let totalPrice = 0;
  let ordersNumber = 0;
  if (table.order.length > 0) {
    totalPrice = table.order.map(object => Number(object.total)).reduce((accumulator, currentValue) => accumulator + currentValue);
    ordersNumber = table.order.map(object => Number(object.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  // change the data in clients work to add the canceled tables
  const clientsWork = JSON.parse(localStorage.getItem('clients-work')) || [];
  let clientWork = {};
  for (let i = 0; i < clientsWork.length; i++) {
    if (clientsWork[i].clientName === onlineClient.name) clientWork = clientsWork[i];
  }

  // the canceled tables will be like this [{date: '', data: [{}]}]
  if (canceledTables.length > 0) {
    if (getMonth(canceledTables[canceledTables.length - 1].date) !== getMonth(dateOnly)) {
      canceledTables = [];
      localStorage.removeItem('canceled-tables');
      canceledTables.push({ date: dateOnly, data: [{ table, cashier: onlineClient.name, cancelTime: dateAndTime, totalPrice, ordersNumber }] });
      clientWork.work[clientWork.work.length - 1].canceledTables += 1;
    } else {
      if (new Date(canceledTables[canceledTables.length - 1].date).getDate() !== new Date(dateOnly).getDate()) {
        canceledTables.push({ date: dateOnly, data: [{ table, cashier: onlineClient.name, cancelTime: dateAndTime, totalPrice, ordersNumber }] });
        clientWork.work[clientWork.work.length - 1].canceledTables += 1;
      } else {
        canceledTables[canceledTables.length - 1].data.push({ table, cashier: onlineClient.name, cancelTime: dateAndTime, totalPrice, ordersNumber });
        clientWork.work[clientWork.work.length - 1].canceledTables += 1;
      }
    }
  } else {
    canceledTables.push({ date: dateOnly, data: [{ table, cashier: onlineClient.name, cancelTime: dateAndTime, totalPrice, ordersNumber }] });
    clientWork.work[clientWork.work.length - 1].canceledTables += 1;
  }
  localStorage.setItem('canceled-tables', JSON.stringify(canceledTables));
  localStorage.setItem('clients-work', JSON.stringify(clientsWork));

  // delete table id from all ids list in local storage and save it
  let idsList = JSON.parse(localStorage.getItem('allIds'));
  idsList = idsList.filter(id => id !== table.id);
  localStorage.setItem('allIds', JSON.stringify(idsList));

  // delete table from session storage and local storage from tables array
  // redirect to index page to select another table or add a new one
  const index = findIdInArray(tables, table.id);
  sessionStorage.removeItem('selected-table');
  tables.splice(index, 1);
  localStorage.setItem('cafeteria-tables', JSON.stringify(tables));
  location.href = 'index.html';
});

// work on order page buttons order table button
const orderTable = document.querySelector('.orders-display .order-order');

if (document.querySelector('.orders table')) displayOrders(false);

if (orderTable) orderTable.addEventListener('click', () => {
  const table = JSON.parse(sessionStorage.getItem('selected-table'));
  if (table.order.length > 0) {
    updateTableWithCurrentTime(table);
    openPrintWindow();
  }
});

function updateTableWithCurrentTime(table) {
  const dateAndTime = new Date().toLocaleString();
  const tableIndex = findIdInArray(tables, table.id);
  table.orderTime = dateAndTime;
  sessionStorage.setItem('selected-table', JSON.stringify(table));
  tables[tableIndex] = table;
  localStorage.setItem('cafeteria-tables', JSON.stringify(tables));
}

function openPrintWindow() {
  const printWindow = window.open('print.html', '_blank', 'width=800,height=600');
  const fallbackTimeout = setTimeout(() => {
    window.removeEventListener('message', handlePrintReady);
    if (printWindow && !printWindow.closed) {
      printWindow.print();
    }
  }, 5000);

  const handlePrintReady = (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data === 'print-ready') {
      clearTimeout(fallbackTimeout);
      window.removeEventListener('message', handlePrintReady);
      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.print();
        }
      }, 500);
    }
  };

  window.addEventListener('message', handlePrintReady);
}

// work on order page buttons remove table button
const payOrder = document.querySelector('.orders-display .pay-order');
if (payOrder) payOrder.addEventListener('click', () => {
  // check if there is no orders it won't work at all
  const table = JSON.parse(sessionStorage.getItem('selected-table'));
  const onlineClient = JSON.parse(sessionStorage.getItem('onlineClient'));
  const dateAndTime = new Date().toLocaleString();
  const dateOnly = dateAndTime.slice(0, dateAndTime.indexOf(','));

  if (table.order.length > 0 && table.orderTime) {
    // find paid orders in local storage and add the new ones to it then save
    let paidOrders = JSON.parse(localStorage.getItem('paid-orders')) || [];
    const totalPrice = table.order.map(object => Number(object.total)).reduce((accumulator, currentValue) => accumulator + currentValue);
    const ordersNumber = table.order.map(object => Number(object.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue);
    const getMonth = (string) => {
      // return string.slice(dateOnly.indexOf('/') + 1, dateOnly.lastIndexOf('/'));
      return new Date(string).getMonth() + 1;
    };

    // change the data in clients work to add the paid tables data
    const clientsWork = JSON.parse(localStorage.getItem('clients-work')) || [];
    let clientWork = {};
    for (let i = 0; i < clientsWork.length; i++) {
      if (clientsWork[i].clientName === onlineClient.name) clientWork = clientsWork[i];
    }

    // the paid orders will be like this [{date: '', data: [{}]}]
    if (paidOrders.length > 0) {
      if (getMonth(paidOrders[paidOrders.length - 1].date) !== getMonth(dateOnly)) {
        paidOrders = [];
        localStorage.removeItem('paid-orders');
        paidOrders.push({ date: dateOnly, data: [{ cashier: onlineClient.name, table, paidTime: dateAndTime, ordersNumber, totalPrice }] });
        clientWork.work[clientWork.work.length - 1].completedTables += 1;
        clientWork.work[clientWork.work.length - 1].money += totalPrice;
        clientWork.work[clientWork.work.length - 1].products += ordersNumber;
      } else {
        if (new Date(paidOrders[paidOrders.length - 1].date).getDate() !== new Date(dateOnly).getDate()) {
          paidOrders.push({ date: dateOnly, data: [{ cashier: onlineClient.name, table, paidTime: dateAndTime, ordersNumber, totalPrice }] });
          clientWork.work[clientWork.work.length - 1].completedTables += 1;
          clientWork.work[clientWork.work.length - 1].money += totalPrice;
          clientWork.work[clientWork.work.length - 1].products += ordersNumber;
        } else {
          paidOrders[paidOrders.length - 1].data.push({ cashier: onlineClient.name, table, paidTime: dateAndTime, ordersNumber, totalPrice });
          clientWork.work[clientWork.work.length - 1].completedTables += 1;
          clientWork.work[clientWork.work.length - 1].money += totalPrice;
          clientWork.work[clientWork.work.length - 1].products += ordersNumber;
        }
      }
    } else {
      paidOrders.push({ date: dateOnly, data: [{ cashier: onlineClient.name, table, paidTime: dateAndTime, ordersNumber, totalPrice }] });
      clientWork.work[clientWork.work.length - 1].completedTables += 1;
      clientWork.work[clientWork.work.length - 1].money += totalPrice;
      clientWork.work[clientWork.work.length - 1].products += ordersNumber;
    }
    localStorage.setItem('paid-orders', JSON.stringify(paidOrders));
    localStorage.setItem('clients-work', JSON.stringify(clientsWork));

    // delete table id from all ids list in local storage and save it
    let idsList = JSON.parse(localStorage.getItem('allIds'));
    idsList = idsList.filter(id => id !== table.id);
    localStorage.setItem('allIds', JSON.stringify(idsList));

    // delete table from session storage and local storage from tables array
    // redirect to index page to select another table or add a new one
    const index = findIdInArray(tables, table.id);
    sessionStorage.removeItem('selected-table');
    tables.splice(index, 1);
    localStorage.setItem('cafeteria-tables', JSON.stringify(tables));
    location.href = 'index.html';
  }
});

// Function to refresh the menu items display with updated quantities
function refreshMenuDisplay() {
  // Update allCategories from localStorage to get latest quantities
  allCategories = JSON.parse(localStorage.getItem('menu-categories')) || [];
  
  // Get currently active category
  const activeCategory = document.querySelector('.order-menu .menu-categories li.active');
  if (!activeCategory || allCategories.length === 0) return;
  
  // Find the active category index
  const activeCategoryId = Number(activeCategory.dataset.id);
  const activeCategoryIndex = allCategories.findIndex(cat => cat.id === activeCategoryId);
  
  if (activeCategoryIndex !== -1) {
    // Refresh the items display for the active category
    itemsListElement.innerHTML = itemsElementArray(allCategories[activeCategoryIndex].content).join(' ');
    // Re-attach event listeners for the new items
    addOrder();
  }
}

// Call refreshMenuDisplay initially to set the correct display
refreshMenuDisplay();
