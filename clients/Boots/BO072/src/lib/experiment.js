/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import RecentlyViewed from './markup';
import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';
import lastViewedProductScraper from './storeProduct';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
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

    sessionCount();

    if(localStorage.getItem("count") === 's') {
      lastViewedProductScraper();
    } else if(localStorage.getItem("count").indexOf('ss') > -1) {
      lastViewedProductScraper();
      if(VARIATION === 'control') {
        if(window.localStorage.BO072stored_prods_1 &&!localStorage.getItem(`BO072-tabRemoved`)) {
          fireEvent('Products stored, no tab shown');
        }
      }
      if(VARIATION === '1') {
        if(window.localStorage.BO072stored_prods_1 &&!localStorage.getItem(`BO072-tabRemoved`)) {
          new RecentlyViewed();
          fireEvent('Recently viewed shown');
        }
      }
    }
};
