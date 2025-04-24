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
      if(!localStorage.getItem(`EJ094c-closed`, 1)) {
        document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
        if(window.digitalData.page.pageInfo.pageType === 'PDP') {
          document.body.classList.add(`${ID}-PDP`);
        }
        new COVIDPopup();
      }
    }

    if(getSiteFromHostname() == 'hsamuel') {
      if(!localStorage.getItem(`HS094c-closed`, 1)) {
        document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
        if(window.digitalData.page.pageInfo.pageType === 'PDP') {
          document.body.classList.add(`${ID}-PDP`);
        }
        new COVIDPopup();
      }
    }
  }
};
