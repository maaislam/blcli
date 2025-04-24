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
import variantDropDown from './components/variantDropDown';
import productsData from './data/data';
import { getProductsData, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const toggleDropdown = (target) => {
  fireEvent('When a user taps the SKU drop down');
  const wrapper = target.closest(`.${ID}__variantDropDownContainer`);
  const selectedTextElement = wrapper.querySelector(`.${ID}__selectedText`);
  const optionsContainer = wrapper.querySelector(`.${ID}__optionsContainer`);
  const allOptions = optionsContainer.querySelectorAll('a[role="option"]');
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
  fireEvent('When a user taps the SKU drop down');
  const wrapper = document.querySelector(`.${ID}__variantDropDownContainer`);
  const optionsContainer = wrapper.querySelector(`.${ID}__optionsContainer`);
  const allOptions = optionsContainer.querySelectorAll('a[role="option"]');
  wrapper.classList.remove('open');
  dropdown.querySelector(`.${ID}__selectedText`).setAttribute('aria-expanded', 'false');
  document.querySelector(`.${ID}__optionsContainer`).setAttribute('aria-hidden', 'true');
  allOptions.forEach((option) => option.setAttribute('tabindex', -1));
};

const inputHandler = () => {
  fireEvent('user interacts with quantity');
};

const changeHandler = () => {
  fireEvent('User interacts with the compare tool');
};

const postAtbHandler = () => {
  fireEvent('User interacts with the quantity post add to bag');
};

const postAtbTrackingAdd = (productCard) => {
  pollerLite(
    [() => VARIATION === 'control', () => productCard && productCard.querySelector('[data-qaid="qa-stepper-input"]')],
    () => {
      const postInputElement = productCard.querySelector('[data-qaid="qa-stepper-input"]');
      postInputElement.removeEventListener('input', postAtbHandler);
      postInputElement.addEventListener('input', postAtbHandler);
    }
  );
};

const init = () => {
  //check if page is correct
  const pageCondition =
    window.utag.data.basicPageId === 'lister Page' &&
    window.location.pathname === '/c/screws-nails-fixings/self-tapping-drilling-screws/cat840058'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const variantsDropdown = document.querySelectorAll(`.${ID}__variantDropDown`);
    variantsDropdown.forEach((dropdown) => dropdown.remove());

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

  if (VARIATION === 'control') {
    const inputElements = document.querySelectorAll('[data-qaid="product-quantity"]');
    const compareElements = document.querySelectorAll('[data-qaid="option"]');
    const postAtbElements = document.querySelectorAll('[data-qaid="qa-stepper-input"]');

    inputElements.forEach((input) => {
      input.removeEventListener('input', inputHandler);
      input.addEventListener('input', inputHandler);
    });

    compareElements.forEach((compareEl) => {
      compareEl.removeEventListener('change', changeHandler);
      compareEl.addEventListener('change', changeHandler);
    });

    postAtbElements &&
      postAtbElements.length > 0 &&
      postAtbElements.forEach((postAtbEl) => {
        postAtbEl.removeEventListener('input', postAtbHandler);
        postAtbEl.addEventListener('input', postAtbHandler);
      });

    return;
  }

  /*****add experiment specific code here*****/

  const productsGrid = document.querySelector('[data-qaid="product-grid"]');
  const products = productsGrid.querySelectorAll('[data-qaid="product-card"]');
  const collectUrls = productsData.map((product) => product.url);

  getProductsData(collectUrls)
    .then((data) => {
      window.productData = data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  products.forEach((product) => {
    const skuElement = product.querySelector('[data-qaid="sku"]');
    const productSku = skuElement.innerText.replace(/[()]/g, '');

    const activeCardSku = productsData.find((prod) => {
      return productSku.replace(/\s/, '').toLowerCase().includes(prod.sku.toLowerCase());
    });

    if (activeCardSku) {
      const productData = productsData.filter(
        (prod) => prod.brand === activeCardSku.brand && prod.headType === activeCardSku.headType
      );

      if (product.querySelector('[data-qaid="bulksave-banner"]')) {
        product
          .querySelector('[data-qaid="bulksave-banner"]')
          .insertAdjacentHTML('afterend', variantDropDown(ID, productData, activeCardSku));
      } else {
        product
          .querySelector('[data-qaid="price"]')
          .closest('.vgjP7j')
          .insertAdjacentHTML('afterbegin', variantDropDown(ID, productData, activeCardSku));
      }

      const allDropDownItems = product.querySelectorAll(`.${ID}__item`);
      pollerLite([() => typeof window.productData !== 'undefined'], () => {
        allDropDownItems.forEach((item) => {
          const itemLink = item.getAttribute('href');
          const itemData = window.productData.find((prod) => prod.url.toLowerCase() === itemLink.toLowerCase());
          if (item) {
            const priceElement = item.querySelector(`.${ID}__price`);
            priceElement.innerHTML = '';
            priceElement.classList.remove('static-data');
            priceElement.insertAdjacentElement('afterbegin', itemData.price.cloneNode(true));
          }
        });
      });

      const dropdown = product.querySelector(`.${ID}__variantDropDownContainer`);
      // Event listeners
      dropdown.addEventListener('keydown', (e) => {
        const { target } = e;
        if ((e.key === 'Enter' || e.key === ' ') && !target.closest(`.${ID}__optionsContainer`)) {
          e.preventDefault();
          toggleDropdown(target);
        } else if (e.key === 'Escape') {
          closeDropdown(dropdown);
        }
      });
    }
  });
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
    const pageCondition = window.utag.data.basicPageId === 'lister Page';
    if (!pageCondition) return;
    const { target } = e;
    if (target.closest(`.${ID}__selectedItem`)) {
      toggleDropdown(target);
    } else if (target.closest(`.${ID}__optionsContainer > a`)) {
      fireEvent('When a user selects a SKU');
    } else if (target.closest('[data-qaid="button-deliver"]')) {
      const productCard = target.closest('[data-qaid="product-card"]');
      VARIATION === '1' ? fireEvent('When a user click Delivery') : fireEvent('User adds to bag for delivery on PLP');
      postAtbTrackingAdd(productCard);
    } else if (target.closest('[data-qaid="button-click-and-collect"]')) {
      const productCard = target.closest('[data-qaid="product-card"]');
      VARIATION === '1'
        ? fireEvent('When a user clicked click&collect')
        : fireEvent('User adds to bag for click and collect on PLP');
      postAtbTrackingAdd(productCard);
    } else if (target.closest('[data-qaid="filter-simple-options-list"]')) {
      VARIATION === 'control' && fireEvent('User interacts with filters');
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
