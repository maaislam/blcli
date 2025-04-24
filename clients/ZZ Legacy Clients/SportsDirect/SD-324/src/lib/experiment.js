/**
 * IDXXX - Description
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT'; 
const { ID, VARIATION } = shared;

const storeSearchSubmission = (searchTerm) => {
  
  logMessage('SearchTerm stored: '+searchTerm);

  let searchTermArray = [];
  if(searchTerm.length > 2) {
    if(localStorage.getItem(`${ID}-user-search-terms`)) {
      let currSearchTerms = JSON.parse(localStorage.getItem(`${ID}-user-search-terms`));
      if(!Object.values(currSearchTerms).includes(searchTerm)) {
        currSearchTerms.unshift(searchTerm);
        if(currSearchTerms.length > 20) {
          currSearchTerms.pop();
        }
        localStorage.setItem(`${ID}-user-search-terms`, JSON.stringify(currSearchTerms));
      } else { 
        logMessage("Not stored, duplicate value");
      }
  
    } else {
      searchTermArray.unshift(searchTerm);
      localStorage.setItem(`${ID}-user-search-terms`, JSON.stringify(searchTermArray));
    }
    
  }
  }
  

const activate = () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  let searchInput, searchSubmit, autocompleteUI;

  if(window.outerWidth > 767) {
    searchInput = document.getElementById('txtSearch');
    searchSubmit = document.getElementById('cmdSearch');
    autocompleteUI = document.getElementById('ui-id-1');
  } else {
    searchInput = document.getElementById('MobtxtSearch');
    searchSubmit = document.getElementById('MobcmdSearch');
    autocompleteUI = document.getElementById('ui-id-2');
  }



  // to deal with search queries where the enter button is pressed during submission
  searchInput.addEventListener('keyup', (e) => {
    if(e.key == "Enter") {
      storeSearchSubmission(searchInput.value);
    } 
    
  });

  // to deal with search queries where the search icon is clicked
  searchSubmit.addEventListener('click', (e) => {
    storeSearchSubmission(searchInput.value);
  }, false);

  // to deal with queries where the user clicks on one of the auto-complete suggestions
  document.getElementById('divMobSearch').addEventListener('click', (e) => {
    let btn = e.target;
    if (btn.className.match(/ui-corner-all/)) {
      let autocompleteEle = e.target.innerHTML;
      let strippedText = autocompleteEle.replace(/(<([^>]+)>)/gi, "");
      storeSearchSubmission(strippedText);
      return true;
    } 
  });
  

};

export default activate;
