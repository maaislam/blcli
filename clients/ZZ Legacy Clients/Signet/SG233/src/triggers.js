/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${shared.ID}`)) {
    if(window.location.href === 'https://www.hsamuel.co.uk/' || window.location.href.indexOf('https://www.hsamuel.co.uk/?') > -1) {
      pollerLite([
        'body',
        '.header',
        () => {
          if(window.digitalData.page.pageInfo.pageType === 'Landing') {
            return true;
          }
        }
      ], activate);
    }
  }
}
