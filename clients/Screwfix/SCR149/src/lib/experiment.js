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
import { mobileMenu } from './components/mobileMenu';
import { searchWrapper } from './components/searchWrapper';
import { createStoreLink, observeDOM, obsIntersection, onUrlChange, setSearchValue } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const handleIntersection = (entry) => {
  const newWrapperElement = document.querySelector(`.${ID}__newWrapper`);
  const parentElement = newWrapperElement.parentElement;
  if (entry.isIntersecting) {
    newWrapperElement.style.display = 'flex';
    parentElement.classList.remove(`${ID}__fixed`);
    parentElement.classList.remove('CeOuIC');
  } else if (!entry.isIntersecting) {
    newWrapperElement.style.display = 'none';
    parentElement.classList.add(`${ID}__fixed`);
  }
};

const handleObserver = (selector) => {
  const intersectionAnchor = document.querySelector(`${selector}`);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 1, handleIntersection);
  }
};

const inputOverlayRemove = () => {
  const logo = document.querySelector('[data-qaid="header-logo"]');
  logo.parentElement.parentElement.classList.remove(`${ID}__parent`);
  document.querySelector(`.${ID}__overlay`)?.remove();
};

const removeDynamicSearchResults = () => {
  const searchResultElem = document.querySelector(`.${ID}__dynamicSearchResults`);
  searchResultElem.innerHTML = '';
  searchResultElem.classList.remove(`${ID}__showResults`);
};

