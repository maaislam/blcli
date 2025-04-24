import shared from '../../../../../core-files/shared';
import { fetchProducts } from './request-helpers.function';
import { localStorageOnFinderOpen } from './local-storage-on-finder-open.function';
import { localStorageOnFinderClose } from './local-storage-on-finder-close.function';
import { localStorageOnFinderFoundProducts } from './local-storage-on-finder-found-products.function';

const { ID, VARIATION } = shared;

export const defaultStorage = {
  isFinderOpen: false,
  activeStep: 0,
  steps: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  },
};

/**
 * Set new local storage
 * @param {typeof defaultStorage} value
 */
export const setStorage = (value) => {
  const event = document.createEvent('Event');

  event.initEvent('storageChanged', true, true);

  localStorage.setItem(ID, JSON.stringify(value));

  document.dispatchEvent(event);
};

/**
 * Get local storage or create new one and return
 * @returns {typeof defaultStorage & {steps: {['1' | '2' | '3' | '4' | '5']: boolean}}}
 */
export const getStorage = () => {
  const storage = window.localStorage.getItem(ID);

  if (!!storage) {
    return JSON.parse(storage);
  }

  setStorage(defaultStorage);

  return JSON.parse(window.localStorage.getItem(ID));
};

export const onLocalStorageChange = () => {
  const storage = getStorage();

  // Change you/they text on the modal if step 1 exists
  if (!!storage.steps[1]) {
    for (const element of document.querySelectorAll(
      `.${ID}-modal-you-they-text`
    )) {
      element.innerHTML = storage.steps[1] === 'FOR MYSELF' ? 'you' : 'they';
    }
  }

  // When open
  if (storage.isFinderOpen) localStorageOnFinderOpen();

  // When close
  if (!storage.isFinderOpen) localStorageOnFinderClose();

  // Last step where the products are shown
  if (storage.isFinderOpen && storage.activeStep === 5) {
    if (storage.steps[5] === null) {
      fetchProducts();
    }

    // When products loaded
    if (!!storage.steps[5]?.numberOfProducts)
      localStorageOnFinderFoundProducts();
  } else {
    const calculatingResultsElement = document.querySelector(
      '.modal__calculating-results'
    );

    if (
      calculatingResultsElement.classList.contains(
        'modal__calculating-results--hidden'
      )
    ) {
      calculatingResultsElement.classList.remove(
        'modal__calculating-results--hidden'
      );
    }
  }

  // Remove class that hides all modals
  for (const element of document.querySelectorAll('.hidden-at-the-beginning'))
    element.classList.remove(`hidden-at-the-beginning`);
};
