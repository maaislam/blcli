/**
 * FL073 - Mini bag redirect
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, 'FL073 Control', 'FL073 Control is active');
    return false;
  } else {
    events.send(ID, 'FL073 Variation', 'FL073 Variation is active');
  }

  const miniBag = document.querySelector('#divBagItems');
  const checkoutBtn = document.querySelector('#divBagItems #spanCheckout a');
  checkoutBtn.setAttribute('href', '/cart');
  
};
