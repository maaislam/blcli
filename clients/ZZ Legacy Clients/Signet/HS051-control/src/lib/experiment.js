/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

export default () => {
  setup();

  // Write experiment code here
  const { ID} = shared;

  const financeSelected = document.querySelector('#ifcPaymentContainer #ifcPaymentPlan');
  if(financeSelected) {
    events.send(`${ID} `, 'Applied finance', 'Applied finance');
  }

  // event for applied promo code
  if(document.querySelector('.promo-code-input__remove-button')) {
    events.send(`${ID}`, 'Applied Promo Code', 'Applied Promo Code', { sendOnce: true });
  }
};
