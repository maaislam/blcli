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
  setup();
  //getReactStoreData();
  //const { pageType, pageData } = window.blDataLayer;
  //const { category } = pageData;
  if (window.utag.data.basicPageType !== 'Product' || !window.utag.data.basicBreadcrumb.includes('> Light Bulbs')) {
    return;
  }

  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;

  document.body.classList.add(`${ID}-start`);

  //check if width is less than 768px
  if (window.innerWidth > 1024) {
    //change position of name and review stars
    const nameElem = document.querySelector('[data-qaid="pdp-product-name"]');
    const reviewElem = document.querySelector('[data-bv-show="rating_summary"]').parentElement;
    const attachPoint = document.querySelector('[data-qaid="product-tile"] > div:last-child');
    attachPoint.insertAdjacentElement('afterbegin', reviewElem);
    attachPoint.insertAdjacentElement('afterbegin', nameElem);
  }

  const productSpec = document.querySelector('[data-qaid="pdp-pis-link"]');
  productSpec.innerText = 'View all Specifications';

  const energyRatingParent = document.querySelector('[data-qaid="pdp-energy-logo"]').parentElement;
  energyRatingParent.style.paddingLeft = '0';
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }

  /*****Request from Screwfix*****/
  const clickHandler = (e) => {
    const { target } = e;

    if (target.closest('[data-qaid="pdp-energy-logo"]')) {
      fireEvent('user clicked Energy Star');
    } else if (target.closest(`.${ID}__specanchor`)) {
      fireEvent('User clicks the “View all specifications” CTA');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      ['[data-bv-show="rating_summary"]', '#__next', () => window.utag !== undefined, () => window.__NEXT_DATA__ !== undefined],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
