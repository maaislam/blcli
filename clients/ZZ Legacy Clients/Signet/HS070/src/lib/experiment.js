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

  const { ID } = shared;

  if(shared.VARIATION === '1') {
    const banner = document.createElement('div');
    banner.classList.add(`${ID}-appeal_banner`);
    banner.innerHTML = `
    <div class="${ID}-banner_inner">
      <div class="${ID}-logo"></div>
      <span class="${ID}-bannerText">
        H Samuel support The Sun's who cares wins appeal and have made a donation.
      </span>
    </div>`;

    document.querySelector('#js-header').insertAdjacentElement('afterend', banner);
  }

};
