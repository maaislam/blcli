/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getSiteFromHostname, setup } from './services';
import shared from './shared';


export default () => {
  
  setup();

  const { ID } = shared;

  const banner = document.createElement('div');
  banner.classList.add(`${ID}-noticeBanner`);

    banner.innerHTML = `
      <h4><span>This watch is included in our watches price match offer – click <a href="https://www.hsamuel.co.uk/webstore/price-promise/">here</a> for more details</span></h4>`;

  if(!document.querySelector('.SG110-bannerwrap')) {
    document.querySelector('.header').insertAdjacentElement('beforeend', banner);
  }

};
