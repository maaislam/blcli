/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  const OOSMessage = () => {

    const shippingDate = document.querySelector('.preorder-msg').textContent.match(/\d{2}(\/)\d{2}(\/)\d{4}/)[0];

    const oosBlock = document.createElement('div');
    oosBlock.classList.add(`${ID}-oosMessage`);
    oosBlock.innerHTML = `
    <p>We're sorry, due to high demand this velvetiser is temporarily out of stock. 
    However, more are on their way and you can pre-order now to ensure that yours is reserved and ready to send from <span>${shippingDate}</span></p>`;

    document.querySelector('.availability-block').insertAdjacentElement('beforebegin', oosBlock);

    // change CTA text
    document.querySelector('#add-to-cart').textContent = 'Pre-order now';
  }

  const colourBlock = () => {
    const coloursBlock = document.createElement('div');
    coloursBlock.classList.add(`${ID}-colourBlock`);
    coloursBlock.innerHTML = `
    <h3>Choose your colour:</h3>
    <div class="${ID}-colours">
      <div class="${ID}-colour ${ID}-charcoal" prodID="472727"><a href="https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-maker.html"></a></div>
      <div class="${ID}-colour ${ID}-copper" prodID="472726"><a href="https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-machine.html"></a></div>
      <div class="${ID}-colour ${ID}-white" prodID="472725"><a href="https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-pack.html"></a></div>
    </div>`;

    document.querySelector('.availability-block').insertAdjacentElement('afterend', coloursBlock);

    const currentProdID = document.querySelector('#pid').value;
    if(currentProdID) {
      document.querySelector(`.${ID}-colour[prodID="${currentProdID}"]`).classList.add(`${ID}-active`);
    }
  }

  const colourevents = () => {
    const white = document.querySelector(`.${ID}-colour.${ID}-white`);
    const copper = document.querySelector(`.${ID}-colour.${ID}-copper `);
    const charcoal = document.querySelector(`.${ID}-colour.${ID}-charcoal`);

    white.addEventListener('click', () => {
      events.send(`${ID} variation:${VARIATION}`, 'Click', 'Colour: White');
    });
    copper.addEventListener('click', () => {
      events.send(`${ID} variation:${VARIATION}`, 'Click', 'Colour: Copper');
    });
    charcoal.addEventListener('click', () => {
      events.send(`${ID} variation:${VARIATION}`, 'Click', 'Colour: Charcoal');
    });
  }

  OOSMessage();
  colourBlock();
  colourevents();
};
