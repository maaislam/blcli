/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

const { ID, VARIATION } = shared;

const pollAndRun = () => {
  pollerLite([
    'body',
    '#navigation',
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
    // Initial check control or variant - if control, send event
    // to identify as such, and bail out of executing rest of code
    if(VARIATION == 'control') {
      events.send(`${ID}-control`, 'init');
    } else {
      events.send(`${ID}-${VARIATION}`, 'init');

      activate();
    }
  });
};

// Defualt triggers require waiting for Einstein and Slick, else page subject to crash
if(document.readyState === 'complete') {
  pollAndRun();
} else {
  window.addEventListener('load', () => {
    pollAndRun();
  });
}