const setDynamicSearchResults = () => {
  pollerLite(['[data-qaid="keyword-suggestion"]'], () => {
    const firstResultItem = document.querySelector('form[role="search"] [data-qaid="keyword-suggestion"]');
    const resultsWrapper = firstResultItem.parentElement;
    const cloneResultsWrapper = resultsWrapper.cloneNode(true);
    cloneResultsWrapper.classList.add(`${ID}__resultsWrapper`);
    const searchResultsElem = document.querySelector(`.${ID}__dynamicSearchResults`);
    searchResultsElem.innerHTML = '';
    searchResultsElem.append(cloneResultsWrapper);
    searchResultsElem.classList.add(`${ID}__showResults`);
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
  pollerLite(['.WfkfCb'], () => {
    document.querySelector('._0R2uIG').classList.remove('.WfkfCb');
  });
  if (inputValue) {
    setTimeout(() => {
      fireEvent('User submits search query');
      inputOverlayRemove();
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

const renderStoreElement = (storeLocatorElement, storeLocatorLinkElement) => {
  const storeNameElement = storeLocatorElement.querySelector('[data-qaid="qa-store-label"]');
  const storeName = storeNameElement ? storeNameElement.textContent.trim() : '';
  if (!storeName) {
    return;
  }

  return storeLocatorLinkElement.href === 'https://www.screwfix.com/stores'
    ? createStoreLink(ID, storeName, '/stores')
    : createStoreLink(ID, storeName, storeLocatorLinkElement.href);
};

const init = () => {
  //check if page is correct

  //remove DOM element added by the experiment
  const newWrapperElements = document.querySelectorAll(`.${ID}__newWrapper`);
  if (newWrapperElements) {
    newWrapperElements.forEach((element) => element.remove());
  }

  const searchWrapperElements = document.querySelectorAll(`.${ID}__searchWrapper`);
  if (searchWrapperElements) {
    searchWrapperElements.forEach((element) => element.remove());
  }

  //remove setup
  document.documentElement.classList.remove(ID);
  document.documentElement.classList.remove(`${ID}-${VARIATION}`);

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    const controlSubmitHandler = (e) => {
      const inputElement = e.target.querySelector('#keyword-search');
      const inputValue = inputElement.value;
      if (inputValue) {
        fireEvent('User submits search query');
      }
    };
    const controlForm = document.querySelector('form[role="search"]');
    controlForm.removeEventListener('submit', controlSubmitHandler);
    controlForm.addEventListener('submit', controlSubmitHandler);
    return;
  }

  /*****add experiment specific code here*****/
  const controlInputElement = document.querySelector('#keyword-search');
  const formWrapper = controlInputElement.closest('form[role="search"]');
  const logo = document.querySelector('[data-qaid="header-logo"]');
  const headeTopLeftElement = document.querySelector('[data-qaid="header-top-left"]');
  const headerAccountElement = document.querySelector('[data-qaid="header-account"]');
  const storeLocatorElement = document.querySelector('[data-qaid="header-store-locator"]');
  const storeLocatorLinkElement = storeLocatorElement.querySelector('a');

  const headerBasket = document.querySelector('[data-qaid="header-basket"]');
  const headerBasketLinkElement = headerBasket.querySelector('a');
  const cloneBasket = headerBasket.cloneNode(true);
  cloneBasket.classList.add(`${ID}__basket`);
  const newWrapper = document.createElement('div');
  newWrapper.classList.add(`${ID}__newWrapper`);

  if (!document.querySelector(`.${ID}__newWrapper`)) {
    headerAccountElement.insertAdjacentElement('afterend', newWrapper);
  }
  //insert mobile menu
  if (!document.querySelector(`.${ID}__mobileMenu`)) {
    newWrapper.insertAdjacentHTML('afterbegin', mobileMenu(ID));
    newWrapper.insertAdjacentElement('beforeend', logo);
  }

  if (!document.querySelector(`.${ID}__basket`)) {
    newWrapper.insertAdjacentElement('beforeend', cloneBasket);
  }

  if (!document.querySelector(`.${ID}__searchWrapper`)) {
    document.querySelector('#site-navigation').insertAdjacentHTML('afterend', searchWrapper(ID));
  }

  if (!document.querySelector(`.${ID}__storeLocator`)) {
    const newStoreElement = renderStoreElement(storeLocatorElement, storeLocatorLinkElement);
    headeTopLeftElement.insertAdjacentHTML('afterbegin', newStoreElement);
  }

  pollerLite([`.${ID}__searchWrapper`], () => {
    handleObserver(`.${ID}__searchWrapper`);
  });

  const formElement = document.querySelector(`.${ID}__searchBox`);
  const inputElement = document.querySelector(`.${ID}__input`);

  handleInputWithDelay(inputElement, 1000, (value) => {
    setSearchValue(value);
  });

  // Attach the handler
  attachSubmitHandler(formElement, handleSubmit);
  inputElement.addEventListener('focus', () => {
    fireEvent('Users clicks search');
    logo.parentElement.parentElement.classList.add(`${ID}__parent`);
    if (!document.querySelector(`.${ID}__overlay`)) {
      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}__overlay TUnfTd suggestion-overlay"></div>`);
    }
  });

  //observer add in input element----->control
  const isObserverAddedForForm = formWrapper.dataset[`${ID}__isObserverAddedForForm`];
  if (!isObserverAddedForForm) {
    observeDOM('form[role="search"]', () => {
      if (document.querySelector('form[role="search"] > ul[role="listbox"]')) {
        setDynamicSearchResults();
      } else {
        removeDynamicSearchResults();
      }
    });
  }
  formWrapper.dataset[`${ID}__isObserverAddedForForm`] = true;

  //observer add in basket element----->control
  const isObserverAddedForBasket = headerBasketLinkElement.dataset[`${ID}__isObserverAddedForBasket`];
  if (!isObserverAddedForBasket) {
    observeDOM(`[data-qaid="header-basket"]:not(.${ID}__basket) a`, () => {
      const headerBasket = document.querySelector(`[data-qaid="header-basket"]:not(.${ID}__basket)`);
      const cloneBasket = headerBasket.cloneNode(true);
      cloneBasket.classList.add(`${ID}__basket`);
      const variationBasketElem = document.querySelector(`.${ID}__basket`);
      if (variationBasketElem) variationBasketElem.remove();
      if (!document.querySelector(`.${ID}__basket`)) {
        newWrapper.insertAdjacentElement('beforeend', cloneBasket);
      }
    });
  }
  headerBasket.dataset[`${ID}__isObserverAddedForBasket`] = true;

  //observer add in store locator element----->control
  const isObserverAddedForStoreLocator = storeLocatorLinkElement.dataset[`${ID}__isObserverAddedForStore`];
  if (!isObserverAddedForStoreLocator) {
    observeDOM(`[data-qaid="header-store-locator"] a`, () => {
      const newStoreLocatorElement = document.querySelector(`.${ID}__storeLocator`);
      if (newStoreLocatorElement) newStoreLocatorElement.remove();
      const newStoreElement = renderStoreElement(storeLocatorElement, storeLocatorLinkElement);
      headeTopLeftElement.insertAdjacentHTML('afterbegin', newStoreElement);
    });
  }
  storeLocatorLinkElement.dataset[`${ID}__isObserverAddedForStore`] = true;

  const keyDownHandler = (e) => {
    const isEscape = e.key === 'Escape';
    const isTab = e.key === 'Tab';
    const activeEl = document.activeElement;
    const specificElement = document.querySelector(`.${ID}__inputWrapper button`); // Replace with your selector

    // Check if specific element is currently focused
    const isSpecificFocused = activeEl === specificElement;

    if (isEscape && activeEl === document.querySelector(`.${ID}__input`)) {
      inputOverlayRemove();
    }

    if (isEscape) {
      if (isSpecificFocused) {
        inputOverlayRemove();
      }
    }
    // Track when we are on the specific element and Tab is pressed
    if (isTab) {
      if (!isSpecificFocused) {
        inputOverlayRemove();
      }
    }
  };

  // Close on Esc key
  document.removeEventListener('keydown', keyDownHandler);
  document.addEventListener('keydown', keyDownHandler);
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

    if (target.closest(`.${ID}__mobileMenu`) && target.closest('button')) {
      const navigationArea = document.querySelector('#navigation-area');
      const searchWrapper = document.querySelector(`.${ID}__searchWrapper`);
      const button = navigationArea.querySelector('button');
      searchWrapper.classList.toggle(`${ID}__hidden`);
      if (button) button.click();
      window.scrollTo(0, 0);
      if (searchWrapper.classList.contains(`${ID}__hidden`)) {
        target.closest('button').classList.add(`${ID}__active`);
      } else {
        target.closest('button').classList.remove(`${ID}__active`);
      }
      pollerLite(['._0R2uIG.WfkfCb.Nge29H.CeOuIC'], () => {
        document.querySelector('._0R2uIG').classList.remove('CeOuIC');
      });

      pollerLite(['._0R2uIG.CeOuIC'], () => {
        document.querySelector('._0R2uIG').classList.remove('CeOuIC');
      });
      document.documentElement.classList.toggle(`${ID}__scrollOff`);
    } else if (target.closest(`.${ID}__overlay`)) {
      inputOverlayRemove();
    } else if (target.closest(`.${ID}__dynamicSearchResults`) && target.closest('li')) {
      const clickedItem = target.closest('li');
      const clickedItemId = clickedItem.id;
      inputOverlayRemove();
      if (document.querySelector(`form[role="search"] li[id="${clickedItemId}"]`)) {
        fireEvent('User clicks product in search results');
        document.querySelector(`form[role="search"] li[id="${clickedItemId}"]`).click();
      }
    } else if (target.closest('[data-qaid="header-search"]') && target.closest('button')) {
      fireEvent('Users clicks search');
      pollerLite(['._0R2uIG.WfkfCb'], () => {
        setTimeout(() => {
          document.querySelector('._0R2uIG.WfkfCb').classList.add('CeOuIC');
        }, 200);
      });
    } else if (target.closest('[data-qaid="keyword-suggestion"]') && VARIATION === 'control') {
      fireEvent('User clicks product in search results');
    } else if (target.closest('[data-qaid="header-store-locator"]') && target.closest('a')) {
      fireEvent('User interacts with select a store button');
    } else if (target.closest('[data-qaid="header-top-left"]') && target.closest('a')) {
      fireEvent('User interacts with select a store button');
    } else if (target.closest('[data-qaid="header-basket"]') && target.closest('a')) {
      fireEvent('When a user clicks the basket icon');
    } else if (target.closest('[data-qaid="header-account"]')) {
      fireEvent('When a user clicks the account CTA');
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
