/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, isLoggedIn } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import enabledSkus from './enabledSkus';

const amendButtonsBehaviour = (btns) => {
  [].forEach.call(btns, (btn) => {

    btn.addEventListener('click', (e) => {
      let shouldDisable = true;

      const container = btn.parentNode.parentNode.parentNode;
      if(container) {
        const skuElm = container.querySelector('[data-test-id="product-card-code"]')
        if(skuElm) {
          const sku = skuElm.innerText.trim();

          if(enabledSkus.indexOf(sku) > -1) {
            shouldDisable = false;
          }
        }
      }

      if(shouldDisable) {
        e.preventDefault();
        e.stopPropagation();

        showMessage();
      } else {
        btn.classList.add(`${shared.ID}-enabled`);
      }
    });
  });
};

export default () => {
  if(document.body.classList.contains(`${shared.ID}`)) {
    // Prevent running twice on same page
    return;
  }

  window.addEventListener('beforeunload', (event) => {
    const success = document.querySelectorAll('.tp158-success-wrapper');
    [].forEach.call(success, (s) => {
      s.parentNode.removeChild(s);
    });
  });

  setup();

  if(shared.VARIATION == 'control') {
    return;
  }

  const buttons = document.querySelectorAll('[class^=ProductItemMobile__BasketActionButton]');
  const buttons2 = document.querySelectorAll('[class^=ProductItemDesktop__BasketActionButton]');

  amendButtonsBehaviour(buttons);
  amendButtonsBehaviour(button2);


  
}
