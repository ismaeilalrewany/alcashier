import toggleActive from "./layouts/toggleActive.js";
import generateId from "./layouts/generateId.js";
import collectAndCreate from "./layouts/collectAndCreate.js";
import printElementsAndForm from "./layouts/printElementsAndForm.js";
import findIdInArray from "./layouts/findIdInArray.js";
import findIdInArrayInArray from './layouts/findIdInArrayInArray.js';
import { updateContent } from "./i18n/i18next.js";

// start work in menu add category modal
const categoriesContainer = document.getElementById('categories-container');
const categoryModalWarning = document.querySelector('#category-modal #warning-text');

// get categories data from local storage
let allCategories = JSON.parse(localStorage.getItem('menu-categories')) || [];

const savedCategories = allCategories.map(category => {
  return `<div id="category" class="category row rounded m-3 ms-0 overflow-hidden" data-id="${category.id}">
    <div class="control col-3 row flex-column justify-content-evenly p-0 text-center">
    <div id="delete-category" class="delete-category col-6 w-100" role="button"><i class="fa-regular fa-xmark-large"></i></div>
    <div id="edit-category" class="edit-category col-6 w-100" role="button"><i class="fa-regular fa-gear"></i></div>
    </div>
    <div id="data" class="data col-9 d-flex justify-content-center align-items-center text-nowrap overflow-hidden" role="button">
    ${category.name}
    </div>
    </div>`;
});

if (categoriesContainer) categoriesContainer.innerHTML = savedCategories.join(' ');

// open modal to add new categories to menu
const addCategory = document.querySelector('#add-category-button');
const categoryModal = document.getElementById('category-modal');
if (addCategory) toggleActive(addCategory, categoryModal);

// close modal display none the overlay
const closeCategoryModal = document.getElementById('close-category-button');
if (closeCategoryModal) toggleActive(closeCategoryModal, categoryModal);

// add new category and save in local storage
const categoryModalSubmit = document.getElementById('category-modal-submit');
const addCategoryInput = document.getElementById('add-category-input');

if (categoryModalSubmit)
  collectAndCreate(categoryModalSubmit, addCategoryInput, { arr: JSON.parse(localStorage.getItem('menu-categories')) || [], ele: categoryModalWarning }, categoriesContainer, (data) => {
    const id = generateId();
    allCategories.push({ id, name: data, content: [] });
    localStorage.setItem('menu-categories', JSON.stringify(allCategories));

    return `<div id="category" class="category row rounded m-3 ms-0 overflow-hidden" data-id="${id}">
    <div class="control col-3 row flex-column justify-content-evenly p-0 text-center">
    <div id="delete-category" class="delete-category col-6 w-100" role="button"><i class="fa-regular fa-xmark-large"></i></div>
    <div id="edit-category" class="edit-category col-6 w-100" role="button"><i class="fa-regular fa-gear"></i></div>
    </div>
    <div id="data" class="data col-9 d-flex justify-content-center align-items-center text-nowrap overflow-hidden" role="button">
    ${data}
    </div>
    </div>`;
  });

// work on delete category from categories list
const deleteCategories = document.querySelectorAll('#delete-category');

