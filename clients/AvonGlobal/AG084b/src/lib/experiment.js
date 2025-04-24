/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import observeDOM from './helpers/observerDOM';
import renderbasket from './components/basket';
import fetchCart from './helpers/getCart';
import fetchBrochureSettings from './helpers/getBrochureSettings';
import triggerControlTrackings from './helpers/triggerControlTrackings';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    fireEvent('Test Code Fired');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') {
      const callbackFunc = (mutation) => {
        mutation.addedNodes.length > 0 &&
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.matches('.v7__elem--container.v7-anim-slide-right')) {
              fireEvent('Conditions Met');

              (function pollForelem() {
                if (document.querySelector('#v7_vue_basket .title')) {
                  console.log('test');
                  document.querySelector('#v7_vue_basket').addEventListener('click', (e) => {
                    console.log(e.target);
                    const target = e.target;
                    triggerControlTrackings(target, fireEvent);
                  });
                } else {
                  setTimeout(pollForelem, 25);
                }
              })();
            }
          });
      };

      observeDOM('body', callbackFunc);
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...
    const callbackFunction = (mutation) => {
      mutation.addedNodes.length > 0 &&
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.matches('.v7__elem--container.v7-anim-slide-right')) {
            (function pollForElem() {
              if (
                document.querySelectorAll('#v7_vue_basket').length > 0 &&
                document.querySelector('[id^="vue_basket_checkout"]')
              ) {
                console.log('basket loaded');

                const basketOverlay = document.querySelector('.v7__overlay');

                basketOverlay?.classList.add(`${ID}__basket--overlay`);
                //basketOverlay.removeAttribute('style');

                const basketContainer = document.querySelector('[data-item-id="wishlistContainer"]');
                basketContainer.classList.add(`${ID}__basketContainer`);
                const closeBtn = document.querySelector('[data-item-id="wishlistClose"]');
                closeBtn && (closeBtn.style.display = 'none');

                //const headerSection
                //basketContainer.style.display = 'none';
                //fetch cart & settings
                setTimeout(() => {
                  fetchBrochureSettings().then((broSettings) => {
                    console.log(broSettings);
                    fetchCart().then((res) => {
                      renderbasket(ID, res, broSettings, fireEvent);
                      fireEvent('Conditions Met');
                      document.querySelector('[data-autoclick="true"]')?.click();
                      // get basket buttonsid="vue_basket_checkout_desktop"
                      const saveOrderEnabled = !!document.querySelector(`[data-test-id="${ID}__control-saveorder-btns"`);

                      if (!saveOrderEnabled) return;
                      //visual adjustments for save order

                      document.querySelector(`.${ID}__has-rep`).classList.add(`${ID}__hide`);
                      document.querySelector(`.checkout_send_to_rep_section`).classList.add(`${ID}__saveorder-enabled`);

                      document.querySelector(`.${ID}__saveorder-wrapper input`).addEventListener('input', (e) => {
                        //console.log(e.target.value);
                        document.querySelector(`.${ID}__controlsaveorder-input`).value = e.target.value;
                      });
                    });
                  });
                }, 2500);

                //setTimeout(() => {}, 2000);
              } else {
                setTimeout(pollForElem, 25);
              }
            })();
          }
        });
    };

    observeDOM('body', callbackFunction);
  };

  init();
};
