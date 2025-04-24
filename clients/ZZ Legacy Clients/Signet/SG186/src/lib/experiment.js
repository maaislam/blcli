/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import HomePageGrid from './homepageGrid';

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

  setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...


  // const brands = ['Rotary'];

  // if(window.digitalData.page.pageInfo.pageType === 'PDP') {
  //   if(brands.indexOf(window.digitalData.product[0].productInfo.brand) > -1) {
  //     localStorage.setItem(`${ID}-rotary`, 1);
  //   } else {
  //     localStorage.removeItem(`${ID}-rotary`);
  //   }
  // }

  // // store on PLP & PDP
  // if(window.digitalData.page.pageInfo.pageType === 'PLP') {
  //   if(window.location.href.toLowerCase().indexOf('rotary') > -1) {
  //     localStorage.setItem(`${ID}-rotary`, 1);
  //   } else {
  //     localStorage.removeItem(`${ID}-rotary`);
  //   }
  // }

  if(window.digitalData.page.pageInfo.pageType === 'Landing') {
    //if(localStorage.getItem(`${ID}-rotary`)){
        pollerLite(['.home-tile-grid'], () => {
          if(VARIATION === '1') {
            fireEvent('guess stored - banners shown');
            document.documentElement.classList.add(`${ID}-guess`);
            new HomePageGrid();
          } else {
            fireEvent('guess stored - control');
          }
       }); 
    //} 
  }
};
