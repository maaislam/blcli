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
      '.pdp-promotion-redesign.member_price_advantage span.member_price_advantage[data-promotype="Price advantage"]',
    ], activate);
  }
  // console.log('Experiment:  - BOOTS triggers.js')
}