function eventDeleteFromNewDOM(category) {
  category.addEventListener('click', (e) => {
    const category = e.target.parentElement.parentElement;
    let data_id = Number(category.getAttribute('data-id'));
    let categoriesList = JSON.parse(localStorage.getItem('menu-categories'));
    let idsList = JSON.parse(localStorage.getItem('allIds')) || [];
    let index = findIdInArray(categoriesList, data_id);

    categoriesList = categoriesList.filter(val => parseInt(val.id) !== data_id);
    idsList = idsList.filter(id => id !== data_id);

    category.remove(); // category.parentElement.removeChild(category)
    localStorage.setItem('allIds', JSON.stringify(idsList));
    localStorage.setItem('menu-categories', JSON.stringify(categoriesList));
    // allCategories = categoriesList;
    allCategories = JSON.parse(localStorage.getItem('menu-categories'));

    // after deleting a category
    // it must select the next one and display its items
    const categoriesContainer = document.querySelector('#categories-container');
    const itemsContainer = document.querySelector('#items-container');

    // I add this to delete all active classes from all children first
    for(let i = 0; i < categoriesContainer.children.length; i++) {
      categoriesContainer.children[i].classList.remove("active");
    }

    if (allCategories[index]) {
      categoriesContainer.children[index].classList.add('active');
      printElementsAndForm(allCategories[index]);
    } else if (allCategories[index - 1]) {
      categoriesContainer.children[index - 1].classList.add('active');
      printElementsAndForm(allCategories[index - 1]);
    } else {
      itemsContainer.innerHTML = '';
    }
  });
}

if (deleteCategories) deleteCategories.forEach(category => {
  eventDeleteFromNewDOM(category);
});

// work on edit category and save it after
const editCategories = document.querySelectorAll('#edit-category');
const editModalSubmit = document.querySelector('#edit-modal-submit');
const editModalInput = document.querySelector('#edit-modal-input');
const editModalWarning = document.querySelector('#warning-edit-text');
const editModal = document.getElementById('edit-modal');

function eventEditToNewDOM(category) {
  category.addEventListener('click', (e) => {
    const category = e.target.parentElement.parentElement;
    let categoriesList = JSON.parse(localStorage.getItem('menu-categories'));
    let data_id = Number(category.getAttribute('data-id'));
    let categoryIndex = findIdInArray(categoriesList, data_id);

    // open modal to edit the category
    editModal.classList.toggle('active');

    // edit new category and save in local storage
    collectAndCreate(editModalSubmit, editModalInput, { arr: categoriesList, ele: editModalWarning }, categoriesContainer, (data) => {
      categoriesList[categoryIndex].name = data;
      allCategories = categoriesList;
      document.querySelector(`[data-id="${data_id}"] #data`).innerHTML = data;
      localStorage.setItem('menu-categories', JSON.stringify(allCategories));

      // close the modal after editing and unactive the category
      category.classList.toggle('active');
      editModal.classList.toggle('active');
    });
  });
}

if (editCategories) editCategories.forEach(category => {
  eventEditToNewDOM(category);
});

// close edit modal
const closeModal = document.querySelector('#close-edit-button');
if (closeModal) toggleActive(closeModal, editModal);

//===================================================//

// work on category items and add new items
let menuCategories = document.querySelectorAll('#categories-container .category');

// add active to the first category then display all category items and add same it
if (menuCategories[0]) menuCategories[0].classList.add('active');

function categoryItem(item) {
  return `
  <div id="item" class="rounded col-sm-6 col-md-4 col-xl-3" data-id='${item.id}'>
    <div class="item card text-center pt-3 overflow-hidden mx-auto border-0">
      <div class="card-body d-flex flex-column justify-content-between align-items-center">
        <h5 class="card-title mb-3">${item.name}</h5>
        <h6 class="card-subtitle mb-4 mt-0"><span data-i18n="quantity"></span> <span>${item.quantity}</span></h6>
        <p class="card-text align-self-end">
          <span data-i18n="price"></span> <span>${item.price}</span>
        </p>
      </div>
      <div class="control col-3 row w-100 mx-auto p-3 justify-content-between">
      <button class="edit-item col-5 rounded bg-transparent" role="button" data-i18n="edit"></button>
      <button class="delete-item col-5 rounded border-0" role="button" data-i18n="delete"></button>
      </div>
    </div>
    <form class="edit-item card-body card text-center p-3 active overflow-hidden mx-auto border-0">
      <div class="mb-3">
        <input type="text" class="form-control shadow border-0" id="edit-item-name">
      </div>
      <div class="mb-3">
        <input type="text" class="form-control shadow border-0" id="edit-item-quantity">
      </div>
      <div class="mb-3">
        <input type="text" class="form-control shadow border-0" id="edit-item-price">
      </div>
      <div class="row m-0">
        <button type="button" class="edit-item-button col-5 rounded m-auto bg-transparent" data-i18n="edit"></button>
      </div>
    </form>
  </div>`;
}

