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
