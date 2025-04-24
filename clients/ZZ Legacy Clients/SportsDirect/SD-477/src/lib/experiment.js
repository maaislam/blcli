/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let theFilterList;

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}

const closeFilters = () => {
  let theFilterListItems = document.querySelectorAll('.productFilter');
  [].slice.call(theFilterListItems).forEach((item) => {
    item.querySelector('.productFilterList').style.display = "none";
    item.classList.remove(`${ID}-active`);
  });
}

const addFilterDetailBoxes = () => {
  let theFilterListItems = document.querySelectorAll('.productFilter');
  let filterBoxHTML = `
    
      <div class="${ID}-filter-detail">
        <a href="javascript:void(0)" onclick="SetVal(null, 'CLEAR','ACOL')" class="${ID}-clear-all">Clear all</a>
        <p class="${ID}-selected">1 selected</p>
        <p class="${ID}-selected-items">Reebok, Adidas, New Balance</p>
      
      </div> 
    `;

  [].slice.call(theFilterListItems).forEach((item) => {
    
    let onclickVal = item.querySelector('.productFilterClear').getAttribute('onclick');
    item.querySelector('.productFilterList').insertAdjacentHTML('afterbegin', filterBoxHTML);
    item.querySelector(`.${ID}-clear-all`).setAttribute('onclick', onclickVal);

  });

}

const updateFilterDetailBoxes = () => {

  let theFilters = document.querySelectorAll('.productFilter');
  

  [].slice.call(theFilters).forEach((item) => {
    let selectedItems = [];

    let theFilterListItems = item.querySelectorAll('.FilterListItem');

    if(item.querySelector('#PriceFilterTextEntry')) {
      
      let priceFilter = document.getElementById('PriceFilterTextEntry');

      if(priceFilter.querySelector('#PriceFilterTextEntryMin').value != "" || priceFilter.querySelector('#PriceFilterTextEntryMax').value != "") {
        selectedItems.push(`Price: £${priceFilter.querySelector('#PriceFilterTextEntryMin').value} to £${priceFilter.querySelector('#PriceFilterTextEntryMax').value}`);
      } else {
        selectedItems.filter((item) => {
          if(item.children.length > 0) {
            item.filter((childItem) => {
              if(childItem == "Price: £ to £") {
                return false;
              } else {
                return true;
              }
            })
            
          }

          return true;
          
        })
      }
    } 

    [].slice.call(theFilterListItems).forEach((listItem) => {

      let checkbox = listItem.querySelector('span[role="checkbox"]');
      checkbox.closest('.FilterListItem').classList.remove(`${ID}-filter-active`);
      if(checkbox.classList.contains('SelectedFilter')) {
        selectedItems.push(checkbox.querySelector('.FilterName').getAttribute('data-filtername'));
        checkbox.closest('.FilterListItem').classList.add(`${ID}-filter-active`);
      }

    });

    

    

    item.querySelector(`.${ID}-selected`).innerText = `${selectedItems.length} selected`;

    item.querySelector(`.${ID}-selected-items`).innerHTML = `${selectedItems.map((item) => { return `<span class="${ID}-selected-item">${item}</span>`; }).join('')}`;

    item.querySelector(`.${ID}-selected-items`).insertAdjacentHTML('beforeend', `<a href="#" id="${ID}-selected-filters--clearbutton" class="${ID}-selected-filters--clearbutton">Clear all</a>`);

    if(selectedItems.length == 0) {
      item.querySelector(`.${ID}-filter-detail`).classList.remove(`${ID}-active`);
      item.querySelector(`.${ID}-number`).innerText = `(0)`;
      item.classList.remove(`${ID}-filters-active`);
    } else {
      item.querySelector(`.${ID}-filter-detail`).classList.add(`${ID}-active`);
      item.querySelector(`.${ID}-number`).innerText = `(${selectedItems.length})`;
      item.classList.add(`${ID}-filters-active`);
    }


  });

  



}