function formFunction(id) {
  return `<div class="col-sm-6 col-md-4 col-xl-3">
    <form id="add-item" class="add-item text-center p-3 rounded mx-auto" data-id="${id}">
      <div class="mb-3">
        <input type="text" class="form-control border-0 shadow-none" id="item-name" placeholder="" data-i18n-placeholder="product-name">
      </div>
      <div class="mb-3">
        <input type="text" class="form-control border-0 shadow-none" id="item-quantity" placeholder="" data-i18n-placeholder="quantity">
      </div>
      <div class="mb-3">
        <input type="text" class="form-control border-0 shadow-none" id="item-price" placeholder="" data-i18n-placeholder="price">
      </div>
      <div class="row m-0">
        <button type="submit" class="add-item-button col rounded border-0" data-i18n="add-new-product"></button>
      </div>
    </form>
  </div>`;
};

if (allCategories[0]) printElementsAndForm(allCategories[0]);

// select category
function selectCategory(ele) {
  // this made a big issue in the code don't forget to reset variable
  // or better put the used variable inside the function so anywhere will use it will work
  const menuCategories = document.querySelectorAll('.category');
  ele.addEventListener('click', () => {
    menuCategories.forEach(category => category.classList.remove('active'));

    ele.parentElement.classList.add('active');

    // find the selected element from allCategories list
    let selectedCategory = {};
    allCategories.forEach(category => {
      if (category.id === Number(ele.parentElement.dataset.id)) selectedCategory = category;
    });
    if (selectedCategory) printElementsAndForm(selectedCategory);
  });
}
if (menuCategories) document.querySelectorAll('.category #data').forEach(ele => {
  selectCategory(ele);
});

// work on add items in categories using dataset.id
function addNewItemToCategory() {
  const addItemForm = document.getElementById('add-item');
  const itemName = document.getElementById('item-name');
  const itemQuantity = document.getElementById('item-quantity');
  const itemPrice = document.getElementById('item-price');

  if (addItemForm) addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let selectedCategory = {};
    let selectedCategoryIndex = undefined;
    allCategories.forEach((category, index) => {
      if (category.id === Number(e.target.dataset.id)) {
        selectedCategory = category;
        selectedCategoryIndex = index;
      }
    });

    const name = itemName.value.trim();
    const quantity = itemQuantity.value.trim();
    const price = itemPrice.value.trim();
    if (name && quantity && price) {
      const id = generateId();
      selectedCategory.content.push({ id, name, quantity, price });

      // save category in local storage again
      allCategories[selectedCategoryIndex] = selectedCategory;
      localStorage.setItem('menu-categories', JSON.stringify(allCategories));
      printElementsAndForm(selectedCategory);
    }
  });
}

// work on delete items from category then save it in local storage
const deleteItemElements = document.querySelectorAll('.control .delete-item');

function deleteItemFromCategory(element) {
  const itemId = Number(element.parentElement.parentElement.parentElement.dataset.id);
  const itemElement = element.parentElement.parentElement.parentElement;
  const categoriesArray = JSON.parse(localStorage.getItem('menu-categories'));
  const [categoryIndex, itemIndexInCategory] = findIdInArrayInArray(categoriesArray, 'content', itemId);
  let idsList = JSON.parse(localStorage.getItem('allIds')) || [];

  // delete item from category content and save it
  categoriesArray[categoryIndex].content.splice(itemIndexInCategory, 1);
  localStorage.setItem('menu-categories', JSON.stringify(categoriesArray));
  allCategories = categoriesArray;

  // delete itemId from allIds and save it
  idsList = idsList.filter(id => id !== itemId);
  localStorage.setItem('allIds', JSON.stringify(idsList));

  // remove the element from dom
  itemElement.remove();
}

