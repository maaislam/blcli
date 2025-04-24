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
import { pollerLite } from '../../../../../lib/uc-lib';
import initMain from './checkTimeCount';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...
  document.querySelector('#bagQuantityContainer').addEventListener('mouseenter', (e) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    let todaysStartingTimeStamp = '';
    let todaysLastTimeStamp = '';
    let current_time = new Date().getTime();
    todaysStartingTimeStamp = new Date(year + '-' + month + '-' + day + 'T00:00').getTime();
    todaysLastTimeStamp = new Date(year + '-' + month + '-' + day + 'T21:00').getTime();
    if (current_time > todaysStartingTimeStamp && current_time < todaysLastTimeStamp) {
      fireEvent('User views mini bag');
    }
  });

  if (window.location.pathname == '/cart' && document.querySelector('.newBasketSummary')) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    let todaysStartingTimeStamp = '';
    let todaysLastTimeStamp = '';
    let current_time = new Date().getTime();
    todaysStartingTimeStamp = new Date(year + '-' + month + '-' + day + 'T00:00').getTime();
    todaysLastTimeStamp = new Date(year + '-' + month + '-' + day + 'T21:00').getTime();
    if (current_time > todaysStartingTimeStamp && current_time < todaysLastTimeStamp) {
      fireEvent('User views bag');
    }
  }

  if (shared.VARIATION == 'control') {
    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    return;
  }

  // Write experiment code here
  // ...

  if (shared.VARIATION == '1') {
    pollerLite(['body', '#divBagItems'], () => {
      const bag = document.querySelector('#divBagItems #divBagItemsChild');
      const className = 'rty';
      const classNameOne = 'rty-gap';
      fireEvent('Variation displayed on mini bag');
      initMain(bag, ID, className, classNameOne, fireEvent);
    });
  } else if (shared.VARIATION == '2') {
    pollerLite(['body', '#BasketDiv', '.newBasketSummary'], () => {
      const bag = document.querySelector('.newBasketSummary .OrderSumm');
      fireEvent('Variation displayed on bag');

      initMain(bag, ID, fireEvent);
    });
  }
};
