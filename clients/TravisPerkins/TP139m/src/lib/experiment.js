/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, sameHeights } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  const { ID, VARIATION } = settings;

  setup();
  
  // Experiment code
  const loginLinks = cacheDom.getAll('.advanced_plp_trade_prices_link a.ui-link');
  const deliveryBtns = cacheDom.getAll('.merchant_buttons a#addToCartButton');
  const collectBtns = cacheDom.getAll('.ccButton a#addForCollection');
  const productTitles = cacheDom.getAll('span.advanced_plp_product_name');

  // Cap product titles at 70 chars
  const productTitlesLen = productTitles.length;
  if (productTitlesLen) {
    for (let i = 0; productTitlesLen > i; i += 1) {
      const thisText = productTitles[i].textContent;
      const trimmedString = thisText.substring(0, 60);
      productTitles[i].textContent = `${trimmedString}...`;

    }
  }

  if (loginLinks.length) {
    Array.from(loginLinks).forEach((link) => {
      link.textContent = 'Log in for your account prices';

      // Events
      link.addEventListener('click', () => {
        events.send(ID, 'Click', 'Log in for account prices');
      });
    });
  }

  // Match height 
  setTimeout(() => {

    // sameHeights();
  }, 500);

  // Events
  if (deliveryBtns.length) {
    Array.from(deliveryBtns).forEach((btn) => {
      btn.addEventListener('click', () => {
        events.send(ID, 'Click', 'Add to bag');
      });
    });
  }
  if (collectBtns.length) {
    Array.from(collectBtns).forEach((btn) => {
      btn.addEventListener('click', () => {
        events.send(ID, 'Click', 'Click and collect');
      });
    });
  }
};

export default activate;
