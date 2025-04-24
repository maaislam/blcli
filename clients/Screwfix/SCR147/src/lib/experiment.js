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
import getNearbyStores from './helpers/getNearbyStores';
import stockCheckWrapper from './components/stockCheckWrapper';
import { onUrlChange } from './helpers/utils';
import storesDropdown from './components/storesDropdown';
import { activeRadioButton, inactiveRadioButton } from './assets/icons';
import storeMessage from './components/storeMessage';

import getCoordinates from './helpers/getCoordinates';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 500;

const renderStoreMessage = (storeName, stock, distanceText) => {
  if (document.querySelector(`.${ID}__storeMessage`)) {
    document.querySelector(`.${ID}__storeMessage`).remove();
  }

  const storeDropdownElement = document.querySelector(`.${ID}__storesDropdown`);
  storeDropdownElement.insertAdjacentHTML('beforebegin', storeMessage(ID, storeName, stock, distanceText));
};

const renderStoresDropDown = (storesData) => {
  const stockWrapper = document.querySelector(`.${ID}__stock-check`);
  //const inputElement = stockWrapper.querySelector('.input-container');
  if (stockWrapper.querySelector(`.${ID}__storesDropdown`)) {
    stockWrapper.querySelector(`.${ID}__storesDropdown`).remove();
  }

  stockWrapper.insertAdjacentHTML('beforeend', storesDropdown(ID, storesData));
};

const renderInitialElement = (target) => {
  const clickedItem = target.closest(`.${ID}__clearButton`);
  const wrapper = clickedItem.closest(`.${ID}__stock-check`);
  const storeMessageElem = wrapper.querySelector(`.${ID}__storeMessage`);
  const storeDropdownElem = wrapper.querySelector(`.${ID}__storesDropdown`);

  if (storeMessageElem) storeMessageElem.remove();
  if (storeDropdownElem) storeDropdownElem.remove();

  wrapper.classList.remove(`${ID}__storeDropdownAdded`);
  wrapper.classList.remove(`${ID}__storeSelected`);
  wrapper.classList.remove(`${ID}__storeDropdownVisible`);
};

const selecteStore = (target) => {
  const clickedItem = target.closest(`.${ID}__item`);
  const wrapper = clickedItem.closest(`.${ID}__storesDropdown`);
  const storeCheckWrapper = clickedItem.closest(`.${ID}__stock-check`);
  const selectedTextElement = wrapper.querySelector(`.${ID}__selectedText`);
  const storeIconElement = clickedItem.querySelector(`.${ID}__icon`);
  const storeNameElement = clickedItem.querySelector(`.${ID}__name`);
  const { stock } = clickedItem.dataset;
  const storeName = storeNameElement.textContent.trim();
  const distanceElement = clickedItem.querySelector(`.${ID}__distanceText`);
  const distanceText = distanceElement.textContent.trim();
  selectedTextElement.textContent = `Selected Store: ${storeName}`;

  const allOptions = document.querySelectorAll(`.${ID}__item`);
  allOptions.forEach((option) => {
    option.classList.remove(`${ID}__selected`);
    option.querySelector(`.${ID}__icon`).innerHTML = inactiveRadioButton;
  });

  storeIconElement.innerHTML = activeRadioButton;
  clickedItem.classList.add(`${ID}__selected`);
  storeCheckWrapper.classList.add(`${ID}__storeSelected`);
  renderStoreMessage(storeName, stock, distanceText);
  toggleDropdown(target);
};

// const extractStoreDetails = (storesArray) => {
//   return storesArray.map((store) => ({
//     storeName: store.storeInfo.store.basic.name,
//     branchStock: store.products[0].branchStock,
//     productAvailabilityStatus: store.products[0].productAvailabilityStatus,
//     distanceText: store.storeInfo.carRoute.distanceText,
//   }));
// };

