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
    '.page-wrapper .product-secondary-tabs-wrapper',
    '.fotorama-item',
    '.fotorama__stage__frame.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img.fotorama__active[style]',
    '.gallery-placeholder .fotorama-item',
    '.gallery-placeholder.hidePreloader',
    '.fotorama__nav-wrap.fotorama__nav-wrap--horizontal',
    '.fotorama-item.fotorama .fotorama__wrap.fotorama__wrap--css3.fotorama__wrap--slide.fotorama__wrap--no-shadows[style]',
    '.fotorama__nav__frame.fotorama__nav__frame--thumb .fotorama__thumb.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img img',
    () => {
      return !!window.jQuery;
    }, 
  ], activate);
}
