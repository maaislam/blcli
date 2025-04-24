/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { fetchSkus, getProductsData, onUrlChange } from './helpers/utils';
import sliderWrapper from './components/sliderWrapper';
import swiper from './helpers/swiper';
import initSwiper from './helpers/initSwiper';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 500;

const init = () => {
  const pageCondition = window.utag.data.basicPageId === 'home'; //add page check conditions here based on experiment requirement

  if (!pageCondition || window.utag.data.basicLoggedIn.toLocaleLowerCase() === 'no') {
    document.querySelectorAll(`.${ID}__sliderWrapper`).forEach((element) => {
      element.remove();
    });

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  if (VARIATION === 'control') {
    setup();
    return;
  }

  swiper();

  /*****add experiment specific code here*****/

  fetchSkus()
    .then((skus) => getProductsData(skus))
    .then((products) => {
      const filteredProducts = products.filter((element) => element !== undefined);
      if (filteredProducts.length < 3) return;
      setup();
      const mainWrapper = document.querySelector('#container-main');
      if (!mainWrapper.querySelector(`.${ID}__sliderWrapper`)) {
        if (filteredProducts.length === 4) {
          document.body.classList.add(`${ID}__limitedItems_4`);
        }

        if (filteredProducts.length === 3) {
          document.body.classList.add(`${ID}__limitedItems_3`);
        }

        if (filteredProducts.length === 2) {
          document.body.classList.add(`${ID}__limitedItems_2`);
        }

        if (filteredProducts.length === 1) {
          document.body.classList.add(`${ID}__limitedItems_1`);
        }
        mainWrapper.insertAdjacentHTML('afterbegin', sliderWrapper(ID, filteredProducts, VARIATION));
      }
      initSwiper(`.${ID}__sliderBox`);
    })
    .catch((error) => {
      console.error('Error:', error);
      document.querySelectorAll(`.${ID}__sliderWrapper`).forEach((element) => {
        element.remove();
      });
    });
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
    //check if page is correct
    if (window.utag.data.basicPageId !== 'home') return;

    const { target } = e;
    if (target.closest(`.${ID}__next`) || target.closest(`.${ID}__prev`)) {
      fireEvent('User interacts with the arrows to scroll');
    } else if (target.closest(`.${ID}__productLink`)) {
      fireEvent('User interacts with the product slot');
    } else if (target.closest(`.${ID}__mainTitle a`)) {
      fireEvent('User interacts with the view all cta');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
