/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import { getCookie } from '../../../../../lib/utils';
import newBanner from './components/newBanner';
import newBannerMobile from './components/newBannnerMobile';
import clickHandler from './handlers/clickHandler';
import { isMobile, observeDOM } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1500;
const isLoggedIn = () => !!getCookie('access_token');

const init = () => {
  // Experiment Code...
  const isBasketEmpty = !document.querySelector('[data-test-id="empty-basket"]');
  const attactPoint = document.querySelector('[data-test-id="empty-basket"]');

  if (!isLoggedIn() || window.location.pathname !== '/cart' || isBasketEmpty) {
    document.querySelector(`.${ID}__newbanner`)?.remove();
    attactPoint.classList.remove(`${ID}__hide`);

    return;
  }

  if (document.querySelector(`.${ID}__render-once`)) return;

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
    fireEvent('Customer has an empty basket');
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  //console.log(ID);
  attactPoint.insertAdjacentHTML('beforeend', isMobile() ? newBannerMobile(ID) : newBanner(ID));
};

export default () => {
  document.body.addEventListener('click', clickHandler);

  init();

  const mutationCallback = (mutation) => {
    const { addedNodes } = mutation;
    if (addedNodes.length > 0 && [...addedNodes].some((node) => node.matches(`.${ID}__render-once`))) return;
    setTimeout(init, DOM_RENDER_DELAY);
  };

  observeDOM('#app-container', mutationCallback);
};
