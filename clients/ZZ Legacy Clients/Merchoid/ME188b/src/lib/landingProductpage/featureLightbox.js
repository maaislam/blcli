import settings from '../settings';
import scrollToElement from './scrollTo';

export default () => {
  const addToCartButton = document.querySelector('.single_add_to_cart_button');
  const allFeatures = document.querySelectorAll(`.${settings.ID}-feature_lightbox`);
  const overlay = document.querySelector(`.${settings.ID}-overlay`);
  for (let index = 0; index < allFeatures.length; index += 1) {
    const element = allFeatures[index];

    const buyNow = element.querySelector(`.${settings.ID}-button`);
    const learnMore = element.previousElementSibling.previousElementSibling;
    const featureImage = element.parentNode.querySelector('span');
    // show lightbox
    learnMore.addEventListener('click', () => {
      element.classList.add(`${settings.ID}-lightbox_showing`);
      overlay.classList.add(`${settings.ID}-overlay_showing`);

      document.body.classList.add(`${settings.ID}-noScroll`);
    });
    featureImage.addEventListener('click', () => {
      element.classList.add(`${settings.ID}-lightbox_showing`);
      overlay.classList.add(`${settings.ID}-overlay_showing`);

      document.body.classList.add(`${settings.ID}-noScroll`);
    });

    // close lightbox
    const lightboxExit = element.querySelector(`.${settings.ID}-exit`);
    lightboxExit.addEventListener('click', () => {
      element.classList.remove(`${settings.ID}-lightbox_showing`);
      overlay.classList.remove(`${settings.ID}-overlay_showing`);
      document.body.classList.remove(`${settings.ID}-noScroll`);
    });

    // overlay click
    overlay.addEventListener('click', () => {
      element.classList.remove(`${settings.ID}-lightbox_showing`);
      overlay.classList.remove(`${settings.ID}-overlay_showing`);
      document.body.classList.remove(`${settings.ID}-noScroll`);
    });

    buyNow.addEventListener('click', () => {
      element.classList.remove(`${settings.ID}-lightbox_showing`);
      overlay.classList.remove(`${settings.ID}-overlay_showing`);
      document.body.classList.remove(`${settings.ID}-noScroll`);

      // add scroll to here
      scrollToElement(document.querySelector('.product-info'));
      addToCartButton.classList.add(`${settings.ID}-buy_animated`);
      setTimeout(() => {
        addToCartButton.classList.remove(`${settings.ID}-buy_animated`);
      }, 2000);
    });
  }
};
