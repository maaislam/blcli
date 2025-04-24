/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import {
  pollerLite
} from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  pollerLite([
    'body',
    function () {
      if (document.querySelector('.ss-homepage .sib-home section.bg-mono-light.centered[data-module="objective"]')) {
        if (document.querySelector('.dev.sib-home [data-module="alert-bar"]')) {
          return true
        } else {
          return false
        }
      } else if (document.querySelector('.ss__category-header.ss__offer-banner')) {
        if (document.querySelector('.promo-banner')) {
          return true
        } else {
          return false
        }
      } else if (document.querySelector('.ecomm-cta-wrapper')) {
        if (document.querySelector('.ecomm-enabled .promo-banner')) {
          return true
        } else {
          return false
        }
      }
    },
  ], activate);
}