if (deleteItemElements) deleteItemElements.forEach(ele => {
  ele.addEventListener('click', () => {
    deleteItemFromCategory(ele);
  });
});

// activate edit item button to edit data then save it or go back
function activateEditItem(element) {
  const itemId = Number(element.parentElement.parentElement.parentElement.dataset.id);
  const categoriesArray = JSON.parse(localStorage.getItem('menu-categories'));
  const [categoryIndex, itemIndexInCategory] = findIdInArrayInArray(categoriesArray, 'content', itemId);

  // select form and parentElement to toggle active
  const formElement = document.querySelector(`[data-id="${itemId}"] form`);
  const cardElement = element.parentElement.parentElement;

  formElement.classList.toggle('active');
  cardElement.classList.toggle('active');

  // select all inputs in edit form
  const inputName = document.querySelector(`[data-id="${itemId}"] #edit-item-name`);
  const inputQuantity = document.querySelector(`[data-id="${itemId}"] #edit-item-quantity`);
  const inputPrice = document.querySelector(`[data-id="${itemId}"] #edit-item-price`);

  // put the data as default value in inputs
  inputName.value = categoriesArray[categoryIndex].content[itemIndexInCategory].name;
  inputQuantity.value = categoriesArray[categoryIndex].content[itemIndexInCategory].quantity;
  inputPrice.value = categoriesArray[categoryIndex].content[itemIndexInCategory].price;
}

// deactivate edit item button and don't edit data then go back to card
function backFromEditForm(element) {
  const itemId = Number(element.parentElement.parentElement.parentElement.dataset.id);

  // select form and element to toggle active
  const formElement = document.querySelector(`[data-id="${itemId}"] form`);
  const cardElement = document.querySelector(`[data-id="${itemId}"] .item`);

  // get back after clicking on back button
  formElement.classList.toggle('active');
  cardElement.classList.toggle('active');
}

// edit item data when clicking on edit button and save it in local storage
function editCategoryItem() {
  const editButtons = document.querySelectorAll(".edit-item-button");

  if (editButtons) editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = Number(button.parentElement.parentElement.parentElement.dataset.id);
      const categoriesArray = JSON.parse(localStorage.getItem('menu-categories'));
      const [categoryIndex, itemIndexInCategory] = findIdInArrayInArray(categoriesArray, 'content', itemId);

      // select form and parentElement to toggle active
      const formElement = document.querySelector(`[data-id="${itemId}"] form`);
      const cardElement = document.querySelector(`[data-id="${itemId}"] .item`);

      // collect all new data from inputs
      const newName = document.querySelector(`[data-id="${itemId}"] #edit-item-name`).value.trim();
      const newQuantity = document.querySelector(`[data-id="${itemId}"] #edit-item-quantity`).value.trim();
      const newPrice = document.querySelector(`[data-id="${itemId}"] #edit-item-price`).value.trim();

      if (newName && newQuantity && newPrice) {
        categoriesArray[categoryIndex].content[itemIndexInCategory] = {
          id: itemId,
          name: newName,
          price: newPrice,
          quantity: newQuantity
        };
        localStorage.setItem('menu-categories', JSON.stringify(categoriesArray));
        allCategories = categoriesArray;

        formElement.classList.toggle('active');
        cardElement.classList.toggle('active');
        printElementsAndForm(allCategories[categoryIndex]);
      }
    });
  });
}

updateContent();

export { selectCategory, eventDeleteFromNewDOM, eventEditToNewDOM, formFunction, categoryItem, addNewItemToCategory, deleteItemFromCategory, activateEditItem, backFromEditForm, editCategoryItem };
