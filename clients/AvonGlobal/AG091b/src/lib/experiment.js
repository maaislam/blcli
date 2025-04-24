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
import renderFormSuccess from './components/formSuccess';
import renderNewInputs from './components/renderNewInputs';
import {
  closeBtn,
  elemsToHide,
  elemToAdjustPos,
  elemToMakeTransparent,
  formContainer,
  formWrapper,
  mainWrapper,
} from './domData';
import getPosition from './helpers/getPosition';
import validateInputs from './helpers/validate';

const { rootScope, ID, VARIATION } = shared;
const init = (mutation) => {
  // if (mutation.attributeName === 'style') {
  //   console.log(mutation);
  // }
  setup();

  const { addedNodes, removedNodes } = mutation;
  const isMobile = DY.deviceInfo.type !== 'desktop';

  removedNodes.length <= 1 &&
    removedNodes.forEach((node) => {
      //     console.log(node);
      if (
        node.nodeType === 1 &&
        node.matches('[data-item-id="wishlistContainerVueWrapper"]') &&
        node.querySelector('.pdp__thank_you_screen')
      ) {
        VARIATION == 'control' && fireEvent('Back to brochures');
      }
    });

  addedNodes.length <= 1 &&
    addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.matches('[data-item-id="wishlistConfirmRepContent"]')) {
        document.querySelector(closeBtn).addEventListener('click', (e) => {
          fireEvent('Closes the form');
        });
        if (VARIATION == 'control') {
          fireEvent('Conditions Met');
          document.querySelector(elemToAdjustPos[2]).addEventListener('click', (e) => {
            //check email
            const isEmailValid = (email) => {
              const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return email.value !== '' ? re.test(String(email.value).toLowerCase()) : true;
            };
            const emailInput = document.querySelector('[data-item-id="ldc_email"]');
            if (!isEmailValid(emailInput)) {
              fireEvent('Email Errors');
            }
          });
          return;
        }

        const titleContainer = node.querySelector(
          '[data-item-id="wishlistConfirmRepContent_subObject_2_subObject_1_subObject_1_subObject_1"]'
        );
        const wrapper0 = document.querySelector(mainWrapper);

        const wrapper2 = document.querySelector(formWrapper);
        const wrapper3 = document.querySelector(formContainer);
        const controlCloseButton = document.querySelector(closeBtn);

        if (!wrapper2) return;

        wrapper0.classList.add(`${ID}__wrapper0`);
        wrapper2.classList.add(`${ID}__wrapper2`);
        wrapper3.classList.add(`${ID}__wrapper3`);

        elemsToHide.forEach((element) => {
          document.querySelector(element).style.display = 'none';
        });

        document.querySelector('[data-item-id="recaptcha_container"]').style.zIndex = '9999';

        document.querySelector(elemToAdjustPos[0]).classList.add(`${ID}__elemToAdjustPos-0`);

        // document.querySelector(elemToAdjustPos[1]).classList.add(`${ID}__elemToAdjustPos-1`);

        document.querySelector(elemToAdjustPos[2]).classList.add(`${ID}__elemToAdjustPos-2`);
        document.querySelector(`${elemToAdjustPos[2]}>div`).style.display = 'none';
        const wrapper4 = document.querySelector(elemToAdjustPos[3]);
        wrapper4.classList.add(`${ID}__wrapper4`);
        wrapper4.setAttribute('style', 'overflow:visible; top: 50px; transform:translateX(-50%);height:100%;');

        wrapper4.style.width = `${isMobile ? '300px' : '100%'}`;

        const newTitleBlock = document.querySelector(`.${ID}__titleblock`);
        if (newTitleBlock) {
          return;
        }
        //render new title block

        titleContainer.innerHTML = '';
        const renderConfig = {
          id: ID,
          anchorElem: titleContainer,
          anchorPos: 'afterbegin',
          fireEvent: fireEvent,
        };
        renderNewInputs(renderConfig);
        const newSubmitBtn = `
           <button class="${ID}__newformbtn">SEND ORDER TO REP</button>
         `;
        document.querySelector(elemToAdjustPos[2]).insertAdjacentHTML('beforeend', newSubmitBtn);
        const newFormBtn = document.querySelector(`.${ID}__newformbtn`);
        const evenType = isMobile ? 'touchstart' : 'click';
        newFormBtn.addEventListener(evenType, (e) => {
          const newInputsContainer = document.querySelector(`.${ID}__new-container`);
          const isDataValid = validateInputs(ID, newInputsContainer, fireEvent);
          //console.log(isDataValid);
          if (isDataValid) {
            document.querySelector(elemToAdjustPos[2]).click();
            console.log(isDataValid);
          }
        });

        const fakeCloseBtn = document.querySelector(`.${ID}__close-btn`);
        const fakeClsBtnPos = getPosition(fakeCloseBtn);
        const closeText = controlCloseButton.querySelector('p');
        if (closeText) {
          closeText.style.display = 'none';
        }

        controlCloseButton.style.top = fakeClsBtnPos.top + 'px';
        controlCloseButton.style.left = fakeClsBtnPos.left + 'px';
        controlCloseButton.style.transform = `translate(${isMobile ? '-100%' : '-70%'}, -50%)`;

        document.querySelectorAll(`.${ID}__inputs input`).forEach((element) => {
          element.addEventListener('input', (e) => {
            const target = e.target;
            if (target.matches('input')) {
              const originalNameInput = document.querySelector('[data-item-id="ldc_name"]');
              const originalEmailInput = document.querySelector('[data-item-id="ldc_email"]');
              const originalPhoneInput = document.querySelector('[data-item-id="ldc_phone"]');
              target.closest('div').classList.remove(`${ID}_error`);
              target.closest('div').querySelector('span')?.remove();
              if (target.matches(`#${ID}_name`)) {
                originalNameInput.value = target.value;
              }
              if (target.matches(`#${ID}_email`)) {
                originalEmailInput.value = target.value;
              }
              if (target.matches(`#${ID}_number`)) {
                originalPhoneInput.value = target.value;
              }
            }
          });
          element.addEventListener('focus', (e) => {
            const recaptcha = document.querySelector;
          });
        });
        DY.deviceInfo.brand === 'Apple' ? document.querySelector(`.${ID}_number-block`).classList.add(`${ID}__ios-adjust`) : '';
      } else if (node.nodeType === 1 && node.matches('.pdp__thank_you_screen')) {
        if (VARIATION == 'control') {
          return;
        }
        node.querySelector('div:first-child').style.display = 'none';
        node.style.width = '100%';
        node.style.background = 'transparent';
        const wishListContainer = document.querySelector('[data-item-id="wishlistContainer"]');
        wishListContainer.setAttribute(
          'style',
          ` 
               width:100%;
               top:50%;
               left:50%;
               transform: translate(-50%, -50%);
               border-radius: 4px;
               max-width:650px;
               height:100%;
               `
        );
        if (isMobile) {
          wishListContainer.classList.add(`${ID}__mobWishlistContainer`);
        }

        elemToMakeTransparent.forEach((elem) => {
          document.querySelector(elem).style.background = 'transparent';
        });

        renderFormSuccess(ID, node);
        document.querySelector(`.${ID}__ordersubmit`).addEventListener('click', (e) => {
          const target = e.target;
          const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
          if (targetMatched(`.${ID}__success-closebtn`) || targetMatched(`.${ID}__close-button`)) {
            node.querySelector('button').click();
            targetMatched(`.${ID}__success-closebtn`) && fireEvent('Back to brochures');
          }
        });
      }
    });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};

export default () => {
  // Poll and re-run init

  const appContainer = document.querySelector('body');
  pollerLite(['body'], () => {
    setup();

    fireEvent('Test Code Fired');

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        setTimeout(() => {
          init(mutation);
        }, 2000);
      });
    });

    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
    };

    observer.observe(appContainer, config);
  });
};
