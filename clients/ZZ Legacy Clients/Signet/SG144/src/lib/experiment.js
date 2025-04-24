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

  const brands = ['Sekonda', 'Accurist', 'Seksy', 'Limit'];

    if(window.digitalData.page.pageInfo.pageType === 'PDP') {
      if(brands.indexOf(window.digitalData.product[0].productInfo.brand) > -1) {
        localStorage.setItem(`${ID}-sekonda`, 1);
      } else {
        localStorage.removeItem(`${ID}-sekonda`);
      }
    }

    // store on PLP & PDP
    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
      if(window.location.href.indexOf('accurist') > -1 || window.location.href.indexOf('sekonda') > -1 || window.location.href.indexOf('seksy') > -1 || window.location.href.indexOf('Limit') > -1 || window.location.href.indexOf('limit') > -1) {
        localStorage.setItem(`${ID}-sekonda`, 1);
      } else {
        localStorage.removeItem(`${ID}-sekonda`);
      }
    }

    if(window.digitalData.page.pageInfo.pageType === 'Landing') {
      if(localStorage.getItem(`${ID}-sekonda`)){
          pollerLite(['.home-tile-grid'], () => {
            if(VARIATION === '1') {
              fireEvent('Sekonda stored - banners shown');
              document.documentElement.classList.add(`${ID}-sekonda`);
              new HomePageGrid();
            } else {
              fireEvent('Sekonda stored - control');
            }
          }); 
        } 
    }
};
