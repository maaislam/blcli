/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import modal from './components/modal';
import { modalContent } from './components/modalContent';
import { closeModal } from './helpers/closeModal';
import openModal from './helpers/openModal';
import { getCart, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const existingPopupClose = (ID) => {
  const existingModalOverlay = document.querySelector(`.ReactModalPortal .ReactModal__Overlay.${ID}__hidden`);
  const closeButton = existingModalOverlay?.querySelector('[data-qaid="lightbox-overlay-close-button"]');
  if (closeButton) {
    closeButton.click();
    existingModalOverlay.classList.remove(`${ID}__hidden`);
  }
};

const init = () => {
  //check if page is correct
  //const pageCondition = window.utag.data.basicPageId === 'lister Page'; //add page check conditions here based on experiment requirement

  // if (!pageCondition) {
  //   //remove DOM element added by the experiment
  //   const element = document.querySelector('.element');
  //   if (element) element.remove();

  //   //remove setup
  //   document.documentElement.classList.remove(ID);
  //   document.documentElement.classList.remove(`${ID}-${VARIATION}`);

  //   return;
  // }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/
  if (!document.querySelector(`.${ID}__modal`)) {
    document.body.insertAdjacentHTML('beforeend', modal(ID));
  }

  const quantityElement = document.querySelector('[data-qaid="miniBasket-quantity"]');
  if (quantityElement) {
    const basketElement = quantityElement.closest('a');
    const basketWrapper = basketElement.parentElement;
    basketWrapper.classList.add(`${ID}__basketWrapper`);
  }
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    const { target } = e;

    console.log('🚀 ~ clickHandler ~ target', target);

    if (target.closest(`.${ID}__modal-overlay`) || target.closest(`.${ID}__closeWrapper`)) {
      closeModal(ID);
      existingPopupClose(ID);
    } else if (
      target.closest('[data-qaid="pdp-button-click-and-collect"]') ||
      target.closest('[data-qaid="pdp-button-deliver"]') ||
      target.closest('[data-qaid="button-click-and-collect"]') ||
      target.closest('[data-qaid="button-deliver"]') ||
      target.closest(`.${ID}__basketWrapper`) ||
      target.closest('[data-button-type="stepper-decrement"]')
    ) {
      pollerLite(['.ReactModalPortal .ReactModal__Overlay'], () => {
        const existingModalOverlay = document.querySelector('.ReactModalPortal .ReactModal__Overlay');
        if (existingModalOverlay) {
          existingModalOverlay.classList.add(`${ID}__hidden`);
        }
      });

      setTimeout(() => {
        pollerLite([() => !document.querySelector('[data-qaid="loader"]')], () => {
          const cartData = getCart();
          cartData.then((data) => {
            console.log('🚀 ~ data', data);
            if (data && data.lineItems.length === 0) return;
            openModal(ID);
            setTimeout(() => {
              const modalLoader = document.querySelector(`.${ID}__loader`);
              const modalContentElem = document.querySelector(`.${ID}__modal-content`);
              if (modalLoader) {
                modalLoader.classList.add(`${ID}__hide`);
                modalContentElem.innerHTML = '';
                modalContentElem.removeAttribute('style');
                modalContentElem.innerHTML = modalContent(ID, data);
              }
            }, 1000);
          });
        });
      }, 100);
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
