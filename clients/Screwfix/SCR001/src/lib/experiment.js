/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import obsIntersection from './obsIntersection';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest('[id^="add_product_to_compare_list"]')) {
      fireEvent('Interactions with the compare feature.');
    } else if (target.closest('[id^="add_for_collection_button"]')) {
      const productType =
        target.closest('.lii__btm').querySelector('.lii__discounts').innerText === '' ? 'full price' : 'discounted';
      fireEvent(`Interactions with click & collect CTA on a ${productType} product`);
    } else if (target.closest('[id^="product_add_button"]')) {
      const productType =
        target.closest('.lii__btm').querySelector('.lii__discounts').innerText === '' ? 'full price' : 'discounted';
      fireEvent(`Interactions with delivery CTA on a ${productType} product`);
    }
  });

  const firstSaveElem = document.querySelector('.lii__discounts > .lii__was');
  console.log(firstSaveElem);

  const intersectionCallback = (entry) => {
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      fireEvent('Conditions Met');
      //console.log(entry);
    }
  };
  if (firstSaveElem) {
    document.body.classList.add(`${ID}__discount-category`);
    obsIntersection(document.querySelector('.lii__discounts'), 0.3, intersectionCallback);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const SCR001 = (product) => {
    // regex remove everything until first (
    const removeEverythingUntilFirst = (string) => {
      return string.replace(/^.*\(/, '');
    };

    // regex remove all )
    const removeAll = (string) => {
      return string.replace(/\).*/, '');
    };

    const getProductPrice = product.querySelector('.lii_price h4');
    const getPriceSave = product.querySelector('.lii__save');
    const getWasPrice = product.querySelector('.lii__was');
    if (!getPriceSave || !getWasPrice) return;
    const removeAllDataUntilFirstPara = removeEverythingUntilFirst(getPriceSave?.innerText || '');
    const removeAllPara = removeAll(removeAllDataUntilFirstPara);
    if (getWasPrice) {
      const updateWasPrice = getWasPrice.innerText.replace(/Was /g, '');
      getWasPrice.innerText = updateWasPrice;
    }

    const priceSVG = `<div class="price_svg"> <p>-${removeAllPara}</p> <svg width="60" height="26" viewBox="0 0 60 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 2C0 0.895433 0.895431 0 2 0H46.9016C47.4279 0 47.9331 0.207514 48.3075 0.577537L58.6247 10.7748C59.3917 11.5328 59.4196 12.7623 58.6879 13.5544L48.317 24.7809C47.9384 25.1907 47.4059 25.4237 46.8479 25.4237H2C0.89543 25.4237 0 24.5283 0 23.4237V2Z" fill="#DB3832"/>
</svg></div>`;

    getProductPrice.insertAdjacentHTML('beforebegin', priceSVG);
    getPriceSave.remove();
  };

  // ------------------------------------
  // Added Poller:
  // Checks for page changes and checks to see if the URL has changed
  // ------------------------------------
  const getAllProducts = document.querySelectorAll('#sticky-right-content .product-box');

  getAllProducts.forEach((product) => {
    const getIncVat = product.querySelector('.lii_price .lii__vat');
    const getProductPrice = product.querySelector('.lii_price h4');
    if (product.querySelector('.lii__was')) {
      getIncVat.style.color = '#DB3832';
      getProductPrice.style.color = '#DB3832';
      SCR001(product);
      setTimeout(() => SCR001(product), 500);
    }
  });
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const getAllProducts = document.querySelectorAll('#sticky-right-content .product-box');

      getAllProducts.forEach((product) => {
        const getIncVat = product.querySelector('.lii_price .lii__vat');
        const getProductPrice = product.querySelector('.lii_price h4');
        if (product.querySelector('.lii__was')) {
          getIncVat.style.color = '#DB3832';
          getProductPrice.style.color = '#DB3832';
          setTimeout(() => SCR001(product), 500);
        }
      });
    });
  });

  const config = {
    childList: true,
    subtree: true,
  };

  observer.observe(document.querySelector('body'), config);
};
