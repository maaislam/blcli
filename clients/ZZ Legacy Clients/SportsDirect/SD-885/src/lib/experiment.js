/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID } = shared;
let observerAdded = false;

const updateProductFilterData = () => {

  pollerLite([`#${ID}-filtersort--productnumbervalue`, '.totalProducts', `#${ID}-filtersort--triggerbuttonnumber`], () => {
    let totalNumProducts = parseInt(document.querySelector('.totalProducts').innerText);
    if(document.querySelector('#navlist li:first-of-type').innerHTML == "No Products Found") {
      document.getElementById(`${ID}-filtersort--productnumbervalue`).innerHTML = `0 products`;
      document.getElementById(`${ID}-filtercontainer--productnumbervalue`).innerHTML = `0 products`;
      
    } else {
      document.getElementById(`${ID}-filtersort--productnumbervalue`).innerHTML = `${totalNumProducts} ${totalNumProducts > 1 ? `products` : `product`}`;
      document.getElementById(`${ID}-filtercontainer--productnumbervalue`).innerHTML = `${totalNumProducts} ${totalNumProducts > 1 ? `products` : `product`}`;
      
    }
  });

  pollerLite(['#FilterContainer'], () => {
    let allAppliedFilters = document.querySelectorAll('#filterlist .SelectedFilter');  
    if(allAppliedFilters.length == 0) {
      document.getElementById(`${ID}-filtersort--triggerbutton`).classList.remove(`${ID}-active`);
    } else {
      document.getElementById(`${ID}-filtersort--triggerbutton`).classList.add(`${ID}-active`);
    }
    document.getElementById(`${ID}-filtersort--triggerbuttonnumber`).setAttribute('data-value', allAppliedFilters.length);
    document.getElementById(`${ID}-filtersort--triggerbuttonnumber`).innerHTML = allAppliedFilters.length;

    document.getElementById(`${ID}-filtercontainer--filternumbervalue`).setAttribute('data-value', allAppliedFilters.length);
    document.getElementById(`${ID}-filtercontainer--filternumbervalue`).innerHTML = allAppliedFilters.length;

  })

  updateValues();

}

const updateValues = () => {

  let allFilterValues = document.querySelectorAll('.FilterListItem .FilterValue');
    [].slice.call(allFilterValues).forEach((value) => {
      let currValue = value.innerText == "" ? "0" : value.innerText;
      let newValue = currValue.replaceAll('(', '').replaceAll(')', '').trim();
      value.setAttribute('data-value', newValue == "" ? "0" : newValue);
      value.innerText = newValue;
    });

}

