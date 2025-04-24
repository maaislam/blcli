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

    const createBanner = () => {
      const banner = document.createElement('div');
      banner.classList.add(`${ID}-bannerMessage`);
      banner.innerHTML = ` 
      <div class="${ID}-container">
        <a href="/webstore/secure/storeLocator.sdo"></a>
        <h4>COVID19 Update</h4>
        <p>Our stores are temporarily closed but you can still shop online with <b>free delivery</b> on all orders over £40.</p>
        <p>Some stores will remain open for Click and Collect services only.</p>
        <a class="${ID}__bannerLink" href="/webstore/secure/storeLocator.sdo">Learn More</a>
      </div>`

      if (document.querySelector('.countdown-timer')){
      document.querySelector('.countdown-timer').insertAdjacentElement('afterend', banner);
      }
      else if (document.querySelector('.delivery-banner')){
      document.querySelector('.delivery-banner').insertAdjacentElement('afterend', banner);
      }
    }

    createBanner();
    
  }
};
