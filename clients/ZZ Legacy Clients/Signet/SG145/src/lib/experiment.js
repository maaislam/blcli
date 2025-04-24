/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname, cookieOpt, fireEvent } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';
import HomePageGrid from './homepageGrid';

const { ID, VARIATION } = shared;

export default () => {
 setup();
 cookieOpt();

  const brands = ['Casio'];

    if(window.digitalData.page.pageInfo.pageType === 'PDP') {
      if(brands.indexOf(window.digitalData.product[0].productInfo.brand) > -1) {
        localStorage.setItem(`${ID}-casio`, 1);
      } else {
        localStorage.removeItem(`${ID}-casio`);
      }
    }

    // store on PLP & PDP
    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
      if(window.location.href.indexOf('casio') > -1) {
       localStorage.setItem(`${ID}-casio`, 1);
      } else {
       localStorage.removeItem(`${ID}-casio`);
      }
    }

    if(window.digitalData.page.pageInfo.pageType === 'Landing') {
      if(localStorage.getItem(`${ID}-casio`)){
          pollerLite(['.home-tile-grid'], () => {
            if(VARIATION === '1') {
              fireEvent('Casio stored - banners shown');
              document.documentElement.classList.add(`${ID}-casio`);
              new HomePageGrid();
            } else {
              fireEvent('Casio stored - control');
            }
          }); 
        } 
    }
};
