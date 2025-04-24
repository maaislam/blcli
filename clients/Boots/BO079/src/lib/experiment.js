/**
 * BO079 - Pharmacy Bag Iteration
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {

  if(VARIATION == 'control') {
    setup();
    window.cmCreateManualLinkClickTag("/BO079?cm_sp=PharmacyBasket-_-BO079control-_-BO079Started");

    const addCta = document.querySelector('.styles-module__transparentButton--1QECb');
    if (addCta) {
      addCta.addEventListener('click', () => {
        window.cmCreateManualLinkClickTag("/BO079?cm_sp=PharmacyBasket-_-BO079controlAddItem-_-BO079Clicked");
      });
    }

    const continueBtn = document.querySelector('#blueButtonContinue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        window.cmCreateManualLinkClickTag("/BO079?cm_sp=PharmacyBasket-_-BO079controlContinue-_-BO079Clicked");
      });
    }

    observer.connect(document.querySelector('.styles-modules__container--e_0EB'), () => {
        const add = document.querySelector('.styles-module__transparentButton--1QECb');
        if (add) {
          add.addEventListener('click', () => {
            window.cmCreateManualLinkClickTag("/BO079?cm_sp=PharmacyBasket-_-BO079V1AddItem-_-BO079Clicked");
          });
        }
      
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    });

  } else if (VARIATION == '1') {
    setup();

    
    window.cmCreateManualLinkClickTag("/BO079?cm_sp=PharmacyBasket-_-BO079v1-_-BO079Started");

    const numOfProducts = document.querySelectorAll('#checkOutBasketForm section').length;
    if (numOfProducts > 0
    && !document.querySelector('section .styles-module__emptyBasketText--8QSj0')) {
      const basketTitle = document.querySelector('h1#pageTitle-Bag');
      if (numOfProducts == 1) {
        basketTitle.querySelector('span').innerHTML = `Bag (${numOfProducts} item)`;
      } else {
        basketTitle.querySelector('span').innerHTML = `Bag (${numOfProducts} items)`;
      }
      
    }

    const addButtons = () => {
      // --- ADD NEW CTA BUTTONS
      let newButtonCtaContainer = '';

      if (!document.querySelector('section .styles-module__emptyBasketText--8QSj0')) {
        newButtonCtaContainer = `<div class="${ID}-ctaBtn__wrapper">
          <p class="${ID}-subtext">Don't worry, we'll ask your GP to confirm the request and the quantity</p>
          <div class="${ID}-buttons__wrapper">
            <div class="${ID}-button" id="add-another-item">
              <button>Add another item</button>
            </div>
            <div class="${ID}-button" id="continue-skip">
              <button>Checkout</button>
            </div>
          </div>
        </div>`;
      } else {
        newButtonCtaContainer = `<div class="${ID}-ctaBtn__wrapper ${ID}-noItems">
          <div class="${ID}-buttons__wrapper">
            <div class="${ID}-button" id="add-another-item">
              <button>Add an item</button>
            </div>
          </div>
        </div>`;
      }
      if (!document.querySelector(`.${ID}-ctaBtn__wrapper`)) {
        document.querySelector('.styles-modules__buttonContainer--WFg2B').insertAdjacentHTML('beforebegin', newButtonCtaContainer);
      }
      

      const addCta = document.querySelector('#add-another-item button');
      const skipCta = document.querySelector('#continue-skip button');

      if (addCta) {
        addCta.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag("/BO079?cm_sp=PharmacyBasket-_-BO079AddItem-_-BO079Clicked");
          document.querySelector('.styles-modules__buttonContainer--WFg2B button').click();
        });
      }
      
      if (skipCta) {
        skipCta.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag("/BO079?cm_sp=PharmacyBasket-_-BO079Continue-_-BO079Clicked");
          document.querySelector('.styles-module__checkoutSectionContainer--2HH6q.styles-module__whiteBGD--Vcd2B button').click();
        });
      }
    }

    addButtons();
    
    /**
     * @desc Checks if product list has changed
     * if yes, update number of items in the bag
     * and page content
     */
    observer.connect(document.querySelector('.styles-modules__container--e_0EB'), () => {

      const numOfProducts = document.querySelectorAll('#checkOutBasketForm section').length;
      const basketTitle = document.querySelector('h1#pageTitle-Bag');
      // alert('1');
      if (numOfProducts > 0) {
        if (numOfProducts == 1) {
          basketTitle.querySelector('span').innerHTML = `Bag (${numOfProducts} item)`;
        } else {
          basketTitle.querySelector('span').innerHTML = `Bag (${numOfProducts} items)`;
        }
      
      } 

      let newButtonCtaContainer = '';
      if (document.querySelector('section .styles-module__emptyBasketText--8QSj0'))  {
        basketTitle.querySelector('span').innerHTML = `Bag`;
        
        document.querySelector(`.${ID}-subtext`).setAttribute('style', 'display: none;');
        document.querySelector(`.${ID}-ctaBtn__wrapper`).parentNode.removeChild(document.querySelector(`.${ID}-ctaBtn__wrapper`));
        newButtonCtaContainer = `<div class="${ID}-ctaBtn__wrapper ${ID}-noItems">
          <div class="${ID}-buttons__wrapper">
            <div class="${ID}-button" id="add-another-item">
              <button>Add an item</button>
            </div>
          </div>
        </div>`;
        document.querySelector('section .styles-module__emptyBasketText--8QSj0').insertAdjacentHTML('afterend', newButtonCtaContainer);

        const addCta = document.querySelector('#add-another-item button');
        if (addCta) {
          addCta.addEventListener('click', () => {
            window.cmCreateManualLinkClickTag("/BO079?cm_sp=PharmacyBasket-_-BO079V1AddItem-_-BO079Clicked");
            document.querySelector('.styles-modules__buttonContainer--WFg2B button').click();
          });
        }
      }
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    });
  }

};


export default activate;