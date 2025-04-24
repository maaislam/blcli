/* Determine what the new CTA on the slider will do */
import settings from '../../settings';
import scrollToElement from './scrollToEl';

export default () => {
  const sizeBox = document.querySelector(`.${settings.ID}-sizeBox`);
  const addToCartButton = document.querySelector(`.${settings.ID}-addToCart`);
  const existingAddToCart = document.querySelector('.single_add_to_cart_button');

  addToCartButton.addEventListener('click', () => {
    if (document.querySelector('.variations #pa_size')) {
      const topOfImage = document.querySelector('.product-gallery');
      scrollToElement(topOfImage);
      sizeBox.classList.add(`${settings.ID}-sizeBox_active`);
      document.querySelector(`.${settings.ID}_stickyContent`).classList.add(`${settings.ID}-content_hide`);
      document.querySelector(`.${settings.ID}-overlay`).classList.add(`${settings.ID}-overlay_active`);
    } else {
      existingAddToCart.click();
    }
  });
};

