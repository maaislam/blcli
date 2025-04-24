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

  let backgroundColour = '#d5e6f7';
  let icon = 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CDDC77916CF1A05582D8B97E3536ED4E42E10E85369007781B15BFBED32E8249.png?meta=/BO051---Basket-and-Checkout-Message---Template/noun_Information_3344405.png';
  let wording = '<p>A message to the Boots.com online customers could go in here..</p>';


  const { ID } = shared;

  const createBanner = () => {
    const banner = document.createElement('div');
    banner.classList.add(`${ID}-topBanner`);
    banner.style = `background-color: ${backgroundColour}`;
    if(icon !== '') {
      banner.classList.add(`${ID}-hasIcon`);
    } else {
      banner.classList.remove(`${ID}-hasIcon`);
    }

    banner.innerHTML = `
    <div class="${ID}-container">
      ${icon !== '' ? `<div class="${ID}-icon" style="background-image: url(${icon})"></div>` : ''}
      ${wording}
    </div>`;

    if(window.innerWidth > 767) {
      document.querySelector('#header').insertAdjacentElement('afterend', banner);
    } else {
      document.querySelector('#estore_header_top_row').insertAdjacentElement('afterend', banner);
    }
  }

  createBanner();
};
