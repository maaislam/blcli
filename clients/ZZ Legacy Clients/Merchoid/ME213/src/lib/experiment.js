/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import AddStamps from './stampImages';

export default () => {
  setup();

  const newTopBanner = () => {
    const newBanner = document.createElement('div');
    newBanner.classList.add(`${shared.ID}-banner`);
    newBanner.innerHTML = `<h2>Shop Jumpers</h2><div class="${shared.ID}-stampCarousel"></div>`;

    document.querySelector('#maincontent').insertAdjacentElement('afterbegin', newBanner);
  }

  setTimeout(() => {
    newTopBanner();

    const addImages = new AddStamps();
  }, 1000);
 
};
