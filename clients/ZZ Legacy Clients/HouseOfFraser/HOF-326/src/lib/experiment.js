/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';
import { onPlpLoad } from './on-plp-load.funtion';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') return;

  // Do not match the perfume categories
  //if (!window.location.pathname.match(/beauty\/perfume/)) return;

  fireEvent('Conditions Met');

  // Experiment runs here

  if(VARIATION == 2) {
    if(window.location.href.indexOf('fragrance-finder') > -1) {
      onPlpLoad();
    }
  } else {
    onPlpLoad();
  }
  
};
