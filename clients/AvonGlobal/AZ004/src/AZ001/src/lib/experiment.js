/**
 * AZ001 - PLP UI Improvements
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import PLPChanges from './changes/PLP';
import offersPLPChanges from './changes/offersPLP';

export default () => {
  setup();

  const {
    ID,
    $,
    rootScope,
    pageType,
  } = shared;

  /**
   * Return a function containing all changes for a
   * certain page type
   * @param {string} type Page type
   * @returns {function}
   */
  const getPageChanges = (type) => {
    const changesByPageType = {
      PLP: PLPChanges,
      offersPLP: offersPLPChanges,
      default: undefined,
    };

    return changesByPageType[type];
  };

  /** Make all changes */
  const init = () => {
    const pageChanges = getPageChanges(pageType);
    if (pageChanges instanceof Function) pageChanges();
  };

  init();

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });
};
