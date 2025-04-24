/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import BuySectionMarkup from './components/productArea';
import boxesMarkup from './components/boxesMarkup';
import boxesData from './components/boxesData';
import selectOption from './components/selectOption';
import showBoxes from './components/showBoxes';
import { buildTheSelectedOptions, goBack } from './components/selectedOptions';
import { showRightAccessories } from './components/accessories';
import shared from './shared';
import lightboxMarkup from './components/lightboxMarkup';

export default () => {
  setup();
  
  // add attributes to existing boxes
  boxesData();

  // create the new content area
  new BuySectionMarkup();

  // adds the lightbox for v2
  if(shared.VARIATION === '2') {
    lightboxMarkup();
  }

  // create the boxes
  boxesMarkup();

  // show/hide the boxes
  showBoxes();

  // selecting the new boxes
  selectOption();

  buildTheSelectedOptions();
  goBack();
};
