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
import renderCartSummary from './components/cartSummary';
import { getCart } from './helpers/getCart';
import obsIntersection from './helpers/observeIntersection';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const init = () => {
  setup();

  //fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const newSummaryAnchor = document.querySelector('.Cart-Summary');
  const cartBottomAct = document.querySelector('.Cart-BottomActions');
  const cartTax = document.querySelector('.Cart-Tax');

  cartBottomAct?.classList.add(`${ID}__Cart-BottomActions`);
  newSummaryAnchor.classList.add(`${ID}__hide`);
  const newCartTax = cartTax.cloneNode(true);

  //get cart

  getCart()
    .then((json) => {
      if (VARIATION != 'control') {
        console.log(json.Data);
        renderCartSummary(ID, json.Data, newSummaryAnchor);
        document.querySelector(`.${ID}__taxblock`).insertAdjacentElement('afterbegin', newCartTax);
      }

      const newCart =
        VARIATION != 'control' ? document.querySelector(`.${ID}__cart-summary`) : document.querySelector(`.Cart-Summary`);
      if (newCart) {
        const intersectionCallback = (entries) => {
          if (
            entries.isIntersecting &&
            !document.body.classList.contains(`${ID}__seen-cartsummary`) &&
            json.Data.NumberOfProductsInCart > 0
          ) {
            document.body.classList.add(`${ID}__seen-cartsummary`);
            fireEvent('Conditions Met');
          }
        };

        obsIntersection(newCart, 1, intersectionCallback);
      }
    })
    .catch((err) => console.log('Request Failed', err));
};

export default () => {
  setup();
  if (location.pathname.indexOf('/cart') !== -1) {
    fireEvent('Test Code Fired');
    pollerLite(['.Cart-Summary', '.Cart-Tax'], () => {
      console.log(document.getElementById('CartPage'));
      setTimeout(() => {
        init();
      }, 1500);
      const isMobile = window.matchMedia('(pointer:coarse)').matches;

      document.body.addEventListener(`${isMobile ? 'touchend' : 'click'}`, (e) => {
        const target = e.target;
        console.log(target);
        const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
        //console.log(target);
        const tooltipText = document.querySelector(`.${ID}__tooltiptext`);
        if (targetMatched(`.${ID}__tooltip`) && !targetMatched(`.${ID}__tooltip-close`)) {
          tooltipText.classList.add('open');
          fireEvent('User interacts with the tool tip');
        } else if (targetMatched(`.${ID}__tooltip-close`)) {
          tooltipText.classList.remove('open');
          fireEvent('User closes with the tool tip');
        } else if (
          targetMatched(`[ng-click="CheckOutMobile('/checkoutmobile/login')"]`) &&
          target.closest(`.${ID}__Cart-BottomActions`)
        ) {
          fireEvent('User interacts with the purple cta at the bottom of the page');
        } else if (
          targetMatched(`[ng-click="CheckOutMobile('/checkoutmobile/login')"]`) &&
          !target.closest(`.${ID}__Cart-BottomActions`)
        ) {
          fireEvent('User interacts with the purple cta at the top of the page');
        } else if (
          targetMatched('.AG013-NEW_VI_links') ||
          targetMatched('.AG013-NEW_VI_updateLink') ||
          targetMatched('.Cart-ProductRemove') ||
          targetMatched('.Cart-Buttons>a:first-child') ||
          targetMatched('.Cart-ButtonsBottom>a:first-child')
        ) {
          setTimeout(() => {
            init();
          }, 2000);
        }
      });
    });
  } else if (location.pathname === '/checkoutmobile') {
    console.log(location.pathname);
    document.body.addEventListener('click', (e) => {
      const target = e.target;
      //console.log(target);
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      if (targetMatched('.AG048_optionInner')) {
        // console.log(target);
        const deliveryType = target.closest('.AG048_optionInner').querySelector('.shippingdetails>p').innerText;
        fireEvent(`User chooses ${deliveryType.indexOf('Standard') !== -1 ? 'standard' : 'express'} delivery at checkout.`);
        console.log(deliveryType);
      }
    });
  }
};
