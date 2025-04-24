/* eslint-disable no-underscore-dangle */
import settings from './../settings';
import { pollerLite } from '../../../../../lib/uc-lib';

/** Class that turns the product images into a slider */
export default class ProductImageSlider {
  /** Run triggers */
  run() {
    pollerLite([
      '.product-image',
      () => {
        let bxSliderExists;
        try {
          bxSliderExists = !!window.jQuery.fn.bxSlider;
        } catch (e) {} // eslint-disable-line
        return bxSliderExists;
      },
    ], () => {
      this._scrapeData();
      this._create();
      this._render();
    });
  }

  /** Retreive necessary data from page */
  _scrapeData() {
    const data = [];
    const productImageContainer = document.querySelector('.product-image');
    const alt = productImageContainer.querySelector('.product-image__image').getAttribute('alt');
    const productImagesEls = productImageContainer.querySelectorAll('.thumbnails button img');
    [].forEach.call(productImagesEls, (el) => {
      let { src } = el;
      src = src.replace(/-100$/, '');
      data.push({ src, alt });
    });
    this._isSingleImage = productImagesEls.length === 1;
    this._data = data;
  }

  /** Create component elements */
  _create() {
    const component = document.createElement('div');
    component.classList.add(`${settings.ID}_ProductImageSlider`);
    this._data.forEach((imgData) => {
      const { src, alt } = imgData;
      const image = document.createElement('div');
      image.classList.add(`${settings.ID}_ProductImageSlider__image`);
      image.innerHTML = `<img src="${src}-291" alt="${alt}" srcset="${src}-504" sizes="(max-width: 50em) 45vw" onerror="this.onerror=null;this.src='/images/noimage.gif';"/>`;
      component.appendChild(image);
    });

    this.component = component;
  }

  /** Render component elements */
  _render() {
    // Hide original elements
    const productImageContainer = document.querySelector('.product-image');
    productImageContainer.querySelector('#productImage').style.display = 'none';
    productImageContainer.querySelector('.thumbnails').style.display = 'none';

    // Render
    productImageContainer.appendChild(this.component);

    // Init bxSlider if multiple images
    if (!this._isSingleImage) {
      const $ = window.jQuery;
      $(this.component).bxSlider();
    }
  }
}
