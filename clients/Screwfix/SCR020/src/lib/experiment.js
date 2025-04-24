/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { clickHandler } from './clickHandler';
import brandBanner from './components/brandBanner';
import { pollerLite } from '../../../../../lib/uc-lib';

//import observeDOM from "./helpers/domObserver";

import { obsIntersection, onUrlChange } from './helpers/utils';
import { brandImgData } from './components/brand_img_data';
import swiper from './helpers/swiper';
import initSwiper from './helpers/initSwiper';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const init = () => {
  //console.log(hasChange, "hasChange")

  setup();

  // -----------------------------
  // Write experiment code here
  // -----------------------------

  //console.log(VARIATION,"variation")

  pollerLite(['[data-qaid="product-grid"]'], () => {
    const categoryData = window.utag.data.categoryName;

    const isValidCatrgory = brandImgData.some((item) => item?.title.toLowerCase() === categoryData.toLowerCase());

    if (document.querySelector(`.${ID}__brand_banner_container`)) {
      document.querySelector(`.${ID}__brand_banner_container`)?.remove();
    }

    if (
      !window.utag.data.basicBreadcrumb.includes('> Power Tools') ||
      !isValidCatrgory ||
      window.location.href.includes('brand')
    ) {
      document.querySelector(`.${ID}__brand_banner_container`)?.remove();
      return;
    }

    const interSectionCallback = (entry) => {
      //console.log('🚀 ~ interSectionCallback ~ entry:', entry);

      if (!entry.isIntersecting && entry.boundingClientRect.y < 250) {
        //fireEvent('Conditions Met');
        fireEvent('User scrolls through the brand filters.');
      }
    };

    obsIntersection(document.querySelector('[data-qaid="product-card"]'), 1, interSectionCallback);

    fireEvent('Conditions Met');
    if (VARIATION === 'control') return;
    const elem = document.querySelectorAll('[data-qaid="related-searches-banner"]');

    elem.forEach((item) => {
      item.classList.add(`${ID}__display_hide`);
    });

    const productGrid = document.querySelector('[data-qaid="product-grid"]');
    const prodGridParent = productGrid.parentElement;
    prodGridParent.classList.add(`${ID}__prod_grid_parent`);

    if (window.innerWidth <= 640) {
      const banner = document.querySelector('[data-qaid="banners-mobile"]');
      const attachPoint = banner ? banner : document.querySelector('[aria-label="Breadcrumb"]');
      attachPoint.insertAdjacentHTML('afterend', brandBanner(categoryData));
      //init slider
    } else {
      const banner = document.querySelector('[data-qaid="banners"]');
      const attachPoint = banner ? banner : prodGridParent;
      const attachPosition = banner ? 'afterend' : 'afterbegin';
      attachPoint.insertAdjacentHTML(attachPosition, brandBanner(categoryData));
    }
    initSwiper(`.${ID}__brand_banner-swiper`);
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

  const pointerHandler = (e) => {
    const { target } = e;

    if (target.closest(`#facet_categories .n.ln__cats`)) {
      const categories = target.textContent?.trim();
      if (categories) {
        //console.log(`User interacts with categories : ${categories}`);
        fireEvent(`User interacts with categories : ${categories}`);
      }
    }
  };
  //add swiper js

  swiper();

  //add trackings
  const body = document.body;

  body.removeEventListener('click', clickHandler);
  body.removeEventListener('pointerup', pointerHandler);

  body.addEventListener('click', clickHandler);
  body.addEventListener('pointerup', pointerHandler);

  //init experiment

  setTimeout(init, DOM_RENDER_DELAY);

  onUrlChange(() => {
    pollerLite([() => window.utag !== undefined], () => {
      if (document.querySelector(`.${ID}__brand_banner_container`)) {
        document.querySelector(`.${ID}__brand_banner_container`)?.remove();
      }
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
