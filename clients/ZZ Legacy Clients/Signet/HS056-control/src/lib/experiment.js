/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID } = shared;


  const storevoucherUser = () => {
    const url = window.location.href;
    if(url.indexOf('myvouchercodes') > -1) {
      if(!localStorage.getItem(`${ID}-voucher`)) {
        localStorage.setItem(`${ID}-voucher`, 1);
      }
    }
  }

  storevoucherUser();

  if(localStorage.getItem(`${ID}-voucher`)) {
    document.body.classList.add(`${ID}-voucherExist`);

    events.send(`${ID} control`, 'SAVE20 banner control fired');
  }
}