const updateSelectedItems = () => {

  let allCurrSelectedFilters = document.querySelectorAll('#FilterContainer #filterlist .FilterListItem .SelectedFilter');
  let selectedItemsHolder = document.querySelector(`.${ID}-selected-filters`);

  selectedItemsHolder.querySelector(`.${ID}-selected-filters--items`).innerHTML = "";

  [].slice.call(allCurrSelectedFilters).forEach((item) => {
    let filterName = item.querySelector('.FilterName').getAttribute('data-filtername');
    selectedItemsHolder.querySelector(`.${ID}-selected-filters--items`).innerHTML += `<a href="#" class="${ID}-selected-filters--itemssingle" data-filter="${filterName}">${filterName}</a>`;
  });

  if (document.querySelector('#PriceFilterTextEntry')) {
    let priceFilter = document.getElementById('PriceFilterTextEntry');

    if (document.querySelector('#PriceFilterTextEntryMin').value != "" || document.querySelector('#PriceFilterTextEntryMax').value != "") {
      selectedItemsHolder.querySelector(`.${ID}-selected-filters--items`).innerHTML += `<a href="#" class="${ID}-selected-filters--itemssingle specialPriceFilter" data-filter="specialPriceFilter">£${priceFilter.querySelector('#PriceFilterTextEntryMin').value} to £${priceFilter.querySelector('#PriceFilterTextEntryMax').value}</a>`;
    }
  } 

  selectedItemsHolder.querySelector(`.${ID}-selected-filters--items`).insertAdjacentHTML('beforeend', `<a href="#" id="${ID}-selected-filters--clearbutton" class="${ID}-selected-filters--clearbutton">Clear all</a>`);

  let numFilters = allCurrSelectedFilters.length;
  if(document.querySelector(`.${ID}-selected-filters--itemssingle.specialPriceFilter`)) {
    numFilters ++;
  }

  selectedItemsHolder.setAttribute('data-filters', numFilters);

  let allNewSelectedFilters = document.querySelectorAll(`.${ID}-selected-filters--itemssingle`);
  [].slice.call(allNewSelectedFilters).forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let filterName = item.getAttribute('data-filter');
      if(filterName == "specialPriceFilter") {
        window.SetVal(null, 'CLEAR', 'APRI')
      } else {
        let theFilter = document.querySelector(`.FilterListItem[data-productname="${filterName}"] .FilterAnchor`);
        theFilter.click();
      }
      

      fireEvent(`Click - user has used the selected filters below to remove filter: ${filterName}`, true);
    });
  });


}

const setupFixedPosition = () => {

  let snapPosition = document.querySelector('.ImgTxtContainer').getBoundingClientRect().bottom;
  window.addEventListener('scroll', () => {
    if (window.scrollY < 200) {
      theFilterList.classList.remove(`${ID}-scrolling`);
    } else if (window.scrollY > snapPosition) {
      if(!theFilterList.classList.contains(`${ID}-scrolling`)) {
        theFilterList.classList.add(`${ID}-scrolling`);
      }
    } 
  });


}

