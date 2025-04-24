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
    if(document.querySelector('.product-price-offer') && document.querySelector('.product-price-offer').textContent.indexOf('Silver Diamond Double Heart') > -1) {
      document.querySelector('.product-price-offer').insertAdjacentHTML('afterbegin', `<div class="${ID}-banner"><a href="https://www.hsamuel.co.uk/webstore/d/4516621/silver+diamond+double+heart+pendant/"><img src="https://service.maxymiser.net/cm/images-us/hsamuel-co-uk/F61FD7213C2028A8F2A00229C16CB5BC2F16CC3D5AC3B4F89BCED00128C910B1.jpg?meta=/SG120---Necklace-Offer-Banner/Pendant-ux.jpg"/></a></div>`);
    }

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
