/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import Lightbox from './components/lightbox';

export default () => {
  setup();

  const addSizeGuideText = () => {
    const sizeLink = document.createElement('div');
    sizeLink.classList.add(`${shared.ID}-sizeGuideLink`);
    sizeLink.innerHTML = '<span>Size Guide</span>';

    const sizeOption = document.querySelector('.product-options-wrapper');
    sizeOption.insertAdjacentElement('beforebegin', sizeLink);
  }

  addSizeGuideText();

  const sizeLightbox = new Lightbox(shared.ID, {
    content: `
    <div class="${shared.ID}-sizeGuide"></div>`
  });
};
