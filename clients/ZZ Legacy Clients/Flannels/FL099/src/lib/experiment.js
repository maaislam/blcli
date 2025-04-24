/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }



  // Variables & Setup

  let theFilters = document.querySelector('#mobFilterControls');

  theFilters.classList.add('hidden-active');

  let filterLocation = document.querySelector('#innerfiltercontainer');
  let newFilterBar = document.createElement('div');
  
  newFilterBar.classList.add('new-filter-bar');
  filterLocation.prepend(newFilterBar);
  newFilterBar.innerHTML = "<a href='#' class='clear-all' id='clear-all'>Clear All</a><a href='#' id='close-apply' class='close-apply'><span class='closetext'>Close</span><span class='applytext'>Apply (<span class='applynumber'>0</span>)</span></a>";

  let newFilterClearAll = document.getElementById('clear-all');
  let newFilterCloseApply = document.getElementById('close-apply');
  let filterCloseButton = document.getElementById('mobclsfltrs');
  let selectedFilters = document.querySelector('.selectedFilters');
  let filterNumber = 0;
  let activeFilters = document.getElementById('filterlist');

  // Event Listeners
            
  document.getElementById('mobSortFilter').addEventListener('click', function(e) {

    newFilterBar.classList.add('open');

    if(getParameterByName('Filter', window.location) == "none") {
      newFilterBar.classList.add('no-filters');
    } else {
      newFilterCloseApply.classList.remove('active-filters');
      newFilterCloseApply.querySelector('.applynumber').innerHTML = document.querySelector('.selectedFilters').childElementCount;
      filterNumber = selectedFilters.childElementCount;
    }

  }, false);

  document.addEventListener('click', function(e) {
    console.log(e.target);
    // If the clicked element doesn't have the right selector, bail
    if (e.target.classList.contains('FilterName') || e.target.classList.contains('selectedFilterLabel')) {
      

      setTimeout(function() {
        if(newFilterCloseApply.classList.contains('active-filters')) {
            
            filterNumber = activeFilters.querySelectorAll('.SelectedFilter').length;


            newFilterCloseApply.querySelector('.applynumber').innerHTML = filterNumber;
            if(filterNumber == 0) {
              newFilterCloseApply.classList.remove('active-filters');
              newFilterBar.classList.add('no-filters');
            }
        
        } else if(!newFilterCloseApply.classList.contains('active-filters')) {
            
            newFilterBar.classList.remove('no-filters');
            newFilterCloseApply.classList.add('active-filters');
            filterNumber = activeFilters.querySelectorAll('.SelectedFilter').length;
            newFilterCloseApply.querySelector('.applynumber').innerHTML = filterNumber;
        
        } else {
          newFilterBar.classList.remove('no-filters');
          newFilterCloseApply.querySelector('.applynumber').innerHTML = '1';
        }
      }, 500);

      

      
    } else {

      return;
    } 

  }, true);

  newFilterClearAll.addEventListener('click', function(e) {
    e.preventDefault();
    window.SetVal(null, 'CLEAR','###');
    newFilterCloseApply.classList.remove('active-filters');
    newFilterBar.classList.add('no-filters');
    filterLocation.scrollTo({top: 0, behaviour: 'smooth'});
    document.querySelector('.productFilter:not(.filterClosed) > .productFilterTitleBox').click();
  })

  newFilterCloseApply.addEventListener('click', function(e) {
    e.preventDefault();
    filterCloseButton.click();
  })

};
