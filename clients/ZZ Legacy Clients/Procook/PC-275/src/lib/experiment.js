/**
 * PC-275 - Clearer range differentiation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  const cookwareCategory = document.querySelectorAll('nav.main-header-menu>ul li.loaded')[0];
  const kitchenKnivesCategory = document.querySelectorAll('nav.main-header-menu>ul li.loaded')[3];

  if(VARIATION == 'control') {
    // return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (VARIATION == '1') {
    let newColumns = `<div class="${ID}-col_1"></div>
    <div class="${ID}-col_2"></div>
    <div class="${ID}-col_3"></div>`;
    cookwareCategory.querySelector('ul').insertAdjacentHTML('afterbegin', newColumns);
    kitchenKnivesCategory.querySelector('ul').insertAdjacentHTML('afterbegin', newColumns);

    // --- Add NEW Cookware sections
    let newCookwareCategories = '';
    for (const key in data['cookware']) {
      newCookwareCategories = `<li class="col_1 loaded new_col" id="${ID}-${key}" data-item="${key}">
        <a href="#" class="menuCategory"><span class="icon"></span><span class="text">${data['cookware'][key]}</span></a>
        <ul></ul>
      </li>`;

      if (key == "shop-by-sets" || key == "shop-by-type") {
        cookwareCategory.querySelector(`.${ID}-col_1`).insertAdjacentHTML('beforeend', newCookwareCategories);
      }
      if (key == "shop-by-range") {
        cookwareCategory.querySelector(`.${ID}-col_2`).insertAdjacentHTML('beforeend', newCookwareCategories);
      }
      if (key == "shop-by-feature" || key == "shop-accessories") {
        cookwareCategory.querySelector(`.${ID}-col_3`).insertAdjacentHTML('beforeend', newCookwareCategories);
      }
    }
    // cookwareCategory.querySelector('ul').insertAdjacentHTML('afterbegin', newCookwareCategories);
    cookwareCategory.classList.add(`${ID}-cookware-category`);
    cookwareCategory.setAttribute('data-category', `Cookware Category`);

    let getAllMenuItems = cookwareCategory.querySelectorAll('li.col_1.loaded ul li');
    [].forEach.call(getAllMenuItems, (item) => {
      let opt = item.querySelector('a').innerText.trim().toLowerCase();
      switch(true) {
        case (opt == 'uncoated pans' || opt == 'induction cookware' || opt == 'non-stick cookware'):
          cookwareCategory.querySelector(`ul #${ID}-shop-by-feature ul`).insertAdjacentElement('beforeend', item);
          break;
        case (opt == 'pan lids' || opt == 'cookware accessories'):
          cookwareCategory.querySelector(`ul #${ID}-shop-accessories ul`).insertAdjacentElement('beforeend', item);
          break;
        case (opt.indexOf('sets') > -1):
          cookwareCategory.querySelector(`ul #${ID}-shop-by-sets ul`).insertAdjacentElement('beforeend', item);
          break;
        case (opt.indexOf('explore') > -1):
          cookwareCategory.querySelector(`ul #${ID}-shop-by-type ul`).insertAdjacentElement('afterbegin', item);
          break;
        case (opt.indexOf('cookware') > -1 || opt.indexOf('dishes') > -1):
          cookwareCategory.querySelector(`ul #${ID}-shop-by-type ul`).insertAdjacentElement('beforeend', item);
          break;
        default:
          cookwareCategory.querySelector(`ul #${ID}-shop-by-range ul`).insertAdjacentElement('beforeend', item);
      }

      if (!item.closest('.col_1.loaded').classList.contains(`new_col`)) {
        item.closest('.col_1.loaded').setAttribute('style', 'display: none;');
      }
    })

    // --- Add NEW Knives sections
    let newKnivesCategories = '';
    for (const key in data['kitchen knives']) {
      newKnivesCategories = `<li class="col_1 loaded new_col" id="${ID}-${key}" data-item="${key}">
        <a href="#" class="menuCategory"><span class="icon"></span><span class="text">${data['kitchen knives'][key]}</span></a>
        <ul></ul>
      </li>`;

      if (key == "shop-loose-knives") {
        kitchenKnivesCategory.querySelector(`.${ID}-col_1`).insertAdjacentHTML('beforeend', newKnivesCategories);
      }
      if (key == "shop-by-sets") {
        kitchenKnivesCategory.querySelector(`.${ID}-col_2`).insertAdjacentHTML('beforeend',  newKnivesCategories);
      }
      if (key == "shop-by-range" || key == "shop-accessories") {
        kitchenKnivesCategory.querySelector(`.${ID}-col_3`).insertAdjacentHTML('beforeend',  newKnivesCategories);
      }
    }
    // kitchenKnivesCategory.querySelector('ul').insertAdjacentHTML('afterbegin', newKnivesCategories);
    kitchenKnivesCategory.classList.add(`${ID}-knives-category`);
    kitchenKnivesCategory.setAttribute('data-category', `Knives Category`);

    getAllMenuItems = kitchenKnivesCategory.querySelectorAll('li.col_1.loaded ul li');
    [].forEach.call(getAllMenuItems, (item) => {
      let opt = item.querySelector('a').innerText.trim().toLowerCase();
      switch(true) {
        case (opt == 'knife storage' || opt == 'knife sharpeners' || opt == 'chopping boards'):
          kitchenKnivesCategory.querySelector(`ul #${ID}-shop-accessories ul`).insertAdjacentElement('beforeend', item);
          break;
        case (opt.indexOf('sets') > -1):
          kitchenKnivesCategory.querySelector(`ul #${ID}-shop-by-sets ul`).insertAdjacentElement('beforeend', item);
          break;
        case (opt.indexOf('knives') > -1):
          kitchenKnivesCategory.querySelector(`ul #${ID}-shop-loose-knives ul`).insertAdjacentElement('beforeend', item);
          break;
        default:
          kitchenKnivesCategory.querySelector(`ul #${ID}-shop-by-range ul`).insertAdjacentElement('beforeend', item);
      }

      if (!item.closest('.col_1.loaded').classList.contains(`new_col`)) {
        item.closest('.col_1.loaded').setAttribute('style', 'display: none;');
      }
    })
  }
  

  // --- GA Tracking Events
  const allCookwareItems = cookwareCategory.querySelectorAll('.col_1.loaded ul li');
  [].forEach.call(allCookwareItems, (item) => {
    item.addEventListener('click', (e) => {
      fireEvent(`Click - Cookware - ${item.querySelector('a').innerText.trim()}`);
    });
  })

  const allKnifeItems = kitchenKnivesCategory.querySelectorAll('.col_1.loaded ul li');
  [].forEach.call(allKnifeItems, (item) => {
    item.addEventListener('click', (e) => {
      fireEvent(`Click - Kitchen Knives - ${item.querySelector('a').innerText.trim()}`);
    });
  })

};
