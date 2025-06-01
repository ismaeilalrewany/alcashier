// print.js - Handle populating the print page with order data

// Get table data from session storage
const tableData = JSON.parse(sessionStorage.getItem('selected-table'));

// Function to populate the print table with order data
function populatePrintTable() {
  const tbody = document.querySelector('.print-body');
  const tfoot = document.querySelector('.print-foot');

  if (isNoOrderData.call(this)) {
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="py-2 px-3 text-center" data-i18n="no-orders">No Orders</td>
        </tr>
      `;
    }
    return;
  }

  if (tbody) tbody.innerHTML = '';
  if (tfoot) tfoot.innerHTML = '';

  let totalArray = [];

  tableData.order.forEach((item, index) => {
    const tr = document.createElement('tr');

    const cellData = [
      index + 1,
      item.name,
      `${item.price} <span data-i18n="currency"></span>`,
      item.quantity,
      `${item.total} <span data-i18n="currency"></span>`
    ];

    cellData.forEach(data => {
      const td = document.createElement('td');
      td.className = 'py-2 px-3 text-center';
      td.innerHTML = data;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    totalArray.push(Number(item.total));
  });

  if (tfoot && totalArray.length > 0) {
    const totalRow = document.createElement('tr');
    const totalAmount = totalArray.reduce((sum, val) => sum + val, 0);

    totalRow.innerHTML = `
      <td class="py-2 px-3 text-center" style="font-weight: bold;">#</td>
      <td colspan="3" class="py-2 px-3" style="font-weight: bold;"><span data-i18n="total">Total</span></td>
      <td class="py-2 px-3 text-center" style="font-weight: bold;">${totalAmount} <span data-i18n="currency"></span></td>
    `;

    tfoot.appendChild(totalRow);
  }

  if (window.updateContent) {
    window.updateContent();
  }
}

function isNoOrderData() {
  return !tableData || !tableData.order || tableData.order.length === 0;
}

// Function to signal that the print page is ready
function signalPrintReady() {
  if (window.opener) {
    window.opener.postMessage('print-ready', window.location.origin);
  }
}

// Wait for DOM content to be loaded and i18next to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure i18next is ready
  setTimeout(() => {
    populatePrintTable();
    signalPrintReady();
  }, 100);
});

// Listen for i18next initialization
if (window.i18next) {
  window.i18next.on('initialized', () => {
    populatePrintTable();
    signalPrintReady();
  });
} else {
  // Fallback: wait for i18next to be available
  const checkI18next = setInterval(() => {
    if (window.i18next) {
      clearInterval(checkI18next);
      populatePrintTable();
      signalPrintReady();
    }
  }, 50);
}
