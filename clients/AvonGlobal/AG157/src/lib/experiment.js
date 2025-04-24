/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { obsIntersection, observeDOM } from './helpers/utils';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const GIFT_BAG_POSITION = VARIATION === 'control' ? 1 : 12;

const prodListSelector = '.ProductList';
const prodListCellSelector = '.ProductListCell';
const giftbagSelector = 'a[href*="/product/21876/medium-gift-bag"]';
const nextElementToGiftBag = () => document.querySelectorAll('.ProductList > .ProductListCell')[GIFT_BAG_POSITION + 1];

const init = () => {
  const hash = window.location.hash;
  const validHashes = ['', '#'];

  const productListWrapper = document.querySelector(prodListSelector);
  if (!validHashes.some((validHash) => hash === validHash)) {
    //reset if filter used
    productListWrapper.classList.remove(`${ID}__product-list`);
    return;
  }

  const giftBag = document.querySelector(giftbagSelector);
  if (!giftBag) return;
  const giftBagParent = giftBag.closest(prodListCellSelector);

  productListWrapper.classList.add(`${ID}__product-list`);
  giftBagParent.classList.add(`${ID}__giftbag`);
  productListWrapper.querySelectorAll(prodListCellSelector).forEach((product, i) => {
    product.style.order = i;
    if (i >= GIFT_BAG_POSITION) {
      product.style.order = i + 1;
    }
    if (product.classList.contains(`${ID}__giftbag`)) {
      product.style.order = GIFT_BAG_POSITION;
    }
  });
};

const intersectionCallback = (entry) => {
  const { isIntersecting, boundingClientRect } = entry;

  if (isIntersecting && boundingClientRect.y > 0) {
    fireEvent('Conditions Met');
    fireEvent('Gift Bag Viewed');
  }
};

const clickHandler = (e) => {
  if (e.target.closest(giftbagSelector)) {
    fireEvent('Gift Bag Clicked');
  }
};

export default () => {
  setup();
  document.body.addEventListener('click', clickHandler);

  obsIntersection(nextElementToGiftBag(), 0.5, intersectionCallback);

  if (VARIATION === 'control') return;

  init();

  observeDOM(prodListSelector, init);
};
