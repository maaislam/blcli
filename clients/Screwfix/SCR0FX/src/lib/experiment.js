/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const initPlp = () => {
  pollerLite(['.vxzETZ'], () => {
    const anchorElem = document.querySelector('.vxzETZ');

    const htmlStr = `<div class="${ID}__promobanner">
      <p>Our Prices have never been lower</p>
    </div>`;
    if (document.querySelector(`.${ID}__promobanner`)) return;

    anchorElem.insertAdjacentHTML('beforebegin', htmlStr);
  });
};

const initPdp = () => {
  pollerLite(['[data-qaid="customer_messaging"]', '[data-qaid="product-primary-images"]'], () => {
    const anchorElem = document.querySelector('[data-qaid="customer_messaging"]');

    const htmlStr = `<div class="${ID}__deliveryMsg">
      <span>For a list of our shipping restrictions, visit <a href="/help/delivery"><b>this</b></a> link.</span>
    </div>`;

    const mainImage = document.querySelector('[data-qaid="product-primary-images"] .slick-slide[data-index="0"]');
    if (mainImage) {
      mainImage.setAttribute('data-slideindex', `${ID}__mainimage`);
    }

    if (document.querySelector(`.${ID}__deliveryMsg`)) return;

    anchorElem.insertAdjacentHTML('beforeend', htmlStr);
  });
};

const init = () => {
  if (window.location.pathname.includes('/c/')) {
    initPlp();
    return;
  }
  initPdp();
};

export default () => {
  setup();

  fireEvent('Conditions Met');

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
  setTimeout(init, 500);
  window.addEventListener('hashchange', () => {
    pollerLite([() => !document.querySelector('.jeCBxX')], () => {
      setTimeout(init, 500);
    });
  });
};
