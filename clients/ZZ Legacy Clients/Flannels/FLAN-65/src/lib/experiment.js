/**
 * FLAN-65 - Brands differentiation on mobile filter
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import settings from './shared';
import { config } from './config';
import { browseTemplateFunc } from './browseTemplate';
import { events, pollerLite } from '../../../../../lib/utils';

let $ = null;
events.analyticsReference = '_gaUAT';

export default () => {
  setup();
  
  const { ID, VARIATION } = settings;


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
        brandFilter.classList.add('FL-isBrand');
        i = firstFilter.length;
      }
    }
  }
 

  // Move sort by after Brands LI
  // brandFilter.insertAdjacentElement('afterend', sortByEl);
  // filterList.insertAdjacentElement('afterbegin', firstFilter);


  // Re run function script
  // browseTemplateFunc();

  // Auto expand BRANDS
  
  

  //


  // ON clear click, re run auto expand
  // const newFirstLiLink = document.querySelector('ul#filterlist li .productFilterTitleBox');
  
  // newFirstLiLink ? newFirstLiLink.click() : null;

  document.querySelector('#txtBrandSearch').setAttribute('placeholder', 'SEARCH OVER 80 BRANDS');

  // Add view all link (expand whole list)
  const brandsList = document.querySelector('ul#filterlist li.productFilter .productFilterList');
  brandsList.insertAdjacentHTML('afterend', `<button class="FL-viewAll">View all brands</button>`);

  const viewAllBtn = document.querySelector('button.FL-viewAll');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      viewAllBtn.parentElement ? viewAllBtn.parentElement.classList.add('FL-expand') : null;
      viewAllBtn.parentElement.parentElement ? viewAllBtn.parentElement.parentElement.classList.add('FL-show') : null;
    });
  }


  document.querySelector('.mobFilterContainer').addEventListener('click', (e) => {
    var btn = e.target;
    const newFirstLiLink = document.querySelector('ul#filterlist li .productFilterTitleBox');
    newFirstLiLink.click();
    events.send(ID, `${shared.ID} Variation 1`, 'opening mobile filters');
    return true;
  });


  if (VARIATION == 2) { // Show top 6 Brands instead

    // Show
    const topBrands = config(window.location.pathname);

    if (!topBrands) return; 
    
    const searchAndSort = document.querySelector('ul#filterlist .brandSearchSort');
    const searchInput = document.querySelector('ul#filterlist .brandSearchSort input[type="text"]');

    searchAndSort ? searchAndSort.insertAdjacentHTML('afterend', topBrands) : null;

    searchInput ? searchInput.addEventListener('click', () => {
      const addedFilters = document.querySelectorAll('.FLAN-65-filter');
      if (addedFilters.length) {
        for (let i = 0; addedFilters.length > i; i += 1) {
          addedFilters[i].classList.add('FL-hide');
        }
      }
    }) : null;
  }


  
};
