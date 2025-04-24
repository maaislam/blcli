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
 
  const addBanner = () => {
    const advantageCardBanner = document.createElement('div');
    advantageCardBanner.classList.add(`${ID}-advBanner`);
    advantageCardBanner.innerHTML = `
    <div class="${ID}-innerText">
      <h4>It looks like you don’t have a <a target="_blank" href="https://www.boots.com/advantage-card">Boots Advantage Card</a> linked to your account.</h4>
      <div class="${ID}-buttons">
        <a class="${ID}-button" href="https://www.boots.com/webapp/wcs/stores/servlet/AddMyAdvCardView?storeId=11352">Add my card</a>
        <a class="${ID}-button ${ID}-secondary" href="https://www.boots.com/AdvantageCardApply?catalogId=28501&langId=-1&storeId=11352&krypto=0wp%2B4NX0fuEr5yAnU2OOofuJqq5YJHVhBtzMgm7gqerXoDZb%2BegZXF25ikP%2F%2FNWbUtmCBbHVoPlMlnjlZqFBYg%3D%3D?cm_sp=Advantage-Card-Sign-Up">Register</a>
      </div>
    </div>`;

    if(document.querySelector('.cu-ribbon')) {
      document.querySelector('.cu-ribbon').insertAdjacentElement('afterend', advantageCardBanner);
    } else if(!document.querySelector('.cu-ribbon')){
      document.querySelector('#page #contentWrapper').insertAdjacentElement('beforebegin', advantageCardBanner);
    }
  }

  addBanner();
};
