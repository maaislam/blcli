import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product-details', // Product detail containers
  '.basket-product', // Product container
  '.product-personalise__action', // Link to change option
  '.detail-name', // Product Option Name
  // Check if at least an error or a item that has passed validation exists
  // At least one error message exists or for Product with validation passed, and not frames
  () => {
    let validationCheck = false;
    if (document.querySelector('.product-detail--error') || document.querySelector('.product-component:not(.product-detail--error):not(.product-frames)')) {
      validationCheck = true;
    }
    return validationCheck;
  },
], Run);
