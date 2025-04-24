/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import reviewBanner from './components/reviewBanner';
import shared from './shared';
import PersuasiveMessage from './components/persuasiveMessage';

export default () => {

  const { ID } = shared;

  setup();
  reviewBanner();

  // add label
  const xmasLabel = () => {
    const label = document.createElement('div');
    label.classList.add(`${ID}-xmas_label`);
    label.innerHTML = `<span>Christmas 2019</span>`;

    const productImage = document.querySelector('.gallery-placeholder .fotorama__stage');
    productImage.appendChild(label);
  }

  xmasLabel();

  const messageBox = new PersuasiveMessage();
};
