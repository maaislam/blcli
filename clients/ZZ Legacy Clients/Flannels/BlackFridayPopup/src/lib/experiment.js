/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, buildElement } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';

const activate = () => {
  setup();


  // Store variables
  const promoRef = cacheDom.get('.newBasketPromoCode');

  // Experiment code
  buildElement(promoRef);
};

export default activate;