const startExperiment = () => {

  setTimeout(() => {
    let newFilterBarHTML = `
  
      <div class="${ID}-filtersort">
      
        <div class="${ID}-filtersort--productnumber">
          <span id="${ID}-filtersort--productnumbervalue">1000 products</span>
          
        </div>

        <div class="${ID}-filtersort--trigger">
          <button id="${ID}-filtersort--triggerbutton" class="${ID}-filtersort--triggerbutton">
          
            <span class="${ID}-filtersort--triggerbuttonsvg">
            <svg width="15" height="15" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.7405 8.99963C16.7405 8.4692 16.5094 7.96049 16.0981 7.58542C15.6867 7.21035 15.1289 6.99963 14.5471 6.99963C13.9654 6.99963 13.4075 7.21035 12.9962 7.58542C12.5849 7.96049 12.3538 8.4692 12.3538 8.99963L16.7405 8.99963ZM16.7405 8.99963C16.7405 9.53007 16.5094 10.0388 16.0981 10.4138C15.6867 10.7889 15.1289 10.9996 14.5471 10.9996C13.9654 10.9996 13.4075 10.7889 12.9962 10.4138C12.5849 10.0388 12.3538 9.53007 12.3538 8.99963L16.7405 8.99963ZM3.58041 2.99963C3.58041 3.53007 3.81149 4.03877 4.22282 4.41385C4.63416 4.78892 5.19204 4.99963 5.77375 4.99963C6.35547 4.99963 6.91335 4.78892 7.32468 4.41385C7.73602 4.03877 7.9671 3.53007 7.9671 2.99963L3.58041 2.99963ZM3.58041 2.99963C3.58041 2.4692 3.81149 1.96049 4.22282 1.58542C4.63416 1.21035 5.19204 0.999633 5.77375 0.999633C6.35547 0.999633 6.91335 1.21035 7.32468 1.58542C7.73602 1.96049 7.9671 2.4692 7.9671 2.99963L3.58041 2.99963Z" fill="#000"/><path d="M16.7405 8.99963L18.9338 8.99963M16.7405 8.99963C16.7405 8.4692 16.5094 7.96049 16.0981 7.58542C15.6867 7.21035 15.1289 6.99963 14.5471 6.99963C13.9654 6.99963 13.4075 7.21035 12.9962 7.58542C12.5849 7.96049 12.3538 8.4692 12.3538 8.99963M16.7405 8.99963L12.3538 8.99963M16.7405 8.99963C16.7405 9.53007 16.5094 10.0388 16.0981 10.4138C15.6867 10.7889 15.1289 10.9996 14.5471 10.9996C13.9654 10.9996 13.4075 10.7889 12.9962 10.4138C12.5849 10.0388 12.3538 9.53007 12.3538 8.99963M12.3538 8.99963L1.38706 8.99963M3.58041 2.99963C3.58041 3.53007 3.81149 4.03877 4.22282 4.41385C4.63416 4.78892 5.19204 4.99963 5.77375 4.99963C6.35547 4.99963 6.91335 4.78892 7.32468 4.41385C7.73602 4.03877 7.9671 3.53007 7.9671 2.99963M3.58041 2.99963L7.9671 2.99963M3.58041 2.99963C3.58041 2.4692 3.81149 1.96049 4.22282 1.58542C4.63416 1.21035 5.19204 0.999633 5.77375 0.999633C6.35547 0.999633 6.91335 1.21035 7.32468 1.58542C7.73602 1.96049 7.9671 2.4692 7.9671 2.99963M3.58041 2.99963L1.38706 2.99963M7.9671 2.99963L18.9338 2.99963" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <span class="${ID}-filtersort--triggerbuttontext">Filter &amp; Sort</span>
            <span class="${ID}-filtersort--triggerbuttonnumber" id="${ID}-filtersort--triggerbuttonnumber" data-value="0">0</span>

          </button>
        </div>
      
      </div>
    
    `;

    let insertionPoint = document.querySelector('.flexFilters');

    insertionPoint.insertAdjacentHTML('beforebegin', newFilterBarHTML);

    // setting up the triggers for the filter/sort button

    let currFilterTrigger = document.getElementById('filterByMob');
    let triggerButton = document.getElementById(`${ID}-filtersort--triggerbutton`);
    triggerButton.addEventListener('click', () => {
      currFilterTrigger.click();
      fireEvent(`Click - user has clicked to open the filters`);
    });

    let closeFilterButton = document.getElementById('mobclsfltrs');

    closeFilterButton.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.293031 1.29301C0.480558 1.10553 0.734866 1.00022 1.00003 1.00022C1.26519 1.00022 1.5195 1.10553 1.70703 1.29301L6.00003 5.58601L10.293 1.29301C10.3853 1.19749 10.4956 1.12131 10.6176 1.0689C10.7396 1.01649 10.8709 0.988908 11.0036 0.987754C11.1364 0.986601 11.2681 1.0119 11.391 1.06218C11.5139 1.11246 11.6255 1.18672 11.7194 1.28061C11.8133 1.3745 11.8876 1.48615 11.9379 1.60905C11.9881 1.73195 12.0134 1.86363 12.0123 1.99641C12.0111 2.12919 11.9835 2.26041 11.9311 2.38241C11.8787 2.50441 11.8025 2.61476 11.707 2.707L7.41403 7L11.707 11.293C11.8892 11.4816 11.99 11.7342 11.9877 11.9964C11.9854 12.2586 11.8803 12.5094 11.6948 12.6948C11.5094 12.8802 11.2586 12.9854 10.9964 12.9877C10.7342 12.99 10.4816 12.8892 10.293 12.707L6.00003 8.414L1.70703 12.707C1.51843 12.8892 1.26583 12.99 1.00363 12.9877C0.741432 12.9854 0.49062 12.8802 0.305212 12.6948C0.119804 12.5094 0.0146347 12.2586 0.0123563 11.9964C0.0100779 11.7342 0.110873 11.4816 0.293031 11.293L4.58603 7L0.293031 2.707C0.10556 2.51948 0.000244141 2.26517 0.000244141 2C0.000244141 1.73484 0.10556 1.48053 0.293031 1.29301Z" fill="black"/></svg>`;
    closeFilterButton.addEventListener('click', () => {
      document.getElementById('FilterContainer').classList.remove('activeFilter');
      fireEvent('Click - user clicked close X button at the top to close the filters'); 
    });

    let applyFilterButton = document.getElementById('mobappfltrs');
    applyFilterButton.closest('#mobFilterControls').classList.add(`${ID}-filterbuttons`)
    applyFilterButton.addEventListener('click', () => {
      document.getElementById('FilterContainer').classList.remove('activeFilter');
      fireEvent('Click - user clicked close filters button at the bottom to close the filters'); 
    });

    // updating the filter bar on the right

    document.getElementById('FilterContainer').classList.add(`${ID}-filtercontainer`);
    document.querySelector('#FilterContainer .MobFiltersText').innerText = "Filters";
    document.querySelector('#FilterContainer .FiltersTitle').insertAdjacentHTML('beforeend', `<div id="${ID}-filtercontainer--productnumbervalue" class="${ID}-filtercontainer--productnumbervalue">1000 products</div>`)
    document.querySelector('#FilterContainer .MobFiltersText').insertAdjacentHTML('beforeend', `<div id="${ID}-filtercontainer--filternumbervalue" class="${ID}-filtercontainer--filternumbervalue" data-value="0">0</div>`)

    // updating the number of products / number of filters applied

    updateProductFilterData();

    // set up 'show only 5' functionality

    let showMoreButtonHTML = `<button class="${ID}-show-more">See more</button>`;
    let searchInputHTML = `<div class="${ID}-search"><input type="text" class="${ID}-search--input" placeholder="Search..." /></div>`;

    let allProductFilterLists = document.querySelectorAll('.productFilterList');
    [].slice.call(allProductFilterLists).forEach((list) => {
      if(!list.querySelector('.FilterListItem').classList.contains('ACOL') && !list.closest('.MobSortSelector')) {
        let listFilterItems = list.querySelectorAll('.FilterListItem');
        if(listFilterItems.length > 5) {
          list.classList.add(`${ID}-five-shown`);
          list.insertAdjacentHTML('beforeend', showMoreButtonHTML);
        }
        if(listFilterItems.length > 8 && !list.querySelector('.FilterListItem').classList.contains('ABRA')) {
          list.classList.add(`${ID}-search-shown`);
          list.insertAdjacentHTML('afterbegin', searchInputHTML);
        }
      } else if(list.querySelector('.FilterListItem').classList.contains('ACOL')) {
        list.classList.add(`${ID}-colourfilter`);
      } else if(list.closest('.MobSortSelector')) {
        list.previousElementSibling.removeAttribute('role');
        list.previousElementSibling.removeAttribute('id');
      }
      

    });

    let allShowMoreButtons = document.querySelectorAll(`.${ID}-show-more`);
    [].slice.call(allShowMoreButtons).forEach((button) => {
      button.addEventListener('click', (e) => {
        fireEvent(`Click - user clicked 'see more' on the ${e.currentTarget.closest('.productFilter').querySelector('.productFilterTitle').innerText} section`);
        e.currentTarget.closest('.productFilterList').classList.remove(`${ID}-five-shown`);
        e.currentTarget.remove();
        
      });
    })

    let allSearchBoxes = document.querySelectorAll(`.${ID}-search--input`);
    [].slice.call(allSearchBoxes).forEach((searchBox) => {
      searchBox.addEventListener('keyup', (e) => {
        
        searchBox.closest('.productFilterList').querySelector(`.${ID}-show-more`)?.click();
        let searchValue = e.currentTarget.value.toLowerCase();
        let allFilterItems = e.currentTarget.closest('.productFilterList').querySelectorAll('.FilterListItem');
        
        if(e.currentTarget.value.length > 0) {
          [].slice.call(allFilterItems).forEach((item) => {
            if(item.querySelector('.FilterName').innerText.toLowerCase().includes(searchValue)) {
              item.classList.remove('hide');
            } else {
              item.classList.add('hide');
            }
          });
        } else {
          [].slice.call(allFilterItems).forEach((item) => {
            item.classList.remove('hide');
          });
        }

        let allFilterItemsHidden = e.currentTarget.closest('.productFilterList').querySelectorAll('.FilterListItem.hide');
        let currShownFilters = allFilterItems.length - allFilterItemsHidden.length;
        searchBox.closest('.productFilterList').setAttribute(`data-items-shown`, currShownFilters);
        
      });
    });

    let searchBrandBox = document.getElementById('txtBrandSearch');
    searchBrandBox.addEventListener('keyup', (e) => {
      if(e.currentTarget.closest('.productFilterList').querySelector(`.${ID}-show-more`)) {
        e.currentTarget.closest('.productFilterList').querySelector(`.${ID}-show-more`).remove();
      }
    });

    // Outside Filter click

    document.getElementById('FilterContainer').addEventListener('click', (e) => {
      if(e.target.id == "FilterContainer") {
        document.getElementById('FilterContainer').classList.remove('activeFilter');
        fireEvent('Click - user clicked outside the filters to close the filters'); 
      }
    })

    // Open Sort by default

    document.querySelector('.MobSortSelector .productFilterTitleBox').click();

    // update swatches

    let allColourOptions = document.querySelectorAll('.FilterListItem.ACOL');
    [].slice.call(allColourOptions).forEach((option) => {
      let optionColourVal = option.getAttribute('data-productname').toLowerCase();
      let optionColoursAccepted = ['red', 'grey', 'white', 'pink', 'black', 'blue', 'purple', 'green', 'yellow', 'beige', 'orange', 'cream', 'gold', 'brown', 'silver'];

      if(optionColoursAccepted.find((e) => e == optionColourVal)) {
        option.querySelector('span[role="checkbox"]').style = "--optioncolour: "+optionColourVal+";";
      }
    });

    // update filterNumbers 

    updateValues();

    // add Event Listener for remove filter

    document.body.addEventListener('click', (e) => {
      
      if(e.target.classList.contains('selectedFilter') && e.target.closest('.mobAppliedFilters')) {
        e.stopPropagation();
        e.preventDefault();
      }

    })

    // set up observer, only runs the first time.

    if(observerAdded == false) {
      pollerLite(['#navlist li'], () => {

        const navlist = document.getElementById('navlist');    
        observer.connect(navlist, () => {
          updateProductFilterData();
        }, {
          config: {
            attibutes: true,
            childList: true,
            subTree: false,
          },
        });
        observerAdded = true;
    
      });



    }
    
  }, 500);

  



}

