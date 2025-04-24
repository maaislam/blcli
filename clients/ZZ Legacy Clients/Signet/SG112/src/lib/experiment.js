/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    // remove from footer
    const allFooterLinks = document.querySelectorAll('.footer__link');
    if(allFooterLinks) {
      for (let index = 0; index < allFooterLinks.length; index += 1) {
        const element = allFooterLinks[index];
        if(element.textContent.trim() === 'Clearpay') {
          element.style.display = 'none';
        }
      }
    }

    // if it's in usp
    const usps = document.querySelectorAll('.delivery-banner__container .delivery-banner__message');
    if(usps) {
      for (let index = 0; index < usps.length; index += 1) {
        const element = usps[index];
        if(element.querySelector('.delivery-banner__title').textContent.trim() === 'CLEARPAY') {
          element.remove();
        }
      }
    }

    // remove on basket and checkout
    pollerLite(['.paysum__paysumrow'], () => {
      const payMessage = document.querySelectorAll('.paysum__table tr');
      if(payMessage) {
        for (let index = 0; index < payMessage.length; index += 1) {
          const element = payMessage[index];
          if(element.querySelector('.clearpay-icon')) {
            element.style.display = 'none';
          }
        }
      }

      const payButtons = document.querySelectorAll('.c-option-template .paypal-button');
      if(payButtons) {
        for (let index = 0; index < payButtons.length; index += 1) {
          const element = payButtons[index];
          if(element.querySelector('.clearpay-img')) {
            element.style.display = 'none';
          }
        }
      }

      const payLogos = document.querySelectorAll('.container__finance-display-section .c-card-list li svg');
      if(payLogos) {
        for (let index = 0; index < payLogos.length; index += 1) {
          const element = payLogos[index];
          if(element.querySelector('[fill="#B2FCE4"]')) {
            console.log('math')
            element.style.display = 'none';
          }
        }
      }
    });


    // on basket
    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
