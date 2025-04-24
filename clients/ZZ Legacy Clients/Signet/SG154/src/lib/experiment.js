/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);
 
  
  // Get last search query
  const lastSearchTerm = () => {

    let lastTermArr = [];

    if(document.referrer !== '' && document.referrer.indexOf('?query') > -1) {
      if (document.referrer.toLowerCase().trim().indexOf('?query=garmin') > -1) {
        lastTermArr = ['Garmin','https://www.hsamuel.co.uk/webstore/l/garmin-smart-watches/'];
      } else if (document.referrer.toLowerCase().trim().indexOf('?query=harry+potter') > -1 || document.referrer.toLowerCase().trim().indexOf('?query=harrypotter') > -1 || document.referrer.toLowerCase().trim().indexOf('?query=harry%20potter') > -1 ) {
        lastTermArr = ['Harry Potter','https://www.hsamuel.co.uk/webstore/l/harry-potter-jewellery/'];
      }
    }

     // Fallback to use local storage
   /* if (localStorage.getItem('site-search')) {
      const searchItems = JSON.parse(localStorage.getItem('site-search'))
      const lastSearched = searchItems[0];

      if (lastSearched.text.toLowerCase().trim() === 'garmin') {
        lastTermArr = ['Garmin','https://www.hsamuel.co.uk/webstore/l/garmin-smart-watches/'];
         
      } else if (lastSearched.text.toLowerCase().trim() === 'harry potter' || lastSearched.text.toLowerCase().trim() === 'harrypotter') {
        lastTermArr = ['Harry Potter','https://www.hsamuel.co.uk/webstore/l/harry-potter-jewellery/'];
      }
    } */

    //return lastTermArr;
  //}

    return lastTermArr;
  }
  

  const noResultText = () => {
    const term = lastSearchTerm();
    
    const HSResult = document.createElement('div');
    HSResult.classList.add(`${ID}-noResult`);
    HSResult.innerHTML = `
    <div class="${ID}-container">
      <h3><b>Sorry, </b>we don't have what you're looking for but have you tried H.Samuel?</h3>
      <a class="${ID}-button" target="_blank" href="${term[1]}"><span>Shop ${term[0]}</span></a>
    </div>`;

    if(window.location.href.indexOf('/smartwatches/') > -1) {
      document.querySelector('#access-content').insertAdjacentElement('afterbegin', HSResult);
      
    } else if(window.location.href.indexOf('/webstore/no-results/') > -1) {
      document.querySelector('.l-not-found-page').insertAdjacentElement('afterbegin', HSResult);

    }
  }

  if(VARIATION !== 'control') {
    const term = lastSearchTerm();

    if(term[0]) {
      fireEvent('Searched Garmin or HP');
      document.documentElement.classList.add(`${ID}-HSResult`);
      noResultText();

      const brandButton = document.querySelector(`.${ID}-button`);
      if(brandButton) {
        brandButton.addEventListener('click', (e) => {
          const elName = e.currentTarget.innerText;
          fireEvent('Clicked HS button ' + elName);
        });
      }
    }
  } else {
    const term = lastSearchTerm();

    if(term[0]) {
      fireEvent('Searched Garmin or HP');
    }
  }

};