const addEvents = () => {

  let allFilterItems = document.querySelectorAll(`.FilterListItem a`);
  [].slice.call(allFilterItems).forEach((item) => {
    item.addEventListener('click', (e) => {
      fireEvent(`Click - user applied filter of ${e.currentTarget.closest('.productFilter').querySelector('.productFilterTitle').innerText} = ${e.currentTarget.closest('.FilterListItem').getAttribute('data-productname')}`);
      if(!localStorage.getItem(`${ID}-filters-applied`) || localStorage.getItem(`${ID}-filters-applied`) == "false") {
        localStorage.setItem(`${ID}-filters-applied`, true);
      }

    })
  });

  if(shared.VARIATION == "control") {
    let mobSortFilter = document.getElementById('mobSortFilter');
    mobSortFilter.addEventListener('click', () => {
      fireEvent(`Click - user has clicked to open the filters`);
    });
  }


}

const checkProductPage = () => {

  if(localStorage.getItem(`${ID}-filters-applied`) === "true") {
    fireEvent(`Interaction - user has viewed pdp ${window.location.href} after having applied filters on PLP`);
    localStorage.setItem(`${ID}-filters-applied`, false);
  } 

}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  if(document.body.classList.contains('sdlProdList')) {
    addEvents();
  } else {
    checkProductPage();
  }
  

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  if(document.body.classList.contains('sdlProdList')) {
    startExperiment();
  } 

  

  
};
