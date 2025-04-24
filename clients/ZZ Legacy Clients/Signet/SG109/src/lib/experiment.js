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

    const createInterestBanner = () => {
      const banner  = `
      <a class="${ID}-ifcbanner" href="https://www.ernestjones.co.uk/webstore/l/watches/select%7Cluxury+watches/?icid=ej-tn-watches-coll-lux">
      <div class="${ID}-container">
      <div class="${ID}-textContent"><b>5 years</b> Interest Free Credit over £999</div>
      <span class="${ID}-endDate">*offer ends Midnight Monday</span>
      </div>
      </a>`;

      document.querySelector('.home-tile-grid__text-tile').innerHTML = banner;
    }

    createInterestBanner();
  }
};
