/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

const { ID, VARIATION } = shared;

// Defualt triggers require waiting for Einstein and Slick, else page subject to crash
window.addEventListener('load', () => {
  pollerLite([
  'body',
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
    if(document.querySelector('.product-col-2.product-detail .price-standard')) {
      return false;
    } else {
      return true;
    }
  },

  () => {
      return !!window.jQuery;
  }, 
  () => {
      if(typeof window.jQuery.fn.slick !== 'undefined') {
        return true;
      }
  },
  ], () => {
    // Initial check control or variant - if control, send event
    // to identify as such, and bail out of executing rest of code
    events.send(`${ID}-${VARIATION}`, 'init');
     activate();
    
  });
});
