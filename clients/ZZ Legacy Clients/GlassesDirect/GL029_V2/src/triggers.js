import basketPage from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.something-free', // Choose second option box, only fire test if this exists - assumes product exists
  '#content > .page-heading', // Page header - render location
  '#action-basket-purchase', // Complete purchase button
  '#basket-subtotal', // Subtotal row, render location
  '#basket-actions', // Used for sticky bar display
  '.basket-product', // Basket products - used for route
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
  // Check for elements specific to the elible product
  () => {
    let checkElements = false;
    let eligibleProduct = document.querySelector('.something-free');
    if (eligibleProduct) {
      eligibleProduct = eligibleProduct.parentNode;
      const CSRFToken = eligibleProduct.querySelector('input[name="csrfmiddlewaretoken"]');
      const renderLocation = eligibleProduct.querySelector('.cf > .product-details');
      const productName = eligibleProduct.querySelector('.cf .product-name');
      const visionType = eligibleProduct.querySelector('.product-detail--vision .detail-value');
      const tintType = eligibleProduct.querySelector('.product-detail--tint .detail-value');
      const packageType = eligibleProduct.querySelector('.product-detail--package .detail-value');
      const prescriptionType = eligibleProduct.querySelector('.product-detail--prescription .detail-value');
      // Next line exceeds length
      // eslint-disable-next-line
      if (CSRFToken && renderLocation && productName && visionType && tintType && packageType && prescriptionType) {
        checkElements = true;
      }
    }
    return checkElements;
  },
], basketPage);

