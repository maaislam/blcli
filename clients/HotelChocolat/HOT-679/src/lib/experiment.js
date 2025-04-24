/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, checkIntersection } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const stickySubmitButton = `
  <div class=${ID}-sticky-container>
    <button class=${ID}-sticky-container-button>Place Order</button>
  </div>`;
  pollerLite(['#main .submit-order #secure-acceptance-summary-submit'], () => {
    console.log('Poller found the element');

    const originalSubmitButton = document.querySelector('#main .submit-order #secure-acceptance-summary-submit');

    const target = document.querySelector('#wrapper.pt_summary');
    target.insertAdjacentHTML('beforeend', stickySubmitButton);
    fireEvent('Viewed - user sees the place order bar')

    const submitDOM = document.querySelector(`.${ID}-sticky-container-button`);
    submitDOM.addEventListener('click', () => {
      originalSubmitButton.click();
    });


  })
};

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.closest('#secure-acceptance-summary-submit')) {
      fireEvent('Click - original order button clicked')
    }

    if(e.target.closest(`.${ID}-sticky-container-button`)) {
      fireEvent('Click - user clicks on new order bar')
    }
  });

  let seenOriginalOrder = false;

  document.addEventListener("scroll", () => {
    if (!seenOriginalOrder) {
      const targetIntersectionContainer = document.querySelector("#main .submit-order #secure-acceptance-summary-submit");
      if (checkIntersection(targetIntersectionContainer, 0, true)) {
        fireEvent(`Scroll - A user sees the original order button`, true);
        seenOriginalOrder = true;
      }
    }
  });
}

export default () => {

  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';


  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  addTracking();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
