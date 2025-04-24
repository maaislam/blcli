/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, observer, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID } = shared;
let filterList = document.getElementById('filterlist');
let filterOneOptions = [].slice.call(filterList.querySelectorAll('.productFilter:nth-of-type(1) .FilterListItem'));
let filterTwoOptions = [].slice.call(filterList.querySelectorAll('.productFilter:nth-of-type(2) .FilterListItem'));
let filterThreeOptions = [].slice.call(filterList.querySelectorAll('.productFilter:nth-of-type(3) .FilterListItem'));

const updateFilterOptions = () => {
  filterList = document.getElementById('filterlist');
  filterOneOptions = [].slice.call(filterList.querySelectorAll('.productFilter:nth-of-type(1) .FilterListItem'));
  filterTwoOptions = [].slice.call(filterList.querySelectorAll('.productFilter:nth-of-type(2) .FilterListItem'));
  filterThreeOptions = [].slice.call(filterList.querySelectorAll('.productFilter:nth-of-type(3) .FilterListItem'));
  

  let allFilterOptions = [filterOneOptions, filterTwoOptions, filterThreeOptions];

  allFilterOptions.forEach((options) => {

    options.forEach((option) => {
      let optionName = option.getAttribute('data-productname');
      let optionCount = option.getAttribute('data-productcount');
      let optionSelected = option.querySelector('span[role="checkbox"]').getAttribute('aria-checked') == `true` ? `true` : `false`;
      let optionGreyed = option.querySelector('.FilterAnchor').classList.contains('greyOut') ? `true` : `false`;

      let buttonToBeUpdated = document.querySelector(`.${ID}-filter-options--button[data-filter-name="${optionName}"]`);
      buttonToBeUpdated.querySelector(`.${ID}-filter-options--buttoncount`).innerHTML = `(${optionCount})`;

      buttonToBeUpdated.setAttribute('data-selected', optionSelected);
      buttonToBeUpdated.setAttribute('data-greyed', optionGreyed);
  
    });

  })

  let prodsFound = document.getElementById('prdsFound').innerHTML;
  let newProdSection = document.getElementById(`${ID}-filterbar--filterinforesults`);
  newProdSection.innerHTML = prodsFound;
  

}

