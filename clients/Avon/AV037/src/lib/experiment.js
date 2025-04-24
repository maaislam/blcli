/**
 * AV037 - Basket delivery messaging
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import FreeDeliveryTracker from './components/FreeDeliveryTracker/FreeDeliveryTracker';

export default () => {
  setup();
  const { rootScope } = shared;

  const init = () => {
    const freeDeliveryTracker = new FreeDeliveryTracker();
  };

  init();

  // Re-run when page refreshes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });
};
