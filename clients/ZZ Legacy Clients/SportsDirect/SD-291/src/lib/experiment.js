/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, observer, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const defaultFilters = [

  {url: "/mens/footwear/trainers", filters: ['Nike', 'Puma', 'New Balance', 'Under Armour', 'Reebok', 'Asics', 'Skechers', 'Karrimor', 'Converse', 'Air Jordan']},
  {url: "/running/running-shoes/mens-running-shoes", filters: ['Nike', 'Asics', 'New Balance', 'Under Armour', 'Mizuno', 'Puma', 'Saucony', 'Salomon', 'Karrimor', 'Brooks']},
  {url: "/ladies/footwear/trainers", filters: ['Nike', 'Puma', 'New Balance', 'Reebok', 'Asics', 'Skechers', 'Under Armour', 'Converse', 'Karrimor', 'Fila']},
  {url: "/fitness-and-training/gym-trainers/womens-gym-trainers", filters: ['Nike', 'New Balance', 'Under Armour', 'Asics', 'Reebok', 'Puma', 'Mizuno', 'Saucony', 'Everlast', 'Elite']},
  {url: "/sale/mens-footwear-sale", filters: ['Nike', 'Puma', 'New Balance', 'Under Armour', 'Asics', 'Reebok', 'Lacoste', 'Skechers', 'Salomon', 'Karrimor']},
  {url: "/sale/ladies-footwear-sale", filters: ['Nike', 'Puma', 'Skechers', 'Asics', 'New Balance', 'Reebok', 'Under Armour', 'Fila', 'Converse', 'Lacoste']}

];

