/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import PageMarkup from './markup';
import productCarousel from './components/aboveFold/productCarousel';
import productInfo from './components/aboveFold/productInfo';
import usps from './components/belowFold/usps';
import accordion from './components/belowFold/accordion';
import otherwatches from './components/belowFold/otherwatches';
import ProductReviews from './components/belowFold/reviews';
import ProductTabs from './components/belowFold/descriptionTabs';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    new PageMarkup();
    productCarousel();
    productInfo();
    usps();
    accordion();
    otherwatches();
    if(window.digitalData.product[0].productInfo.ratingCount > 0) {
      new ProductReviews();
    }

    if(window.innerWidth > 767) {
      new ProductTabs();
    }

    if(VARIATION === '2') {
      if(window.innerWidth <= 767) {
        // move specs before desc
        const specsAccordion = document.querySelectorAll('.product-accordion-item')[1];
        specsAccordion.querySelector('h2').click();
        document.querySelectorAll('.product-accordion-item')[0].insertAdjacentElement('beforebegin', specsAccordion);
      }
    }
  }
};
