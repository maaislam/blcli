/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, isOverflown, logMessage, pollerLite } from '../../../../../lib/utils';
 import { fetchBrands, fetchRecentlyViewedBrands, fetchMaleFemale } from './fetchBrands';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let searchBox, searchInput, headerOverlay, autoComplete, suggestionsHolder;

const showSearchHolder = () => {

  document.documentElement.classList.add(`${ID}-noscroll`);
  document.body.classList.add('searchFocus');
  searchBox.classList.add(`${ID}-search-box`);
  searchBox.parentElement.classList.add(`${ID}-search-box-holder`)
  searchBox.classList.add('active');
  headerOverlay.classList.add(`${ID}-active-overlay`);
  
  let visibleMessage = "Visible - user has seen the suggested searches";
  logMessage(visibleMessage);
  fireEvent(visibleMessage, true);


}

const hideSearchHolder = () => {

  document.documentElement.classList.remove(`${ID}-noscroll`);
  document.body.classList.remove('searchFocus');
  searchBox.classList.remove(`${ID}-search-box`);
  searchBox.parentElement.classList.remove(`${ID}-search-box-holder`)
  searchBox.classList.remove('active');
  headerOverlay.classList.remove(`${ID}-active-overlay`);

}

const makeAmends = (affinityData) => {

  searchBox = document.querySelector('.dvSearch');
  
  if(window.outerWidth < 1022) {
    searchBox = document.querySelector('#divMobSearch .dvSearch');
  }
  
  searchInput = document.getElementById('txtSearch');

  if(window.outerWidth < 1022) {
    searchInput = document.getElementById('MobtxtSearch');
  } 

  headerOverlay = document.querySelector('.header-overlay');

  autoComplete = document.getElementById('ui-id-1');

  if(window.outerWidth < 1022) {
    autoComplete = document.getElementById('ui-id-2');
  } 

  let additionalHTML = `

    <div class="${ID}-suggestions-holder">
    
      <div class="${ID}-autocomplete">
      
      </div>

      <div class="${ID}-suggested-links-holder">
        
        <h2>Suggested for you</h2>

        <div class="${ID}-suggested-links">
        
          ${affinityData.map((brand) => {

            let brandName = brand[0];
            let brandNameAltered = brandName.replaceAll(' ', '-').toLowerCase();
            let brandURL = "/brand/"+brandNameAltered+"/";

            return `<a href="${brandURL}" class="${ID}-pill">${brandName}</a>`;

          }).join('')}
        
        </div>

      </div>

    </div>
  
  
  `;

  searchBox.insertAdjacentHTML('afterend', additionalHTML);
  
  suggestionsHolder = document.querySelector(`.${ID}-suggestions-holder`);
  suggestionsHolder.querySelector(`.${ID}-autocomplete`).appendChild(autoComplete);

  if(window.outerWidth < 1022) {
    pollerLite(['.HOF_HeaderTop_Promo'], () => {
      document.querySelector('.HOF_HeaderTop_Promo').parentElement.classList.add(`${ID}-promo-holder`);
    })    
  }
  let mobileMenuTrigger = document.querySelector('#mobMenuContainer #trigger');

  mobileMenuTrigger.addEventListener('click', (e) => {

    hideSearchHolder();

  })
  
  
  // Event Listeners

  searchInput.addEventListener("keyup", (e) => {
    let valLength = e.target.value.length;
    if(valLength >= 1) {
      autoComplete.classList.add('active');
    }

    if(valLength == 0) {
      autoComplete.classList.remove('active');
    }      
  });

  searchInput.addEventListener('click', (e) => {

    showSearchHolder();

    if(window.outerWidth < 1022) {

      if(document.getElementById('mp-menu').classList.contains('menu-open')) {
        document.querySelector('.mp-close').click();
      }

    }

  });



  headerOverlay.addEventListener('click', (e) => {

    hideSearchHolder();

  });

  let allSuggestions = document.querySelectorAll(`.${ID}-pill`);

  [].slice.call(allSuggestions).forEach((suggestion) => {

    suggestion.addEventListener('click', (e) => {

      let suggestionName = e.target.innerHTML;
      let suggestionURL = e.target.href;

      let suggestionMessage = "Click - user clicked on suggested brand link: "+suggestionName+" going to "+suggestionURL;
      logMessage(suggestionMessage);
      fireEvent(suggestionMessage, true);

    });

  });

}

const addEventTracking = () => {

  let searchInput = document.getElementById('txtSearch');

  if(window.outerWidth < 1022) {
    
    searchInput = document.getElementById('MobtxtSearch');

  } 

  searchInput.addEventListener('click', (e) => {

    let searchClickedMessage = "Click - search was interacted with";
    logMessage(searchClickedMessage);
    fireEvent(searchClickedMessage, true);

  })

  

}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEventTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  let affinityData = fetchBrands();
  affinityData.then((affinityArray) => {

    if(affinityArray.length >= 3) {
      makeAmends(affinityArray);

      let moreThanThreeBrandsMessage = "Info - user has three or more brands in their affinity profile";
      logMessage(moreThanThreeBrandsMessage);
      fireEvent(moreThanThreeBrandsMessage, true);
    } else {

      let lessThanThreeBrandsMessage = "Info - user has less than three brands in their affinity profile";
      logMessage(lessThanThreeBrandsMessage);
      fireEvent(lessThanThreeBrandsMessage, true);

    }
    

  });



  
};
