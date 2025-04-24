/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.rateGroups',
    '.rateGroups .col-sm-5',
    '#main-carousel-image img',
    '.carousel-item',
    '.room-key-point-container .room-key-point-wrapper',
    '.key-points-margin .trv-bullets',
    () => {
      if(window.location.href.indexOf('[children]=0') === -1) {
        return true;
      }
    }
  ], () => {
    activate();
  });
}
