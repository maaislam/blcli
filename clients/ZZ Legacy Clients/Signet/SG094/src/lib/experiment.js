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
import COVIDPopup from './lightbox';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();


    if(getSiteFromHostname() == 'ernestjones') {
      if(!localStorage.getItem(`EJ094-closed`, 1)) {
        document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
        new COVIDPopup();
      }
    }

    if(getSiteFromHostname() == 'hsamuel') {
      if(!localStorage.getItem(`HS094-closed`, 1)) {
        document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
        new COVIDPopup();
      }
    }
  }
};
