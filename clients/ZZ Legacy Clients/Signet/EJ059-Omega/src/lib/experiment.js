/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import PageContent from './components/pageMarkup';
import mainCarousel from './components/mainCarousel';
import productInfoChanges from './components/productInfoChanges';
import usps from './components/usps';
import countdown from './components/countdown';
import specification from './components/specification';
import ProductReviews from './components/reviews';
import otherWatches from './components/otherWatches';
import stores from './components/stores';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID } = shared;

  if(shared.VARIATION === '1') {
    // if breitling, change the colour
    const brand = window.digitalData.product[0].productInfo.brand;

    if(brand === 'Breitling') {
      document.body.classList.add(`${shared.ID}-br`);
    }else if(brand === 'TAG Heuer') {
      document.body.classList.add(`${shared.ID}-th`);
    } else {
      document.body.classList.add(`${shared.ID}-om`);
    }

    new PageContent();
    mainCarousel();
    productInfoChanges();
    countdown();
    usps();
    specification();

    if(window.digitalData.product[0].productInfo.ratingCount > 0) {
      new ProductReviews();
    }

    otherWatches();

    if(brand === 'Breitling') {
      stores();

      const video = document.querySelector(`.${shared.ID}-video video`);
      if(video) {
          video.onplaying = function() {
            events.send(`${shared.ID} v${shared.VARIATION}`, 'click', 'play video', { sendOnce: true });
          }
      };
    }


    const OOS = document.querySelector(`.${ID}__button.${ID}-noStock`);
  if(OOS) {
    document.querySelector('.product-price').insertAdjacentElement('afterend', OOS);
  }


    // tracking
    const otherWatch = document.querySelectorAll(`.${shared.ID}__watchProduct`);

    for (let index = 0; index < otherWatch.length; index += 1) {
      const element = otherWatch[index];
      
      if(element) {
        element.addEventListener('click', () => {
          events.send(`${shared.ID} v${shared.VARIATION} brand: ${brand}`, 'click', 'clicked product rec');
        });
      }
    }  
  }
};
