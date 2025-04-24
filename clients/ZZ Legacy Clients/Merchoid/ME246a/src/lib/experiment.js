/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID } = shared;

  const url = window.location.href;

  let giftURL;

  if(url.indexOf('/uk/') > -1) {
    giftURL = 'https://www.merchoid.com/uk/gifts/';
  } else {
    giftURL = '/gifts/';
  }

  const giftFinderBanner = document.createElement('div');
  giftFinderBanner.classList.add(`${ID}-giftFinderBanner`);
  giftFinderBanner.innerHTML = `
  <a href="${giftURL}"></a>
  <span>Gift Shop</span><p>We have a huge range of merch that will make the perfect gift for that geek in your life.</p>
  <a class="${ID}-bannerButton">Shop now</a>`;

  if(window.innerWidth > 767) {
    document.querySelector('.banner-home-slider').insertAdjacentElement('afterend', giftFinderBanner);
  } else {
    document.querySelector('.banner-home-slider').insertAdjacentElement('beforebegin', giftFinderBanner);
  }


  // reinit slider
  function reinit() {
    const el = window.jQuery('#banner-slider-carousel .owl-carousel');
    el.owlCarousel('destroy');

     el.owlCarousel({
      loop:true,
      autoHeight: false,
      nav:true,
      items:1,
    });
  }

  if(window.innerWidth > 767) {
    const newBannerDesktopWrap = document.createElement('div');
    newBannerDesktopWrap.classList.add(`${ID}-heroTop`);
    newBannerDesktopWrap.innerHTML = `<div class="${ID}-bannerLeft"></div><div class="${ID}-bannerRight"></div>`;

    document.querySelector('.top-search-banner').insertAdjacentElement('afterend', newBannerDesktopWrap);

    const slider = document.querySelector('.banner-home-slider');
    newBannerDesktopWrap.querySelector(`.${ID}-bannerLeft`).appendChild(slider);
    newBannerDesktopWrap.querySelector(`.${ID}-bannerRight`).appendChild(giftFinderBanner);


    pollerLite(['#banner-slider-carousel .item-image'], () => {
      // make all images background images
       const allSliderImages = document.querySelectorAll('#banner-slider-carousel .item-image');
       for (let index = 0; index < allSliderImages.length; index += 1) {
         const element = allSliderImages[index];

         const image = element.querySelector('.img-responsive');
         image.outerHTML = `<div class="${ID}-slideImage" style="background-image:url(${image.getAttribute('src')})"></div>`;
         //const newImage = `<`
         //const image = element.querySelector('.image-responsive');
         //console.log(image);

         //image.outerHTML = `<div class="${ID}-slideImage" data-src="${image.getAttribute('src')}"></div>`;
       }
       reinit();
   });
  }
};
