import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import observeDOM from './helpers/observeDOM';
import prepareControl from './helpers/prepareControl';
import getCatalog from './helpers/getCatalog';
import { getCurrMonth, localStorageGet, localStorageSave } from './helpers/utils';
import initExternalLib from './helpers/addExternal';
import newMenuWrapper from './components/newMenuWrapper';
import { iconData } from './assets';
import getCartCount from './helpers/getCartCount';
import { initSwiper, swiperConfig } from './helpers/initSwiper';
import clickHandler from './helpers/clickHandler';

const { ID, VARIATION } = shared;
const init = (mutation, urlChanged) => {
  setup();

  const { type, target, addedNodes, removedNodes } = mutation;

  if (
    (type !== 'characterData' && target?.matches('.v7__elem--content-p') && target?.closest('[data-item-id="wishlistButton"]')) ||
    !mutation ||
    urlChanged
  ) {
    prepareControl(ID);
    if ((addedNodes && removedNodes && addedNodes[0].nodeValue !== removedNodes[0].nodeValue) || !mutation) {
      const catalogData = localStorageGet('catalogData');
      console.log(catalogData);

      document.querySelectorAll(`.${ID}__newmenuwrapper`).forEach((item) => {
        item?.remove();
      });

      document.body.insertAdjacentHTML('beforeend', newMenuWrapper(ID, iconData, getCartCount(), catalogData));

      initSwiper(`.${ID}__catalog-swiper`, swiperConfig);
    }
  }
};

export default async () => {
  setup();
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[data-item-id="wishlistButton]') || e.target.closest('data-item-id="wishlistButton')) {
        fireEvent('User clicks the basket');
      }
    });

    return;
  }
  //get catalog data
  const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
  const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';
  initExternalLib(swiperJs, swiperCss);

  if (localStorageGet('catalogMonth') !== getCurrMonth()) {
    const catalogData = await getCatalog();
    //store in local storage
    console.log('catalogData', catalogData);
    localStorageSave('catalogData', JSON.stringify(catalogData));
    localStorageSave('catalogMonth', getCurrMonth());
  }

  setTimeout(() => {
    init(false);
  }, 1500);

  clickHandler(ID, fireEvent);

  observeDOM('body', init);
};
