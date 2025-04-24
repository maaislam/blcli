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
    'meta[property="og:brand"]',
    '.gallery-placeholder .fotorama__img',
    '.fotorama__loaded--img',
    '#maincontent',
    '.fotorama-item',
    '.fotorama__stage__frame.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img.fotorama__active[style]',
    '.gallery-placeholder .fotorama-item',
    '.gallery-placeholder.hidePreloader',
    '.product-options-wrapper',
    '.super-attribute-select',
    () => {
      return !!window.jQuery;
    }, 
    () => {
      if(document.querySelector('meta[property="og:brand"]').content !== 'Geek') {
        return true
      }
    }
  ], activate);
}