const startExperiment = () => {

  document.documentElement.classList.add('filters-updated');

  let newFilterHTML = `
    <div class="${ID}-filters">
      <div class="${ID}-filterbar">
      
        <div class="${ID}-filterbar--filterinfo">
          <p>
            <span class="${ID}-filterbar--filterinfotext">FILTER</span>
            <span id="${ID}-filterbar--filterinforesults">0 / 0 products</span> 
          </p>
        </div>
      
        <div class="${ID}-filterbar--filters"></div>

        <div class="${ID}-filterbar--sortby"></div>
    
      </div>
    
    </div>
    
  
  `;

  let insertionPoint = document.getElementById('FiltersAndProductsWrapper');
  insertionPoint.previousElementSibling.remove();
  insertionPoint.insertAdjacentHTML('beforebegin', newFilterHTML);

  

  // set up variables

  //let filterResultsSection = document.querySelector(`.${ID}-filterbar--filterinfo`);
  let filterMainSection = document.querySelector(`.${ID}-filterbar--filters`);
  let filterSortbySection = document.querySelector(`.${ID}-filterbar--sortby`);
  let filterContainer = document.getElementById('FilterContainer');

  // move the sortby

  let sortbyElement = document.getElementById('divSortOptions');
  filterSortbySection.insertAdjacentElement('afterbegin', sortbyElement);
  sortbyElement.querySelector('.sortOptionsHeader').classList.add(`${ID}-arrow`);
  sortbyElement.querySelector('.sortOptionsHeader').classList.add(`${ID}-updated-sort`);

  // update the look/feel of the view amount box

  let viewBox = document.querySelector('.pag-items-left');
  viewBox.insertAdjacentHTML('afterbegin', `<p>View: </p>`);

  // move the top three filters

  pollerLite(['#filterlist'], () => {
    let filterOneTitle = filterList.querySelector('.productFilter:nth-of-type(1) .productFilterTitle').innerText.toLowerCase();

    let newFilterOneHTML = `
      <div class="${ID}-filter-holder ${ID}-filter-one-holder">
        <button id="${ID}-filter-one" class="${ID}-filter-button ${ID}-arrow"> ${filterOneTitle} </button>
        <div class="${ID}-filter-options ${ID}-filter-one-options">
  
          <div class="${ID}-filter-one-options--search"><input type="text" id="${ID}-filter-one-options--searchinput" class="${ID}-filter-one-options--searchinput" placeholder="Search Brand" /></div>
        
          <div class="${ID}-filter-options--items" id="${ID}-filter-one-options--items">
          
            ${filterOneOptions.map((option) => {
                
                
            
                let optionName = option.getAttribute('data-productname');
                let optionCount = option.getAttribute('data-productcount');
                let optionSelected = option.querySelector('span[role="checkbox"]').getAttribute('aria-checked') == `true` ? `true` : `false`;
                let optionGreyed = option.querySelector('.FilterAnchor').classList.contains('greyOut') ? `true` : `false`;
            
                return `
                
                  <button class="${ID}-filter-options--button" data-filter-name="${optionName}" data-selected="${optionSelected}" data-selected="${optionGreyed}">
                    <span class="${ID}-filter-options--buttontext">${optionName}</span>
                    <span class="${ID}-filter-options--buttoncount">(${optionCount})</span>
                  </button>
                
                `;
              }).join('')}
          
          </div>
        
        </div>  
      </div>
    `;
  
    let filterTwoTitle = filterList.querySelector('.productFilter:nth-of-type(2) .productFilterTitle').innerText.toLowerCase();
  
    let newFilterTwoHTML = `
      <div class="${ID}-filter-holder ${ID}-filter-two-holder">
        <button class="${ID}-filter-button ${ID}-arrow"> ${filterTwoTitle} </button>
        <div class="${ID}-filter-options ${ID}-filter-two-options">
  
          <div class="${ID}-filter-options--items" id="${ID}-filter-two-options--items">
          
            ${filterTwoOptions.map((option) => {
                
                
            
                let optionName = option.getAttribute('data-productname');
                let optionCount = option.getAttribute('data-productcount');
                let optionSelected = option.querySelector('span[role="checkbox"]').getAttribute('aria-checked') == `true` ? `${ID}-selected` : ``;
                let optionGreyed = option.querySelector('.FilterAnchor').classList.contains('greyOut') ? `${ID}-greyed` : ``;
            
                return `
                
                  <button class="${ID}-filter-options--button ${optionSelected} ${optionGreyed}" data-filter-name="${optionName}">
                    <span class="${ID}-filter-options--buttontext">${optionName}</span>
                    <span class="${ID}-filter-options--buttoncount">(${optionCount})</span>
                  </button>
                
                `;
              }).join('')}
          
          </div>
          
        </div>  
      </div>
    `;
  
    let filterThreeTitle = filterList.querySelector('.productFilter:nth-of-type(3) .productFilterTitle').innerText.toLowerCase();
  
    let newFilterThreeHTML = `
      <div class="${ID}-filter-holder ${ID}-filter-three-holder">
        <button class="${ID}-filter-button ${ID}-arrow"> ${filterThreeTitle} </button>
        <div class="${ID}-filter-options ${ID}-filter-three-options">
  
          <div class="${ID}-filter-options--items" id="${ID}-filter-three-options--items">
          
            ${filterThreeOptions.map((option) => {
                
                
            
                let optionName = option.getAttribute('data-productname');
                let optionCount = option.getAttribute('data-productcount');
                let optionSelected = option.querySelector('span[role="checkbox"]').getAttribute('aria-checked') == `true` ? `${ID}-selected` : ``;
                let optionGreyed = option.querySelector('.FilterAnchor').classList.contains('greyOut') ? `${ID}-greyed` : ``;
            
                return `
                
                  <button class="${ID}-filter-options--button ${optionSelected} ${optionGreyed}" data-filter-name="${optionName}">
                    <span class="${ID}-filter-options--buttontext">${optionName}</span>
                    <span class="${ID}-filter-options--buttoncount">(${optionCount})</span>
                  </button>
                
                `;
              }).join('')}
          
          </div>
        </div>  
      </div>
    `;
  
    
   
    filterMainSection.insertAdjacentHTML('beforeend', newFilterOneHTML);
    filterMainSection.insertAdjacentHTML('beforeend', newFilterTwoHTML);
    filterMainSection.insertAdjacentHTML('beforeend', newFilterThreeHTML);

    // move the 'top section' if it exists

  if(document.querySelector('.ChildCategoriesListWrapper')) {
    let sectionInsertionPoint = document.querySelector(`.${ID}-filterbar--filters`);

    let sectionItems = [].slice.call(document.querySelectorAll('#ChildCategoriesList li a'));

    let sectionHTML = `
      <div class="${ID}-filter-holder ${ID}-filter-four-holder">
        <button id="${ID}-filter-four" class="${ID}-filter-button ${ID}-arrow"> In This Section </button>
        <div class="${ID}-filter-options ${ID}-filter-four-options">
        
          <div class="${ID}-filter-options--items" id="${ID}-filter-four-options--items">
          
            ${sectionItems.map((option) => {
                
                return `
                
                  <a href="${option.href}" class="${ID}-filter-options--link">${option.innerText.toLowerCase()}</a>
                
                `;
              }).join('')}
          
          </div>
        </div>  
      </div>
    `;

    sectionInsertionPoint.insertAdjacentHTML('afterbegin', sectionHTML);


  }

  let filterClicks = [].slice.call(document.querySelectorAll(`.${ID}-filter-button`));
  filterClicks.forEach((filterClick) => {
    filterClick.addEventListener('click', (e) => {
      
      if(e.currentTarget.closest(`.${ID}-filter-holder`).classList.contains(`${ID}-filterbutton-active`)) {
        e.currentTarget.closest(`.${ID}-filter-holder`).classList.remove(`${ID}-filterbutton-active`);
        e.currentTarget.classList.remove(`${ID}-filterbutton-active`);
        e.currentTarget.nextElementSibling.classList.remove(`${ID}-filter-active`);

        fireEvent(`Click - user has clicked on cloned filter option ${e.currentTarget.innerText} to close it`, true);

      } else {

        filterClicks.forEach((filter) => {
          filter.closest(`.${ID}-filter-holder`).classList.remove(`${ID}-filterbutton-active`);
          filter.classList.remove(`${ID}-filterbutton-active`);
          filter.nextElementSibling.classList.remove(`${ID}-filter-active`);
        })

        e.currentTarget.closest(`.${ID}-filter-holder`).classList.add(`${ID}-filterbutton-active`);
        e.currentTarget.classList.add(`${ID}-filterbutton-active`);
        e.currentTarget.nextElementSibling.classList.add(`${ID}-filter-active`);

        fireEvent(`Click - user has clicked on cloned filter option ${e.currentTarget.innerText} to open it`, true);

      }
      
    });
  });

  

  // Add Event Listeners for all

  let allSingleOptions = [].slice.call(document.querySelectorAll(`.${ID}-filter-options--button`));
  allSingleOptions.forEach((single) => {

    single.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      let currFilterName = e.currentTarget.getAttribute('data-filter-name');
      document.querySelector(`#FilterContainer .FilterListItem[data-productname="${currFilterName}"] > a`).click();

    })

  })
  
  updateFilterOptions();

  let clonedBrandSearch = document.getElementById(`${ID}-filter-one-options--searchinput`);
  let brandOptions = [].slice.call(document.querySelectorAll(`.${ID}-filter-one-holder .${ID}-filter-options--button`));
  clonedBrandSearch.addEventListener('keyup', () => {
    brandOptions.filter((option) => {

      if(option.getAttribute('data-filter-name').toLowerCase().indexOf(clonedBrandSearch.value.toLowerCase()) == -1) {
        option.classList.add(`${ID}-hidden`);
      } else {
        option.classList.remove(`${ID}-hidden`);
      }
    });


  });

  

  // create the more filters button & functionality

  let moreFiltersButtonHTML = `
  
    <button id="${ID}-more-filters" class="${ID}-more-filters ${ID}-arrow"> All Filters </button>
  
  `;

  filterMainSection.insertAdjacentHTML('beforeend', moreFiltersButtonHTML);

  let moreFiltersButton = document.getElementById(`${ID}-more-filters`);
  moreFiltersButton.addEventListener('click', () => {

    filterClicks.forEach((filter) => {
      filter.closest(`.${ID}-filter-holder`).classList.remove(`${ID}-filterbutton-active`);
      filter.classList.remove(`${ID}-filterbutton-active`);
      filter.nextElementSibling.classList.remove(`${ID}-filter-active`);
    })

    document.documentElement.classList.add(`${ID}-noscroll`);
    filterContainer.classList.add(`${ID}-active`);

    fireEvent(`Click - user has clicked on All Filters button to open the slideout filter`, true);

  });

  filterContainer.insertAdjacentHTML('afterbegin', `<button id="${ID}-close-filters" class="${ID}-close-filters"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/></svg></button>`);

  let closeFilterButton = document.querySelector(`.${ID}-close-filters`);
  closeFilterButton.addEventListener('click', () => {
    document.documentElement.classList.remove(`${ID}-noscroll`);
    filterContainer.classList.remove(`${ID}-active`);
  })

  document.documentElement.addEventListener('click', (e) => {
    if(e.target.classList.contains(`${ID}-noscroll`) && !e.target.closest(`#FilterContainer`)) {
      document.documentElement.classList.remove(`${ID}-noscroll`);
      filterContainer.classList.remove(`${ID}-active`);
    } 
  });

  // update selected filters text

  let selectedFilterLabel = document.querySelector('.SelectedFiltersLabel');
  selectedFilterLabel.innerHTML = `Selected Filters:`;
  

  // observer to update filter options 

  observer.connect(document.getElementById('navlist'), () => {

    setTimeout(() => {
      updateFilterOptions();
    }, 200);
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true,
    }
  });


  });

  

  

}

const addEvents = () => {

  let allFilterAnchors = document.querySelectorAll('.FilterAnchor');

  [].slice.call(allFilterAnchors).forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      fireEvent(`Click - user has clicked on an item within ${e.currentTarget.closest('.productFilter').querySelector('.productFilterTitle').innerText} filter and applied ${e.currentTarget.closest('.FilterListItem').getAttribute('data-productname')} `, true);
    });
  });

  document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains('hotspotbuy') || e.target.closest('.hotspotbuy')) {
      fireEvent(`Click - user has clicked on quick buy for product ${e.target.closest('.hotspotbuy').getAttribute('data-colourvariantid')}`, true);
    }

    if(e.target.closest('a') && e.target.closest('#navlist')) {
      fireEvent(`Click - user has clicked to go through to PDP href ${e.target.closest('a').href}`);
    }

  });


}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEvents();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...


  startExperiment();


};
