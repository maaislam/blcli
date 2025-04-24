/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from '../../../../core-files/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  if(!document.documentElement.classList.contains(`${ID}`)) {

    const urls = ['/velvetiser-hot-chocolate-machine.html', '/stellar-white-velvetiser.html', '/velvetiser-hot-chocolate-maker.html', 'velvetiser-hot-chocolate-pack.html', '/472727', '/472725', '/472726', '/472810'];
    const str = window.location.href;
    if (urls.some(str.includes.bind(str))) {
      pollerLite(['body'], () => {
        // trigger loader
          document.body.insertAdjacentHTML('afterbegin','<div class="HCpageLoader"><div class="innerLoader"><span style="background-image:url(https://editor-assets.abtasty.com/48343/603e11eb1eda61614680555.gif)"></span><p>Loading...</p></div></div>');
      });
    } else {
      if(document.querySelector('.HCpageLoader')) {
        document.querySelector('.HCpageLoader').remove();
      }
    }
    
  
    pollerLite([
      'body',
      '#main',
      '#tabDesc',
      '.prod-info.prod-info-c ul',
      () => {
        if (window.location.href.indexOf('stellar-white') > 0 || window.location.href.indexOf('472810') > 0){

          return true;
          
          }
          else if (document.querySelector('.product-review-links.product-review-links-top .bv-rating span')){
            return true;
          }
      }, 
      () => {
          return !!window.jQuery;
      }, 
      () => {
        return !!window.KlarnaOnsiteService;
      }, 
      
      () => {
          if(typeof window.jQuery.fn.slick !== 'undefined') {
            return true;
          }
      },
    ], () => {
      if(document.querySelector('.HCpageLoader')) {
        document.querySelector('.HCpageLoader').remove();
      }
      activate();
    });
  }
}
