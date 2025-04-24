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
import { products } from './data/data';
// import swiper from './helpers/swiper';

import trapFocus from './helpers/trapFoucs';
import { observeDOM, onUrlChange, setSearchValue } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const setXPositionCSSVariable = (el, mainEl) => {
  if (!(el instanceof Element)) {
    return;
  }

  const { left: x } = el.getBoundingClientRect();
  mainEl.style.setProperty('--x-position', `${x}px`);
};

const removeDynamicSearchResults = () => {
  const modalDynamicSearchResultsElem = document.querySelector(`.${ID}__dynamicSearchResults`);
  modalDynamicSearchResultsElem.innerHTML = '';
  modalDynamicSearchResultsElem.classList.remove(`${ID}__showResults`);
};

const setDynamicSearchResults = () => {
  pollerLite(['[data-qaid="keyword-suggestion"]'], () => {
    const firstResultItem = document.querySelector('form[role="search"] [data-qaid="keyword-suggestion"]');
    const resultsWrapper = firstResultItem.parentElement;
    const cloneResultsWrapper = resultsWrapper.cloneNode(true);
    cloneResultsWrapper.classList.add(`${ID}__resultsWrapper`);
    const modalDynamicSearchResultsElem = document.querySelector(`.${ID}__dynamicSearchResults`);
    modalDynamicSearchResultsElem.innerHTML = '';
    modalDynamicSearchResultsElem.append(cloneResultsWrapper);
    modalDynamicSearchResultsElem.classList.add(`${ID}__showResults`);
  });
};

const handleInputWithDelay = (inputElement, delay, callback) => {
  const eventHandler = (event) => {
    clearTimeout(eventHandler.timeoutId);
    eventHandler.timeoutId = setTimeout(() => {
      callback(event.target.value);
    }, delay);
  };

  inputElement.removeEventListener('input', eventHandler);
  inputElement.addEventListener('input', eventHandler);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const searchButton = document.querySelector('[data-qaid="search-button"]');
  const inputValue = event.target.querySelector(`.${ID}__input`)?.value;
  if (inputValue) {
    setTimeout(() => {
      searchButton.click();
    }, 1000);
  }
};

const attachSubmitHandler = (formElement, callback) => {
  if (!formElement) return;

  // Remove previous listener before adding a new one
  formElement.removeEventListener('submit', callback);
  formElement.addEventListener('submit', callback);
};

const openModal = () => {
  const modalElem = document.querySelector(`.${ID}__modal`);
  const inputElem = modalElem.querySelector(`.${ID}__input`);
  const openButton = document.activeElement;
  !isMobile() ? setXPositionCSSVariable(document.querySelector('form[role="search"]'), modalElem) : null;
  if (modalElem) {
    modalElem.setAttribute('aria-hidden', 'false');
    modalElem.classList.remove(`${ID}__closing`);
    modalElem.classList.add(`${ID}__open`);
    inputElem.focus();

    // Store focus so we can return it on close
    if (openButton) {
      openButton.setAttribute('data-open-trigger', ID);
    }

    // Define the handler separately so it can be removed later
    window.trapFocusHandler = (e) => trapFocus(e, ID, modalElem);

    // Attach focus trap
    document.addEventListener('keydown', window.trapFocusHandler);
  }
};

