/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, share } from './services';
import PageContent from './components/pageMarkup';
import productCarousel from './components/aboveFold/productCarousel';
import productInfo from './components/aboveFold/productInfo';
import usps from './components/belowFold/usps';
import specs from './components/belowFold/specs';
import fourCs from './components/belowFold/fourCs';
import productDescription from './components/belowFold/productDescription';
import buyingGuides from './components/belowFold/buyingGuides';
import ProductReviews from './components/belowFold/reviews';
import OfferBox from './components/belowFold/offer';
import shared from './shared';
import dropHint from './components/belowFold/dropHint';
import brandStory from './components/belowFold/brandStory';

export default () => {
  
  setup();

  if(shared.VARIATION === '1' || shared.VARIATION === '2' || shared.VARIATION === '3') {
    new PageContent();
    productCarousel();
    productInfo();
    usps();
    specs();
    fourCs();
    productDescription();
    buyingGuides();
    dropHint();

    if(window.digitalData.product[0].productInfo.ratingCount > 0) {
      new ProductReviews();
    }

    new OfferBox();

    brandStory();
  }


  // on v2 move the offer further up
  if(shared.VARIATION === '2') {
    const usp = document.querySelector(`.${shared.ID}__usps`);
    const offer = document.querySelector(`.${shared.ID}__offer`);

    if(usp && offer) {
      usp.insertAdjacentElement('afterend', offer);
    }
  }

};
