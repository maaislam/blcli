/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    if(window.location.href === 'https://www.boots.com/' || window.location.href.indexOf('https://www.boots.com/?') > -1) {
      pollerLite([
        'body',
        '.templateMainContentArea',
        '#main',
        '.oct-template',
        '.swiper-slide',
        ()=> {
          if (document.querySelector('.oct-carousel-hero__inner') || document.querySelector('#cu_2021_pay_day')){
            return true
          }
        }
      ], activate);
    } else {
      pollerLite([
        'body',
      ], activate);
    }
  }
}
