/**
 * AG010 - New Checkout Iteration
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import checkoutChanges from './pageChanges/checkout';
import checkoutLoginChanges from './pageChanges/checkoutLogin';
import shared from './shared';

export default () => {
  setup();

  // ---------------------------
  // Session store referrers for future checkout behaviours
  // ---------------------------
  if(document.referrer.match(/onlinecatalog/)) {
    sessionStorage.setItem(`${shared.ID}-referred`, 1);
  } else if(document.referrer.match(/cart/)) {
    // Reset referrer reference
    sessionStorage.setItem(`${shared.ID}-referred`, 0);
  }

  if(sessionStorage.getItem(`${shared.ID}-referred`) == 1) {
    document.body.classList.add(`${shared.ID}-imb-referred`);
  } else {
    document.body.classList.remove(`${shared.ID}-imb-referred`);
  }

  /**
   * Return a function containing all changes for a
   * certain page type
   * @param {string} pageType
   * @returns {function}
   */
  const getPageChanges = (pageType) => {
    const changesByPageType = {
      checkout: checkoutChanges,
      checkoutLogin: checkoutLoginChanges,
      default: undefined,
    };

    return changesByPageType[pageType];
  };

  const { pageType } = shared;
  const pageChanges = getPageChanges(pageType);
  if (pageChanges instanceof Function) pageChanges();
};
