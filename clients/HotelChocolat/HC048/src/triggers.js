/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

const { ID, VARIATION } = shared;

pollerLite([
  'body',
  '.product-price .price-sales',
  '#page_heading h1',
  '#page_heading h3',
  '.product-add-to-cart #add-to-cart',

  // -----------------
  // Crashing issues mean adding in Einstein checks(?):
  // Otherwise leave commented
  // -----------------
  //'.einstain-inited',
  //'.einstain-inited .slick-active',
  //() => !!(window.einstein && window.einstein.loaded),
  //() => !!window.__zmags && !!window.zmagsJsonp,
  // -----------------
  //
  () => {
      return !!window.jQuery;
  }, 
  () => {
    if(window.location.href.indexOf('velvetiser') > -1) {
      return false
    } else {
      return true
    }
  },
  () => {
    const velvetiserSKUs = ['472726', '472725', '472727'];
    const sku = document.querySelector('#pid');
    if(velvetiserSKUs.indexOf(sku) === -1) {
      return true
    }
  },
  () => {
    if(document.querySelector('.button-fancy-large.add-to-cart-disabled.out-of-stock')) {
      return false
    } else {
      return true
    }
  },
  () => {
    if(document.querySelector('.product-col-2.product-detail .price-standard')) {
      return false
    } else {
      return true
    }
  },

  // -----------------
  // If slick needed
  // -----------------
  //() => {
  //    if(typeof window.jQuery.fn.slick !== 'undefined') {
  //      return true;
  //    }
  //},
  // -----------------
  //
  () => !!(document.readyState == 'complete'), // Platform workaround rather than win-onload

], () => {
  // Initial check control or variant - if control, send event
  // to identify as such, and bail out of executing rest of code
  if(VARIATION == 'control') {
    events.send(`${ID}-control`, 'init');
  } else {
    events.send(`${ID}-${VARIATION}`, 'init');

    activate();
  }
});
