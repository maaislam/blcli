/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { observePageChange } from '../../../../../lib/utils';

const runChanges = () => {
  pollerLite([
    '.checkout_shopping_with_section',
  ], () => {
    const shoppingWithSection = document.querySelector('.checkout_shopping_with_section');
    if (shoppingWithSection) {
      const btnWraps = shoppingWithSection.querySelectorAll('.button_wrapper');
      if (btnWraps.length > 1) {
        const basketSection = document.querySelector('.v7__pdp_basket');
        if (basketSection) {
          const checkoutBtn = basketSection.querySelector('.btn_checkout');
          if (checkoutBtn) {
            checkoutBtn.innerText = 'Checkout / Send'
          }
        }
      } else {
        const basketSection = document.querySelector('.v7__pdp_basket');
        if (basketSection) {
          const checkoutBtn = basketSection.querySelector('.btn_checkout');
          if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
              window.location.href = 'https://shopwithmyrep.co.uk/checkoutmobile/login';
            })
          }
        }
      }
    }
  })
}

export default () => {
  
  
  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    setup();
    runChanges();
  };

  if (!document.body.classList.contains('AV071')) {
    init();
  }

  observePageChange(document.body, (p) => {
      init();
  })

};
