/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, observer } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;



const startFiltersExperiment3 = () => {

  pollerLite(['#main .search-page .hotel-name'], () => {

    document.querySelector('.margin--xs .flex button.qa-more-filters').closest('.flex').parentElement.style.display = 'none';
    // console.log(originalFiltersToHide, 'original filters to hide');

    let sortValue = 'relevance-asc';

    // const setupMoreFitlersButton = () => {
    const moreFiltersHTML = `
      <button class="${ID}-more-filter-button">
        Sort & Filter 
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14 fa-1x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"></path></svg>
      </button>
    `
    document.querySelector('.qa-pagination-total').insertAdjacentHTML('beforeend', moreFiltersHTML);

    const moreFiltersDOM = document.querySelector(`.${ID}-more-filter-button`);
    moreFiltersDOM.addEventListener('click', () => {
      const originalMoreFilters = document.querySelector('.qa-more-filters');
      originalMoreFilters.click();

      moreFiltersDOM.classList.toggle(`${ID}-more-filter-button-active`);
    });
  // }

    // setupMoreFitlersButton();

    const createNewLozengesAndSort = () => {
      const lozengeSortContainer = document.createElement('div');
      const sortContainer = document.createElement('div');
      const sortBy = document.querySelector(`.qa-search-page .qa-sort-search-results`).cloneNode(true);
      sortBy.value = sortValue;

      sortContainer.insertAdjacentElement('afterbegin', sortBy);
      sortContainer.classList.add(`${ID}-sort-container`);
      lozengeSortContainer.insertAdjacentElement('afterbegin', sortContainer);

      lozengeSortContainer.classList.add(`${ID}-lozenge-sort-container`);



      const availableLozenges = document.querySelectorAll('.qa-search-page .flex button.qa-lozenge');

      const lozengeContainer = document.createElement('div');
      lozengeContainer.classList.add(`${ID}-lozenge-container`);

      if(availableLozenges.length > 0) {
      const lozengeTitle = `<h3 class="${ID}-feature-title">Filter by:</h3>`;

      availableLozenges.forEach(lozenge => {
        const lozengeClose = lozenge.querySelector('svg');
        const lozengeText = lozenge.textContent.trim();
        let lozengeHTML = `<span class="${ID}-lozenge ${ID}-${lozengeText.replace(' ', '-')}">${lozenge.textContent.trim()}</span>`;
        if(lozengeClose) {
          lozengeHTML = `<span class="${ID}-lozenge ${ID}-${lozengeText.replace(' ', '-')}">${lozenge.textContent.trim()}<span class="${ID}-lozenge-close">${lozengeClose.outerHTML}</span></span>`;
        }
        lozengeContainer.insertAdjacentHTML('beforeend', lozengeHTML);
      });
      // lozengeContainer.insertAdjacentElement('afterbegin', sortBy);
      lozengeContainer.insertAdjacentHTML('afterbegin', lozengeTitle);
      lozengeSortContainer.insertAdjacentElement('beforeend', lozengeContainer);
    }

    return lozengeSortContainer;
  }


    // Select the node that will be observed for mutations
    const targetNode = document.querySelector(".qa-search-page");

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    let eventListenerAdded = false;

    function setupEventListener() {
      const openMoreFiltersDOM = document.querySelector(`button.qa-more-filters`);
      openMoreFiltersDOM.addEventListener('click', () => {
        // console.log('clicked more filters');
        pollerLite(['.qa-filters-panel .rc-slider'], () => {
          // console.log('in poller');
    
          const originalFilters = document.querySelector(`.qa-filters-panel`);
          const lozengeSortContainer = createNewLozengesAndSort();

          const lozengeSortContainerDOM = document.querySelector(`.qa-filters-panel .${ID}-lozenge-sort-container`);
          // console.log(lozengeSortContainerDOM, 'lozenge sort container dom')

          if(!lozengeSortContainerDOM) {
            originalFilters.insertAdjacentElement('afterbegin', lozengeSortContainer);
          }

          const lozengesDOM = document.querySelectorAll(`.${ID}-lozenge`);
          lozengesDOM.forEach(lozenge => {
            lozenge.addEventListener('click', () => {
              const lozengeText = lozenge.textContent.trim();
              const lozengeButton = document.querySelector(`.qa-search-page button[aria-label="Filter by: ${lozengeText}"]`);
              lozengeButton.click();
              moreFiltersDOM.classList.toggle(`${ID}-more-filter-button-active`);
            });
          });

          const sortByDOM = document.querySelector(`.${ID}-sort-container select`);
          const originalSortBy = document.querySelector(`.qa-search-page select#sort`);

          sortByDOM.addEventListener('change', () => {
            moreFiltersDOM.classList.toggle(`${ID}-more-filter-button-active`);
            const selectedValue = sortByDOM.value;
            sortValue = selectedValue;

            // Find the corresponding option in the second dropdown
            const correspondingOption = Array.from(originalSortBy.options).find(
              (option) => option.value === selectedValue
            );
          
            // If a corresponding option is found, select it in the second dropdown
            if (correspondingOption) {
              originalSortBy.value = correspondingOption.value;

              document.querySelector('.qa-more-filters').click();
          
              // Trigger the 'change' event on the second dropdown
              const event = new Event('change', { bubbles: true });
              originalSortBy.dispatchEvent(event);
            }
          });
        });
      });
    }
    
    function callback(mutationList, observer) {
      mutationList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          if (!eventListenerAdded) {
            console.log('!eventListenerAdded');
            const moreFilterDOM = document.querySelector(`.${ID}-more-filter-button`);
            if(!moreFilterDOM) {
              const moreFiltersHTML = `
              <button class="${ID}-more-filter-button">
                Sort & Filter 
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14 fa-1x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"></path></svg>
              </button>
            `
            document.querySelector('.qa-pagination-total').insertAdjacentHTML('beforeend', moreFiltersHTML);
        
            const moreFiltersDOM = document.querySelector(`.${ID}-more-filter-button`);
            moreFiltersDOM.addEventListener('click', () => {
              const originalMoreFilters = document.querySelector('.qa-more-filters');
              originalMoreFilters.click();
        
              moreFiltersDOM.classList.toggle(`${ID}-more-filter-button-active`);
            });
            }
            //hide original filters button
            pollerLite(['.margin--xs .flex button.qa-more-filters'], () => {
              document.querySelector('.margin--xs .flex button.qa-more-filters').closest('.flex').parentElement.style.display = 'none';
            });
            //hide original filters button
            pollerLite([`.${ID}-more-filter-button`], () => {
              const filterButtons = document.querySelectorAll(`.${ID}-more-filter-button`);
              if(filterButtons.length > 1) {
                filterButtons[0].remove();
              }
            });
            setupEventListener();
            eventListenerAdded = true;
          }
        }
      });
    
      // Check if openMoreFiltersDOM is still in the DOM
      const openMoreFiltersDOM = document.querySelector(`button.qa-more-filters`);
      if (!openMoreFiltersDOM) {
        eventListenerAdded = false; // Reset the flag if the element is removed
      }
    
      setTimeout(() => {
        observer.observe(targetNode, config);
      }, 3000);
    }
    
    // Initial setup
    // setupEventListener();
    
    // Create the MutationObserver
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
        
  });
}


