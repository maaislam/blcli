/**
 * AV006 - Design Led Basket
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, separateFreeGifts } from './services';
import BasketOffers from './components/BasketOffers/BasketOffers';
import shared from './shared';

export default () => {
  setup();
  const { $, rootScope, ID } = shared;

  /** Make all changes */
  const init = () => {
    const basketOffers = new BasketOffers();

    if (!$(`.${ID}_freeGift`).length) {
      separateFreeGifts();
    }
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 300);
  });

  rootScope.$on('BaseService.AjaxComplete', () => {
    setTimeout(init, 300);
  });

  init();
};
