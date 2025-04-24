/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { observer } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const tracking = () => {
    
    // click continue
    const continueButton = document.querySelector('#checkOutBasketForm .styles-module__checkoutButton--13I8s');
    if(continueButton) {
      continueButton.addEventListener('click', () => {
        window.cmCreateManualLinkClickTag(`/BO065?cm_sp=BO065Maxymiser-_-BO065${VARIATION}ClickedContinue-_-Click`);
      });
    }

    // add another item
    const addButton = document.querySelector('#transparentButtonAddanotheritem');
    if(addButton) {
      addButton.addEventListener('click', () => {
        window.cmCreateManualLinkClickTag(`/BO065?cm_sp=BO065Maxymiser-_-BO065${VARIATION}ClickedAddItem-_-Click`);
      });
    }

    // remove item
    const basketItem = document.querySelectorAll('.styles-module__itemInnerContainer--1ylM-');
    if(basketItem) {
     
     for (let index = 0; index < basketItem.length; index += 1) {
        const element = basketItem[index];
        if(element) {
          const removeEl = element.querySelector('#onClickRemoveItem');
          if(removeEl) {
            removeEl.addEventListener('click', () => {
              window.cmCreateManualLinkClickTag(`/BO065?cm_sp=BO065Maxymiser-_-BO065${VARIATION}ClickedRemove-_-Click`);
            });
          }
        }
        
      }
    }
  }


  if(VARIATION === 'control') {
    window.cmCreateManualLinkClickTag(`/BO065?cm_sp=BO065Maxymiser-_-BO065${VARIATION}-_-Fired`);
    tracking();

    observer.connect(document.querySelector('#checkOutBasketForm'), () => {
      if(!document.querySelector('#checkOutBasketForm .styles-module__controlledDrugInfo--2ngG0 .styles-module__pill--1_okI')) {
        tracking();
      }
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    });

  } else {
    window.cmCreateManualLinkClickTag(`/BO065?cm_sp=BO065Maxymiser-_-BO065${VARIATION}-_-Fired`);
    tracking();

    const addMessage = () => {
      const confirmationMessage = document.createElement('div');
      confirmationMessage.classList.add(`${ID}-confirmationMsg`);
      confirmationMessage.innerHTML = `<p>Don't worry, we'll ask your GP to confirm the request and the quantity</p>`;

      const continueButton = document.querySelector('#checkOutBasketForm .styles-module__checkoutButton--13I8s');
      continueButton.insertAdjacentElement('beforebegin', confirmationMessage);
    }

    const removeMessage = () => {
      if(document.querySelector('.BO065-confirmationMsg')) {
        document.querySelector('.BO065-confirmationMsg').remove();
      }
    }

    removeMessage();
    addMessage();


    observer.connect(document.querySelector('#checkOutBasketForm'), () => {
      removeMessage();
      if(document.querySelector('#checkOutBasketForm .styles-module__controlledDrugInfo--2ngG0 .styles-module__pill--1_okI')) {
        // do nothing
      } else {
        addMessage();
        tracking();
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