const startHotelListingsExperiment2 = () => {
  pollerLite(['#main .search-page .hotel-card', () => typeof window.DY.ServerUtil === 'object'], () => {

  // function getHotelImagesAPI(hotelSKU) {
  //   return new Promise((resolve, reject) => {
  //     window.DY.ServerUtil.getProductsData([hotelSKU], ['daily', 'twoDays'], 'view', true, function(err, res) {
  //       if(err) {
  //         reject(err);
  //       } else {
  //         const hotelData = res[hotelSKU].productData;
  //         // console.log('hotel images API');
  //         resolve(hotelData);
  //       }
  //     });
  //   })
  // }


  const editAvailableListings = () => {
    // console.log('edit available listings');

    pollerLite(['.qa-search-page .hotel-card[data-hotel-code]'], () => {
      // console.log('in poller')
      const hotelCards = document.querySelectorAll(`.qa-search-page .hotel-card`);
      // console.log(hotelCards, 'hotel cards');
      // setTimeout(() => {
        hotelCards.forEach((hotel, index) => {
        // pollerLite([`.qa-search-page .hotel-card:nth-child(${index}) a`], () => { 
          // console.log('in poller 2')
        // getHotelImagesAPI(hotel.getAttribute('data-hotel-code'))
        // .then((hotelData) => {
          // console.log(hotelData);

          const hotelCode = hotel.getAttribute('data-hotel-code');

          const newDesign = hotel.querySelector(`.TRAV-46-newdesign`);
          const tplus = hotel.querySelector('.TRAV-46-tlplus');

          // console.log(newDesign, 'new design')
          // console.log(hotel, 'THIS IS THE HOTEL');

          const href = hotel.querySelector('.qa-hotel-name-link').href;
          const anchorOverlay = `<a href="${href}" class="${ID}-hotel-card-anchor-overlay"></a>`;
          //INSERT WHEN FINISHED

          const overlayDOM = hotel.querySelector(`.${ID}-hotel-card-anchor-overlay`);
          if(!overlayDOM) {
          hotel.insertAdjacentHTML('afterbegin', anchorOverlay);
          }

          const lastFew = hotel.querySelector(`.qa-alert .qa-availability__message`);
          if(lastFew) {
            lastFew.closest('.margin--xs').remove();
          }

          // hotel.querySelector('img').closest('a.link').remove();
          // hotel.querySelector('img').closest('a.link').style.display = 'none';

          const hotelImageContainer = `
              <div class="${ID}-hotel-card-images-container">
              <div class="${ID}-hotel-card-image-container ${ID}-hotel-card-main-image-container ${ID}-hotel-card-image-desktop">
                <img src="https://media.travelodge.co.uk/image/upload/Testing/Search-UX/${hotelCode}_search_desktop.webp" class="${ID}-card-image">
              </div>
              <div class="${ID}-hotel-card-image-pair ${ID}-hotel-card-image-mobile">
                <div class="${ID}-hotel-card-image-container">
                  <img src="https://media.travelodge.co.uk/image/upload/Testing/Search-UX/${hotelCode}_search_mobile.webp" class="${ID}-card-image">
                </div>
              </div>
            </div>
          `

          
          const hotelWell = hotel.querySelector('.well');
          hotelWell.classList.add(`${ID}-hotel-card-well-mbl-style`);
          hotelWell.classList.add(`${ID}-hotel-card-well-tablet-desktop-style`);

          const hotelContainer = hotel.querySelector(`.well .row`);
          hotelContainer.classList.add(`${ID}-hotel-card-container-mbl-style`);
          hotelContainer.classList.add(`${ID}-hotel-card-container-tablet-desktop-style`);

          const hotelImageTarget = hotel.querySelector(`.well .row .col`);
          hotelImageTarget.classList.add(`${ID}-hotel-card-images-mbl-style`);
          hotelImageTarget.classList.add(`${ID}-hotel-card-images-desktop-style`);

          const uniqueContainer = hotel.querySelector(`.${ID}-hotel-card-images-container`);
          if(!uniqueContainer){
          hotelImageTarget.insertAdjacentHTML('afterbegin', hotelImageContainer);
          }

          if(newDesign) {
            // console.log('new design in if', newDesign);
            hotel.querySelector(`.${ID}-hotel-card-main-image-container`).insertAdjacentElement('afterbegin', newDesign);
          }
          if(tplus) {
            // console.log('tplus', tplus);
            hotel.querySelector(`.${ID}-hotel-card-main-image-container`).insertAdjacentElement('afterbegin', tplus);
          }

          const mobilePrice = `
          <div class="${ID}-hotel-card-mbl-price ${ID}-hide-tablet-desktop">
            <div class="${ID}-hotel-card-mbl-price-from">
              From
            </div>
            <div class="${ID}-hotel-card-mbl-price-price">
              ${hotel.querySelector(`.qa-now-price span`).textContent.trim()}
            </div>
            ${lastFew ? `<div class="${ID}-hotel-card-mbl-price-last-few">Last few rooms remaining</div>` : ''}
          </div>
          `

          if(lastFew){
            const lastFewDesktop = `<div class="${ID}-hotel-card-tablet-desktop-price-last-few ${ID}-hide-mbl">Last few rooms remaining</div>`;
            const targetContainer = hotel.querySelector(`.qa-now-price`);
            targetContainer.insertAdjacentHTML('afterend', lastFewDesktop);
          }

          const priceContainer = hotel.querySelector('.lead-price').closest('.col');
          priceContainer.classList.add(`${ID}-hide-mbl`);
          priceContainer.classList.add(`${ID}-price-tablet-desktop-style`);

          const mobilePriceDOM = hotel.querySelector(`.${ID}-hotel-card-mbl-price`);
          if(!mobilePriceDOM){
          priceContainer.insertAdjacentHTML('afterend', mobilePrice);
          }

          const detailsContainer = hotel.querySelector('.well .row .col:nth-child(2)')
          // console.log(detailsContainer);
          detailsContainer.classList.add(`${ID}-hotel-card-details-mbl-style`);
          detailsContainer.classList.add(`${ID}-hotel-card-details-tablet-desktop-style`);

          const detailsInner = hotel.querySelector('.well .row .col:nth-child(2) .row .col');
          detailsInner.classList.add(`${ID}-hotel-card-details-inner-mbl-style`);
          detailsInner.classList.add(`${ID}-hotel-card-details-inner-tablet-desktop-style`);

          const detailsRow = hotel.querySelector('.well .row .col:nth-child(2) .row');
          detailsRow.classList.add(`${ID}-hotel-card-details-row-mbl-style`);
          detailsRow.classList.add(`${ID}-hotel-card-details-row-tablet-desktop-style`);

          // const lozengeContainer = hotel.querySelector(`.qa-lozenge`).closest('.flex');
          const lozengeContainer = hotel.querySelector(`.TRAV-223-hotel-card-details-inner-mbl-style .flex`)
          if(lozengeContainer) {
            lozengeContainer.classList.add(`${ID}-hotel-card-lozenge-container-order`);
          }

          const travelodgePlus = hotel.querySelector(`.travelodge-plus-logo__image`)
          if(travelodgePlus){ 
            travelodgePlus.closest('.margin--xs').classList.add(`${ID}-hotel-card-travelodge-plus-container-order`);
          }


        // })
        // .catch((err) => {
        //   console.log(err);
        // });
            // });
          });
        // }, 500);
      });
    }
  

    // Select the node that will be observed for mutations
    const targetNode = document.querySelector(".qa-pagination-total").closest('.container');

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          observer.disconnect();
          editAvailableListings();
          setTimeout(() => {
            observer.observe(targetNode, config);
          }, 100);
         } 
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    setTimeout(() => {
    editAvailableListings();
    }, 1000);

  });
}

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.closest('.map')){
      fireEvent('Click - User opens the map')
    }

    if(e.target.closest(`${ID}-more-filter-button` || e.target.closest('.qa-more-filters'))){
      fireEvent('Click - User opens more filters')
    }

    if(e.target.closest(`${ID}-hotel-card-anchor-overlay`) || 
       e.target.closest('.qa-book-now-url') || 
       e.target.closest('.qa-hotel-name-link') || 
       e.target.closest('a.link')){
      fireEvent('Click - User clicks to visit HDP')
    }

    if(e.target.closest('.qa-filters-panel .rc-slider') ||
       e.target.closest('.qa-filters-panel .qa-filter-choice') ||
       e.target.closest('.flex .qa-lozenge') ||
       e.target.closest('.flex .button--secondary')) {
      fireEvent('Click - User interacts with filters')
       }
  });
}

const hideTRAV290Duplicate = () => {
  pollerLite(['.TRAV-290-additional-messaging-container'], () => {

    setTimeout(() => {
      const all290 = document.querySelectorAll('.TRAV-290-additional-messaging-container');
      // console.log(all290, 'all290');
      if(all290.length > 1) {
        all290[1].remove();
      }
    }, 300);

    const searchDates = document.querySelector('.search-form .search-form__input .qa-search-button');
    searchDates.addEventListener('click', () => {
      const additional290 = document.querySelector('.TRAV-290-additional-messaging-container');
      if(additional290) {
        additional290.remove();
      }
    });
});
}



export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
    addTracking();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  startFiltersExperiment3();
  startHotelListingsExperiment2();
  hideTRAV290Duplicate();
};
