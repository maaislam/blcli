/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);


const { VARIATION } = shared;

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${shared.ID}`)) {

    if(VARIATION === '1' || VARIATION === 'control') {
        pollerLite([
          'body',
          '#basketForm',
          '#access-content',
          '.product-buy-now',

          () => {
            if(document.referrer.indexOf('ernestjones') === -1) {
              return true;
            }
          }
        ], activate);
    } else if(VARIATION === '2' || VARIATION === '3') {
      pollerLite([
        'body',
        '#basketForm',
        '#access-content',
        '.product-buy-now',

        () => {
          if(document.referrer.indexOf('ernestjones') === -1) {
            return true;
          }
        },
        () => {
          return !!window.exponea && !!window.exponea.getRecommendation;
        }
      ], activate);
    }
  }
}
