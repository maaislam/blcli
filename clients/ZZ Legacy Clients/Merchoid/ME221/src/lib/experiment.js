/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import boxContent from './components/boxContent';

export default () => {
  setup();

  const { ID } = shared;

  const productPageBox = () => {
    const box = document.createElement('div');
    box.classList.add(`${ID}-featured_box`);

    document.querySelector('.product-usps-wrapper').insertAdjacentElement('afterend', box);
  }

  productPageBox();
  boxContent();


};
