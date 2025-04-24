/**
 * AV005 - Delivery countdown on PDP
 * @author User Conversion
 */
import { setup } from './services';
import DeliveryMessaging from './components/DeliveryMessaging/DeliveryMessaging';
import settings from './settings';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();
  const { ID } = settings;
  const rootScope = window.AppModule.RootScope;
  let deliveryMessaging;

  /**
   * Apply all page changes
   */
  const applyChanges = () => {
    deliveryMessaging = new DeliveryMessaging();
    events.send(ID, 'Message Shown', deliveryMessaging.before1pm ? 'Countdown' : 'Static', { sendOnce: true });
  };

  // Init
  applyChanges();

  // On window resize, check if changes have been removed or layout has changed
  // If so, reapply them
  rootScope.$on('App_LayoutChanged', () => {
    if (!document.querySelector(`.${ID}_DeliveryMessaging`)) {
      pollerLite(['.AddToWishList', '.ProductActions'], applyChanges); // Re-build component
    } else {
      deliveryMessaging.render(); // Re-render
    }
  });
};

export default activate;
