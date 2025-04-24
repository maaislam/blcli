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
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  pollerLite([() => window?.utag?.data?.basicPageId === 'product page'], () => {
    setup();
    fireEvent('Conditions Met');
    if (VARIATION == 'control') {
      return;
    }

    const wrapper = `<div class="${ID}__wrapper"></div>`;
    const productName = document.querySelector('h1[data-qaid="pdp-product-name"]').cloneNode(true);
    productName?.classList.add(`${ID}__productName`);
    const reviews = document.querySelector('._2hopKH').cloneNode(true);
    reviews?.classList.add(`${ID}__reviewsSection`);
    const productPrice = document.querySelector('div[data-qaid="product-price"]').cloneNode(true);
    productPrice?.classList.add(`${ID}__productPrice`);
    const productTitle = document.querySelector('div[data-qaid="product-tile"]');

    if (document.querySelector(`.${ID}__wrapper`)) {
      document.querySelector(`.${ID}__wrapper`).remove();
    }
    productTitle.insertAdjacentHTML('afterbegin', wrapper);

    const newWrapper = document.querySelector(`.${ID}__wrapper`);
    newWrapper.append(productName, reviews, productPrice);
  });
};

export default () => {
  document.body.addEventListener('click', (e) => {
    const { target } = e;
    const controlReviews = document.querySelector(`._2hopKH:not(.${ID}__reviewsSection)`);

    if (target.closest('button.bv_main_container_row_flex') && target.closest(`.${ID}__reviewsSection`)) {
      controlReviews.querySelector('button.bv_main_container_row_flex').click();
    } else if (target.closest('button.bv_war_button') && target.closest(`.${ID}__reviewsSection`)) {
      controlReviews.querySelector('button.bv_war_button').click();
    } else if (target.closest('button.bv_aaq_button') && target.closest(`.${ID}__reviewsSection`)) {
      controlReviews.querySelector('button.bv_aaq_button').click();
    }
  });

  init();

  onUrlChange(() => {
    pollerLite(
      [
        '#__next',
        '#__NEXT_DATA__',
        '[data-bv-show="rating_summary"]',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
