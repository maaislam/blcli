import settings from '../../lib/settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class ProductSlider {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
    this.initSlider();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_productSlider`);
    element.innerHTML = `
    <div class="${ID}_productSlider_inner">
    </div>`;

    this.component = element;

    // add first 3 slides html to slider
    const sliderOuter = element.querySelector(`.${ID}_productSlider_inner`);
    const allSlides = document.querySelectorAll('.product-image .product-gallery-slider .slide a');
    const allSlidesArr = [].slice.call(allSlides);
    const firstThreeSlides = allSlidesArr.slice(0, 3);
    for (let index = 0; index < firstThreeSlides.length; index += 1) {
      const el = firstThreeSlides[index];

      const elImage = el.href;
      const newSlide = document.createElement('img');
      newSlide.classList.add(`${ID}-slideImage`);
      newSlide.src = elImage;

      sliderOuter.insertAdjacentElement('beforeend', newSlide);
    }

  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const productGallery = document.querySelector('.large-6.columns.product-gallery');
    productGallery.insertAdjacentElement('afterbegin', component);


    const productSlider = document.querySelector(`.${ID}_productSlider`);
    const hiddenSlider = document.querySelector('.large-6.columns.product-gallery');
    setTimeout(() => {
      productGallery.querySelector('.images').classList.add(`${ID}-main-slider-show`);
      productSlider.classList.add('ME190-removeSlider');
    }, 9000);
  }

  /** Run slider plugin */
  initSlider() {
    const { component } = this;
    const slider = component.querySelector(`.${ID}_productSlider_inner`);
    pollerLite([
      () => {
        try {
          return typeof window.Flickity === 'function';
        } catch (e) {}
      },
    ], () => {
      // Flickity slider exists
      const flickity = new Flickity(slider, {
        autoPlay: true,
        autoPlay: 3000,
        pageDots: false,
        draggable: false,
      });
    });
  }
}