const closeModal = () => {
  //openModalButton?.focus(); // Return focus to original trigger if it exists

  const modalElem = document.querySelector(`.${ID}__modal`);
  const dynamicResultsWrapper = modalElem.querySelector(`.${ID}__dynamicSearchResults.${ID}__showResults`);
  if (modalElem) {
    modalElem.removeAttribute('aria-hidden');
    modalElem.classList.remove(`${ID}__open`);
    modalElem.classList.add(`${ID}__closing`);

    // Remove focus trap event listener
    document.removeEventListener('keydown', window.trapFocusHandler);

    // Restore focus to the element that opened the modal
    const openButton = document.querySelector(`[data-open-trigger="${ID}"]`);
    if (openButton) {
      openButton.focus();
    }
  }

  if (dynamicResultsWrapper) {
    setSearchValue();
  }
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'home'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const modalElements = document.querySelectorAll(`.${ID}__modal`);
    if (modalElements) {
      modalElements.forEach((modal) => modal.remove());
    }

    const overlayElements = document.querySelectorAll(`.${ID}__overlay`);
    if (overlayElements) {
      overlayElements.forEach((overlayElement) => overlayElement.remove());
    }

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

  // swiper();

  /*****add experiment specific code here*****/
  const controlInputElement = document.querySelector('#keyword-search');
  const formWrapper = controlInputElement.closest('form[role="search"]');
  const mobileSearchButtonElement = document.querySelector('button[name="mobile-search-button"]');
  const mobileSearchButtonWrapper = mobileSearchButtonElement.parentElement;
  mobileSearchButtonWrapper.classList.add(`${ID}__searchButtonWrapper`);

  //add overlay
  if (document.querySelector(`.${ID}__overlay`)) {
    document.querySelector(`.${ID}__overlay`).remove();
  }

  isMobile()
    ? mobileSearchButtonWrapper.insertAdjacentHTML('beforeend', `<div class="${ID}__overlay"></div>`)
    : formWrapper.insertAdjacentHTML('beforeend', `<div class="${ID}__overlay"></div>`);

  //ADD SEARCH MODAL
  if (document.querySelector(`.${ID}__modal`)) {
    document.querySelector(`.${ID}__modal`).remove();
  }

  const filteredProducts = products.filter((element) => element !== undefined);
  if (filteredProducts.length === 0) return;
  document.body.insertAdjacentHTML('afterbegin', modal(ID, filteredProducts));

  // pollerLite([`.${ID}__sliderBox`, () => typeof window.Swiper === 'function'], () => {
  //   initSwiper(`.${ID}__sliderBox`);
  // });

  const modalFormElement = document.querySelector(`.${ID}__searchBox`);
  const modalInputElement = document.querySelector(`.${ID}__input`);

  handleInputWithDelay(modalInputElement, 1000, (value) => {
    setSearchValue(value);
  });

  // Attach the handler
  attachSubmitHandler(modalFormElement, handleSubmit);

  // getProductsData(products)
  //   .then((products) => {

  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });

  const keyDownHandler = (e) => {
    //accesibility function add
    const modalElement = document.querySelector(`.${ID}__modal`);
    if (
      (e.key === 'Enter' || e.key === ' ') &&
      (e.target.closest('#keyword-search') || e.target.closest('button[name="mobile-search-button"]'))
    ) {
      e.preventDefault();
      openModal();
    }
    if (e.key === 'Escape' && modalElement.classList.contains(`${ID}__open`)) {
      closeModal();
    }

    if (e.key === 'Enter' && e.target.closest(`.${ID}__closeWrapper`)) {
      closeModal();

      pollerLite(['button[name="mobile-search-button"][aria-expanded="true"]'], () => {
        const controlSearchButton = document.querySelector('button[name="mobile-search-button"][aria-expanded="true"]');
        if (controlSearchButton) controlSearchButton.click();
      });
    }
  };

  // Close on Esc key
  document.removeEventListener('keydown', keyDownHandler);
  document.addEventListener('keydown', keyDownHandler);

  const isObserverAdded = formWrapper.dataset[`${ID}__isObserverAdded`];
  if (!isObserverAdded) {
    observeDOM('form[role="search"]', () => {
      if (document.querySelector('form[role="search"] > ul[role="listbox"]')) {
        setDynamicSearchResults();
      } else {
        removeDynamicSearchResults();
      }
    });
  }
  formWrapper.dataset[`${ID}__isObserverAdded`] = true;
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
    if (window.utag.data.basicPageId !== 'home') return;

    const { target } = e;

    if (target.closest(`.${ID}__overlay`)) {
      openModal();
    } else if (target.closest(`.${ID}__modal-overlay`) || target.closest(`.${ID}__closeWrapper`)) {
      fireEvent('User clicks the close button in the search module');
      closeModal();
    } else if (target.closest(`.${ID}__dynamicSearchResults`) && target.closest('li')) {
      const clickedItem = target.closest('li');
      const clickedItemId = clickedItem.id;
      if (document.querySelector(`form[role="search"] li[id="${clickedItemId}"]`)) {
        document.querySelector(`form[role="search"] li[id="${clickedItemId}"]`).click();
      }
    } else if (target.closest(`.${ID}__input`)) {
      fireEvent('User clicks the input field to search');
    } else if (target.closest('#keyword-search') && VARIATION === 'control') {
      fireEvent('User clicks the input field to search');
    } else if (target.closest(`.${ID}__searchItem`)) {
      const clickedItem = target.closest(`.${ID}__searchItem`);
      const innerImg = clickedItem.querySelector('img');
      const text = innerImg ? innerImg.getAttribute('alt') : clickedItem.textContent;
      text ? fireEvent(`User clicks the popular search "${text}"`) : null;
    } else if (target.closest(`.${ID}__brandItem`)) {
      const clickedItem = target.closest(`.${ID}__brandItem`);
      const text = clickedItem.textContent;
      text ? fireEvent(`User clicks the popular brand "${text}"`) : null;
    } else if (target.closest(`.${ID}__categoryItem`)) {
      const clickedItem = target.closest(`.${ID}__categoryItem`);
      const text = clickedItem.textContent;
      text ? fireEvent(`User clicks the popular category "${text}"`) : null;
    } else if (target.closest(`.${ID}__productLink`)) {
      const clickedItem = target.closest(`.${ID}__productLink`);
      const productNameElement = clickedItem.querySelector('[data-qaid="pdp-product-name"] span[itemprop="name"]');
      const productName = productNameElement ? productNameElement.textContent : '';
      if (productName) fireEvent(`User clicks the popular product "${productName}"`);
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
