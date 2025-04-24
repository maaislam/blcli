/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;



const startExperiment = () => {
  pollerLite(['#pageHeader nav .basket .basketCount'], () => {
    console.log('Experiment started');


    let intervalCounter = 0;

    const showBasketNotification = () => {
      const notificationHtml = `
        <div class="${ID}-basket-notification">
          <div class="${ID}-basket-notification-left">
            <img src="https://media.travelodge.co.uk/image/upload/Testing/logo-only.png" alt="Travelodge Logo" class="${ID}-logo">
          </div>
          <div class="${ID}-basket-notification-right">
            <p class="${ID}-message">You have an unfinished booking</p>
            <a href="/checkout" class="${ID}-link">Complete your booking</a>
          </div>
        </div>
        `;

        const basket = document.querySelector('#pageHeader nav .basket');
        basket.insertAdjacentHTML('afterend', notificationHtml);

        const linkDOM = document.querySelector(`.${ID}-link`);
        linkDOM.addEventListener('click', () => {
          fireEvent('Click - User clicks to enter checkout through notification')
        })
    }

    const callback = () => {
      const basketCount = document.querySelector('#pageHeader nav .basket .basketCount').innerText;
      // console.log('Basket count: ', basketCount);
      const basketCountInt = parseInt(basketCount);
      // console.log('Basket count: ', basketCountInt);
      if(basketCountInt > 0) {
          console.log('Basket count is greater than 0');
          clearInterval(intervalId);
          // call the function to show the basket
          showBasketNotification();
      }

      if(intervalCounter > 10) {
        clearInterval(intervalId);
      }

      intervalCounter++;
    }


    const intervalId = setInterval(callback, 200);

  });
}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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
