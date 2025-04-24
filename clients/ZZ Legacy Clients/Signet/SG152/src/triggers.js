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
    const url = window.location.href;

    if(window.digitalData.page.pageInfo.pageType === 'PLP') { 

      if(url.indexOf('ernestjones') > -1) {
        pollerLite([
          'body',
          '.c-product-card',
        ], activate); 
      } else if(url.indexOf('hsamuel') > -1) {
          pollerLite([
            'body',
            '.c-product-card',
          ], activate);
      }
    }
  }
}
