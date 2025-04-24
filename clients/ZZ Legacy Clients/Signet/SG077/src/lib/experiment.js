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

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    // image markup
    /**
     * <div class="${ID}-block">
        <div class="${ID}-categoryImage" style="background-image: url('https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/0ACB8A6C0A17E5AA7CA7C7D1D103310D79F79CB68A9B0ED52D9FB165AC107FDD.png?meta=/SG077---Guided-Selling---Homepage/watch.png')"></div>
        <p class="${ID}-p">Watches</p>
        <div class="${ID}-blockBackground"></div>
      </div>
     */

    // add finder banner
    const addFinderTile = () => {

      let lastGridTitle;
      if(getSiteFromHostname() == 'ernestjones') {
        lastGridTitle = document.querySelector('.EJ050-rightSide_full');
      } else {
        lastGridTitle = document.querySelector('.HS050-rightSide_full');
      }
      lastGridTitle.innerHTML = `
      <div class="${ID}-blockText">
        <h3>What are you looking for?</h3>
        <p>Let us help you find exactly what you're looking for.</p>
        <div class="${ID}-button">Product Finder</div>
      </div>`;
    }


    // add finder container with events
    const createFinderContainer = () => {
      const finderWrapper = document.createElement('div');
      finderWrapper.classList.add(`${ID}-finderWrapper`);
      finderWrapper.innerHTML = `
      <div class="${ID}-close"></div>
      <div class="${ID}-finderContainer"></div>`;

      document.body.appendChild(finderWrapper);

      // show finder on button click
      const finderBannerButton = document.querySelector(`.${ID}-blockText .${ID}-button`);
      finderBannerButton.addEventListener('click', () => {
        finderWrapper.classList.add(`${ID}-finderActive`);
      });

      // hide finder 
      const finderCloseButton = document.querySelector(`.${ID}-finderWrapper .${ID}-close`);
      finderCloseButton.addEventListener('click', () => {
        finderWrapper.classList.remove(`${ID}-finderActive`);
      });
    }


    addFinderTile();
    createFinderContainer();

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
