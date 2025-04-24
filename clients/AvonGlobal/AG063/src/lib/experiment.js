/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observePageChange } from '../../../../../lib/utils';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

let isRunning = false;

const runChanges = () => {
  if(isRunning) {
    return;
  }
  isRunning = true;

  pollerLite([
    '.v7__plp__list_card',
    '.v7__plp__list.mobile',
  ], () => {
    const plpListMobile = document.querySelector('.v7__plp__list.mobile');
    var plpCards = plpListMobile.querySelectorAll('.v7__plp__list_card');
    [].forEach.call(plpCards, (card) => {
      const listPrice = card.querySelector('.list_price');
      if (listPrice) {
        if(!card.querySelector(`[class*="${shared.ID}__saving"]`)){
            const originalPrice = parseFloat(listPrice.innerText.replace('£', '')).toFixed(2);
            const salePriceElm = card.querySelector('.sale_price');
            const salePrice = parseFloat(salePriceElm.innerText.replace('£', '')).toFixed(2);
            var saving = originalPrice - salePrice;
            saving = saving.toFixed(2);
            
            if (shared.VARIATION == 1) {
              var markup = `
                <div class="${shared.ID}__saving">
                  YOU SAVE £${saving}
                </div>
              `;
              const v7Card = card.querySelector('.v7__plp__card');
              v7Card.insertAdjacentHTML('afterbegin', markup);
            }
             else if (shared.VARIATION == 2) {
              const percentage = ((saving/originalPrice) * 100).toFixed(0);
              var markup = `
                <div class="${shared.ID}__saving--2">
                  ${percentage}% OFF
                </div>
              `;
              const v7Card = card.querySelector('.v7__plp__card');
              v7Card.insertAdjacentHTML('afterbegin', markup);
            }
        }
      }
    })

    isRunning = false;
  })
}

export default () => {
  setup();
  // const { rootScope, ID } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  let observerDidFire = false;
  const init = () => {
    runChanges();

    const updateAfterMutation = () => {

    };

    const observer = new MutationObserver(function(mutations) {
      if(observerDidFire) {
        return;
      }
      observerDidFire = true;
      runChanges();

      setTimeout(() => {
        observerDidFire = false;
      }, 1500);
    }, 500);

    pollerLite(['.v7__plp__list_wrapper'], () => {
      var elm = document.querySelector('.v7__plp__list_wrapper');
      var config = {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: false
      };
      observer.observe(elm, config);
    });

  };

  // // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  init();

  observePageChange(document.body, (p) => {
    init();
  });
};
