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
      '.rowContainer section[itemprop="offers"]',
      '#estore_adcard_points_to_earn_widget',
      () => {
        return !!window.dataLayer;
      },

      () => {
        return !!window.dataLayer && !!window.dataLayer[1] && !!window.dataLayer[1].user && !!window.dataLayer[1].user.advantageCardFlag && window.dataLayer[1].user.isLoggedIn;
      }
    ], activate);
  }
}
