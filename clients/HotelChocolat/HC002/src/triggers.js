/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

window.addEventListener('load', () => {

pollerLite(['body',
'.einstain-inited',
'#pdpMain',
'.product-detail .prod-info.prod-info-b',
'.tab-target-mobile .product-tabs',
() => !!(window.einstein && window.einstein.loaded && window.einstein.loaded.length > 0),
() => !!window.__zmags && !!window.zmagsJsonp,
() => {
    return !!window.jQuery;
}, 
() => {
    if(typeof window.jQuery.fn.slick !== 'undefined') {
      return true;
    }
},
], () => {
  window.einstein.loaded = true;
  //setTimeout(() => {
    //window.addEventListener('load', () => {
      activate();
    //});
  //}, 400);
});
});
