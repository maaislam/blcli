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

    const addBanner = () => {
      const offerBanner = document.createElement('div');
      offerBanner.classList.add(`${ID}-watchBanner`);
      offerBanner.innerHTML = `<a href="https://www.ernestjones.co.uk/terms/#WolfWinders" target="_blank"><img src="${window.innerWidth >= 767 ? 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/CD81BBC371693508E7EA7DD0DF8F63AE5FF7C51FFB8929CBBE6C398A03960BD3.jpg?meta=/SG117---Watch-offer-banner---Jan-21/EJ2103W06_GWP_assets_V2_955x314.jpg': 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/3EB40A15C5C7BA41E4AB286B025B17AA278622BF63CE95C7EA4671BD2B47A80E.jpg?meta=/SG117---Watch-offer-banner---Jan-21/EJ2103W06_GWP_assets_V2_590x290.jpg'}"/></a>`;
      
      document.querySelector('.detail-page__right-column .product-price-offer').insertAdjacentElement('beforebegin', offerBanner);
    }
    addBanner();
    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
