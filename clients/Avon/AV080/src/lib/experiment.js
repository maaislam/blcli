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

const makeChanges = () => {
  const paymentDue = document.querySelector('.order-summary__emphasis').innerText;
  if(paymentDue) {
    const payBtn = document.querySelector('#continue_button');
    const payButtons = document.querySelectorAll('.step__footer__continue-btn');
    if (payButtons) {
      [].forEach.call( payButtons, (btn) => {
        const btnInner = btn.querySelector('.btn__content');
        if(btnInner) {
          btnInner.innerText = `Pay ${paymentDue} now`;
        }
      })
    }
    // if (payBtn) {
    //   const btnContent = payBtn.querySelector('.btn__content');
    //   if (btnContent) {
    //     btnContent.innerText = `Pay ${paymentDue} now`;
    //   }
    // }
  }

  // const checkoutReductionDesktop = document.querySelector(`#checkout_reduction_code`);
  // if (checkoutReductionDesktop) {
  //   console.log(checkoutReductionDesktop);
  //   checkoutReductionDesktop.addEventListener('submit', () => {
  //     makeChanges();
  //     console.log('heard submit');
  //   })
  // }

}

export default () => {
  setup();
  const { rootScope, ID } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    makeChanges();

    const radioLabelPrimary = document.querySelector('.radio__label__primary');
    if (radioLabelPrimary) {
      radioLabelPrimary.addEventListener('click', () => {
        setTimeout( () => {
          const paymentDue = document.querySelector('.order-summary__emphasis').innerText;
          // const payBtn = document.querySelector('#continue_button');
          // if (payBtn) {
          //   const btnContent = payBtn.querySelector('.btn__content');
          //   if (btnContent) {
          //     btnContent.innerText = `Pay ${paymentDue} now`;
          //   }
          // }
          const payButtons = document.querySelectorAll('.step__footer__continue-btn');
          if (payButtons) {
            [].forEach.call( payButtons, (btn) => {
              const btnInner = btn.querySelector('.btn__content');
              if(btnInner) {
                btnInner.innerText = `Pay ${paymentDue} now`;
              }
            })
          }
        }, 1000)
      })
    };

    const paymentSection = document.querySelector('.section--payment-method');
    if(paymentSection) {
      const paymentRadio = paymentSection.querySelector('.input-radio');
      const paymentDue = document.querySelector('.order-summary__emphasis').innerText;
      if (paymentRadio) {
        paymentRadio.addEventListener('click', () => {
          setTimeout( () => {
            const payButtons = document.querySelectorAll('.step__footer__continue-btn');
            if (payButtons) {
              [].forEach.call( payButtons, (btn) => {
                const btnInner = btn.querySelector('.btn__content');
                if(btnInner) {
                  btnInner.innerText = `Pay ${paymentDue} now`;
                }
              })
            }
          }, 1000)
        })
      }
    }


    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        makeChanges();
      })
    });

    var elm = document.querySelector('.payment-due__price');
    var config = {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false
    };
    observer.observe(elm, config);
  };

  // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  init();

  observePageChange(document.body, (p) => {
    init();
  });
};
