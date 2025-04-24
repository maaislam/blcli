/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './shared';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send(ID, 'SD025 Control', 'SD025 Control is active');
    return false;
  } else {
    events.send(ID, `SD025 Variation ${VARIATION}`, `SD025 Variation ${VARIATION} is active`);
  }

  setup();

  
  // Ensure Brands is at the top of the list without moving Brands
  const sortByEl = document.querySelector('.MobSortSelector');
  const sortByElClone = sortByEl.cloneNode(true);

  const filterList = document.querySelector('ul#filterlist');
  
  const firstFilter = filterList.querySelectorAll('li');
  let brandFilter;

  for (let i = 0; firstFilter.length > i; i += 1) {
    const title = firstFilter[i].querySelector('h3.productFilterTitle');
    if (title && title.textContent) {
      const text = title.textContent.trim();
      
      if (text !== 'Brand') {
        const nextItem = firstFilter[i + 1];
      
        if (nextItem) {
      
          nextItem.insertAdjacentElement('afterend', firstFilter[i]);
        }
      } else {
        brandFilter = firstFilter[i];
        brandFilter.classList.add('SD-isBrand');
        i = firstFilter.length;
      }
    }
  }
  

  
  if (!brandFilter) return;

  events.send(ID, 'SD025 Brands', 'SD025 Page has brands');

  if (window.location.href.indexOf('&Filter=') > -1) {
    if (window.location.href.indexOf('&Filter=none') === -1) {
      brandFilter.classList.add('SD-hidden');
    }
  }

  // Open Brands
  const openBrands = () => {
    const newFirstLiLink = document.querySelector('ul#filterlist li .productFilterTitleBox');
    
    // check url for applied filters first.
    if (window.location.href.indexOf('&Filter=') === -1 || window.location.href.indexOf('&Filter=none') > -1) { // Doesn't exist
      newFirstLiLink ? newFirstLiLink.click() : null;
      
    }
  }
  
  
  
  // Add view all link (expand whole list)
  const brandsList = document.querySelector('ul#filterlist li.productFilter .productFilterList');
  brandsList.insertAdjacentHTML('afterend', `<button class="SD-viewAll">View all brands</button>`);
  
  const viewAllBtn = document.querySelector('button.SD-viewAll');
   

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      viewAllBtn.parentElement ? viewAllBtn.parentElement.classList.add('SD-expand') : null;
      viewAllBtn.parentElement.parentElement ? viewAllBtn.parentElement.parentElement.classList.add('SD-show') : null;

      events.send(ID, 'SD025 Click', 'SD025 View all');
    });
  }


  // On click of filter re open brands
  const menuFilter = document.querySelector('#mobControlBar');
  menuFilter.addEventListener('click', () => {
    // if (!window.location.href.indexOf('&Filter=') > -1) {
      openBrands();
      
    // }
  });


  // Remove isHideen class on click
  brandFilter.addEventListener('click', () => {
    brandFilter.classList.remove('SD-hidden');
  })
};
