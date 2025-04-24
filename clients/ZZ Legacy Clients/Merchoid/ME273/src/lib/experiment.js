/**
 * ME273 - Xmas jumper PDP messaging
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.merchoid.com/uk/jurassic-park-knitted-christmas-sweater-jumper/
 * https://www.merchoid.com/uk/star-wars-baby-yoda-christmas-sweater-jumper/
 * https://www.merchoid.com/uk/harry-potter-ten-gifts-to-gryffindor-knitted-christmas-sweater/
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${ID} is running >>>>>>`);
  const prodTitle = document.querySelector('h1.page-title').innerText.toLowerCase();
  let bannerGif = '';
  if (prodTitle.indexOf('star wars') > -1) {
    bannerGif = '//cdn.optimizely.com/img/6087172626/eb0f7b0f42f047c19ca73bf4cde747b2.gif';
  } else if (prodTitle.indexOf('harry potter') > -1) {
    bannerGif = '//cdn.optimizely.com/img/6087172626/024c807978534066b9f9085fe17599f7.gif';
  } else {
    bannerGif = '//cdn.optimizely.com/img/6087172626/bea6f131a0134ecdb417146e7fd5f56d.gif';
  }
  const uspContainer = document.querySelector('.product-usps-wrapper');
  const genderContainer = document.querySelector('.ME263-genderBlock');
  const gifContainer = `<div class="${ID}-gif__wrapper">
    <img src="${bannerGif}">
  </div>`;

  if (uspContainer) {
    uspContainer.insertAdjacentHTML('beforebegin', gifContainer);
  } else {
    document.querySelector(`#product_addtocart_form`).insertAdjacentHTML('afterend', gifContainer);
  }
  // genderContainer.insertAdjacentHTML('beforebegin', gifContainer);
};


export default activate;
