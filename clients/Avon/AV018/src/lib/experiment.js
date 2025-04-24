/**
 * AV018 - Remove RAC Delivery
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion (Lewis Needham)
 */
import { setup, getPageType } from './services';
import newCheckoutChanges from './changes/newCheckout';

const activate = () => {
  setup();

  const pageType = getPageType();
  if (pageType === 'newCheckout') {
    newCheckoutChanges();
  }
};

export default activate;
