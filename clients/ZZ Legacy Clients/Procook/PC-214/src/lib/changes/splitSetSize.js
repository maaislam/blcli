import shared from '../../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../../lib/uc-lib';
import data from '../data';

const { ID, VARIATION } = shared;

export default (url, allFilters) => {
  // --- Split Set Size / Size 
  pollerLite([`#${ID}-set-size`], () => {
    if (url == '/shop/cookware/induction'
    || url == '/shop/cookware/saucepans'
    || url == '/shop/cookware/stainless-steel'
    || url == '/shop/cookware/sets'
    || url == '/shop/knives-scissors/knife-sets-knife-blocks'
    || url == '/shop/knives-scissors/damascus-67'
    || url == '/shop/knives-scissors/procook-professional-x50'
    || url == '/shop/knives-scissors/knife-sets-with-blocks'
    || url == '/shop/cookware/frying-pans') {
      document.querySelector(`.filter#set-size .filterBoxTitle`).insertAdjacentHTML('afterend', `<div class="filterBoxDropDown"><ul></ul></div>`);
      let allSizes = document.querySelectorAll(`.filter#size .filterBoxDropDown ul li`);
      [].forEach.call(allSizes, (size) => {
        const sizeText = size.querySelector('.filterText').innerText.trim();

        if (url == '/shop/knives-scissors/knife-sets-knife-blocks') {
          if (sizeText.toLowerCase().indexOf('piece knife sets') > -1) {
            if (url == '/shop/knives-scissors/knife-sets-knife-blocks') {
              size.querySelector('.filterText').innerText = sizeText.replace('Piece Knife Sets', 'Knives');
            }
            document.querySelector(`.filter#set-size ul`).insertAdjacentElement('beforeend', size);
          }
        } else {
          if (sizeText.toLowerCase().indexOf('piece') > -1) {
            if (url == '/shop/cookware/saucepans'
            || url == '/shop/cookware/stainless-steel'
            || url == '/shop/cookware/sets') {
              size.querySelector('.filterText').innerText = sizeText.replace('Piece', 'Pans');
            }
            document.querySelector(`.filter#set-size ul`).insertAdjacentElement('beforeend', size);
          }
        }
      });

      // --- Loop through remaining Sizes and remove any that do NOT have 'cm'
      allSizes = document.querySelectorAll(`.filter#size .filterBoxDropDown ul li`);
      [].forEach.call(allSizes, (size) => {
        const sizeText = size.querySelector('.filterText').innerText.trim();
        if (sizeText.toLowerCase().indexOf('cm') == -1) {
          size.setAttribute('style', 'display: none;');
        }
      });


      if (url == '/shop/knives-scissors/knife-sets-with-blocks') {
        document.querySelector('.filter#size').setAttribute('style', 'display: none;');
      }
    }
  });

  if (url == '/shop/cookware/frying-pans') {
    // --- Loop through remaining Sizes and remove any that do NOT have 'cm'
    let allSizes = document.querySelectorAll(`.filter#size .filterBoxDropDown ul li`);
    [].forEach.call(allSizes, (size) => {
      const sizeText = size.querySelector('.filterText').innerText.trim();
      if (sizeText.toLowerCase().indexOf('cm') == -1) {
        size.setAttribute('style', 'display: none;');
      }
    });
  }


  pollerLite([`#${ID}-set-type`], () => {
    if (url == '/shop/knives-scissors/damascus-67'
    || url == '/shop/knives-scissors/procook-professional-x50') {
      document.querySelector(`.filter#set-type .filterBoxTitle`).insertAdjacentHTML('afterend', `<div class="filterBoxDropDown"><ul></ul></div>`);
      const allTypes = document.querySelectorAll(`.filter#type .filterBoxDropDown ul li`);
      [].forEach.call(allTypes, (type) => {
        const typeText = type.querySelector('.filterText').innerText.trim();
        if (typeText.toLowerCase().indexOf('sets') > -1) {
          document.querySelector(`.filter#set-type ul`).insertAdjacentElement('beforeend', type);
        }
      });
      
    }
  });
  
};