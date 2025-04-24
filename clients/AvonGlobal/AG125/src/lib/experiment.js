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
import mobileVariantDropdown from './components/mobileVariants';
import getProductDetails from './helpers/getProductDetails';
//import addToCart from './helpers/addToCart';
import initSwiper from './helpers/initSwiper';
import swiper from './helpers/swiper';
import { obsIntersection } from './helpers/utils';
import closeDropdown from './helpers/closeVariantDropdown';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

/** Make all changes - can be re-run on page re-render / App_LayoutChanged */
const init = (products) => {
  fireEvent('Conditions Met');

  pollerLite(
    [
      () => typeof window.Swiper === 'function',
      () => document.querySelector('#m-2nd-banner-1') || document.querySelector('#d-2nd-parfumuri'),
    ],
    () => {
      const isMobile = window.DY.deviceInfo.type !== 'desktop';
      const attachPoint = !isMobile ? document.querySelector('#d-2nd-parfumuri') : document.querySelector('#m-2nd-banner-1');

      if (!attachPoint) return;

      attachPoint.insertAdjacentHTML('beforebegin', productCards(ID, products));
      initSwiper(`.${ID}__carousel`);

      const intersectionCallback = (entry) => {
        if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
          entry.target.classList.add(`${ID}__seen`);
          fireEvent('Conditions Met');
        }
      };

      obsIntersection(document.querySelector(`.${ID}__carousel__wrapper`), 1, intersectionCallback);
    }
  );
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__product-atc`)) {
      const sku = target.getAttribute('data-cartsku');
      fireEvent('Customer clicks “Add to Bag”');
      window.CartServiceModule.CartService.prototype.AddMultipleToCart([{ sku, quantity: 1 }]);
      window.scrollTo(0, 0);
    }
    if (target.closest(`.${ID}__variant-item`)) {
      const varWrapper = target.closest(`.${ID}__variant-dropdown-wrapper`);
      const sku = target.closest(`.${ID}__variant-item`).dataset.sku;
      const atc = varWrapper.nextElementSibling;
      const selectedVarImg = varWrapper.querySelector(`.${ID}__selected-variatn-image img`);

      atc.dataset.cartsku = sku;
      selectedVarImg.src = target.closest(`.${ID}__variant-item`).querySelector('img').src;

      target.closest(`.${ID}__variant-item`).parentNode.querySelector('.selected') &&
        target.closest(`.${ID}__variant-item`).parentNode.querySelector('.selected').classList.remove('selected');
      target.closest(`.${ID}__variant-item`).classList.add('selected');

      closeDropdown(ID);
    } else if (target.closest(`.${ID}__variant-item-mobile`)) {
      target.closest(`.${ID}__variant-item-mobile`).classList.add('selected');
      document
        .querySelector(`.${ID}__variant-item[data-sku="${target.closest(`.${ID}__variant-item-mobile`).dataset.sku}"]`)
        .click();
      document.querySelector(`.${ID}__mobile-variant-selector-wrapper`).remove();
    } else if (target.closest(`.${ID}__variant-dropdown-wrapper:not(.open)`)) {
      // closeDropdown(ID);

      target.closest(`.${ID}__variant-dropdown-wrapper`).classList.add('open');
      target.closest(`.${ID}__variant-dropdown-wrapper`).setAttribute('aria-expanded', true);

      document
        .querySelector('main')
        .insertAdjacentHTML('afterend', mobileVariantDropdown(ID, target.closest(`.${ID}__carousel-item`)));
    } else {
      closeDropdown(ID);
    }
  });

  if (VARIATION == 'control') {
    const intersectionCallback = (entry) => {
      if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
        entry.target.classList.add(`${ID}__seen`);
        fireEvent('Conditions Met');
      }
    };

    obsIntersection(document.querySelector('header'), 1, intersectionCallback);
    return;
  }
  const productIds = [
    '11627',
    '76455',
    '20769',
    '108834',
    '76463',
    '72220',
    '112241',
    '113582',
    '121333',
    '83957',
    '128470',
    '145654',
    '99824',
    '145368',
    '107937',
    '142289',
    '76466',
    '98246',
    '98251',
  ];
  getProductDetails([productIds]).then((data) => {
    console.log('🚀 ~ getProductDetails ~ data:', data);
    swiper();

    const products = data.Data;
    setTimeout(() => init(products), DOM_RENDER_DELAY);
  });
};
