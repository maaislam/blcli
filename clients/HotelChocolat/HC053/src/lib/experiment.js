/**
 * HC053 - PDP Need Something Sooner
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, addOutOfStockMessage, changeCtaBtnText, generateCarouselContent, getInitialCarouselPosition, observeWindowWidthAndReload } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import data from './recommendedProductsData';
import initiateSlick from './initiateSlick';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  if (VARIATION == '1') {
    generateCarouselContent();

    const initialPosition = getInitialCarouselPosition();
    initiateSlick(initialPosition);
    observeWindowWidthAndReload();
    addOutOfStockMessage();
    changeCtaBtnText();

    var array = document.querySelectorAll('.HC053-recommendation-item .product-tile')

    if (array){

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      element.addEventListener('click', () => {
        events.send('HC053 v1', 'Clicked Need Something')
      })
      
    }
  }

  } else if (VARIATION == '2') {
    addOutOfStockMessage();
    
    changeCtaBtnText();
  }

  

};

