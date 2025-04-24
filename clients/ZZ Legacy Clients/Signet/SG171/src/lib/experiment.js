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



  //const brands = ['Michael Kors', 'Michael Kors Access'];

  // if(window.digitalData.page.pageInfo.pageType === 'PDP') {
  //   if(brands.indexOf(window.digitalData.product[0].productInfo.brand) > -1) {
  //     localStorage.setItem(`${ID}-MK`, 1);
  //   } else {
  //     localStorage.removeItem(`${ID}-MK`);
  //   }
  // }

  // // store on PLP & PDP
  // if(window.digitalData.page.pageInfo.pageType === 'PLP') {
  //   if(window.location.href.indexOf('Michael+Kors') > -1 || window.location.href.indexOf('michael+kors') > -1 || window.location.href.indexOf('michael-kors') > -1 || window.location.href.indexOf('michael%20kors') > -1) {
  //     localStorage.setItem(`${ID}-MK`, 1);
  //   } else {
  //     localStorage.removeItem(`${ID}-MK`);
  //   }
  // }

  if(window.digitalData.page.pageInfo.pageType === 'Landing') {
    //if(localStorage.getItem(`${ID}-MK`)){
        pollerLite(['.banner'], () => {
          if(VARIATION === '1') {
            fireEvent('MK stored - banners shown');
            document.documentElement.classList.add(`${ID}-MK`);
            new HomePageGrid();
          } else {
            fireEvent('MK stored - control');
          }
       }); 
  //   } 
  }
};
