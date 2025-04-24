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


// homepage booking shortcut
import homeBookingShortcut from './components/homeBookingShortcut';
import homeBookingHandler from './handlers/homeBookingHandler';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // Add your experiment code here
  //testing on find booking page
  if(localStorage.getItem(`${ID}-find-booking-clicked`)) {
    localStorage.removeItem(`${ID}-find-booking-clicked`);

    pollerLite(['.main .manage-bookings-form-container .manage-booking-find-section button'], () => {
      document.querySelector('.main .manage-bookings-form-container .manage-booking-find-section button').click();
    });
  }

  pollerLite(['.main .manage-bookings-form-container'], () => {
    console.log('espot-container found');

    const target = document.querySelector('.main .manage-bookings-heading-title');


    const bookingShortcutOn = localStorage.getItem(`TRAV-322a-bookingObjOn`);
    const bookingObjArray = JSON.parse(localStorage.getItem(`TRAV-322a-bookingObj`));

    // if(bookingShortcutOn) {
    //   const homeBookingShortcutHtml = homeBookingShortcut(ID);

 
    //   target.insertAdjacentHTML('afterend', homeBookingShortcutHtml);
      

    //   homeBookingHandler(ID);

    //   const manageBookingLink = document.querySelector(`.${ID}-home-booking-shortcut .${ID}-home-booking-shortcut-body-right-room-buttons a`);
    //   manageBookingLink.addEventListener('click', () => {
    //     localStorage.setItem(`${ID}-find-booking-clicked`, 'true');
    //   });
    // }

    if(bookingShortcutOn) {

        bookingObjArray.forEach((bookingObj, index) => {
          const homeBookingShortcutHtml = homeBookingShortcut(ID, bookingObj, index);
          target.insertAdjacentHTML('beforebegin', homeBookingShortcutHtml);
          homeBookingHandler(ID, index);
        });

      const manageBookingLinks = document.querySelectorAll(`.${ID}-home-booking-shortcut .${ID}-home-booking-shortcut-body-right-room-buttons a`);
      manageBookingLinks.forEach(link => {
        link.addEventListener('click', () => {
          localStorage.setItem(`${ID}-find-booking-clicked`, 'true');
        });
      });
    }
  });


};

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
