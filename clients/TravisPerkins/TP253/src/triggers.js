/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';
import { isPDP, isPLP } from './lib/helpers/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(isPLP()){
    pollerLite(['body', () => document.querySelectorAll('[data-test-id="product"]').length >= 1], activate);

  }else if(isPDP()){
    pollerLite(['body', () => document.querySelectorAll('[data-test-id="add-to-collection-btn"]')], activate);

  }else if(window.location.href.includes("/search/")){
    pollerLite(['body', () => document.querySelectorAll('[data-test-id="product"]').length >= 1], activate);

  }else{
    pollerLite(['body'], activate);

  }
}
