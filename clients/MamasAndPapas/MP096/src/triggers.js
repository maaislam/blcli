import experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

// ------------------------------------------------------
// Important! 
//
// In this experiment we're using Qubit's recommendation
// products as this informs us about stock
// ------------------------------------------------------

poller([
  'body',
  '.addToCartButton',
  () => {
    // Set in Qubit platform, once available
    // experiment can trigger
    return !!window.MP046_product_recommendations;
  },
  () => {
    try {
      return !!window.jQuery.fn.slick();
    } catch (e) {
      return false;
    }
  }
], () => {
  experiment.init();
});
