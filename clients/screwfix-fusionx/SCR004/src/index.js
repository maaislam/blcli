import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const isPdp = window.location.pathname.includes('/p/');
//const safetyBoots = window.location.pathname.includes('safety-boots');

if (isPdp) {
  //add this when site is ready with GA
  //site has not ga script, add tracking related codes when ga is ready
  //add more page targeting condition as needed
  //add function to check if vat thing is handled
  pollerLite(['body', '[data-qaid="product-tile"]', '[data-qaid="pdp-tabs"]'], activate);
}
