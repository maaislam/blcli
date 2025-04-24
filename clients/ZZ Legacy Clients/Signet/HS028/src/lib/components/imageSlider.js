import settings from '../../lib/settings';
import { poller, pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class ImageSlider {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
    this.initSlider();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_productSlider`);

    const thumbnail = document.querySelectorAll('.thumbnails button:not(.video):not(.tangiblee-button-wrap):not(.arrow-360)');

    for (let index = 0; index < thumbnail.length; index += 1) {
      let imageURL = document.querySelector('.product-image__link').getAttribute('href');
      if (index > 0) {
        imageURL = imageURL.replace('-', '-alt' + index + '-');
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
    const PDPContent = document.querySelector('.container.pdpContent .product-image');
    PDPContent.insertAdjacentElement('afterend', component);
  }

  /** Run slider plugin */
  initSlider() {
    const { component } = this;
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', (data, textStatus, jqxhr) => {

      pollerLite([`.${ID}-sliderImage`, () => !!jQuery.fn.slick], () => {
        jQuery(`.${ID}_productSlider`).slick({
          dots: true,
          centerMode: true,
          centerPadding: '0px',
        });

        setTimeout(function(){ 
          jQuery(`.${ID}_productSlider`).slick("setPosition");
          jQuery(`.${ID}_productSlider`).slick('refresh'); 
        }, 1000);
       
        jQuery(`.${ID}_productSlider`).slick('refresh');
        jQuery(window).on('resize orientationchange', () => {
          jQuery(`.${ID}_productSlider`).slick('resize');
        });
      });
    });
  }
}
