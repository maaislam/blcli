/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import { bucketUser } from '../../../../lib/gtm-ab';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

// ------------
// Change this to determine how much traffic you want to target
// 1/3 = 33.33% of traffic
// 1/5 = 20% of trafic
// ...
// ------------
const TRAFFIC_PROPORTION = 1/3;

// Run code subject to page vars
if(!ieChecks) {
  const numVariants = Math.round(1 / TRAFFIC_PROPORTION);

  if( 1 == bucketUser('PC-BL-cwv-bucket', localStorage, numVariants)) {
    pollerLite([
      'body',
      () => !!window.gtag,
      () => document.readyState == 'complete'
    ], activate);
  }
}
