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

  let priceText;
  const URL = window.location.href;

  const brandLogo = document.querySelector('.product-info-price .merchandise img');

  if(URL.indexOf('/uk/') > -1) {
    priceText = `<p class="${ID}-message">Stand out at the Christmas Party This Year With Our <b>100% Genuine</b> <span>${brandLogo.innerHTML}</span> Christmas Jumpers</p>`;
  } else {
    priceText = `<p class="${ID}-message">Be the only one this Christmas with a <b>100% Genuine</b> <span>${brandLogo.innerHTML}</span> Christmas Sweater</p>`;
  }

  const priceBox = document.querySelector('.product-info-price');
  priceBox.insertAdjacentHTML('afterbegin', priceText);

  document.querySelector(`.${ID}-message span`).appendChild(brandLogo);

   
  
};