const toggleDropdown = (target) => {
  console.log(target, 'target');
  const wrapper = target.closest(`.${ID}__variantDropDownContainer`);
  const selectedTextElement = wrapper.querySelector(`.${ID}__selectedText`);
  const optionsContainer = wrapper.querySelector(`.${ID}__optionsContainer`);
  const allOptions = optionsContainer.querySelectorAll('div[role="option"]');
  wrapper.classList.toggle('open');
  wrapper.classList.contains('open')
    ? selectedTextElement.setAttribute('aria-expanded', true)
    : selectedTextElement.setAttribute('aria-expanded', false);

  wrapper.classList.contains('open')
    ? optionsContainer.setAttribute('aria-hidden', false)
    : optionsContainer.setAttribute('aria-hidden', true);

  if (wrapper.classList.contains('open')) {
    allOptions.forEach((option) => option.setAttribute('tabindex', 0));
  } else {
    allOptions.forEach((option) => option.setAttribute('tabindex', -1));
  }
};

const closeDropdown = (dropdown) => {
  const wrapper = document.querySelector(`.${ID}__variantDropDownContainer`);
  const optionsContainer = wrapper.querySelector(`.${ID}__optionsContainer`);
  const allOptions = optionsContainer.querySelectorAll('div[role="option"]');
  wrapper.classList.remove('open');
  dropdown.querySelector(`.${ID}__selectedText`).setAttribute('aria-expanded', 'false');
  document.querySelector(`.${ID}__optionsContainer`).setAttribute('aria-hidden', 'true');
  allOptions.forEach((option) => option.setAttribute('tabindex', -1));
};

const keyDownHandler = (e, dropdown) => {
  const { target } = e;
  if ((e.key === 'Enter' || e.key === ' ') && !target.closest(`.${ID}__optionsContainer`)) {
    e.preventDefault();
    toggleDropdown(target);
  } else if (e.key === 'Escape') {
    closeDropdown(dropdown);
  }
};

const postCodeHandler = (e, element) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    renderInitialElement(element);
  }
};

const dropdownItemHandler = (e, element) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    selecteStore(element);
  }
};

const isMobile = () => {
  //using the user agent to detect mobile devices
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const storeSelected = () => {
  const storeSelectElem = document.querySelector('[data-qaid="qa-store-label"]');
  return storeSelectElem.textContent.includes('Select') ? false : true;
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'product page' && !storeSelected(); //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const element = document.querySelector(`.${ID}__stock-check`);
    if (element) element.remove();

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

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/

  const desktopTargetPoint = document.querySelector('[data-qaid="pdp_sticky_product_footer"] > div');
  const mobileTargetPoint = document.querySelector('[data-qaid="product-price"]');

  if (document.querySelector(`.${ID}__stock-check`)) {
    document.querySelector(`.${ID}__stock-check`).remove();
  }

  if (!isMobile()) {
    desktopTargetPoint.insertAdjacentHTML('afterend', stockCheckWrapper(ID));
  } else if (isMobile()) {
    mobileTargetPoint.insertAdjacentHTML('afterend', stockCheckWrapper(ID));
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
    const pageCondition = window.utag.data.basicPageId === 'product page' && !storeSelected(); //add page check conditions here based on experiment requirement

    if (!pageCondition) {
      return;
    }
    const { target } = e;

    if (target.closest(`.${ID}__checkCta`)) {
      const clickedItem = target.closest(`.${ID}__checkCta`);
      const wrapper = clickedItem.closest(`.${ID}__stock-check`);
      const inputElement = wrapper.querySelector('input');
      const inputValue = inputElement.value.trim();
      const productSku = window.utag.data.prodSku[0];

      if (inputValue) {
        //get coordinates
        getCoordinates(inputValue).then((data) => {
          if (data && data.length > 0) {
            getNearbyStores(productSku, data[0].lat, data[0].lng).then((storeData) => {
              console.log('getNearbyStores ~ storeData:', storeData);
              //render store dropdown
              renderStoresDropDown(storeData);
              wrapper.classList.add(`${ID}__storeDropdownVisible`);
            });
          }
        });
      }
    } else if (target.closest(`.${ID}__selectedItem`)) {
      toggleDropdown(target);
    } else if (target.closest(`.${ID}__item`)) {
      selecteStore(target);
    } else if (target.closest(`.${ID}__clearButton`)) {
      renderInitialElement(target);
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
