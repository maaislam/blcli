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

    let url;
    let percentageOff;
    if(getSiteFromHostname() == 'ernestjones') {
      percentageOff = '10';
      url = 'https://www.ernestjones.co.uk/webstore/in-store-appointment.cdo';
    }

    if(getSiteFromHostname() == 'hsamuel') {
      percentageOff = '15';
      url = 'https://www.hsamuel.co.uk/webstore/content/appointment-booking/';
    }

     const createMessage = () => {
      const messageBox = document.createElement('div');
      messageBox.classList.add(`${ID}-banner`);
      messageBox.innerHTML = `
      <div class="${ID}-bannerContainer">
        <h3><span><b>${percentageOff}% off</b> when you book and attend an in-store appointment*</span></h3>
        <p>Avoid the queues and book an appointment with one of our in-store experts.</p>
        <a target="_blank" href="${url}">Book an in-store appointment</a>
      </div>`;

      document.querySelector('.delivery-banner').insertAdjacentElement('afterend', messageBox);
      document.querySelector('.SG087-bannerContainer a').addEventListener("click", function(){
        events.send('SG087 Links', 'Clicked');
      });
    }

    createMessage();
  }
};
