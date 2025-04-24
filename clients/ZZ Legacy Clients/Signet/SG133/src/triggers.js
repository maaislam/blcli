/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from './lib/shared';

const { ID } = shared;

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite([
      'body',
      '.home-tile-grid .home-tile-grid__text-tile',
      '.home-tile-grid .home-tile-grid__small-tile',
      () => {
        if(window.digitalData && window.digitalData.page.pageInfo.pageType === 'Landing') {
          return true
        }
      }
    ], activate);
  }
}
