/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const { ID } = shared;
const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  if (
    !document.documentElement.classList.contains(`${ID}`) &&
    (window.location.href.indexOf('https://www.hsamuel.co.uk/webstore/l/garmin-smart-watches/') >
      -1 ||
      window.location.href.indexOf(
        'https://www.hsamuel.co.uk/webstore/l/mens-garmin-smartwatches/'
      ) > -1 ||
      window.location.href.indexOf('https://www.hsamuel.co.uk/webstore/l/ladies-garmin-watches/') >
        -1)
  ) {
    pollerLite(['body'], activate);
  }
}
