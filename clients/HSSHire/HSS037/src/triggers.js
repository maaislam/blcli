/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';
// import HSS031_exp from './lib/HSS031/HSS031_exp';
import data1 from './lib/data1';

const { ID, VARIATION } = shared;

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body', 
    '.HSS031.HSS031-1',
    '.day_price .price-row .price-blk .HSS031-text',
  ], () => {
    let runExp = false;
    const productData = data1[`${window.location.pathname}`];
    if (productData) {
      if (VARIATION == '2' && productData.v2 == true) {
        runExp = true;
      } else if (VARIATION == '1' || VARIATION == 'control') {
        runExp = true;
      }
    }
    
    if (runExp && document.querySelector('.day_price').querySelectorAll('.price-row .price-blk').length > 0) {
      activate();
    }
  });
}
