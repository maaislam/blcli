/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { data } from './storedata';

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

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {

    const storeData = data;

    const createButton = (url) => {
      const button = `<a class="${ID}-xmasBtn" href="${url}" target="_blank">View Christmas Opening Times</a>`;
      return button;
    }

    const addButton = (number, el) => {
      if (number) {
        const matchURL = number.URL;
        el.insertAdjacentHTML('afterend', createButton(matchURL));

        if(document.querySelector(`.${ID}-xmasBtn`)) {
          document.querySelector(`.${ID}-xmasBtn`).addEventListener('click', () => {
            fireEvent('Clicked xmas store times');
          });
        }
      }
    }

    // if store search results
    if (window.location.href.indexOf('/secure/showStoreSearchResults.sdo') > -1) {

      // loop through data
 
      if(getSiteFromHostname() === 'ernestjones') {
        const allListings = document.querySelectorAll('.search-results__store');

        for (let index = 0; index < allListings.length; index += 1) {
          const element = allListings[index];
          const storeNo = element.querySelector('.store-links__link').getAttribute('data-store-number');

          addButton(storeData[storeNo], element.querySelector('.store-opening-time dl'));
        }
      } else {
        const allListings = document.querySelectorAll('.searchResults tr');

        for (let index = 0; index < allListings.length; index += 1) {
          const element = allListings[index];
          const storeNoEl = element.querySelector('.viewStorDetails');

          if(storeNoEl) {
            const storeNo = storeNoEl.getAttribute('data-store-number');
            addButton(storeData[storeNo], element.querySelector('.storeOpeningTimes dl'));
          }
        }
      }

    } else if (window.location.href.indexOf('/webstore/secure/store/') > -1) {

      const storePageNo = window.location.href.match(/.*([\d]{4}).*/)[1];

      if (storePageNo && storeData[storePageNo]) {

        if(getSiteFromHostname() === 'ernestjones') {
          addButton(storeData[storePageNo], document.querySelector('.store-page__opening-times'));
        } else {
          addButton(storeData[storePageNo], document.querySelector('.storeOpeningTimes'));
        }
      }

    }
    
  } else {
    // any control code here
  }
};
