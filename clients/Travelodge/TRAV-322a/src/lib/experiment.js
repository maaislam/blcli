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

//booking shortcut
import bookingShortcut from './components/bookingShortcut';
import bookingShortcutHandler from './handlers/bookingShortcutHandler';
// homepage booking shortcut
import homeBookingShortcut from './components/homeBookingShortcut';
import homeBookingHandler from './handlers/homeBookingHandler';
import shortcutTracking from './helpers/shortcutTracking';
import shortcutTrackingAmend from './helpers/shortcutTrackingAmend';


const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // Add your experiment code here
  //testing on homepage
  pollerLite(['.main .espot-container'], () => {
    console.log('espot-container found');

    const target = document.querySelector('.main .espot-container');
    const blRecs = document.querySelector(`.TRAV297-recently-viewed`);


    const bookingShortcutOn = localStorage.getItem(`${ID}-bookingObjOn`);
    const bookingObjArray = JSON.parse(localStorage.getItem(`${ID}-bookingObj`));

    if(bookingShortcutOn) {
      if(blRecs) {
        bookingObjArray.forEach((bookingObj, index) => {
          const homeBookingShortcutHtml = homeBookingShortcut(ID, bookingObj, index);
          blRecs.insertAdjacentHTML('beforebegin', homeBookingShortcutHtml);
          homeBookingHandler(ID, index);
        });
        // blRecs.insertAdjacentElement('beforebegin', homeBookingShortcutHtml);
      } else {
        bookingObjArray.forEach((bookingObj, index) => {
          const homeBookingShortcutHtml = homeBookingShortcut(ID, bookingObj, index);
          target.insertAdjacentHTML('beforebegin', homeBookingShortcutHtml);
          homeBookingHandler(ID, index);
        });
        // target.insertAdjacentHTML('beforebegin', homeBookingShortcutHtml);
      }

      
      // homeBookingHandler(ID);
    }
  });

  //testing on confirmation page
  pollerLite(['#main .bookingDetails .eachStay .rowRoom .dlTotals', () => typeof window.globalDataLayer === 'object'], () => {
    console.log('booking page found');
    const target = document.querySelector('.main .chForm .no-print');

    const bookingShortcutHtml = bookingShortcut(ID);
    target.insertAdjacentHTML('afterend', bookingShortcutHtml);
    bookingShortcutHandler(ID);
    shortcutTracking(ID);

  });

  //test on amend booking page
  pollerLite(['.main .leisure-amend-booking-view-container .leisure-banners-container', () => typeof window.globalDataLayer === 'object'], () => {
    console.log('amend booking page found');
    const target = document.querySelector('.main .leisure-amend-booking-view-container .leisure-banners-container');

    const bookingShortcutHtml = bookingShortcut(ID);
    target.insertAdjacentHTML('afterend', bookingShortcutHtml);
    const bookingShortcutElement = document.querySelector(`.${ID}-adding-shortcut-module`);
    bookingShortcutElement.classList.add(`${ID}-amend-booking-shortcut`);

    bookingShortcutHandler(ID);
    shortcutTrackingAmend(ID);
  });


};

const startExperimentFindBooking = () => {
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


    const bookingShortcutOn = localStorage.getItem(`${ID}-bookingObjOn`);
    const bookingObjArray = JSON.parse(localStorage.getItem(`${ID}-bookingObj`));

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

      console.log('bookingShortcutOn', bookingShortcutOn);
      const manageBookingMain = document.querySelector('.main .manage-bookings-main-container');
      console.log('manageBookingMain', manageBookingMain);

      manageBookingMain.classList.add(`${ID}-manage-bookings-height`);

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

      const allBookingShortcuts = document.querySelectorAll(`.${ID}-home-booking-shortcut`);
      allBookingShortcuts.forEach(bookingShortcut => {
        bookingShortcut.style.maxWidth = '935px';
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
  startExperimentFindBooking();
};
