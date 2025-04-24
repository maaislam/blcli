/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.product-stock',
  () => {
    // ---
    // Delivery date text exists?
    // ---
    const deliveryDateText = document.querySelector('.product-delivery__text #js-update-delivery');
    return !!deliveryDateText;
  },
], activate);