const makePageAmends = (filters) => {
 
  let brandHolderHTML = `
  
    <div class="${ID}-brand-holder">
    
      <div class="${ID}-brand-holder-header">
        <h2> Brands you love </h2>
        <a href="#" id="${ID}-showmore" class="${ID}-showmore"> Show more </a>
      </div>
      
      <div class="${ID}-brand-holder-brands">
        <div class="${ID}-brand-holder-inner">
          
          ${filters.map((filter) => {

            return `

              <div class="${ID}-brand-item" data-filter-name="${filter}">
                <button class="${ID}-brand-item-add"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path id="add" d="M14,5.906,13.094,5,9.5,8.594,5.906,5,5,5.906,8.594,9.5,5,13.094,5.906,14,9.5,10.406,13.094,14,14,13.094,10.406,9.5Z" transform="translate(6.364 -7.071) rotate(45)" fill="#636363"/></svg></button>
                <button class="${ID}-brand-item-remove"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 11 11"><path id="exit" d="M14,5.906,13.094,5,9.5,8.594,5.906,5,5,5.906,8.594,9.5,5,13.094,5.906,14,9.5,10.406,13.094,14,14,13.094,10.406,9.5Z" transform="translate(-5 -5)" fill="#636363"/></svg></button>
                <span class="${ID}-brand-item-name">${filter}</span>
              </div>

            `

          }).join('')}

          

        </div>
      
      </div>
      
      <div class="${ID}-buttons">
      
        <button id="${ID}-clear" class="${ID}-clear">Clear</button>

        <button id="${ID}-apply" class="${ID}-apply">Apply Filters</button>
      
      </div>
    
    
    </div>

    <div class="${ID}-brand-takeover" id="${ID}-brand-takeover">
    
      <div class="${ID}-brand-takeover-header">
        <button class="${ID}-backtobrands" id="${ID}-backtobrands"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><path id="arrowback" d="M16.49,16.67,14.973,18.1l-8.483-8,8.483-8L16.49,3.53,9.523,10.1Z" transform="translate(-6.49 -2.1)" fill="#636363"/></svg>
      </button>
      
        <h2> Brands you love </h2>
      
      </div>

      <div class="${ID}-brand-takeover-activebrands">
      
        <div class="${ID}-active-brands" id="${ID}-active-brands">
        
        
        </div>
      
        <div class="${ID}-buttons">
        
          <button id="${ID}-clear-takeover" class="${ID}-clear">Clear</button>

          <button id="${ID}-apply-takeover" class="${ID}-apply">Apply Filters</button>
        
        </div>
      
      </div>

      <div class="${ID}-brand-takeover-list" id="${ID}-brand-takeover-list">
      
      
      </div>
      
    
    
    </div>
  
  
  `;

  // insert HTML

  let insertionPoint = document.querySelector('#productlistcontainer #navlist li:nth-of-type(6)');

  insertionPoint.insertAdjacentHTML('afterend', brandHolderHTML);

  // insert brand HTML

  let allBrandFilters = document.querySelectorAll('.FilterListItem.ABRA');
  let bfInsertionPoint = document.getElementById(`${ID}-brand-takeover-list`);
  let activeBrandFilters = document.getElementById(`${ID}-active-brands`);
  let activeBrandHolder = document.querySelector(`.${ID}-brand-takeover-activebrands`);
  let brandTakeover = document.getElementById(`${ID}-brand-takeover`);

  let allMainFilters = document.querySelectorAll(`.${ID}-brand-item`);
    

  [].slice.call(allBrandFilters).forEach((filter) => {

    let filterName = filter.getAttribute('data-productname');

    let filterNameNormalised = filterName.replace(' ', '-').toLowerCase();

    let filterHTML = `
      <a href="#" class="${ID}-filter" id="${ID}-filter-${filterNameNormalised}" data-filter="${filterName}">
        ${filterName}

      </a>
    `;

    bfInsertionPoint.insertAdjacentHTML('beforeend', filterHTML);

    let filterElementClick = document.getElementById(`${ID}-filter-${filterNameNormalised}`);

    filterElementClick.addEventListener('click', (e) => {
      e.preventDefault();

      let closestFilter = e.target.closest(`.${ID}-filter`);

      let showMoreFilterClickMessage = "Click - brand filter within show more brands clicked";
      logMessage(showMoreFilterClickMessage);
      fireEvent(showMoreFilterClickMessage, true);

      if(closestFilter.classList.contains('active')) {

        closestFilter.classList.remove('active');

        let idTBRemoved = closestFilter.id;
        idTBRemoved = idTBRemoved.replace('filter', 'selected-filter');

        let filterToBeRemoved = document.getElementById(idTBRemoved)

        filterToBeRemoved.remove();

        if(activeBrandFilters.childElementCount == 0) {
          activeBrandHolder.classList.remove('active');
        }

      } else {

        let filterToAdd = closestFilter.getAttribute('data-filter');

        let filterToAddNormalised = filterName.replace(' ', '-').toLowerCase();

        let filterToAddHTML = `
          <a href="#" class="${ID}-selected-filter" data-filter-name="${filterToAdd}" id="${ID}-selected-filter-${filterToAddNormalised}"> ${filterToAdd} </a>
        `

        activeBrandFilters.insertAdjacentHTML('afterbegin', filterToAddHTML);

        closestFilter.classList.add('active');

        activeBrandHolder.classList.add('active');

        document.getElementById(`${ID}-selected-filter-${filterToAddNormalised}`).addEventListener('click', (e) => {

          e.preventDefault();

          e.currentTarget.remove();

          document.getElementById(`${ID}-filter-${filterToAddNormalised}`).classList.remove('active');

          let removeShowMoreFilterClickMessage = "Click - brand filter within show more brands clicked to remove";
          logMessage(removeShowMoreFilterClickMessage);
          fireEvent(removeShowMoreFilterClickMessage, true);

        })

      }

      

      

      

    })

  });


  // add all event listeners

  let allAddLinks = document.querySelectorAll(`.${ID}-brand-item-add, .${ID}-brand-item-name`);

  [].slice.call(allAddLinks).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.closest(`.${ID}-brand-item`).classList.add('active');

      sortList();

      let addSuggestedBrandClickMessage = "Click - suggested brand clicked";
      logMessage(addSuggestedBrandClickMessage);
      fireEvent(addSuggestedBrandClickMessage, true);

    });
  });

  let allRemoveLinks = document.querySelectorAll(`.${ID}-brand-item-remove`);

  [].slice.call(allRemoveLinks).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.closest(`.${ID}-brand-item`).classList.remove('active');

      let removeSuggestedBrandClickMessage = "Click - suggested brand clicked to remove";
      logMessage(removeSuggestedBrandClickMessage);
      fireEvent(removeSuggestedBrandClickMessage, true);

    });
  });

  let clearButton = document.getElementById(`${ID}-clear`);
  clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    [].slice.call(allAddLinks).forEach((link) => {
      link.closest(`.${ID}-brand-item`).classList.remove('active');
    });
    
    let currHref = window.location.href;

    window.location.href = currHref.substring(0, currHref.indexOf('#'));
    
    let clearFiltersClickMessage = "Click - clear filters clicked";
    logMessage(clearFiltersClickMessage);
    fireEvent(clearFiltersClickMessage, true);
    
  });

  let showMoreButton = document.getElementById(`${ID}-showmore`);
  showMoreButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add(`${ID}-noscroll`);
    brandTakeover.classList.add('active');

    [].slice.call(allMainFilters).forEach((filter) => {
      filter.classList.remove('active');
    });

    let clearFiltersClickMessage = "Click - button to show more brand filters clicked";
    logMessage(clearFiltersClickMessage);
    fireEvent(clearFiltersClickMessage, true);

  })

  let closeTakeoverButton = document.getElementById(`${ID}-backtobrands`);
  closeTakeoverButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.remove(`${ID}-noscroll`);
    activeBrandFilters.innerHTML = "";
    brandTakeover.classList.remove('active');
    activeBrandHolder.classList.remove('active');
    let allInnerFilters = document.querySelectorAll(`.${ID}-filter`);

    [].slice.call(allInnerFilters).forEach((filter) => {

      filter.classList.remove('active');

    });

    let closeShowMoreClickMessage = "Click - back to brands clicked";
    logMessage(closeShowMoreClickMessage);
    fireEvent(closeShowMoreClickMessage, true);

  });

  let clearActiveFiltersButton = document.getElementById(`${ID}-clear-takeover`);

  clearActiveFiltersButton.addEventListener('click', (e) => {
    e.preventDefault();
    activeBrandFilters.innerHTML = "";
    activeBrandHolder.classList.remove('active');
    let allInnerFilters = document.querySelectorAll(`.${ID}-filter`);

    [].slice.call(allInnerFilters).forEach((filter) => {

      filter.classList.remove('active');

    });

    let clearShowMoreFiltersClickMessage = "Click - show more clear button clicked";
    logMessage(clearShowMoreFiltersClickMessage);
    fireEvent(clearShowMoreFiltersClickMessage, true);

  })


  let mainApplyButton = document.getElementById(`${ID}-apply`);
  mainApplyButton.addEventListener('click', (e) => {
    let allActive = document.querySelectorAll(`.${ID}-brand-item.active`);

    let windowHref = window.location.href;
    let newURL = "";

    window.scrollTo({
      top: 1,
      left: 0,
      behavior: 'instant'
    });

    if(windowHref.indexOf('#') > -1) {
      windowHref = windowHref.substring(0, windowHref.indexOf('#'));
    } 
    newURL = windowHref + "#dcp=1&dppp=120&OrderBy=rank&Filter=ABRA%5E";

    [].slice.call(allActive).forEach((activeBrandFilter) => {
      let attributeName = activeBrandFilter.getAttribute('data-filter-name');
      newURL += "%2C"+attributeName;
    });

    window.location.href = newURL;

    let mainApplyClickMessage = "Click - main apply button clicked";
    logMessage(mainApplyClickMessage);
    fireEvent(mainApplyClickMessage, true);

  });

  let takeoverApplyButton = document.getElementById(`${ID}-apply-takeover`);
  takeoverApplyButton.addEventListener('click', (e) => {
    let allActive = document.querySelectorAll(`.${ID}-selected-filter`);

    let windowHref = window.location.href;
    let newURL = "";

    window.scrollTo({
      top: 1,
      left: 0,
      behavior: 'instant'
    });


    if(windowHref.indexOf('#') > -1) {
      windowHref = windowHref.substring(0, windowHref.indexOf('#'));
    } 
    newURL = windowHref + "#dcp=1&dppp=120&OrderBy=rank&Filter=ABRA%5E";

    

    [].slice.call(allActive).forEach((activeBrandFilter) => {
      let attributeName = activeBrandFilter.getAttribute('data-filter-name');

      [].slice.call(allMainFilters).forEach((filter) => {
        filter.classList.remove('active');
        if(attributeName == activeBrandFilter.getAttribute('data-filter')) {
          filter.classList.add('active');
        }
      });

      newURL += "%2C"+attributeName;
    });

    window.location.href = newURL;
  
    document.body.classList.remove(`${ID}-noscroll`);
    activeBrandFilters.innerHTML = "";
    brandTakeover.classList.remove('active');
    activeBrandHolder.classList.remove('active');
    let allInnerFilters = document.querySelectorAll(`.${ID}-filter`);

    [].slice.call(allInnerFilters).forEach((filter) => {

      filter.classList.remove('active');

    });

    let showMoreApplyClickMessage = "Click - show more apply button clicked";
    logMessage(showMoreApplyClickMessage);
    fireEvent(showMoreApplyClickMessage, true);
  
  });

}

