/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite(['body' ,
  '.product.media', 
  '.gallery-placeholder',
  '.page-title-wrapper.product',
  '.product.attribute.sku .value', 
  '.additional-product-grids .product-item',
  '.gallery-placeholder .fotorama__stage__frame img',

  () => {
    return !!window.jQuery && window.jQuery.Fotorama
  },
  /*() => {
    return !!window.SD076barberData && window.SD076beauty1Data && window.SD076beauty2Data && window.SD076furnitureData && window.SD076hair1ColData && window.SD076hairCol2Data && window.SD076hair1Data && window.SD076hair2Data && window.SD076nails1Data && window.SD076nails2Data
  },*/
], activate);
}
