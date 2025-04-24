/**
 * FL065 - Add to bag fix
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { scrollTo, events } from '../../../../../lib/utils';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  } else {
    events.send(settings.ID, 'Active', 'Variation 1 is Active');
  }

  // Experiment code
  const atbButton = cacheDom.get('.FlanProdDet .AddToBagBar .addToBasketContainer .ImgButWrap a');
  const viewBagButton = cacheDom.get('a#aViewBag');
  const checkoutButton = cacheDom.get('a#aCheckout');

  
  // On click scroll to the top of the page to ensure user sees the basket.
  atbButton.addEventListener('click', () => {
    events.send(settings.ID, 'Click', 'User Clicked Add To Bag');
    // Scroll
    scrollTo(0, 200);
  });

  viewBagButton.addEventListener('click', () => {
    events.send(settings.ID, 'Click', 'User clicked View Bag');
  });
  checkoutButton.addEventListener('click', () => {
    events.send(settings.ID, 'Click', 'User clicked Secure Checkout');
  });
};

export default activate;
