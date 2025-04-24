/**
 * SD-396 - Shop by size (trainers)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, clickEvents, getUrlParameter, resetExperimentContent, observeWindowWidthAndResetContent, getSizesFilter, generateSizesBanner, selectSizeFilter } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events, logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
// Force set analytics reference
events.analyticsReference = '_gaUAT';

const addEventTracking = () => {

  setTimeout(() => {

    let allFilterOptionLinks = document.querySelectorAll('.FilterAnchor');

    [].slice.call(allFilterOptionLinks).forEach((link) => {

      link.addEventListener('click', (e) => {
        let outerFilter = e.currentTarget.closest('.FilterListItem');
        let outerFilterClassList = outerFilter.classList.toString();
        let filterType = outerFilterClassList.replace('FilterListItem ', '');
        let filterTypeName = "";
        if(filterType == "ACSIZE") {
          filterTypeName = "Size Filter";
        } else {
          filterTypeName = "Other Filter";
        }
        let filterName = outerFilter.getAttribute('data-productname');
        let filterMessage = "Standard Filter clicked - Filter Type: ["+filterTypeName+"] | Filter Name: ["+filterName+"]";
        logMessage(filterMessage);
        fireEvent(filterMessage);

      });

    });

  }, 500);

  

}

const activate = () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  addEventTracking();

  // Write experiment code here
  if (VARIATION == 'control') {
    return;
  } else {

    // --- Get Sizes Filters from Filters
    getSizesFilter();
    // --- Generate Sizes Banner
    if (window.location.pathname.indexOf('/mens/') > -1) {
      generateSizesBanner('mens');
    } else if (window.location.pathname.indexOf('/ladies/') > -1) {
      generateSizesBanner('ladies');
    }

    // --- Select Filter
    selectSizeFilter();

    // --- Click Events
    clickEvents();

    observeWindowWidthAndResetContent();
    
    
    observer.connect(document.querySelector('#productlistcontainer'), () => {
      resetExperimentContent();
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });


    // --- Observe URL Changes
    if (!document.querySelector(`html.${ID}-urlObserver`)) {
      function isOdd(num) { return num % 2;}
      pollerLite(['#navlist'], () => {
        // for observer
        let oldHref = document.location.href;
        let bodyList = document.querySelector("#navlist");

        // Trigger re render on pagniation change
        const wrap = document.querySelector('#navlist');
        observer.connect(wrap, () => {

          if (oldHref != document.location.href) {
              oldHref = document.location.href;

              let paginationContainer = document.getElementById('divPagination');

              let pageNumber = parseInt(paginationContainer.querySelector('.PageSelector').innerHTML);

              if (isOdd(pageNumber) 
              && window.location.href.indexOf('ACSIZE') == -1
              && localStorage.getItem(`SD-396-size-filters-dismissed`) == null) {
                pollerLite(['ul#navlist.s-productscontainer2 li',
                ], () => {
                    setTimeout(() => {
                      
                      document.querySelector(`html`).classList.add(`${ID}-urlObserver`);
                      resetExperimentContent();
                    }, 1000);
                    

                    
                });
              } 
              

          }

        }, {
          config: {
            attributes: true,
            childList: true,
            subtree: false,
          }
        })

        
      });
    }

  }
};

export default activate;
