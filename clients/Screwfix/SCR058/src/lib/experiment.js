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
import { getParentCategory } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  pollerLite([() => typeof window.blDataLayer !== 'undefined'], () => {
    //console.log('blDataLayer init', window.blDataLayer);

    const { parentCategories, pageType } = window.blDataLayer;
    if (pageType === 'pdp' && parentCategories.includes('Drills')) {
      //change position of specs block
      fireEvent('Conditions Met');
      if (VARIATION == 'control') {
        return;
      }
      const specsBlock = document.querySelector('[data-qaid="pdp-product-bullets"]');
      const productDetails = document.querySelector('[data-qaid="pdp-product-overview"]');
      const moreInfoLink = document.querySelector('[data-qaid="pdp-more-info-link"]');
      specsBlock.classList.add(`${ID}-specs`);
      moreInfoLink.classList.add(`${ID}-moreinfo`);
      moreInfoLink.textContent = 'View all Specifications';
      productDetails.insertAdjacentElement('beforebegin', specsBlock);
      productDetails.insertAdjacentElement('beforebegin', moreInfoLink);
    }
  });
};

export default () => {
  if (!document.documentElement.classList.contains(`${ID}`)) {
    document.body.addEventListener('click', (e) => {
      const { target } = e;
      if (target.classList.contains(`${ID}-moreinfo`)) {
        fireEvent(`Customer clicks ${VARIATION === '1' ? 'View all Specifications' : 'More Info'}`);
      }
    });
  }
  setup();
  setTimeout(() => {
    getParentCategory();
    init();
  }, 2000);

  // Poll and re-run init
  // pollerLite(['#__next'], () => {
  //   const appContainer = document.querySelector('#__next');
  //   let oldHref = document.location.href;
  //   const observer = new MutationObserver(function (mutations) {
  //     mutations.forEach(function () {
  //       if (oldHref != document.location.href) {
  //         oldHref = document.location.href;
  //         document.body.classList.remove(`${shared.ID}`);

  //         setTimeout(() => {
  //           getParentCategory();
  //           init();
  //         }, 2000);
  //       }
  //     });
  //   });

  //   const config = {
  //     childList: true,
  //     subtree: true,
  //   };

  //   observer.observe(appContainer, config);
  // });
};
