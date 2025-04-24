/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { addCssToPage, addJsToPage } from './helpers/utils';
import { customClickHandler, filterClickHandler, newCategoryQuicklinesHandler, sortList } from '../clickHandler';
import categoryQuicklines from '../components/categoryQuickLines';
import observeDOM from './helpers/observeDOM';
import initSwiper from './helpers/initSwiper';

const { ID, VARIATION } = shared;
const isScrollShop = () => window.location.hash === '#plp';

//swiper
const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

const controlInit = () => {
  if (!sessionStorage.getItem('Testname')) {
    sessionStorage.setItem('Testname', 'AG108a');
    fireEvent('Conditions Met');
    //console.log("conditions Met a")
  }
  //add click event here
  if (!isScrollShop()) {
    //remove the html you made
    return;
  }

  document.body.addEventListener('click', ({ target }) => {
    customClickHandler(target);
  });
};

const init = (anchorElm) => {
  if (!isScrollShop()) {
    //remove the html you made
    document.querySelector(`.${ID}__category_quicklines_container`) &&
      document.querySelector(`.${ID}__category_quicklines_container`).remove();
    //return;
  }

  if (!sessionStorage.getItem('Testname')) {
    sessionStorage.setItem('Testname', 'AG108a');
    fireEvent('Conditions Met');
    //console.log("conditions Met a")
  }
  console.log('test', ID);
  //console.log('scrollshop')
  const rander_dom = categoryQuicklines(`${ID}`);
  pollerLite(['#v7_vue_plp'], () => {
    const isMobile = document.querySelector('.v7__plp.mobile') ? true : false;
    //console.log(isMobile,"isMobile")

    if (document.querySelector(`.${ID}__category_quicklines_container`)) return;
    const anchorElm = document.querySelector('#v7_vue_plp');
    anchorElm.insertAdjacentHTML('afterbegin', rander_dom);

    //add swiper js
    addJsToPage(swiperJs, `${ID}__swiperjs`);
    addCssToPage(swiperCss, `${ID}__swipercss`);

    if (isMobile) {
      pollerLite([`.${ID}__category_quickline_wrapper`, `.${ID}__category_quickline`], () => {
        document.querySelector(`.${ID}__category_quicklines_container`).classList.add('swiper');
        document.querySelector(`.${ID}__category_quickline_wrapper`).classList.add('swiper-wrapper');
        document.querySelectorAll(`.${ID}__category_quickline`).forEach((item) => {
          item.classList.add('swiper-slide');
        });
        const btns = `<div class="swiper-button-prev"></div>
                      <div class="swiper-button-next"></div>`;
        document.querySelector(`.${ID}__category_quicklines_container`).insertAdjacentHTML('beforeend', btns);
      });

      pollerLite([() => typeof window.Swiper === 'function'], () => {
        initSwiper('.swiper', fireEvent, shared);
      });
    }

    document.body.addEventListener('click', ({ target }) => {
      customClickHandler(target);
    });
  });
};

export default () => {
  setup();

  if (VARIATION === 'control') {
    setTimeout(controlInit, 2000);
    return;
  }
  const anchorElm = document.querySelector('#scrollshop');

  init(anchorElm);

  const mutationCallback = (mutation, urlChanged) => {
    if (urlChanged) {
      setTimeout(() => {
        init(anchorElm);
      }, 2000);
    }
  };
  observeDOM('body', mutationCallback);
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      init(anchorElm);
    }, 2000);
  });
};
