/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import lastViewedProductScraper from './storeProduct';
import RecentlyViewed from './markup';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    if(window.digitalData.page.pageInfo.pageType === 'PDP') {
      lastViewedProductScraper();
    }

    if(getSiteFromHostname() == 'ernestjones') {
      if(window.localStorage.EJ116stored_prods_1 &&!localStorage.getItem(`EJ-tabRemoved`)) {
       new RecentlyViewed();
      }
    }

    if(getSiteFromHostname() == 'hsamuel') {
      if(window.localStorage.HS116stored_prods_1 &&!localStorage.getItem(`HS-tabRemoved`)) {
        new RecentlyViewed();
       }
    }
  }
};
