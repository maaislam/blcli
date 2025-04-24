/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { clone } from 'lodash';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const cloningFilter = () => {

  // This bit basically takes the filterlist, clones it, and adds some HTML to be the li class productFilter
  // then within this we can add items coming back from the local storage

  let insertionPoint = document.getElementById('FiltersHeader');

  let filterList = document.getElementById('filterlist');

  let clonedFilterList = filterList.cloneNode(true);

  clonedFilterList.innerHTML = `
  
  <li class="productFilter">
  <div class="productFilterTitleBox " id="CollapseDiv" role="button">
      <div class="mobFiltInnerWrap">
          <div>
              <div class="mobSortDesc">
                  <h3 class="productFilterTitle">
                      Your Previous Filters
                  </h3>
                      <div class="mobAppliedFilters visible-xs visible-sm" data-item="abra"></div>

              </div>
              <span class="FilterCollapseImage glyphicon">
                  <span id="FilterCollapseText" class="sr-only FilterCollapseText"></span>
              </span>
              <div class="clearfix"></div>
          </div>
      </div>
  </div>
  
</li>
  
  `;

  console.log(clonedFilterList);

  insertionPoint.insertAdjacentElement('afterend', clonedFilterList)



}

const localStorageHelper = () => {


  let allAnchors = document.querySelectorAll('#filterlist .FilterAnchor');

  [].slice.call(allAnchors).forEach((anchor) => {
    anchor.addEventListener('click', (e) => {

      let parentFilter = e.currentTarget.closest('.FilterListItem');
      let filterType = parentFilter.classList[1];
      let filterVal = parentFilter.getAttribute('data-productname');
      
      let addedFilter = {'filterType': filterType, 'filterVal': filterVal};

      console.log(addedFilter);

      if(localStorage.getItem(`${ID}-stored-filters`)) {
        let currStorage = JSON.parse(localStorage.getItem(`${ID}-stored-filters`));
        currStorage.push(addedFilter);
        localStorage.setItem(`${ID}-stored-filters`, JSON.stringify(currStorage));
      } else {
        let initialArray = [addedFilter];
        localStorage.setItem(`${ID}-stored-filters`, JSON.stringify(initialArray));
      }

    });


  });

}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  // section to investigate adding to local storage
  // adding to local storage now done, can then use the local storage to populate the 'my previous filters' section
  localStorageHelper();

  // logic and example code for cloning the filters on SD
  // needs some work as it appears to add the filters twice on mobile...
  cloningFilter();
};
