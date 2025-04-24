import settings from '../../lib/settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;
export default () => {
  /* Move the position of the title */
  const productTitle = document.querySelector('.product-title-region');
  document.querySelector('.large-6.columns.product-gallery').insertAdjacentElement('afterend', productTitle);

  const officialMerchandise = document.querySelector('.product-title-region-after');
  document.querySelector('.product-title-region-before').insertAdjacentElement('beforebegin', officialMerchandise);

  /* Remove all the image link */
  const allSliderImages = document.querySelectorAll('.product-image .product-gallery-slider a');
  for (let index = 0; index < allSliderImages.length; index += 1) {
    const element = allSliderImages[index];
    element.removeAttribute('href');
    element.addEventListener('click', (e) => {
      e.preventDefault;
      e.stopImmediatePropagation;
    });
  }

  /* Add hand symbol for new users */
  const addHand = () => {
    const handSymbol = document.createElement('div');
    handSymbol.classList.add(`${ID}-hand_swiper`);

    const productGallery = document.querySelector('.product-image');
    productGallery.appendChild(handSymbol);

    localStorage.setItem(`${ID}-newUser`, 1);
  };

  if (!localStorage.getItem(`${ID}-newUser`)) {
    addHand();
    setTimeout(() => {
      document.querySelector(`.${ID}-hand_swiper`).remove();
    }, 5000);
  }


  // Move review bar and official messaging for v3
  if (settings.VARIATION === '3') {
    pollerLite(['#brands-widget'], () => {
      const reviewBar = document.querySelector('#brands-widget');
      document.querySelector('.product-details').insertAdjacentElement('beforebegin', reviewBar);
      const gallery = document.querySelector('.images');
      gallery.insertAdjacentElement('afterend', document.querySelector('.official-licensed-product'));
    });
  }
};
