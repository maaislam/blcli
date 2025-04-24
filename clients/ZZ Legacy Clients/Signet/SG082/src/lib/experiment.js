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
import PageContent from './components/pageMarkup';
import productCarousel from './components/abovefold/productCarousel';
import productInfo from './components/abovefold/productInfo';
import usps from './components/belowfold/usps';
import productDescription from './components/belowfold/productDescription';
import fourCs from './components/belowfold/fourCs';
import brandStory from './components/belowfold/brandStory';
import specs from './components/belowfold/specs';
import OfferBox from './components/belowfold/offer';
import ProductReviews from './components/belowfold/reviews';
import buyingGuides from './components/belowfold/buyingGuides';


const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    // above fold
    new PageContent();
    productCarousel();
    productInfo();
    usps();

    // below fold
    productDescription();
    fourCs();
    brandStory();
    specs();
    new OfferBox();
    // buyingGuides();
    new ProductReviews();
  
  


    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
