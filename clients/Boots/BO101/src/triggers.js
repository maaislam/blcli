/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { checkIdInLocalStorage } from './lib/services';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '.product_listing_container',
      '.product_listing_container ul li',
      '.product_listing_container ul.grid_mode.grid li',
      () => {
        var runExperiment = false;
        var userIDextract = getCookie('CM_REG');

        if (userIDextract
        || checkIdInLocalStorage !== '') {
          runExperiment = true;
        }

        return runExperiment;
      },
    ], 
      activate()
    )
  }
}
