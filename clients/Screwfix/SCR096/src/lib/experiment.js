/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author Brainlabs Digital
 */

import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { activeRadioButton } from './assets/icons';
import variantDropDown from './components/variantDropDown';
import variantsWrapper from './components/variatntsWrapper';
import productsData from './data/data';
import { getProductsData, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 100;
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const toggleDropdown = (target) => {
  fireEvent('user taps the SKU drop down');
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
  fireEvent('user taps the SKU drop down');
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

const init = () => {
  window.relevantProductData = window.relevantProductData || [];
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'product page'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const variantsWrapper = document.querySelectorAll(`.${ID}__variantWrapper`);
    variantsWrapper.forEach((wrapper) => wrapper.remove());

    const variantsDropdown = document.querySelectorAll(`.${ID}__variantDropDown`);
    variantsDropdown.forEach((dropdown) => dropdown.remove());

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  const quantityElement = document.querySelector('[data-qaid="pdp-product-quantity"]');
  const quantityWrapper = quantityElement.closest('div');

  //const priceElement = document.querySelector('[data-qaid="product-price"]');
  //const priceWrapper = priceElement.closest('div');

  const skuElement = document.querySelector('[data-qaid="pdp-product-name"] span.oodeYO');
  const productSku = skuElement.innerText.replace(/[()]/g, '');

  const activeProductSku = productsData.find((prod) => {
    return productSku.replace(/\s/, '').toLowerCase().includes(prod.sku.toLowerCase());
  });

  if (!activeProductSku) {
    return;
  }

  setup();
  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    return;
  }

  /*****add experiment specific code here*****/

  const relevantProductData = productsData.filter(
    (prod) => prod.brand === activeProductSku.brand && prod.headType === activeProductSku.headType
  );

  const collectUrls = relevantProductData.map((product) => product.url);

  if (!document.querySelector(`.${ID}__variantWrapper`) && VARIATION === '1') {
    const attachPoint = isMobile() ? document.querySelector('[data-qaid="product-price"]>div') : quantityWrapper;

    attachPoint.insertAdjacentHTML('afterend', variantsWrapper(ID, relevantProductData, activeProductSku));

    quantityElement.removeEventListener('input', inputHandler);
    quantityElement.addEventListener('input', inputHandler);

    const allOptions = document.querySelectorAll(`.${ID}__option`);

    allOptions.forEach((option) => {
      //check for duplicates
      const thisOption = option.dataset.size.trim();

      //add active class to selected option
      if (activeProductSku.sku.toLowerCase() === option.dataset.sku.toLowerCase()) {
        option.classList.add(`${ID}__active`);
      }

      //now find other elems with same textcontent

      const duplicateElems = Array.from(allOptions).filter((elem) => {
        return elem.textContent.trim() === thisOption && activeProductSku.sku.toLowerCase() !== elem.dataset.sku.toLowerCase();
      });

      duplicateElems.length >= 1 &&
        duplicateElems.forEach((elem, i) => {
          if (
            i > 0 ||
            activeProductSku.diameter.toLowerCase() === elem.dataset.size.toLowerCase() ||
            activeProductSku.length.toLowerCase() === elem.dataset.size.toLowerCase()
          ) {
            elem.classList.add('duplicate');
          }
        });
    });

    window.relevantProductData = relevantProductData;

    const activeDiamerElem = document.querySelector(`.${ID}__diameterwrapper .${ID}__active`);
    activeDiamerElem && activeDiamerElem.click();
  }

  if (!document.querySelector(`.${ID}__variantDropDown`) && VARIATION === '2') {
    getProductsData(collectUrls)
      .then((data) => {
        window.productData = data;
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    const attachPoint = isMobile() ? document.querySelector('[data-qaid="product-price"]>div') : quantityWrapper;
    attachPoint.insertAdjacentHTML('afterend', variantDropDown(ID, relevantProductData, activeProductSku));

    const allDropDownItems = document.querySelectorAll(`.${ID}__item`);
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

    const dropdown = document.querySelector(`.${ID}__variantDropDownContainer`);
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
    const pageCondition = window.utag.data.basicPageId === 'product page';
    if (!pageCondition) return;
    const { target } = e;
    if (target.closest(`.${ID}__selectedItem`)) {
      toggleDropdown(target);
    } else if (target.closest(`.${ID}__optionsContainer a`)) {
      fireEvent('user selects a SKU');
      const clickedItem = target.closest(`.${ID}__optionsContainer a`);
      const { height, width } = clickedItem.dataset;
      const wrapper = clickedItem.closest(`.${ID}__variantDropDownContainer`);
      const optionsContainer = wrapper.querySelector(`.${ID}__optionsContainer`);
      const allOptions = optionsContainer.querySelectorAll('a[role="option"]');
      wrapper.querySelector(`.${ID}__selectedText`).textContent = ` Select size: ${height} x ${width}`;
      clickedItem.querySelector(`.${ID}__icon`).innerHTML = activeRadioButton;
      wrapper.classList.toggle('open');
      allOptions.forEach((option) => option.setAttribute('tabindex', -1));
    } else if (target.closest(`.${ID}__option`) && target.closest(`.${ID}__diameterwrapper`)) {
      fireEvent('user interacts with diameter');

      const relevantProdData = window.relevantProductData;

      //construct url
      const selectedOpt = target.closest(`.${ID}__option`);

      const selectedDiam = selectedOpt.textContent.trim().replace(/[./ ]/g, '-');

      const urlText = `${selectedDiam}-x-`;

      const availableLengths = relevantProdData.filter((prod) => prod.url.includes(urlText));

      //set selected width
      //reomove active class

      const allDiameter = document.querySelectorAll(`.${ID}__diameterwrapper .${ID}__option`);
      allDiameter.forEach((width) => width.classList.remove(`${ID}__active`));

      const lengthElemWrapper = document.querySelector(`.${ID}__lengthwrapper`);
      selectedOpt.classList.add(`${ID}__active`);
      lengthElemWrapper.classList.remove(`${ID}__disabled`);

      //show available lengths

      //first hide all lenght options
      const allLengths = document.querySelectorAll(`.${ID}__lengthwrapper .${ID}__option`);
      allLengths.forEach((item) => item.classList.add(`${ID}__disabled`));

      availableLengths.forEach((item) => {
        const isValid =
          lengthElemWrapper.querySelector(`.${ID}__option[data-size='${item.length}']`) ||
          lengthElemWrapper.querySelector(`.${ID}__option[data-sku='${item.sku}']`);

        isValid && isValid.classList.remove(`${ID}__disabled`);
      });
    } else if (target.closest(`.${ID}__option`) && target.closest(`.${ID}__lengthwrapper`)) {
      fireEvent('user interacts with length');

      const relevantProdData = window.relevantProductData;
      //construct url
      const selectedOpt = target.closest(`.${ID}__option`);

      const selectedLength = selectedOpt.textContent.trim().replace(/[./ ]/g, '-');

      const selectedLengthSku = selectedOpt.dataset.sku;

      const slectedDiameterElem = document.querySelector(`.${ID}__diameterwrapper .${ID}__active`);
      const selectedDiameter = slectedDiameterElem.textContent.trim().replace(/[./ ]/g, '-');

      const urlText = `${selectedDiameter}-x-${selectedLength}`;

      const selectedProductUrl = relevantProdData.find(
        (prod) => prod.sku === selectedLengthSku || prod.url.includes(urlText) || prod.url.includes(selectedLength)
      );
      window.location.href = selectedProductUrl.url;
    } else if (target.closest('.slick-track')) {
      fireEvent('user interacts with carousel');
    } else if (target.closest('[data-qaid="pdp-button-deliver"]')) {
      fireEvent('user click Delivery');
    } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
      fireEvent('user click click&collect');
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
