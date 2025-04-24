import shared from '../../../../../core-files/shared';
import { pollerLite } from './../../../../../lib/utils';
import { fireEvent } from '../../../../../core-files/services';
import { restylePaymentForm, restyleOrderSummary } from './checkoutPageComponents';

const { ID, VARIATION } = shared;

export const getCheckoutPage = () => {
  const pageUrl = window.location.href;
  let checkoutStep = '';

  if (pageUrl.indexOf('cart') > -1) {
    checkoutStep = 'cart';
  } else if (pageUrl.indexOf('payment') > -1) {
    checkoutStep = 'payment';
  } else {
    checkoutStep = 'checkout';
  }

  return checkoutStep;
}

export const generateNewProgressBar = () => {
  let stepOneActive = '';
  let activeStep = '';
  let stepTwoActive = '';
  let checkoutPage = getCheckoutPage();
  if (checkoutPage == 'cart') {
    stepOneActive = 'cart-steps__step--active';
  } else {
    stepOneActive = 'cart-steps__step--active';
    stepTwoActive = 'cart-steps__step--active';
    activeStep = 'active';
  }
  const newSteps = `<div class="${ID}-cart-steps cart-steps" data-was-processed="true">
    <div class="cart-steps__step ${stepOneActive} ${activeStep}" data-was-processed="true">
        <span>1</span>
        <p>Cart</p>
    </div>
    <div class="cart-steps__step cart-steps__step--checkout ${stepTwoActive}" data-was-processed="true">
        <span>2</span>
        <p>Checkout</p>
    </div>
    <div class="cart-steps__step cart-steps__step--complete" data-was-processed="true">
        <span>3</span>
        <p>Complete</p>
    </div>
  </div>`;

  if (!document.querySelector(`.${ID}-cart-steps.cart-steps`)) {
    document.querySelector('#maincontent .cart-steps').insertAdjacentHTML('beforebegin', newSteps);
  }
}

export const pageUrlObserver = () => {
  let oldHref = document.location.href;
  let bodyList = document.querySelector("body");
  const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href) {
                  oldHref = document.location.href;

                  if(document.location.href.indexOf('#payment') > -1) {
                      pollerLite(['#maincontent',
                      ], () => {
                        if (document.querySelector('#maincontent.ME294-checkout')) {
                          document.querySelector('#maincontent').classList.remove(`ME294-checkout`);

                          document.querySelector('#maincontent').classList.add(`ME294-payment`);

                          // --- Run Payment Re-styling
                          restylePaymentForm();
                          restyleOrderSummary();
                        }
                        
                      });
                  } else if (document.location.href.indexOf('cart') == -1 && document.location.href.indexOf('checkout') > -1) {
                    pollerLite(['#maincontent',
                    ], () => {
                      if (document.querySelector('#maincontent.ME294-payment')) {
                        document.querySelector('#maincontent').classList.remove(`ME294-payment`);

                        document.querySelector('#maincontent').classList.add(`ME294-checkout`);
                      }
                      
                    });
                  } else {
                    restylePaymentForm();
                  }
              }
          });
      });
  const config = {
      childList: true,
      subtree: true
  };
  
  observer.observe(bodyList, config);
    
}