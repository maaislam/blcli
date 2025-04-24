{}/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './shared';
import { HammerTime } from './hammer';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;

  setup();

  let numProdsHTML;

  const applyProductCount = () => {

    let numProducts = numProductsShownElement.innerHTML;
    if(document.getElementById("navlist").getElementsByTagName("li").length == 1) {
      numProducts = 0;
    }

    let additionalHTML = `<span class="num-prods">(${numProducts})</span>`;
    numProdsHTML = document.querySelector('.num-prods');
    if(numProdsHTML) {
      numProdsHTML.remove();
    }
    applyBtn.insertAdjacentHTML('beforeend', additionalHTML);

  }


  // Run Hammer
  HammerTime();

  const filterOuterWrap = document.getElementById('FilterContainer');
  const filterOptionWrap = document.querySelector('#innerfiltercontainer');
  const mobFilterBtn = document.querySelector('#mobSortFilter');
  const mobFilterHolder = document.querySelector('#mobControlBar');
  const applyBtn = document.querySelector('#mobFilterControls .textIconWrap span:not(.glyphicon)');
  const clearBtn = document.querySelector('#mobclrfltrs .textIconWrap');
  const closeBtn = document.querySelector('#mobclsfltrs');

  const numProductsShownElement = document.querySelector('#prdsFound > .totalProducts');
  const allFilterAnchors = document.querySelectorAll('.FilterAnchor');

  const allSelectedAnchors = document.querySelectorAll('.selectedFilterToggle');

  // hammer swipe event
  var hammertime = new Hammer(filterOuterWrap);
  
  hammertime.on('swiperight', function(ev) {
    closeBtn ? closeBtn.click() : null;
  });

  // listens to the opening event to apply the product count
  mobFilterBtn.addEventListener('click', (e) => {
    if(!filterOuterWrap.classList.contains('MobClosed')) {
      mobFilterHolder.classList.add('filters-open');
      applyProductCount();
      events.send(ID, `${settings.ID} Variation 1`, 'clicked to open filters');
    }

  }, false);

  // listens to the close button event to ensure the filter button goes back to the right size
  closeBtn.addEventListener('click', (e) => {
    setTimeout(function() {
      mobFilterHolder.classList.remove('filters-open');
      events.send(ID, `${settings.ID} Variation 1`, 'clicked close button to close filters');
    }, 300);
  }, false);
  // listens to the apply button to ensure the filter button goes back to the right size
  applyBtn.addEventListener('click', (e) => {
    setTimeout(function() {
      mobFilterHolder.classList.remove('filters-open');
      events.send(ID, `${settings.ID} Variation 1`, 'clicked to apply filters and close filter bar');
    }, 300);
  }, false);
  // listens to the clear button and removes any existing product count.
  clearBtn.addEventListener('click', (e) => {
    setTimeout(function() {
      if(numProdsHTML) {
        numProdsHTML.remove();
      }
      applyProductCount();
    }, 300);
  }, false);

  // adds an event listener to listen to the 'darkened' portion of the screen in case people tap that to close
  FilterContainer.addEventListener('click', (e) => {
    if(e.target.id == "FilterContainer" || e.target.id == "mobappfltrs") {
      closeBtn ? closeBtn.click() : null;
    }
  }, false);

  // event listeners to re-apply the product count to the apply button
  [].slice.call(allFilterAnchors).forEach(function(filterAnchor) {
    filterAnchor.addEventListener('click', (e) => {
      
      
      setTimeout(function() {
        
        applyProductCount();
        
      }, 300);

    }, false);
  });
  
  // dynamically added filters need a special event listener
  document.addEventListener('click', function(e) {
    // If the clicked element doesn't have the right selector, bail
    if (e.target.classList.contains('selectedFilterToggle')) {
      
      setTimeout(function() {
          
          applyProductCount();       

      }, 300);

    } else {

      return;
    } 

  }, true);


  

};
