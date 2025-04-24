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
  const saveElem = document.querySelector('#product_price_save');
  if (!saveElem) return;
  console.log(saveElem);
  setup();

  //fireEvent('Conditions Met');
  document.body.addEventListener('click', ({ target }) => {
    const productType = !target.closest('.pr__product').classList.contains(`${ID}__discounted-product`)
      ? 'full price'
      : 'discounted';
    if (target.closest('[id^="add_product_to_compare_list"]')) {
      fireEvent('Interactions with the compare feature.');
    } else if (target.closest('[id^="add_for_collection_button"]')) {
      fireEvent(`Interactions with click & collect CTA on a ${productType} product`);
    } else if (target.closest('[id^="product_add_to_trolley"]')) {
      fireEvent(`Interactions with delivery CTA on a ${productType} product`);
    } else if (target.closest(`a[id^="product_add_to_wishlist"]`)) {
      fireEvent(`Interactions with save CTA`);
    }
  });
  const qtyInputFields = document.querySelectorAll(`.pr__qty input`);
  qtyInputFields.length > 0 &&
    qtyInputFields.forEach((input) => {
      input.addEventListener(`change`, () => fireEvent(`Interactions with quantity selector on PDP of discount product`));
    });

  const intersectionCallback = (entry) => {
    //console.log(entry);
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };
  obsIntersection(document.querySelector('.pr__pricepoint'), 0.3, intersectionCallback);

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

  const SCR002 = (product) => {
    // regex remove everything until first (
    const removeEverythingUntilFirst = (string) => {
      return string.replace(/^.*\(/, '');
    };

    // regex remove all )
    const removeAll = (string) => {
      return string.replace(/\).*/, '');
    };

    const getProductPrice = product.querySelector('#product_price');
    const getPriceSave = product.querySelector('#product_price_save');
    const getWasPrice = product.querySelector('#product_was_price');

    const removeAllDataUntilFirstPara = removeEverythingUntilFirst(getPriceSave.innerText);
    const removeAllPara = removeAll(removeAllDataUntilFirstPara);

    const updateWasPrice = getWasPrice.innerText.replace(/Was /g, '');
    getWasPrice.innerText = updateWasPrice;

    const priceSVG = `<div class="price_svg"> <p>-${removeAllPara}</p> <svg width="60" height="26" viewBox="0 0 60 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 2C0 0.895433 0.895431 0 2 0H46.9016C47.4279 0 47.9331 0.207514 48.3075 0.577537L58.6247 10.7748C59.3917 11.5328 59.4196 12.7623 58.6879 13.5544L48.317 24.7809C47.9384 25.1907 47.4059 25.4237 46.8479 25.4237H2C0.89543 25.4237 0 24.5283 0 23.4237V2Z" fill="#DB3832"/>
                      </svg></div>`;

    getProductPrice.insertAdjacentHTML('beforebegin', priceSVG);
    getPriceSave.remove();
  };

  const priceContainer = document.querySelector('.pr__pricepoint');

  const getIncVat = priceContainer.querySelector('.incvat');
  const vatCategory = getIncVat.innerHTML.split(' ');

  const getProductPrice = priceContainer.querySelector('#product_price');
  if (priceContainer.querySelector('#product_was_price')) {
    //show vat by category
    const vatElement = `<div class="show-vat">${vatCategory[0]}</br>VAT</div>`;
    document.querySelector('#product_price').insertAdjacentHTML('afterend', vatElement);
    getProductPrice.style.color = '#DB3832';
    priceContainer.closest('.pr__product').classList.add(`${ID}__discounted-product`);
    console.log('002');
    SCR002(priceContainer);
  }
};
