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
// import checkStores from './components/checkStores';
// import quantityContainer from './components/quantityContainer';
// import { inputValidation, toggleButtons } from './helpers/inputValidation';
import { dispatchHandler, onUrlChange, urlHandler } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const init = () => {
  const pageCondition = window.utag.data.basicPageId === 'product page' && isMobile();

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

  const stickyWrapper = document.querySelector('[data-qaid="pdp_sticky_product_footer"]');
  const wrapper = stickyWrapper.closest('.Psy2kH');
  wrapper.classList.add(`${ID}__stickyWrapper`);
  const inputElement = stickyWrapper.querySelector('[data-qaid="pdp-product-quantity"]');
  inputElement.closest('div').classList.add(`${ID}__quantityWrapper`);
  const productOverview = document.querySelector('[data-qaid="pdp-product-overview"]');

  if (VARIATION == 'control') {
    const inputHandler = () => {
      fireEvent('User interacts with quantity selector');
    };

    inputElement.removeEventListener('input', inputHandler);
    inputElement.addEventListener('input', inputHandler);
    return;
  }

  if (VARIATION === '2') {
    productOverview.insertAdjacentElement('beforebegin', wrapper);
  }

  const inputHandler = () => {
    fireEvent('User interacts with quantity selector');
  };

  inputElement.removeEventListener('input', inputHandler);
  inputElement.addEventListener('input', inputHandler);
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

    const pageCondition = window.utag.data.basicPageId === 'product page' && isMobile();
    if (!pageCondition) return;
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
