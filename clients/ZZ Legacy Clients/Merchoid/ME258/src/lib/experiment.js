/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import EmailPopup from './emailPopUp';
import boxEvents from './boxEvents';
import gameboxes from './gameboxes';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  const createOverlay = () => {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
  }

  const createGameTrigger = () => {
    const triggerBox = document.createElement('div');
    triggerBox.classList.add(`${ID}-gameTrigger`);
    if(shared.VARIATION === '1') {
      triggerBox.innerHTML = `
      <div class="${ID}-message">Play to win</div>
      <div class="${ID}-gameTriggerBox"></div>`;
    } else {
      triggerBox.innerHTML = `<div class="${ID}-message"><span>Feeling Lucky?</span><div class="${ID}-close"></div></div>`;
    }

    document.body.appendChild(triggerBox);
    
  }

  if(!localStorage.getItem('ME258-closed')) {
    createOverlay();
    createGameTrigger();
    new EmailPopup();
    boxEvents();
    gameboxes();
  }
};
