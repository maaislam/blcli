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
    if(document.querySelectorAll('.not-available-msg').length > -1){
      return true;
    }
    else if(document.querySelectorAll('.out-of-stock').length > -1){
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
    if(VARIATION == 'control') {
      events.send(`${ID}-control`, 'init');
    } else {
      events.send(`${ID}-${VARIATION}`, 'init');


      activate();
    }
  });
});
