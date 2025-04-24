/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'#ctl00_cphBody__objOffersCombined_upOffersStore',
'#ctl00_cphBody__objOffersCombined_upOffersStore .menuItems',
'.more--offers--wrapper .moreOffersList',
// () => !!window.jQuery,
() => {
  let run = false; 
  if (window.jQuery || window.$) {
   run = true;
  }
  return run;
},
() => {
  let run = false;
  if (window.innerWidth <= 460) {
    run = true;
  }
  return run;
}
], activate);
