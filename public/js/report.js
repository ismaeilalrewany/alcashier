import selectFromMenu from './layouts/selectFromMenu.js';

const reference = [
  { name: 'general', path: '../components/report-general.html' },
  { name: 'done', path: '../components/report-done.html' },
  { name: 'canceled', path: '../components/report-canceled.html' },
  { name: 'runout', path: '../components/report-runout.html' },
  { name: 'cashier', path: '../components/report-cashier.html' },
];

// when loading the page first includes general file
includeHTML(reference[0].path, '.option-details', true);

// work on report page and starts with select from menu options
const optionsList = document.querySelectorAll('.report .options li');

if (optionsList) selectFromMenu(optionsList, (index) => {
  for (let i = 0; i < reference.length; i++) {
    if (optionsList[index].dataset.option === reference[i].name) {
      includeHTML(reference[i].path, '.option-details', true);
    }
  }
});
