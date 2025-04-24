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
import productCards from './components/productCards';
import getProducts from './helpers/getProducts';
import { getReactStoreData } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;
const skus = ['12492', '4107P', '111JR', '574PG', '1672D'];

const init = () => {
  getReactStoreData();
  const { pageType } = window.blDataLayer;

  if (pageType !== 'pdp') {
    return;
  }
  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;

  const attachPoint = document.querySelector('[data-qaid="add-to-basket-overlay"] > *:last-child');

  const htmlStr = `<div class='${ID}__products'>
        <div class="${ID}__headline">Top up your essentials...</div>
        ${productCards(ID, window[`${ID}_products`])}
      </div>`;

  attachPoint.insertAdjacentHTML('beforebegin', htmlStr);
};

export default () => {
  setup();
  pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
    getProducts(skus).then((data) => {
      window[`${ID}_products`] = data;
      document.body.addEventListener('click', ({ target }) => {
        if (target.closest('[data-qaid="pdp-button-deliver"]')) {
          pollerLite(['[data-qaid="add-to-basket-overlay"]', () => typeof window[`${ID}_products`] === 'object'], () => {
            setTimeout(init, DOM_RENDER_DELAY);
          });
        } else if (target.closest('.slick-track')) {
          fireEvent('Customer Clicks recommendation carousel');
        } else if (target.closest(`.${ID}__productCard-info-btn`)) {
          fireEvent('Customer Clicks new cross sell product');
        }
      });
    });
  });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  // setTimeout(init, DOM_RENDER_DELAY);

  // // Poll and re-run init
  // onUrlChange(() => {
  //   pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
  //     setTimeout(init, DOM_RENDER_DELAY);
  //   });
  // });
};
