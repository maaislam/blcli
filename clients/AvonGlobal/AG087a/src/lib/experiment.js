/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import renderCartDetail from './components/cartDetail';
import slideBasket from './components/slideBasket';
import getCartFromDOM from './helpers/extractCart';
import getCart from './helpers/getCart';

const { ID, VARIATION } = shared;
const init = (mutation) => {
  setup();

  const { attributeName, oldValue, target } = mutation;

  // console.log('mutation', mutation);

  const classStr = (pageType) => `v7__${pageType}__card_add_to_basket_success_overlay fade-enter fade-enter-active`;
  if (attributeName === 'class' && (oldValue === classStr('plp') || oldValue === classStr('pdp'))) {
    if (VARIATION == 'control') {
      fireEvent('Customer views the minibag');
      fireEvent('Conditions Met');
      return;
    }
    //console.log('add to basket overlay visible', mutation);
    target.classList.add(`${ID}__success-overlay`);

    //get cart data from DOM for var1

    const data = getCartFromDOM(ID, target);
    //console.log(data);
    slideBasket(ID, VARIATION, target, data);
    fireEvent('Customer views the minibag');
    fireEvent('Conditions Met');
    DY.deviceInfo.type !== 'desktop' && document.querySelector('[data-item-id="header"]').classList.add(`${ID}__adjust-zindex`);

    if (VARIATION != 2) return;

    PDP_MANAGER.getShopperId().then((shopperId) => {
      console.log(shopperId);
      getCart(shopperId).then((data) => {
        console.log('slidecart', data);
        const anchorElem = document.querySelector(`.${ID}__cartdetail-wrapper`);
        renderCartDetail(ID, anchorElem, data);
      });
    });
  }
};
export default () => {
  // Poll and re-run init

  pollerLite(['body'], () => {
    const appContainer = document.querySelector('body');
    setup();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        setTimeout(() => {
          init(mutation);
        }, 2000);
      });
    });

    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    };
    document.body.addEventListener('click', (e) => {
      const target = e.target;
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      const closeSlider = () => {
        const SlideCarts = document.querySelectorAll(`[class$="${ID}__tobe-removed"]`);
        target.closest(`.${ID}__slidebasket-overlay`).querySelector('div').classList.add('slide-out-right');
        setTimeout(() => {
          SlideCarts.forEach((elem) => {
            elem.remove();
          });
          document.querySelectorAll(`.${ID}__success-overlay`).forEach((elem) => {
            elem.classList.remove(`${ID}__success-overlay`);
          });
          fireEvent('Customer closes the minibag');
          DY.deviceInfo.type !== 'desktop' &&
            document.querySelector('[data-item-id="header"]').classList.remove(`${ID}__adjust-zindex`);
        }, 500);
      };
      if (VARIATION == 'control') return;

      if (targetMatched(`.${ID}__view-basket`)) {
        MainFrame.EventHandler.dispatch('closeLdcAndOpenBasket');
        closeSlider();
        fireEvent(`Customer clicks "View basket" in the minibag`);
      } else if (
        targetMatched(`.${ID}__close-icon`) ||
        targetMatched(`.${ID}__continue-shop`) ||
        (target.closest(`.${ID}__slidebasket-overlay`) && !target.closest(`.${ID}__sidebasket-wrapper`))
      ) {
        closeSlider();
      }
    });

    observer.observe(appContainer, config);
  });
};
