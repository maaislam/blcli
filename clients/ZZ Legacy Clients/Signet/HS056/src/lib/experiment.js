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

  const { ID, VARIATION } = shared;

  const storevoucherUser = () => {
    const url = window.location.href;
    if(url.indexOf('myvouchercodes') > -1) {
      if(!localStorage.getItem(`${ID}-voucher`)) {
        localStorage.setItem(`${ID}-voucher`, 1);
      }
    }
  }

  storevoucherUser();

  const createBanner = () => {
    const voucherBanner = document.createElement('div');
    voucherBanner.classList.add(`${ID}-voucher_banner`);
    voucherBanner.innerHTML = `
    <div class="${ID}-voucher_text">Save £20 when you spend £100.</div><div class="${ID}-code">Use code <span>SAVE20</span></div>
    </div>`;

    return voucherBanner;
  }

  const addBanner = () => {
    if(window.innerWidth > 1024) {
      document.querySelector(`#js-header`).appendChild(createBanner());
    } else { 
      document.querySelector(`#js-header .header__container`).insertAdjacentElement('afterend',createBanner());
    }
  }

  if(localStorage.getItem(`${ID}-voucher`)) {
    document.body.classList.add(`${ID}-voucherExist`);
    addBanner();

    events.send(`${ID} v${VARIATION}`, 'SAVE20 banner shown');
  }
};
