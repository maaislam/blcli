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
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  //pollerLite(['.product-price-offer'], () => {
    
  // product page
  if(window.location.href.indexOf('/webstore/d/') > -1) {
    new ProductOffer();
    events.send(`${ID} v${VARIATION}`, 'fired - product page');
  }
  //});
};
