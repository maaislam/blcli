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
    '.einstain-inited',
    '.einstain-inited .slick-active',
    '.product-detail #product-content',
    () => !!(window.einstein && window.einstein.loaded),
    () => !!window.__zmags && !!window.zmagsJsonp,
    () => {
        return !!window.jQuery;
    }, 
    () => {
        return !!window.jQuery.fn.datepicker;
    }, 
    () => {
      if(typeof window.jQuery.fn.slick !== 'undefined') {
        return true;
      }
    },
  ], () => {
    // -----------------
    // Initial check control or variant - if control, send event
    // to identify as such, and bail out of executing the rest of the code
    // -----------------
    if(VARIATION == 'control') {
      events.send(`${ID}-control`, 'init');
    } else {
      events.send(`${ID}-${VARIATION}`, 'init');
      
      // N.B. you should be wary that this is reset in experiment.js
      window.einstein.loaded = true;

      activate();
    }
  });
});