const startExperiment = () => {

  pollerLite(['#FilterContainer', '.productFilter', '#filterlist'], () => {

    let theSortOptions = document.getElementById('divSortOptions');

    theFilterList = document.getElementById('filterlist');

    theFilterList.insertAdjacentElement('afterbegin', theSortOptions);

    let theFilterListItems = document.querySelectorAll('.productFilter');

    let theSelectedItemsHolderHTML = `
      <div class="${ID}-selected-filters" data-filters="0">
        <div class="${ID}-selected-filters--header">SELECTED FILTERS:</div>
        <div class="${ID}-selected-filters--items"></div>
      </div>    
    `;

    document.getElementById('FilterContainer').insertAdjacentHTML('afterend', theSelectedItemsHolderHTML);

    
    document.body.addEventListener('click', (e) => {
      if (e.target.closest(`.${ID}-selected-filters--clearbutton`)) {
        window.SetVal(null, 'CLEAR', '###')
        closeFilters();
        document.getElementById('clrallfltrs').querySelector('a').click();
        fireEvent(`Click - user has used the clear all button`, true);
      }
      
    });

    [].slice.call(theFilterListItems).forEach((item) => {

      if(item.querySelector('.productFilterTitle').innerText.trim() == "Avg. Customer Review") {
        item.querySelector('.productFilterTitle').innerText = "Avg Review";
      }

      if(item.querySelector('.productFilterTitle').innerText.trim() == "Price") {
        document.getElementById('divSortOptions').insertAdjacentElement('afterend', item);
      }

      if(item.querySelector('.productFilterTitle').innerText.trim() == "Size") {
        document.getElementById('divSortOptions').insertAdjacentElement('afterend', item);
      }

      let arrowHTML = `
        <span class="${ID}-number">(1)</span>
      `

      item.querySelector('.productFilterTitle').insertAdjacentHTML('beforeend', arrowHTML);

      item.querySelector('.productFilterTitleBox').addEventListener('click', (e) => {

        let clickedTitle = e.currentTarget.querySelector('.productFilterTitle').innerText;

        [].slice.call(theFilterListItems).forEach((theItem) => {

          if(theItem.querySelector('.productFilterTitle').innerText != clickedTitle) {
            theItem.closest('.productFilter').querySelector('.productFilterList').style.display = "none";
            theItem.closest('.productFilter').classList.remove(`${ID}-active`);
          } else {
            theItem.closest('.productFilter').querySelector('.productFilterList').style.display = "";
          }

        })

        if(e.currentTarget.closest('.productFilter').classList.contains(`${ID}-active`)) {
          e.currentTarget.closest('.productFilter').classList.remove(`${ID}-active`);
          fireAndLogEvent(`Click - user has clicked to close top level item: ${clickedTitle}`);
        } else {
          e.currentTarget.closest('.productFilter').classList.add(`${ID}-active`);
          fireAndLogEvent(`Click - user has clicked to open top level item: ${clickedTitle}`);
        }

      })

    });

    addFilterDetailBoxes();
    updateFilterDetailBoxes();
    updateSelectedItems();
    fireAndLogEvent('Visible - experiment shown to the user');
    setupFixedPosition();
    
    document.body.addEventListener('click', (e) => {
      
      if (!e.target.closest('#filterlist')) {
        let allCurrOpenProductFilters = document.querySelectorAll(`.${ID}-active.productFilter`);
        [].slice.call(allCurrOpenProductFilters).forEach((filter) => {
          filter.classList.remove(`${ID}-active`);
        });
      }

      
    });
    

    observer.connect(document.getElementById('navlist'), () => {
      updateFilterDetailBoxes();
      updateSelectedItems();
      setupFixedPosition();
      
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });
    
  })

}

const addEvents = () => {

  pollerLite(['#FilterContainer', '.productFilter', '#filterlist'], () => {

    let allFilterAnchors = document.querySelectorAll('#filterlist .FilterAnchor');

    [].slice.call(allFilterAnchors).forEach((anchor) => {
      
      anchor.addEventListener('click', (e) => {
        let filterName = e.currentTarget.querySelector('.FilterName').getAttribute('data-filtername');
        let parentFilter = e.currentTarget.closest('.productFilter').querySelector('.productFilterTitle').innerText;
        fireAndLogEvent(`Click - filter anchor clicked and filter: ${filterName} was applied from list: ${parentFilter}`);
      });

    });

    if(VARIATION == "control") {

      let allTopAnchors = document.querySelectorAll('#filterlist .productFilterTitleBox');

      [].slice.call(allTopAnchors).forEach((anchor) => {

        anchor.addEventListener('click', (e) => {
          let title = e.currentTarget.querySelector('.productFilterTitle').innerText;
          fireAndLogEvent(`Click - user has clicked the top level item: ${title}`);          
        });

      })


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

  addEvents();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  pollerLite(['#filterlist'], () => {
    if(document.querySelector('#filterlist li:first-of-type').innerText.indexOf("No Filters") !== 0) {
      document.documentElement.classList.add(`${ID}-exp-started`);
      startExperiment();
    } 
  })
  
  

  
};
