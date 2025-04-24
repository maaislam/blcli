/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import ProductOffer from './components/offerBox';
import shared from './shared';
import { pollerLite, events } from '../../../../../lib/utils';
import storeOffer from './components/storeOffer';
import basketPage from './components/basketPage';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  //pollerLite(['.product-price-offer'], () => {
    
  // product page
  if(window.location.href.indexOf('/webstore/d/') > -1) {
    new ProductOffer();

    if(shared.VARIATION === '2') {
      storeOffer();
    }

    events.send(`${ID} v${VARIATION}`, 'fired - product page');
  }
    

  //});
  
  if(shared.VARIATION === '2') {
    // basket page
    if(window.location.href.indexOf('showbasket.sdo') > -1) {
      basketPage();
      events.send(`${ID} v${VARIATION}`, 'fired - basket page');
    }
  }
};
