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
import bulkBuybanner from './components/bulkBuybanner';
import { getReactStoreData, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;
// Target element

// Intersection Observer options
const options = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.5, // Trigger when 50% of the target is visible
};

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //console.log('Element is in view!');
      fireEvent('Conditions Met');
      observer.disconnect();
    } else {
      //console.log('Element is out of view!');
    }
  });
};

// Create an Intersection Observer
const observer = new IntersectionObserver(handleIntersection, options);

const init = () => {
  observer.disconnect();
  getReactStoreData();
  const { pageType, pageData } = window.blDataLayer;
  const hasBulkBuy = document.querySelector('[data-qaid="bulksave-banner"]');
  console.log('🚀 ~ init ~ hasBulkBuy:', hasBulkBuy);

  if (pageType !== 'plp' || !hasBulkBuy || !pageData) {
    return;
  }

  //add css changes
  const productGrid = document.querySelector('[data-qaid="product-grid"]');
  productGrid.classList.add(`${ID}__product-grid`);
  if (VARIATION === '2') {
    const productCards = document.querySelectorAll('[data-qaid="product-card"]');
    productCards.forEach((productCard) => {
      productCard.classList.add(`${ID}__product-card`);
      const bulkBuyBanner = productCard.querySelector('[data-qaid="bulksave-banner"]');
      if (bulkBuyBanner) {
        productCard.classList.add(`${ID}__product-card--bulk-buy`);
        if (productCard.querySelector(`.${ID}__bulk-buy-banner`)) return;
        bulkBuyBanner.insertAdjacentHTML('beforebegin', bulkBuybanner(ID));
      }
    });
  }

  // Start observing the target element
  observer.observe(hasBulkBuy);
};

export default () => {
  setup();

  document.body.addEventListener('click', (event) => {
    const { target } = event;
    if (target.closest('[data-qaid="bulksave-banner"]')) {
      fireEvent('User clicks “View Offer” link on bulk buy');
    } else if (
      target.closest('[data-qaid="bulk-save-modal-overlay"]') &&
      target.closest('[data-qaid="button-click-and-collect"]')
    ) {
      fireEvent('User clicks Click & Collect in bulk buy popup');
    } else if (target.closest('[data-qaid="bulk-save-modal-overlay"]') && target.closest('[data-qaid="button-deliver"]')) {
      fireEvent('User clicks delivery in bulk buy popup');
    } else if (target.closest(`.${ID}__bulk-buy-banner`)) {
      // Add more click events here
      const productCard = target.closest('[data-qaid="product-card"]');
      if (productCard) {
        fireEvent('User clicks “View Offer” link on bulk buy');
        productCard.querySelector('a[data-qaid="product_description"]').click();
      }
    }
  });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (VARIATION === 'control') return;

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
