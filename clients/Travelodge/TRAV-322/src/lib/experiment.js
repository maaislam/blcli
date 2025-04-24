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
//CRM
import CRM from './components/crm';
import crmHandler from './handlers/crmHandler';
//WIFI
import wifi from './components/wifi';
import wifiHandler from './handlers/wifiHandler';
//SHARE
import share from './components/share';
import { shareInput, shareFunctionality } from './handlers/shareHandler';
//booking shortcut
import bookingShortcut from './components/bookingShortcut';
import bookingShortcutHandler from './handlers/bookingShortcutHandler';
// homepage booking shortcut
import homeBookingShortcut from './components/homeBookingShortcut';
import homeBookingHandler from './handlers/homeBookingHandler';
import shortcutTracking from './helpers/shortcutTracking';
import fetchBookingDetails from './helpers/fetchBookingDetails';
import { getCookie } from './helpers/utils';

const { ID, VARIATION } = shared;

const startExperiment = () => {
  // Add your experiment code here
  //testing on homepage
  pollerLite(['.main .espot-container'], () => {
    console.log('espot-container found');

    // const crmHtml = CRM(ID);
    const target = document.querySelector('.main .espot-container');
    // target.insertAdjacentHTML('beforebegin', crmHtml);
    // crmHandler(ID);

    // const shareHtml = share(ID);
    // target.insertAdjacentHTML('beforebegin', shareHtml);
    // shareFunctionality(ID);
    // shareInput(ID);

    // const wifiHtml = wifi(ID);
    // target.insertAdjacentHTML('beforebegin', wifiHtml);

    // const bookingShortcutHtml = bookingShortcut(ID);
    // target.insertAdjacentHTML('beforebegin', bookingShortcutHtml);
    // bookingShortcutHandler(ID);

    const bookingShortcutOn = localStorage.getItem(`${ID}-bookingObjOn`);
    const bookingObj = JSON.parse(localStorage.getItem(`${ID}-bookingObj`));
    const token = localStorage.getItem('MANAGE_BOOKING_TOKEN') || localStorage.getItem('token');

    if (!bookingObj) return;

    const isLogged = getCookie('TLUSERAUTHTOKEN');
    const headers = isLogged
      ? {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
      : {
        'Content-Type': 'application/json',
        authorization: '',
      };

    const confirmationNumber = bookingObj.rooms[0].confirmationNumber;
    const { surname } = bookingObj;

    //check if booking confirmation number exists and add the booking shortcut to homepage.
    // fetchBookingDetails(confirmationNumber, surname, headers, isLogged)
    fetchBookingDetails(confirmationNumber, surname, headers, isLogged)
      .then((data) => {
        const apiConfirmationNumber = data.confirmationNumber;

        if (apiConfirmationNumber === confirmationNumber && bookingShortcutOn) {
          fetch(`/api/v3/manage/booking/leisure/${apiConfirmationNumber}/amend`, {
            "headers": {
              "accept": "application/json",
              "authorization": "",
              "tlmanagebookingtoken": data.authToken
            },
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
          })
            .then((res) => {
              return res.json();
            }).then((data) => {
              if (data?.booking?.bookingStatusType !== 'cancel') {
                const hotelId = data?.hotel?.id;
                const homeBookingShortcutHtml = homeBookingShortcut(ID, bookingObj, hotelId, apiConfirmationNumber);
                target.insertAdjacentHTML('beforebegin', homeBookingShortcutHtml);
                homeBookingHandler(ID);
              }
            })
        }
      })
      .catch((error) => {
        console.log('An error occurred while processing booking details:', error);
      });

  });

  //testing on booking page
  pollerLite(['#main .bookingDetails .eachStay .rowRoom .dlTotals', () => typeof window.globalDataLayer === 'object'], () => {
    console.log('booking page found');

    const bookingShortcutHtml = bookingShortcut(ID);
    const target = document.querySelector('.main .chForm .no-print');
    target.insertAdjacentHTML('afterend', bookingShortcutHtml);
    bookingShortcutHandler(ID);
    shortcutTracking(ID);

    const crmHtml = CRM(ID);
    // const target = document.querySelector('.main .chForm .no-print');
    target.insertAdjacentHTML('afterend', crmHtml);
    crmHandler(ID);

    const wifiCost = parseInt(window.globalDataLayer["wifi"]);
    const hasWifi = wifiCost > 0 ? true : false;

    if (!hasWifi) {
      const wifiHtml = wifi(ID);
      target.insertAdjacentHTML('afterend', wifiHtml);
      wifiHandler(ID);
    }

    const bookerFirstName = window.globalDataLayer["bookerFirstName"];
    const stayerFirstName = window.globalDataLayer["firstName"];

    if (bookerFirstName !== stayerFirstName) {
      const shareHtml = share(ID);
      target.insertAdjacentHTML('afterend', shareHtml);
      shareFunctionality(ID);
      shareInput(ID);
    }

  });
};

const findBookingPageWifi = () => {
  pollerLite(['.main .manage-bookings-main-container .manage-bookings-form-container'], () => {
    const currentUrl = window.location.href;
    const queryParams = new URLSearchParams(currentUrl);

    if (queryParams.get('journey') === 'wifi') {
      console.log('wifi journey found');

      const overlayHtml = `
          <div class="${ID}-wifi-overlay">
            <div class="${ID}-wifi-overlay-content">
              Loading...
            </div>
          </div>
          `;
      document.body.insertAdjacentHTML('beforeend', overlayHtml);

      const submit = document.querySelector('.main .manage-bookings-main-container .manage-bookings-form-container .manage-booking-find-btn');
      submit.click();
    }
  })
}

const loadWifiOnBookingPage = () => {
  const stayLength = localStorage.getItem(`${ID}-wifi`);
  if (!stayLength) return;
  const overlayHtml = `
    <div class="${ID}-wifi-overlay">
      <div class="${ID}-wifi-overlay-content">
        Loading...
      </div>
    </div>
    `;
  document.body.insertAdjacentHTML('beforeend', overlayHtml);

  pollerLite(['.main .leisure-amend-booking-view-container .leisure-banners-content .leisure-add-cart-sec input#wifi'], () => {
    // Dispatch 'input' event
    // const inputEvent = new Event('input', { bubbles: true });
    // const changeEvent = new Event('change', { bubbles: true });
    // const mouseDownEvent = new Event('mousedown', { bubbles: true });
    localStorage.removeItem(`${ID}-wifi`);
    // console.log(stayLength);

    const clickEvent = new Event('click', { bubbles: true });
    const addWifi = document.querySelector('.main .leisure-amend-booking-view-container .leisure-banners-content .leisure-add-cart-sec input#wifi').closest('.leisure-banners-content');
    addWifi.click();
    // console.log(addWifi);

    pollerLite(['.hotel-product-popup .hotel-product-content input#choose-product'], () => {
      // console.log('polling mbl 1');
      const wifiDurations = document.querySelectorAll('.hotel-product-popup .hotel-product-content span.label-text span');
      let wifiDuration;
      if (stayLength === '1 week' || stayLength === '2 weeks' || stayLength === '1 month') {
        wifiDuration = Array.from(wifiDurations).find((duration) => duration.textContent.split(" ")[0] + ' ' + duration.textContent.split(" ")[1] === stayLength);
      } else {
        wifiDuration = Array.from(wifiDurations).find((duration) => duration.textContent.split(" ")[0] === stayLength);
      }
      wifiDuration.dispatchEvent(clickEvent);
      wifiDuration.click();

      const submit = document.querySelector('.hotel-product-popup .change-product-type-cancel_btn button[type="submit"]');
      submit.dispatchEvent(clickEvent);
      submit.click();

      //desktop
      pollerLite(['.leisure--booking-summary-sec .leisure-amend-payment-btn button[type="submit"]'], () => {
        // console.log('polling mbl 2');
        setTimeout(() => {
          const confirm = document.querySelector('.leisure--booking-summary-sec .leisure-amend-payment-btn button[type="submit"]');
          // confirm.click();
          confirm.dispatchEvent(clickEvent);

          //Hide usual parts of booking page to create cleaner view of wifi added
          document.querySelector('.main .leisure-amend-booking-view-container .leisure-view-btn').classList.add(`${ID}-display-none`);
          document.querySelector('.main .leisure-amend-booking-view-container .leisure-banners-container').classList.add(`${ID}-display-none`);
          document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure-booked-info-sec').classList.add(`${ID}-display-none`);
          document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure--booking-summary-sec').classList.add(`${ID}-centre`);

          const overlay = document.querySelector(`.${ID}-wifi-overlay`);
          overlay.remove();
        }, 2000);

      });

      //mobile
      pollerLite(['.leisure-booking-summary-sec .leisure-amend-payment-btn .leisure-amend-pay-apply'], () => {
        // console.log('polling mbl 2');
        setTimeout(() => {
          const confirm = document.querySelector('.leisure-booking-summary-sec .leisure-amend-payment-btn .leisure-amend-pay-apply');
          // confirm.click();
          confirm.dispatchEvent(clickEvent);

          //Hide usual parts of booking page to create cleaner view of wifi added
          document.querySelector('.main .leisure-amend-booking-view-container .leisure-view-btn-xs').classList.add(`${ID}-display-none`);
          document.querySelector('.main .leisure-amend-booking-view-container .leisure-hide-sec').classList.add(`${ID}-display-none`);
          document.querySelector('.main .leisure-amend-booking-view-container .leisure-banners-container').classList.add(`${ID}-display-none`);
          const mblSection = document.querySelectorAll('.main .leisure-amend-booking-view-container .leisure-amend-extras-container .leisure-checkin-sec');
          mblSection.forEach((section) => {
            section.classList.add(`${ID}-display-none`);
          });
          // document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure-booked-info-sec').classList.add(`${ID}-display-none`);
          document.querySelector('.main .leisure-amend-booking-view-container .leisure-amend-extras-container .leisure-booking-summary-sec').classList.add(`${ID}-centre`);

          const overlay = document.querySelector(`.${ID}-wifi-overlay`);
          overlay.remove();
        }, 2000);

      });
    })
  });
}

const findBookingPageShare = () => {
  pollerLite(['.main .manage-bookings-main-container .manage-bookings-form-container'], () => {
    const currentUrl = window.location.href;
    const queryParams = new URLSearchParams(currentUrl);

    if (queryParams.get("journey") === 'share') {
      const bookingObj = JSON.parse(localStorage.getItem(`${ID}-bookingObj`));

      if (!bookingObj) return;

      const overlayHtml = `
        <div class="${ID}-wifi-overlay">
          <div class="${ID}-wifi-overlay-content">
            Loading...
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', overlayHtml);

      const submit = document.querySelector('.main .manage-bookings-main-container .manage-bookings-form-container .manage-booking-find-btn');
      submit.click();
    }
  })
}

export default () => {

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}-home-booking-shortcut-header-close`)) {
      // localStorage.removeItem(`${ID}-bookingObjOn`);
      const homeBookingShortcut = document.querySelector(`.${ID}-home-booking-shortcut`);
      homeBookingShortcut.remove();
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
  findBookingPageWifi();
  findBookingPageShare();
  loadWifiOnBookingPage();
};
