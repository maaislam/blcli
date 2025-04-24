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

    const getContent = () => {
      let content;
      if(getSiteFromHostname() == 'ernestjones') {
        content = `<b>Get an extra 15% off sale.</b> Use code <span class="${ID}-voucher">EXTRA15</span> at basket. <span class="${ID}-small">T&Cs apply</span>`;
      }
  
      if(getSiteFromHostname() == 'hsamuel') {
        content = `<b>Extra 20% off Sale!*</b> Use code <span class="${ID}-voucher">EXTRA20</span> at basket. <span class="${ID}-small"> Offer ends 1st November - T&Cs Apply</span>`;
      }
      return content;
    }

    const createBanner = () => {
      const banner = document.createElement('div');
      banner.classList.add(`${ID}-saveBanner`);
      banner.innerHTML = `<p>${getContent()}</p>`;

      document.querySelector('#js-header').appendChild(banner);
    }

    createBanner();
    
  }
};
