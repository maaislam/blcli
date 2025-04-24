/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';

const activate = () => {
  setup();

  const mainImage = document.querySelector('.product-page .product-image');
  // add the stamp
  const addStamp = () => {
    if (mainImage) {
      mainImage.insertAdjacentHTML('beforebegin', '<span class="ME189-stamp"></span>');
    }
  };

  const stockAmount = () => {
    if (mainImage) {
      mainImage.insertAdjacentHTML('afterbegin', '<span class="ME189-amount">Only 1,968 available</span>');
    }
  };


  addStamp();
  if (settings.VARIATION === '1') {
    stockAmount();
  }
};

export default activate;
