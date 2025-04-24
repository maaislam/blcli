/**
 * WW003 - Checkout order summary
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import promisePolyfill from '../vendor/polyfills/Promise';
import BasketSummary from '../components/BasketSummary/BasketSummary';
import { events } from '../../../../../lib/utils';

const activate = () => {
  // Setup
  const { ID } = settings;
  setup();

  // Polyfills
  if (!window.Promise) promisePolyfill();

  // Components
  try {
    const basketSummary = new BasketSummary();
  } catch (e) {
    // Send event on error
    events.send(ID, 'Error', `Error creating experiment - ${e}`);

    // Remove component if error
    const basketSummary = document.querySelector(`.${ID}_BasketSummary`);
    if (basketSummary) basketSummary.parentElement.removeChild(basketSummary);
  }
};

export default activate;