const sortList = () => {

  let listElements = document.querySelectorAll(`.${ID}-brand-holder-inner .${ID}-brand-item`);
  let listElementHolder = document.querySelector(`.${ID}-brand-holder-inner`);
  [].slice.call(listElements).forEach((element) => {

    if(element.classList.contains('active')) {
      listElementHolder.prepend(element);
    }

  })

}

const addCurrentFilters = () => {

  let currHref = window.location.href;

  let currFilterString = currHref.substring(currHref.indexOf('ABRA') + 10, currHref.indexOf('%7C') > -1 ? currHref.indexOf('%7C') : currHref.length );

  currFilterString = currFilterString.replaceAll('%20', ' ');

  let currFilters = currFilterString.split('%2C');

  [].slice.call(currFilters).forEach((filter) => {

    if(document.querySelector(`.${ID}-brand-item[data-filter-name="${filter}"]`)) {
      document.querySelector(`.${ID}-brand-item[data-filter-name="${filter}"]`).classList.add('active');
    }
    
    if(document.querySelector(`.${ID}-brand-takeover-list .${ID}-filter[data-filter="${filter}"]`)) {
      document.querySelector(`.${ID}-brand-takeover-list .${ID}-filter[data-filter="${filter}"]`).click();
    }
    

  });

}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  let currHref = window.location.href;
  let pageFilters = [];
  let pageIsInList = false;
  [].slice.call(defaultFilters).forEach((filter) => {

    if(currHref.indexOf(filter.url) > -1) {
      pageFilters = filter.filters;
      pageIsInList = true;
    }

  });

  if(pageIsInList === true) {

    pollerLite(['#productlistcontainer #navlist li:nth-of-type(6)'], () => {
      makePageAmends(pageFilters);
    })
    

    let visibleMessage = "Visible - element shown";
    logMessage(visibleMessage);
    fireEvent(visibleMessage);

    // Trigger re render on pagniation change
    const wrap = document.querySelector('#navlist');
    observer.connect(wrap, () => {

        pollerLite(['#productlistcontainer #navlist li:nth-of-type(6)'], () => {
          if(!document.querySelector(`.${ID}-brand-holder`)) {
            makePageAmends(pageFilters);
          }
          addCurrentFilters();
        })
        

    }, {
        config: {
            attributes: true,
            childList: true,
            subtree: false,
        }
    })
  } 

  

  // Write experiment code here
  // ...
};
