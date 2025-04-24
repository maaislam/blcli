/*eslint-disable implicit-arrow-linebreak */
//import Swiper, { Navigation } from 'swiper';

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { addCssToPage, addJsToPage, pollerLite } from '../../../../../lib/utils';
import productCards from './components/productCards';
import quantityHandler from './handlers/quantityHandler';

import getStrategyData from './helpers/getProducts';
import initSwiper from './helpers/initSwiper';
import addToCartHandler from './handlers/addToCartHandler';

import spinner from './components/spinner';

const { ID, VARIATION } = shared;

const init = (giftProduct) => {
  pollerLite([() => typeof window.Swiper === 'function'], () => {
    console.log(giftProduct);
    const prodCardsWrapper = document.querySelector(`.${ID}__products-container`);
    prodCardsWrapper.innerHTML = productCards(ID, giftProduct);
    initSwiper(`.${ID}__products`);
  });
};

export default async () => {
  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (event) => {
    const target = event.target;
    //console.log('🚀 ~ file: experiment.js:34 ~ document.body.addEventListener ~ target:', target);
    if (target.closest(`.${ID}__productcard`)) {
      const prodName = target.closest(`.${ID}__productcard`).dataset.name;
      fireEvent(`Product Slot Clicked - ${prodName}`);
      // Check if the clicked element is the increase button
      quantityHandler(ID, target);
      addToCartHandler(ID, target);
    }
  });

  if (VARIATION === 'control') {
    return;
  }
  const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
  const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

  addJsToPage(swiperJs, `${ID}__swiperjs`);
  addCssToPage(swiperCss, `${ID}__swipercss`);

  const anchorElem = document.querySelector('#d-gifting-links');
  const experimentContainer = document.createElement('div');
  experimentContainer.classList.add(`${ID}__container`);

  const initialHtmlStr = `
    <div class="${ID}__promocontainer">
        <div class="${ID}__promo--title">${window.BL_AGPromoTitle || 'Bestseller Gifts'}</div>
        <div class="${ID}__products-container ">
            ${spinner(ID)}
        </div>
    </div>`;

  experimentContainer.innerHTML = initialHtmlStr;
  anchorElem.insertAdjacentElement('afterbegin', experimentContainer);
  const popularProducts = await getStrategyData();

  const giftProduct = popularProducts.filter(
    (item) => item.Name.toLowerCase().includes('cadou') || item.Name.toLowerCase().includes('advent')
  );

  init(giftProduct);
};
