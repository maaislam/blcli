/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite, observer, logMessage, observePageChange } from '../../../../../lib/utils';
import settings from './shared';

const { ID, VARIATION } = settings;
let searchInput, searchInputListener;

/**
 * Entry point post polling
 */
const storeSearchSubmission = (searchTerm) => {

      logMessage('SearchTerm stored: '+searchTerm);

      let searchTermArray = [];
      if(searchTerm.length > 2) {
        if(localStorage.getItem(ID+'-user-search-terms')) {
          let currSearchTerms = JSON.parse(localStorage.getItem(ID+'-user-search-terms'));
          currSearchTerms.unshift(searchTerm);
          if(currSearchTerms.length > 20) {
              currSearchTerms.pop();
          }
          localStorage.setItem(ID+'-user-search-terms', JSON.stringify(currSearchTerms));
        } else {
          searchTermArray.unshift(searchTerm);
          localStorage.setItem(ID+'-user-search-terms', JSON.stringify(searchTermArray));
        }
      }
      


    }

const processEventListener = (e) => {

  let searchElement = document.querySelector('.c-header__search__input');

  if(e.key == "Enter") {
    storeSearchSubmission(searchElement.value);
  } 

}

const init = (method) => {
  
  logMessage(ID + " - Variation: "+VARIATION+" - code loaded");
  pollerLite(['.c-header__search__input',], () => {
    searchInput = document.querySelector('.c-header__search__input');

    // if this is the first run of the code (or if a page change has occurred meaning )
    if(!document.body.classList.contains('BRA-251')) {
      searchInputListener = searchInput.addEventListener('keyup', processEventListener, false); 
      setup();
    }
     
  });

}


const activate = () => {

  init("create");
  
  observePageChange(document.body, (p) => {

    if(p[0] !== p[1] && p.indexOf('search') > -1 && !document.body.classList.contains('BRA-251')) {
      init("update");
    }
    
  });

};

export default activate;