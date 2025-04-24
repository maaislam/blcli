/**
 * HC056 - PDP Thumbnails
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, observeWindowWidth } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import initiateSlick from './initiateSlick';

export default () => {
  const { ID, VARIATION } = shared;
  if(VARIATION === 'control') {
    events.send(`${ID}-${VARIATION}`, 'init');
    setup();

    const controlThumbnails = document.querySelector('.thumbnail-link');
    for (let index = 0; index < controlThumbnails.length; index += 1) {
      const element = controlThumbnails[index];
      element.addEventListener('click', () => {
        events.send(`${ID} v${VARIATION}`, 'click', 'Thumbnail Image');
      });
      
    }
  } else {

    events.send(`${ID}-${VARIATION}`, 'init');
    setup();

    // --- create new carousel
    let thumbnailImg = {};
    let imgList = '';
    const allThumbnailsIcons = document.querySelectorAll('.product-col-1.product-image-container #thumbnails div.thumb:not(.slick-cloned)');
     
    for (let i = 0; i < allThumbnailsIcons.length; i += 1) {
      const thumb = allThumbnailsIcons[i];
      const img = thumb.querySelector('a.thumbnail-link').getAttribute('href');
      thumbnailImg[i] = img;

      imgList += `
      <div class="${ID}-image" slide-index="${i}">
        <img class="${ID}-image__img" src="${img}"/>
      </div>`;
    }

    //let imgList = '';
    /*for (let i = 0; i < allThumbnailsIcons.length; i += 1) {
      const thumb = allThumbnailsIcons[i];
      const img = thumb.querySelector('a.thumbnail-link').getAttribute('href');
      thumbnailImg[i] = img;

      // let thumbIcon = thumb.querySelector('.thumb');
      thumb.querySelector('a').setAttribute('id', `${ID}-thumb__${i}`);

      let active = '';
      if (thumb.classList.contains('selected')) {
        active = 'active';
      }
      // --- Generate new thumbnail image
      imgList += `<div class="${ID}-thumb ${active}" data-id="${ID}-thumb__${i}"><img class="${ID}-thumb__img" src="${img}"></div>`;
    } */


    /**
     * @desc Add thumbnail image container
     */
    const thumbContainer = `
    <div class="${ID}-productThumbnails__wrapper">
      <div class="${ID}-productThumbnails__container">
        ${imgList}
      </div>
    </div>`;

    /**
     * @desc Add main image container
     */
    const imageContainer = `
    <div class="${ID}-productImage__wrapper">
      <div class="${ID}-productImage__container">
        ${imgList}
      </div>
    </div>`;

    document.querySelector(`.product-col-1.product-image-container`).insertAdjacentHTML('afterbegin', thumbContainer);
    document.querySelector(`.product-col-1.product-image-container`).insertAdjacentHTML('afterbegin', imageContainer);

    // make first thumbnail active
    document.querySelector(`.${ID}-productThumbnails__container .${ID}-image`).classList.add('active');
    

    initiateSlick();
    /**
     * @desc New Thumbnail Event Listeners
     
    const allThumbnails = document.querySelectorAll(`.${ID}-thumb`);
    [].forEach.call(allThumbnails, (thumb) => {
      thumb.addEventListener('click', (e) => {
        if (document.querySelector(`.${ID}-thumb.active`)) {
          document.querySelector(`.${ID}-thumb.active`).classList.remove('active');
        }
        
        thumb.classList.add('active');
        const thumbToClickId = thumb.getAttribute('data-id');
        events.send(`${ID} v${VARIATION}`, 'click', 'Thumbnail Image');

        document.querySelector(`a#${thumbToClickId} img`).click();
      });

    });

    if(window.innerWidth > 767 && window.innerWidth < 1024 && allThumbnails.length > 4) {
      initiateSlick();
    }
    */
  }
  // observeWindowWidth();
};
