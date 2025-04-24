import { events } from '../../../../../lib/utils';
import { addAccessoriesSlider } from './components/addAccessories';
import { addColourChoices } from './components/addColourChoices';
import { addKitSlider } from './components/addKits';
import journeyLogic from './components/journeyLogic';
import JourneyMarkup from './components/journeyMarkup';
import { scrollToElement } from './components/scrollToEl';
import videoLogic from './components/videoLogic';
import reviews from './reviews';
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
  const { ID, VARIATION } = shared;


  const topHeader = () => {
    const header = document.createElement('div');
    header.classList.add(`${ID}-topHeader`);
    header.innerHTML = `
    <div class="${ID}-headerWrap">
      <div class="${ID}-headerContent">
      <div class="${ID}-play"></div>
        <span>The Velvetiser</span>
        <p>Your in-home hot chocolate machine. Imagined by Hotel Chocolat, engineered by Dualit</p>
        <div class="${ID}-button">Shop Now</div>
      </div>
      <div class="${ID}-bottomArrow"></div>
    </div>`;

    document.querySelector('#main').insertAdjacentElement('beforebegin', header);
  }

  const headerEvents = () => {
    const arrow = document.querySelector(`.${ID}-bottomArrow`);
    const shopNowButton = document.querySelector(`.${ID}-topHeader .${ID}-button`);
    const topReviews = document.querySelector(`.${ID}-topReviews`);

    arrow.addEventListener('click', () => {
      scrollToElement(topReviews);
      events.send(`${ID} variation:${VARIATION} - Velvetiser Journey`, 'click', 'header scroll arrow');
    });
    shopNowButton.addEventListener('click', () => {
      scrollToElement(topReviews);
      events.send(`${ID} variation:${VARIATION} - Velvetiser Journey`, 'click', 'header shop now button');
    });
  }


  
  if(shared.VARIATION === '1') {
    topHeader();
  }

  new JourneyMarkup();
  videoLogic();
  addColourChoices();
  addAccessoriesSlider();
  addKitSlider();
  journeyLogic();
  reviews();
  headerEvents();

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];

};
