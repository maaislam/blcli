/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  const newScarcityBar = () => {
    const newScarity = document.createElement('div');
    newScarity.classList.add(`${ID}-scarcity`);
    newScarity.innerHTML = `<span>Be unique - less than 10 sold <b>WORLDWIDE</b></span>`;
    document.querySelector('.product.media').appendChild(newScarity);
  }

  const scarcityBarText = document.querySelectorAll('#scarity-message span');
  for (let index = 0; index < scarcityBarText.length; index += 1) {
    const element = scarcityBarText[index];
    if(element.textContent.indexOf('Hurry! Last few available') > -1) {
      element.textContent = 'Hurry! Limited Edition: last few available, EVER';
    } else if (element.textContent.indexOf('This product is selling fast!') > -1) {
      document.querySelector('#scarity-message').classList.add(`${ID}-hidden`);
      newScarcityBar();
    }
  }
};
