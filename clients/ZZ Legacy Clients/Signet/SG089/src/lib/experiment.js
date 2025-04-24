/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';
import LastProducts from './components/lastViewedMarkup';
import { lastViewedProductScraper, lastViewedCategoryScraper } from './components/storeProduct';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    function sessionCount(){
      if (localStorage.getItem("count") === null) {
      sessionStorage.setItem("count", 's');
      localStorage.setItem("count", 's');
      }
      else if (sessionStorage.getItem("count") === null) {
      var lsCount = localStorage.getItem("count");
      sessionStorage.setItem("count", lsCount + 's');
      localStorage.setItem("count", lsCount + 's');
      }
      else {
      }
      var sessionRetrieve = sessionStorage.getItem("count");
      return sessionRetrieve.length;
    }

    setup();
    
    sessionCount();

    // store the products 
    /*if(VARIATION === '1' || VARIATION === '2') {
      if(window.digitalData.page.pageInfo.pageType === 'PDP') {
        lastViewedProductScraper();
      }
    } else if(VARIATION === '3') {
      if(window.digitalData.page.pageInfo.pageType === 'PLP') {
        lastViewedCategoryScraper();
      }
    } */
    if(VARIATION === '1') {
      if(window.digitalData.page.pageInfo.pageType === 'PDP') {
        lastViewedProductScraper();
      }
    } else if(VARIATION === '2') {
      if(window.digitalData.page.pageInfo.pageType === 'PLP') {
        lastViewedCategoryScraper();
      }
    } 
    
    // add markup
    const addViewed = () => {
      
        if(sessionCount() > 1) {
          if(window.digitalData.page.pageInfo.pageType === 'PLP' || window.digitalData.page.pageInfo.pageType === 'Landing') {
            if(getSiteFromHostname() == 'ernestjones') {
              if (window.localStorage.EJ089recommended_prods_1 || window.localStorage.EJ089recommended_cats_1) {
                  new LastProducts();
              }
              
            }

            if(getSiteFromHostname() == 'hsamuel') {
              if (window.localStorage.HS089recommended_prods_1 || window.localStorage.HS089recommended_cats_1) {
                new LastProducts();
              }
            }
          }
        }
    }
    addViewed();
  }
};
