/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { brandFilterClicks, closeFilters, filterClicks, filterToggle, generatePopularFilters, makeFilterActive } from './helpers';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  

  const allFilterClicks = () => {
    const allFilters = document.querySelectorAll('.facet-menu__item input');
    for (let index = 0; index < allFilters.length; index += 1) {
      const filterEl = allFilters[index];
      filterEl.addEventListener('click', () => {
        fireEvent('Clicked Filter');
      });
    }

    // const brandFilters = document.querySelectorAll(`input[id*=labelledby-]`);
    // if(brandFilters) {
    //   for (let index = 0; index < brandFilters.length; index++) {
    //     const element = brandFilters[index];
    //     element.addEventListener('click', () => {
    //       fireEvent('Clicked brand filter');
    //     });
    //   }
    // }
  }


  if(VARIATION !== 'control') {

    // Header changes
    const gridContainer = document.querySelector('.list-page');
    gridContainer.insertAdjacentElement('beforebegin', document.querySelector('.page-info'));

    if(!document.querySelector(`.${ID}-filterBlock`)) {
      document.documentElement.classList.add(`popularOnly`);

      // remove any existing
      if (document.querySelector(`.${ID}-filter.active`)) {
        document.querySelector(`.${ID}-filter.active`).classList.remove('active');
        document.querySelector(`.${ID}-filterBlock.active`).classList.remove('active');
      }

      const createFilterHeader = () => {
        const filterBlock = document.createElement('div');
        filterBlock.classList.add(`${ID}-filtersBlock`);
        filterBlock.innerHTML = `
        <div class="${ID}-filters-container">
          <div class="${ID}-filterToggle ${ID}--mobHide">
            <div class="${ID}-toggleButton"><span></span>View popular filters</div>
          </div>
          <div class="${ID}-popularFilters">
            <span>Filter by:</span>
            <div class="${ID}-filterBar">
              <div class="${ID}-all ${ID}--mobHide">View all filters</div>
            </div>
            <div class="${ID}-filterDropdown"></div>
          </div>  
        </div>`;
        
        document.querySelector('.page-info').insertAdjacentElement('afterend', filterBlock);

        document.querySelector(`.${ID}-filterToggle`).addEventListener('click', () => {
          fireEvent('clicked view popular filters');
          filterToggle();
        });
        document.querySelector(`.${ID}-all`).addEventListener('click', () => {
          fireEvent('clicked view all filters');
          filterToggle();
        });
      }

      closeFilters();
      createFilterHeader();


      // Move sort by
      if(window.innerWidth >= 1200) {
        const sortBy = document.querySelector('.top-section__view-switcher');
        if(sortBy) {
          document.querySelector(`.${ID}-filters-container`).appendChild(sortBy);
        }
      }

      // change filter text
      if(document.querySelector('.top-section__filter-switch')){
        document.querySelector('.top-section__filter-switch').textContent = 'View all filters';
      }


      // add popular filters
      if(window.location.href.indexOf('wedding-rings') > -1) {
        generatePopularFilters('Stone Shape');
        generatePopularFilters('Material Type');
        generatePopularFilters('Style');
      }
      else if(window.location.href.indexOf('engagement-rings') > -1 || window.location.href.indexOf('diamond-rings') > -1) {
        generatePopularFilters('Stone Shape');
        generatePopularFilters('Material Type');
        generatePopularFilters('Style');
      }
      else if(window.location.href.indexOf('rings') > -1) {
        generatePopularFilters('Material Type');
        generatePopularFilters('Recipient');
        generatePopularFilters('Occasion');
      }
      else if(window.location.href.indexOf('luxury-watches') > -1){ 
        generatePopularFilters('Brand');
        generatePopularFilters('Recipient');
        generatePopularFilters('Strap Material');
        generatePopularFilters('Movement');

      //brandFilterClicks();

      } else if(window.location.href.indexOf('mens-watches') > -1){ 
        generatePopularFilters('Brand');
        generatePopularFilters('Strap Material');
        generatePopularFilters('Movement');
      }

     makeFilterActive();
      // click on existing filters
     filterClicks();

      // Filter tracking
     allFilterClicks();
    }
    
  } else {
    allFilterClicks();
  }
};
