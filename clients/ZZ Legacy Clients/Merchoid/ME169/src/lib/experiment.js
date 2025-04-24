/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import rebuildSlider from './rebuildSlider';
import Lightbox from '../../../../../lib/components/Lightbox/Lightbox';
import lastSlideMarkup, { addLastSlideElements } from './lastSlide';
import thumbnails from './thumbnails';
import flickityHeight from './flickityHeight';
import settings from './settings';

const activate = () => {
  setup();
  flickityHeight();
  thumbnails();
  rebuildSlider();

  const galleryImages = document.querySelectorAll('.product-gallery-slider .flickity-slider .slide a > img');
  const lightbox = new Lightbox('ME169', {
    content: `
      <div class="ME169_slider">
        ${Array.prototype.map.call(galleryImages, img => `
          <div class="ME169_lightbox-slide slide">
            <img src="${img.getAttribute('data-flickity-lazyload') ? img.getAttribute('data-flickity-lazyload') : img.src}" />
          </div>
        `).join('')}
        <div class="ME169_lightbox-slide">
          ${lastSlideMarkup}
        </div>
      </div>
    `,
  });

  // function to run on lightbox open
  window.openLightbox = () => {
    lightbox.open();
    jQuery('.ME169_slider').flickity({
      prevNextButtons: true,
      pageDots: false,
      cellAlign: 'center',
      wrapAround: true,
      autoPlay: false,
      imagesLoaded: true,
      adaptiveHeight: true,
      asNavFor: '.product-gallery-slider',
    });
  };

  // open the lightbox on images click
  document.querySelector('.ME169-last_slide').parentNode.classList.add('ME169-last_slideWrap');
  const allImages = document.querySelectorAll('.flickity-slider .slide:not(.ME169-last_slideWrap)');

  for (let index = 0; index < allImages.length; index += 1) {
    const element = allImages[index];
    element.addEventListener('click', (e) => {
      e.preventDefault();
      window.openLightbox();
    });
  }

  const slideThumbnails = document.querySelectorAll('.product-thumbnails li');
  for (let index = 0; index < slideThumbnails.length; index += 1) {
    const element = slideThumbnails[index];
    element.addEventListener('click', (e) => {
      e.preventDefault();
      window.openLightbox();
    });
  }

  // close the lightbox
  const overlay = document.querySelector('.ME169_Lightbox__overlay');
  overlay.addEventListener('click', () => {
    lightbox.close();
  });

  addLastSlideElements();


  // cta button click on lightbox and slider
  const CTAbuttons = document.querySelectorAll(`.${settings.ID}-slideCTA`);
  const addToCart = document.querySelector('.product-info .single_add_to_cart_button');
  for (let index = 0; index < CTAbuttons.length; index += 1) {
    const element = CTAbuttons[index];
    element.addEventListener('click', () => {
      addToCart.click();
      lightbox.close();
    });
  }
};

export default activate;
