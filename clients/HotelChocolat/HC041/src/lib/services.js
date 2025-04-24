import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import productsToExclude from './productsToExclude';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};


export const appendAddToCartButton = (product) => {
  const { ID, VARIATION } = shared;

  if (!product.querySelector(`.${ID}-addbutton`)) {
    const quickView = product.querySelector('a.quickview.quickviewbutton');
    const productUrl = product.querySelector('a.thumb-link').getAttribute('href');
    if (quickView && productsToExclude.products.indexOf(`${productUrl}`) == -1) {
      quickView.setAttribute('id', `${ID}-quickview__${i}`);
      const newAddCTA = `<a class="quickview quickviewbutton ${ID}-addbutton" style="display: block !important;" data-quickview="${ID}-quickview__${i}" href="javascript: void(0)">Add to Bag</a>`;
      quickView.insertAdjacentHTML('afterend', newAddCTA);

      // --- Click Event
      product.querySelector(`.${ID}-addbutton`).addEventListener('click', (e) => {
        quickView.click();
      });
    } else if (quickView && productsToExclude.products.indexOf(`${productUrl}`) > -1) {
      quickView.setAttribute('id', `${ID}-quickview__${i}`);
      const newAddCTA = `<a class="quickview quickviewbutton ${ID}-addbutton" style="display: block !important;" data-quickview="${ID}-quickview__${i}" href="javascript: void(0)">View</a>`;
      quickView.insertAdjacentHTML('afterend', newAddCTA);

      // --- Click Event
      product.querySelector(`.${ID}-addbutton`).addEventListener('click', (e) => {
        window.location.href = productUrl;
      });
    }
  }

};

export const makeLightboxChanges = () => {
  const { ID, VARIATION } = shared;
  const detailsCTA = document.querySelector('a.button.button-white.view-details');
  const addToCartCTA = document.querySelector('button#add-to-cart');
  addToCartCTA.insertAdjacentElement('afterend', detailsCTA);

  const lightboxStyle = document.querySelector('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.quickview-dialog').getAttribute('style');
  if (lightboxStyle.indexOf('display: none;') == -1) {
    document.querySelector('body').classList.add(`${ID}-noScroll`);
    
    // --- CLOSE LIGHTBOX when overlay is clicked
    document.querySelector('.ui-widget-overlay.ui-front').addEventListener('click', (e) => {
      document.querySelector('button.ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-close').click();
    });
  } else {
    document.querySelector('body').classList.remove(`${ID}-noScroll`);
  }
};

export const lightboxOverlayEvents = () => {
  const { ID, VARIATION } = shared;

  const detailsCTA = document.querySelector('a.button.button-white.view-details');
  const addToCartCTA = document.querySelector('button#add-to-cart');
  addToCartCTA.insertAdjacentElement('afterend', detailsCTA);
  
  const lightboxStyle = document.querySelector('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.quickview-dialog').getAttribute('style');
  if (lightboxStyle.indexOf('display: none;') == -1) {
    document.querySelector('body').classList.add(`${ID}-noScroll`);
    // --- CLOSE LIGHTBOX when overlay is clicked
    document.querySelector('.ui-widget-overlay.ui-front').addEventListener('click', (e) => {
      document.querySelector('button.ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-close').click();
    });
  } else {
    document.querySelector('body').classList.remove(`${ID}-noScroll`);
  }
};
