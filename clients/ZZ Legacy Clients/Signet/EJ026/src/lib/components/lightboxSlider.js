import settings from '../../lib/settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class LightboxSlider {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
    this.initSlider();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_lightboxproductSlider`);

    const thumbnail = document.querySelectorAll('.thumbnails button:not(.video):not(.tangiblee-button-wrap):not(.arrow-360)');

    for (let index = 0; index < thumbnail.length; index += 1) {
      let imageURL = document.querySelector('.product-image__link').getAttribute('href');
      if (index > 0) {
        imageURL = imageURL.replace('-', '-alt' + index + '-');
      } else {
        imageURL = imageURL;
      }

      const newImage = document.createElement('img');
      newImage.classList.add(`${ID}-sliderImage`);
      newImage.src = imageURL;
      element.appendChild(newImage);
    }
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const lightboxSlider = document.querySelector(`.${ID}-lightboxSlider`);
    lightboxSlider.appendChild(component);
  }

  initSlider() {
    const { component } = this;

    const LBoverlay = document.querySelector(`.${ID}_Lightbox__overlay`);
    const lightbox = document.querySelector(`.${ID}_Lightbox`);

    const openLightbox = () => {
      LBoverlay.style.display = 'block';
      lightbox.style.display = 'block';
      document.documentElement.classList.add(`${ID}_Lightbox__noScroll`);
      document.body.classList.add(`${ID}_Lightbox__noScroll`);
    };
    // open lightbox on slider image, put in to a slider
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', (data, textStatus, jqxhr) => {
      const mainSlider = document.querySelectorAll(`.${ID}-sliderImage`);
      for (let index = 0; index < mainSlider.length; index += 1) {
        const element = mainSlider[index];
        element.addEventListener('click', () => {
          openLightbox();
          if (component.classList.contains('slick-initialized')) {
            setTimeout(() => {
              jQuery(`.${ID}_lightboxproductSlider`).slick('resize');
              jQuery(`.${ID}__lightboxproductSlider`).slick('refresh');
            }, 1000); 
          } else {
            jQuery(`.${ID}_lightboxproductSlider`).slick({
              dots: true,
              centerMode: true,
              centerPadding: '20px',
            });

            setTimeout(() => {
              jQuery(`.${ID}_lightboxproductSlider`).slick('resize');
              jQuery(`.${ID}__lightboxproductSlider`).slick('refresh');
            }, 1000);
          }
        });
      }

      jQuery(window).on('resize orientationchange', () => {
        jQuery(`.${ID}_lightboxproductSlider`).slick('resize');
      });
    });
  }
}
