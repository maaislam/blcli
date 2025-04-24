/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { events, updateUrlParameter } from '../../../../../lib/utils';
import getData from './getData';
import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;


  const filterTitle = () => {
    let filterName;
    
    if(VARIATION === '1') {
      filterName = 'price';
    }
    if(VARIATION === '2') {
      filterName = 'minimum rating';
    }

    return filterName;
  }

  const filterTracking = () => {
    const categoryLinks = document.querySelectorAll('#productsFacets .ais-HierarchicalMenu-item');
    if(categoryLinks) {
      for (let index = 0; index < categoryLinks.length; index += 1) {
        const catLink = categoryLinks[index];
        catLink.querySelector('.ais-HierarchicalMenu-link').addEventListener('click', () => {
          events.send(`Experimentation`, `${ID} V${VARIATION}`, `Clicked Category Filter ${filterName.textContent}`);
        });
      }
    }

    const filterRatings =  document.querySelectorAll('#productsFacets .ais-RatingMenu-item');
    if(filterRatings) {
      for (let index = 0; index < filterRatings.length; index += 1) {
        const rating = filterRatings[index];
        rating.querySelector('.ais-RatingMenu-link').addEventListener('click', () => {
          events.send(`Experimentation`, `${ID} V${VARIATION}`, `Clicked Rating Filter ${rating.querySelector('.ais-RatingMenu-link').getAttribute('aria-label')}`);
        });
      }
    }

    const allFilters = document.querySelectorAll('.ais-RefinementList-item');
    for (let index = 0; index < allFilters.length; index += 1) {
      const element = allFilters[index];
      element.addEventListener('click', (e) => {
        const filterName = e.currentTarget.querySelector('.ais-RefinementList-labelText');
        
        if(filterName) {
          events.send(`Experimentation`, `${ID} V${VARIATION}`, `Clicked Filter ${filterName.textContent}`);
        }
      });
    }
  }

  const createFilterWrapper = () => {
    const heroFilter = document.createElement('div');
    heroFilter.classList.add(`${ID}-heroFilters`);
    heroFilter.innerHTML = `
    <h3>Filter by ${filterTitle()}</h3>
    <div class="${ID}-filters">

    </div>`;

    if(window.innerWidth > 600) {
      document.querySelector('.product_listing_container__header').insertAdjacentElement('beforebegin', heroFilter);
    } {
      document.querySelector('.product_listing_container').insertAdjacentElement('beforebegin', heroFilter);
    }
  }

  const addFilters = () => {
    const allFilters = getData();

    Object.keys(allFilters).forEach((i) => {
      const data = allFilters[i];
  
      const filter = document.createElement('div');
        filter.classList.add(`${ID}-filterBox`);
        if(VARIATION === '1') {
          filter.setAttribute('filter-target', data.url);
        }
        if(VARIATION === '2') {
          filter.setAttribute('filter-target', data.target);
        }
        
        filter.innerHTML = `<span>${data.name}${VARIATION === '2' ? `& up` : ''}</span>`;
        document.querySelector(`.${ID}-filters`).appendChild(filter);
    }); 
  }

  const checkActive = () => {
    const filters = document.querySelectorAll(`.${ID}-filterBox`);
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      
      const filterTargets = element.getAttribute('filter-target');
      if(VARIATION === '1') {
        if(window.location.href.indexOf(filterTargets) > -1) {
          element.classList.add(`${ID}-filterActive`);
          } else {
            element.classList.remove(`${ID}-filterActive`);
          }
        }
      

      if(VARIATION === '2') {

        const matchingFilter = document.querySelector(`.ais-RatingMenu-list .ais-RatingMenu-item .ais-RatingMenu-link[aria-label="${filterTargets}"]`);
      
        if(matchingFilter) {
          if(matchingFilter.parentNode.parentNode.classList.contains('ais-RatingMenu-item--selected')){
            element.classList.add(`${ID}-filterActive`);
          } else {
            element.classList.remove(`${ID}-filterActive`);
          }
        }

      }
    }
    
  }

  const filterClick = () => {
    const filters = document.querySelectorAll(`.${ID}-filterBox`);
    const url = window.location.pathname;
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      element.addEventListener('click', (e) => {
        const targetEl = e.currentTarget.getAttribute('filter-target');
        const filterName = e.currentTarget.querySelector('span');

        if(VARIATION === '1') {
          if(window.location.href.indexOf('price=') > -1) {
            window.location.href = updateUrlParameter(window.location.href, 'price', targetEl);
          } else {
            window.location.href = `${window.location.href}&price=${targetEl}`;
          }
        }
      
        if(VARIATION === '2') {     
          
          document.querySelector(`.ais-RatingMenu-list .ais-RatingMenu-item .ais-RatingMenu-link[aria-label="${targetEl}"]`).click();
        }

        if(filterName) {
          events.send(`Experimentation`, `${ID} V${VARIATION}`, `Clicked Hero Filter ${filterName.textContent}`);
        }
        
      });
      
    }
  }

  const slickFilters = () => {
      window.jQuery(`.${ID}-filters`).slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: true,
        rows: 0,
        infinite: true,
        nextArrow: `<button class="slide-arrow ${ID}-next"></button>`,
        prevArrow: `<button class="slide-arrow ${ID}-back"></button>`,
        responsive: [
          {
            breakpoint: 9999,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              dots:false,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots:false,
            }
          }
        ]
    });
  }


  if(VARIATION === 'control') {
    setup();
    cookieOpt();
  
    if (window.usabilla_live){
      window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
    }

    filterTracking();
  } else {
    setup();
    cookieOpt();
  
    if (window.usabilla_live){
      window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
    }
    createFilterWrapper();
    addFilters();
    filterClick();
    checkActive();
    filterTracking();

    
      if(VARIATION === '1') {
        if(window.innerWidth > 767) {
          slickFilters();
          window.jQuery(`.${ID}-filters`).slick('resize');
        }
      }
      if(VARIATION === '2') {
        if(window.innerWidth > 767 && window.innerWidth < 1024) {
          slickFilters();
          window.jQuery(`.${ID}-filters`).slick('resize');
      }
    }
  }
 
};
