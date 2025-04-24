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

    if(getSiteFromHostname() == 'hsamuel') {
      
      const personlisedForm = document.querySelector('form[action="//www.hsamuelpersonalisedgifts.co.uk/personalisationMicrosite/editItem"]');
      if(personlisedForm) {
        const allProducts = document.querySelectorAll('.product-summary');
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          if(element.querySelector('.gift-message')) {
            element.style.display = 'none';
          }
        }
      }

    }
  }
};
