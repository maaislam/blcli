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

const init = (giftProducts) => {
  pollerLite([() => typeof window.Swiper === 'function'], () => {
    const prodCardsWrapper = document.querySelector(`.${ID}__products-container`);
    prodCardsWrapper.innerHTML = productCards(ID, giftProducts);
    initSwiper(`.${ID}__products`);
  });
};

export default async () => {
  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest(`.${ID}__productcard`)) {
      const prodName = target.closest(`.${ID}__productcard`).dataset.name;
      fireEvent(`Product Slot Clicked - ${prodName}`);
      // Check if the clicked element is the increase button
      quantityHandler(ID, target);
      addToCartHandler(ID, target);
    } else if (target.closest('#main2Prezenty')) {
      fireEvent('User interacts with gifts in the nav');
    }
  });

  if (VARIATION === 'control') {
    return;
  }
  const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
  const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';

  addJsToPage(swiperJs, `${ID}__swiperjs`);
  addCssToPage(swiperCss, `${ID}__swipercss`);

  const anchorElem = document.querySelector('#benefits');
  const experimentContainer = document.createElement('div');
  experimentContainer.classList.add(`${ID}__container`);

  const initialHtmlStr = `
    <div class="${ID}__promocontainer">
        <div class="${ID}__promo--title">${window.BL_AGPromoTitle || 'Bestsellerowe prezenty'}</div>
        <div class="${ID}__products-container ">
            ${spinner(ID)}
        </div>
        <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
    </div>`;

  experimentContainer.innerHTML = initialHtmlStr;
  anchorElem.insertAdjacentElement('afterbegin', experimentContainer);
  const popularProducts = await getStrategyData();
  const giftProducts = popularProducts.filter((item) => item.Name.includes('Zestaw upominkowy'));
  console.log('popularProducts:', popularProducts);
  console.log('giftProducts:', giftProducts);

  init(giftProducts);
};
