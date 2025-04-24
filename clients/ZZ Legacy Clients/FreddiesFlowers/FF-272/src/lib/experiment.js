/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
const { ID, VARIATION } = shared;

const doExpCode = () => {

  addPoller(['#delivery .background--paper-new', '#delivery .max-w-sm.mx-auto.mt-12', '#delivery .orderSummary', '#delivery .max-w-sm.mx-auto'], () => {

    let deliveryEntrySection = document.querySelector('#delivery .max-w-sm.mx-auto');
    let deliveryDetailsSection = document.querySelector('#delivery .background--paper-new');
    let deliveryNotesSection = document.querySelector('#delivery .max-w-sm.mx-auto.mt-12');
    let orderSummarySection = document.querySelector('#delivery .orderSummary');

    deliveryDetailsSection.classList.add(`${ID}-hidden`, `${ID}-delivery-details-section`);
    deliveryNotesSection.classList.add(`${ID}-hidden`, `${ID}-delivery-notes-section`);
    orderSummarySection.classList.add(`${ID}-hidden`, `${ID}-ordersumm-section`);

    // Delivery Date Button

    let deliveryDateButtonHTML = `
    
      <div class="${ID}-button-holder"><button type="button" id="${ID}-delivery-date-button" class="btn btn--green btn--full-width ${ID}-button">Next: Delivery date</button></div>
    
    `;

    deliveryEntrySection.insertAdjacentHTML('beforeend', deliveryDateButtonHTML);

    let deliveryDateButton = document.getElementById(`${ID}-delivery-date-button`);
    let timeout;
    let ddbEventListener = addEventListener(deliveryDateButton, 'click', (e) => {
      let addressEntered = document.querySelector('#delivery_address_line_1 input');
      clearTimeout(timeout);
      document.querySelector('#delivery div[address-type="shipping"] .flex.items-end').classList.remove(`${ID}-error-handler`);
      if(addressEntered && addressEntered.value.length > 0) {

        deliveryDateButton.remove();
        removeEventListener('click', ddbEventListener);
        deliveryDetailsSection.classList.remove(`${ID}-hidden`);
        fireEvent('Click - user has added an address and moved to the delivery details section');

      } else {

        document.querySelector('#delivery div[address-type="shipping"] .flex.items-end').classList.add(`${ID}-error-handler`);
        timeout = setTimeout(() => {
          document.querySelector('#delivery div[address-type="shipping"] .flex.items-end').classList.remove(`${ID}-error-handler`);
        }, 1200);

      }
    });

    // Delivery Notes button

    deliveryDetailsSection.insertAdjacentHTML('afterbegin', `<h2 class="${ID}-header">Great News</h2>`);

    let deliveryNotesButtonHTML = `
    
      <div class="${ID}-button-holder"><button type="button" id="${ID}-delivery-notes-button" class="btn btn--green btn--full-width ${ID}-button ${ID}-delivery-notes-button">Next: Delivery notes</button></div>
    
    `;

    deliveryDetailsSection.insertAdjacentHTML('beforeend', deliveryNotesButtonHTML)

    let deliveryNotesButton = document.getElementById(`${ID}-delivery-notes-button`);

    let ddnEventListener = addEventListener(deliveryNotesButton, 'click', (e) => {

      deliveryNotesButton.remove();
      removeEventListener('click', ddnEventListener);
      deliveryNotesSection.classList.remove(`${ID}-hidden`);
      orderSummarySection.classList.remove(`${ID}-hidden`);

      fireEvent('Click - user has viewed delivery details and moved to the delivery notes section');
    });

  });
  

}

const addEvents = () => {

  addPoller(['#delivery .max-w-sm.mx-auto.mt-12 button[type="submit"]'], (e) => {

    let nextStepButton = document.querySelector('#delivery .max-w-sm.mx-auto.mt-12 button[type="submit"]');
    nextStepButton.addEventListener('click', (e) => {

      fireEvent('Click - next step button clicked');

    });

  })


}

export default () => {


  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEvents();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  doExpCode();
};
