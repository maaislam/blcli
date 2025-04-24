/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname, cookieOpt, fireEvent } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
 setup();
 cookieOpt();

  let filterToUse;
  let matchingFilter;


  // define the filter
  if(window.digitalData.page.category.primaryCategory === 'Watches') {
    filterToUse = 'Brand';
    matchingFilter = 'refinement-brand';

  }

  if(window.location.href.match(/.*(webstore)(\/)(l).*(engagement).*/) && window.location.href.match(/.*(webstore)(\/)(l).*(engagement).*/)[0]) {
    filterToUse = 'Metal Colour';
    matchingFilter = 'refinement-material';

  }
  if(window.location.href.match(/.*(webstore)(\/)(l).*(wedding-rings).*/) && window.location.href.match(/.*(webstore)(\/)(l).*(wedding-rings).*/)) {
    filterToUse = 'Metal Colour';
    matchingFilter = 'refinement-material';

  }
  if(window.digitalData.page.category.primaryCategory === 'Jewellery' && window.digitalData.page.category.subCategory1 !== 'Rings') {
    filterToUse = 'Metal Colour';
    matchingFilter = 'refinement-material';

  }
  

  const createNotification = () => {
    const filterEl = document.createElement('div');
    filterEl.classList.add(`${ID}-filterMessage`);
    
    if(VARIATION === '1') {
      filterEl.innerHTML = `<p>Why not start by filtering by <b>${filterToUse}</b>? This is our most popular filter option.</p>`;
    } else if(VARIATION === '2'){
      filterEl.innerHTML = `<p>You’re 3 times more likely to find a product using filters. Why not filter by <b>${filterToUse}</b>?</p>`;
    }

    if(window.innerWidth >= 1024) {
      document.querySelector(`#${matchingFilter}`).appendChild(filterEl);
    } else {
      if(getSiteFromHostname() === 'hsamuel') {
        document.querySelector('.browse__results-and-sort-container').appendChild(filterEl);
      } else {
        document.querySelector('.browse__results-and-sort-container .browse__filter-toggle-container').appendChild(filterEl);
      }
     
    }
  }

  const showHideNotification = () => {
    const filterMsg = document.querySelector(`.${ID}-filterMessage`);
    setTimeout(() => {
      filterMsg.classList.add(`${ID}-show`);
      fireEvent('Notfication shown');
    }, 3000);

    setTimeout(() => {
      //filterMsg.classList.add(`${ID}-hide`);
    }, 7000);
    setTimeout(() => {
     
     // filterMsg.remove();
    }, 8000);

  }

  const filterTracking = () => {
    const allFilters = document.querySelectorAll(`.filters-panel__refinement-selector`);
    for (let index = 0; index < allFilters.length; index+=1) {
      const element = allFilters[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked Filter');
      });
    }
  }

  if(VARIATION === '1' || VARIATION === '2') {

    if(window.location.href.match(/.*(webstore)(\/)(l).*(engagement).*/) || window.location.href.match(/.*(webstore)(\/)(l).*(wedding-rings).*/) || window.digitalData.page.category.primaryCategory === 'Jewellery') {
      if(!sessionStorage.getItem(`${ID}-metal`)) {
        sessionStorage.setItem(`${ID}-metal`, 1);
        createNotification();
        showHideNotification();
      }
    } else {
      if(!sessionStorage.getItem(`${ID}-watches`)) {
        sessionStorage.setItem(`${ID}-watches`, 1);
        createNotification();
        showHideNotification();
      }
    }

    
  }
  filterTracking();

  var oldHref = document.location.href;
  var bodyList = document.querySelector("body");
  var observerUrl = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href) {
                  oldHref = document.location.href;
                   filterTracking();
                }
          });
      });
  var config = {
          childList: true,
          subtree: true
      };
  observerUrl.observe(bodyList, config);

  

 


  if(getSiteFromHostname() == 'ernestjones') {
    // EJ-specific JS
  }

  if(getSiteFromHostname() == 'hsamuel') {
    // HS-specific JS
  }
  
};
