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
import { getParentCategory, obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const handleIntersection = (entry) => {
  if (entry.isIntersecting && window.innerWidth < 640) {
    fireEvent('Customer scrolls and sees price');
  }
};

const init = () => {
  // Add your experiment code here

  const { pageType, pageData } = window.blDataLayer;

  const noStoreSelection = pageData.fulfilmentInfoMessage === 'NoSelectedStore';
  const collectBtnAvailable = pageData.fulfilmentAvailability.canBeCollected;

  if (!noStoreSelection || pageType !== 'pdp' || !collectBtnAvailable) return;
  if (!document.documentElement.classList.contains(`${ID}`)) {
    document.body.addEventListener('click', (e) => {
      const { target } = e;
      //console.log('🚀 ~ document.body.addEventListener ~ target:', target);
      if (target.closest('[data-qaid="pdp-button-deliver"]')) {
        fireEvent('Customer clicks “Deliver”');
      } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
        fireEvent('Customer clicks “Click and Collect”');
      }
    });
    const intersectionAnchor = document.querySelector('[data-qaid="product-price"]');
    obsIntersection(intersectionAnchor, 1, handleIntersection);
  }

  setup();

  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    return;
  }
  //render message

  const htmlStr = `
  <div class="${ID}__clickAndCollectText">
    <div class="text-main"><span class="text-main-green ">FREE </span>Click & Collect in <span class="text-main-green text-main-small">as little as 1 minute</span></div>
    <a href="/stores" class="text-secondary">Add your postcode to see accurate lead times</a>
  </div>
  `;

  if (document.querySelector(`.${ID}__clickAndCollectText`)) return;

  const productActionContainer = document.querySelector(
    `[data-qaid="pdp_sticky_product_footer"] ${VARIATION === '2' ? '' : '> div:first-child'}`
  );

  productActionContainer.insertAdjacentHTML('afterend', htmlStr);
  if (VARIATION === '2') return;

  //flip button order
  const clickAndCollectBtn = document.querySelector('[data-qaid="pdp-button-click-and-collect"]');
  const deliveryBtn = document.querySelector('[data-qaid="pdp-button-deliver"]');
  const deliveryBtnParent = deliveryBtn?.parentElement;
  const clickCollectBtnParent = clickAndCollectBtn.parentElement;
  const clickCollectBtnGrandParent = clickCollectBtnParent.parentElement;

  deliveryBtnParent?.classList.add(`${ID}__deliveryBtn-parent`);
  clickCollectBtnParent.classList.add(`${ID}__clickAndCollectBtn-parent`);
  clickCollectBtnParent.classList.add('mbiC2z');
  clickCollectBtnGrandParent.classList.add(`${ID}__clickAndCollectBtn-grandParent`);
  if (!deliveryBtn) {
    fireEvent('Page has active “Click and Collect” button only');
    return;
  }
  fireEvent('Page has active “Click and Collect” and “Delivery” buttons');
};

export default () => {
  setTimeout(() => {
    getParentCategory();
    init();
  }, DOM_RENDER_DELAY);

  // Poll and re-run init
  pollerLite(['#__next', '#__NEXT_DATA__'], () => {
    const appContainer = document.querySelector('#__next');
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          setTimeout(() => {
            getParentCategory();
            init();
          }, DOM_RENDER_DELAY);
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
