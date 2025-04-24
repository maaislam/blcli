/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '#estore_product_price_widget',
      '.findStore',
      '#estore_product_title h1',
      '#estore_pdp_image',
      '#estore_pdp_trcol',
      '#estore_pdp_brcol_1 .contentRecommendationWidget .left_espot',
      // () => {
      //   const url = window.location.pathname;
      //   const matchURL = [
      //   '/marc-jacobs-daisy-drops-eau-so-fresh-for-women-30-capsules-10332262', 
      //   '/marc-jacobs-daisy-drops-signature-for-women-30-capsules-10332261', 
      //   '/marc-jacobs-daisy-drops-love-for-women-30-capsules-10332263'
      // ];
      //   if(matchURL.includes(url)) {
      //    return true;
      //   }
      // }
    ], activate);
  }
}
