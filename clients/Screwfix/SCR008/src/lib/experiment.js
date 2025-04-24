/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
// import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

const init = () => {
  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  document.getElementById('pr__media').addEventListener('click', ({ target }) => {
    if (target.matches('img[id^=thumbnail_]') && target.closest('#product-slider-nav')) {
      const targetIndex = target.id.split('_')[1];
      bigSlider.slick('slickGoTo', targetIndex);
      fireEvent('Customer clicks one of the carousel images');
    } else if (target.matches('.pr__media--enlarge')) {
      fireEvent('Customer clicks the magnifying glass');
    }
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const setHighResImage = (images, currentSize, desiredSize) => {
    if (images.length === 0) {
      return;
    }

    images.forEach((productImage) => {
      const currentImg = productImage.getAttribute('src') || productImage.getAttribute('data-lazy');

      const sizeString = (string) => {
        return `prodImage${string.charAt(0).toUpperCase() + string.slice(1)}$`;
      };
      const currentSizeString = sizeString(currentSize);
      const desiredSizeString = sizeString(desiredSize);

      if (!currentImg.includes(currentSizeString)) return;

      const newImg = `${currentImg.split(currentSizeString)[0]}${desiredSizeString}`;
      const hasImgSource = productImage.hasAttribute('src');
      productImage.setAttribute(`${hasImgSource ? 'src' : 'data-lazy'}`, newImg);
    });
  };

  const productImages = document.querySelectorAll('[id^="product_image_"]');
  const thumbnails = document.querySelectorAll('[id^="thumbnail_"]');
  const productMediaWrapper = document.querySelector('.pr__product >div');

  setHighResImage(productImages, 'medium', 'large');
  setHighResImage(thumbnails, 'thumb', 'medium');

  productMediaWrapper.classList.add(`${ID}__media-wrapper`);

  const $ = window.jQuery;
  const slider = $('#product-slider-nav');
  const bigSlider = $('#product-slider-for');

  slider.slick('unslick');
  bigSlider.slick('unslick');

  bigSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  });

  slider.slick({
    speed: 500,
    dots: false,
    infinite: false,
    prevArrow: `<button id="slider_previous"
    type="button"
    data-role="none"
    class="btn pagi__link slick-prev slick-arrow"
    style="display: block;"><span class="icon-left-dir"></span></button>
    `,
    nextArrow: `<button id="slider_next"
    type="button"
    data-role="none"
    class="btn pagi__link slick-next slick-arrow"
    style="display: block;"><span class="icon-right-dir-1"></span></button>
    `,
    rows: 2,
    slidesPerRow: 2,
  });
};

export default () => {
  setTimeout(init, 2000);
};
