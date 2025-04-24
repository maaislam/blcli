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

    // hide finance

    const createNewFinanceBox = () => {
     
      const financeAvailable = document.querySelector('finance-options');
      financeAvailable.shadowRoot.querySelector('.finance-options').style = "opacity: 0; height: 0px; padding:0px;";

      const financePrice = financeAvailable.shadowRoot.querySelector('.finance-options').textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);
        
        const financeBox = document.createElement('div');
        financeBox.classList.add(`${ID}-financeBox`);
        if(VARIATION === '1') {
          financeBox.innerHTML = `
          <p><span>0% Interest Free Credit Available</span> from only <span class="${ID}-ifcPrice">${financePrice[0]}</span> per month.</p>
          <ul>
            <li><p>Minimum 10% Deposit Required</p></li>
            <li><p>Pay over 6 - 48 months</p></li>
          </ul>
          <p>To apply, simply add this item to the basket and select pay by finance.</p>
          <p class="${ID}-ifcLink">See Pricing & Learn More</p>
          `;
        } else if(VARIATION === '2') {
          financeBox.innerHTML = `
          <p><span>0% Interest Free Credit Available</span> on this product.</p>
          <p>From only <span class="${ID}-ifcPrice">${financePrice[0]}</span> per month.</p>
          <p>Add this item to the basket and select pay by finance.</p>
          <p class="${ID}-ifcLink">View Payment Options</p>`;
        }


        financeBox.querySelector(`.${ID}-ifcLink`).addEventListener('click', () => {
          document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').click();
          events.send(`${ID} variation: ${VARIATION}`, 'click', 'View finance');
        });

        financeAvailable.insertAdjacentElement('beforebegin', financeBox);
        
    }

    createNewFinanceBox();

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
