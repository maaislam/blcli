/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import ProductBox from './components/productBox';
import finderMarkup from './components/finderMarkup';

export default () => {
  setup();

  // add control

  // add variation
  if(shared.VARIATION === '1') {
    new ProductBox();
    finderMarkup();
  }
  
};
