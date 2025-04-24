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
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  if(shared.VARIATION === '1') {
    // if breitling, change the colour
    const brand = window.digitalData.product[0].productInfo.brand;

    if(brand === 'Longines') {
      document.body.classList.add(`${shared.ID}-lo`);
    }else if(brand === 'Tissot') {
      document.body.classList.add(`${shared.ID}-ts`);
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


    const video = document.querySelector(`.${shared.ID}-video video`);
      if(video) {
          video.onplaying = function() {
            events.send(`EJ084 v${shared.VARIATION}`, 'click', 'play video', { sendOnce: true });
          }
      };


    // tracking
    const otherWatch = document.querySelectorAll(`.${shared.ID}__watchProduct`);

    for (let index = 0; index < otherWatch.length; index += 1) {
      const element = otherWatch[index];
      
      if(element) {
        element.addEventListener('click', () => {
          events.send(`EJ084 v${shared.VARIATION} brand: ${brand}`, 'click', 'clicked product rec');
        });
      }
    }  
  }
};
