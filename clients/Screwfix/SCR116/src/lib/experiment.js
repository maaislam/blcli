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
import checkStores from './components/checkStores';
import quantityContainer from './components/quantityContainer';
import { inputValidation, toggleButtons } from './helpers/inputValidation';
import { dispatchHandler, onUrlChange, urlHandler } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const init = () => {
  const pageCondition = window.utag.data.basicPageId === 'product page';

  if (!pageCondition) {
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }
  setup();
  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/
  fireEvent('Conditions Met');

  const productSku = window?.utag?.data.prodSku[0];
  const priceElement = document.querySelector('[data-qaid="product-price"]');
  const clonePriceElement = priceElement.cloneNode(true);
  clonePriceElement.classList.add(`${ID}__productPrice`);
  const productReviewElement = document.querySelector('[data-qaid="pdp-product-overview"]');
  const inputElement = document.querySelector('[data-qaid="pdp-product-quantity"]');

  const sickyProductFooterElement = document.querySelector('[data-qaid="pdp_sticky_product_footer"]');

  if (VARIATION == 'control') {
    const inputHandler = () => {
      fireEvent('User interacts with quantity');
    };

    inputElement.removeEventListener('input', inputHandler);
    inputElement.addEventListener('input', inputHandler);
    return;
  }

  // if (document.querySelector(`.${ID}__checkStores`)) {
  //   document.querySelector(`.${ID}__checkStores`).remove();
  // }
  // priceElement.insertAdjacentHTML('afterend', checkStores(ID, productSku));

  // if (document.querySelector(`.${ID}__productPrice`)) {
  //   document.querySelector(`.${ID}__productPrice`).remove();
  // }

  // if (document.querySelector(`.${ID}__quantityContainer`)) {
  //   document.querySelector(`.${ID}__quantityContainer`).remove();
  // }

  // if (VARIATION !== '1') {
  //   stickyWrapper.insertAdjacentElement('afterbegin', clonePriceElement);
  // }

  // if (VARIATION === '1' || VARIATION === '2') {
  //   const inputHandler = (e) => {
  //     urlHandler(ID, productSku, e.target.value);
  //     fireEvent('User interacts with quantity');
  //   };

  //   inputElement.removeEventListener('input', (e) => inputHandler(e));
  //   inputElement.addEventListener('input', (e) => inputHandler(e));
  // }

  isMobile() && productReviewElement.insertAdjacentElement('beforebegin', clonePriceElement);
  sickyProductFooterElement.insertAdjacentHTML('beforebegin', quantityContainer(ID));
  inputValidation(ID);
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
    //check if page is correct

    const pageCondition = window.utag.data.basicPageId === 'product page';
    if (!pageCondition) return;

    const { target } = e;
    const productSku = window?.utag?.data.prodSku[0];
    const qtyContainer = document.querySelector('.qty-input');
    const qtyInput = qtyContainer?.querySelector('.product-qty');
    const qtyMin = parseInt(qtyInput?.getAttribute('min'));
    const qty = parseInt(qtyInput?.value);

    if (
      target.closest(`.${ID}__checkStores`) ||
      target.closest('[data-qaid="pdp_sticky_product_footer"] [data-qaid="pdp-info-message"] a')
    ) {
      fireEvent('User interacts with check store cta');
    } else if (target.closest('.qty-count--minus')) {
      if (qty > qtyMin) {
        qtyInput.value = qty - 1;

        fireEvent('User interacts with quantity -');
        dispatchHandler(qtyInput.value);
      }
      //urlHandler(ID, productSku, qtyInput.value);
      toggleButtons(qtyInput, qtyMin);
    } else if (target.closest('.qty-count--add')) {
      if (qtyInput.value.length) {
        qtyInput.value = qty + 1;
      } else if (!qtyInput.value) {
        qtyInput.value = 1;
      }

      fireEvent('User interacts with quantity +');
      dispatchHandler(qtyInput.value);
      //urlHandler(ID, productSku, qtyInput.value);
      toggleButtons(qtyInput, qtyMin);
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
