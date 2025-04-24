/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { deleteCookie, logMessage, pollerLite } from '../../../../../lib/utils';

//WIFI
import wifi from './components/wifi';
import wifiHandler from './handlers/wifiHandler';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const manageBookingUrl = '/manage-bookings';

const startExperiment = () => {
  // Add your experiment code here

  //testing on booking page
  pollerLite(['#main .bookingDetails .eachStay .rowRoom .dlTotals', () => typeof window.globalDataLayer === 'object'], () => {
    console.log('booking page found');

    const target = document.querySelector('.main .chForm .no-print');

    const wifiCost = parseInt(window.globalDataLayer["wifi"]);
    const hasWifi = wifiCost > 0 ? true : false;

    if(!hasWifi) {
      const wifiHtml = wifi(ID);
      target.insertAdjacentHTML('afterend', wifiHtml);
      wifiHandler(ID);
    }

  });
};

const findBookingPageWifi = () => {
  console.log('findBookingPageWifi called');
  pollerLite(['.main .manage-bookings-main-container .manage-bookings-form-container'], () => {
      const currentUrl = window.location.href;
      const queryParams = new URLSearchParams(currentUrl);

      if(queryParams.get('journey') === 'wifi') {
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
  console.log('loadWifiOnBookingPage called');
  const stayLength = localStorage.getItem(`${ID}-wifi`);
  console.log('stayLength: ', stayLength);
  localStorage.removeItem(`${ID}-wifi`);
  deleteCookie(`${ID}-wifi`);

  if(!stayLength) return;
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
    const inputEvent = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });
    const mouseDownEvent = new Event('mousedown', { bubbles: true });
    console.log(stayLength);

    const clickEvent = new Event('click', { bubbles: true });
    const addWifi = document.querySelector('.main .leisure-amend-booking-view-container .leisure-banners-content .leisure-add-cart-sec input#wifi').closest('.leisure-banners-content');
    addWifi.click();
    // console.log(addWifi);
    console.log('wifi clicked');

      pollerLite(['.hotel-product-popup .hotel-product-content input#choose-product'], () => {
        // console.log('polling mbl 1');
        const wifiDurations = document.querySelectorAll('.hotel-product-popup .hotel-product-content span.label-text span');
        let wifiDuration;
        if(stayLength === '1 week' || stayLength === '2 weeks' || stayLength === '1 month') {
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
          console.log('polling desktop 2');
          setTimeout(() => {
            const confirm = document.querySelector('.leisure--booking-summary-sec .leisure-amend-payment-btn button[type="submit"]');
            // confirm.click();
            confirm.dispatchEvent(clickEvent);
            console.log('confirm clicked');

            //Hide usual parts of booking page to create cleaner view of wifi added
            pollerLite(['.main .leisure-amend-booking-view-container .leisure-view-btn'], () => {
              console.log('polling desktop 3');
              document.querySelector('.main .leisure-amend-booking-view-container .leisure-view-btn')?.classList.add(`${ID}-display-none`);
              document.querySelector('.main .leisure-amend-booking-view-container .leisure-banners-container')?.classList.add(`${ID}-display-none`);
              document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure-booked-info-sec')?.classList.add(`${ID}-display-none`);
              document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure--booking-summary .leisure--booking-summary-title')?.classList.add(`${ID}-display-none`);
              document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure--booking-summary .leisure-summary-line')?.classList.add(`${ID}-display-none`);
              const totalDivs = document.querySelectorAll('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure--booking-summary .leisure-booking-total');
              totalDivs.forEach((div) => {
                div.classList.add(`${ID}-display-none`);
              });

              document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure--booking-summary .leisure-booked-date-content')?.classList.add(`${ID}-display-none`);
              document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure--booking-summary .leisure-booking-summary--total')?.classList.add(`${ID}-display-none`);
              document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure--booking-summary .changed-items-list')?.classList.add(`${ID}-display-none`);

              document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure--booking-summary-sec').classList.add(`${ID}-centre`);

              //same for booking shortcut
              document.querySelector(`.main  .TRAV-322a-adding-shortcut-module`)?.classList.add(`${ID}-display-none`);

          
              const overlay = document.querySelector(`.${ID}-wifi-overlay`);
              overlay.remove();
            });

          }, 2000);

          });

        //mobile
        pollerLite(['.leisure-booking-summary-sec .leisure-amend-payment-btn .leisure-amend-pay-apply'], () => {
          console.log('polling mbl 2');
          setTimeout(() => {
            const confirm = document.querySelector('.leisure-booking-summary-sec .leisure-amend-payment-btn .leisure-amend-pay-apply');
            // confirm.click();
            confirm.dispatchEvent(clickEvent);

            //Hide usual parts of booking page to create cleaner view of wifi added
            document.querySelector('.main .leisure-amend-booking-view-container .leisure-view-btn-xs')?.classList.add(`${ID}-display-none`);
            document.querySelector('.main .leisure-amend-booking-view-container .leisure-hide-sec')?.classList.add(`${ID}-display-none`);
            document.querySelector('.main .leisure-amend-booking-view-container .leisure-banners-container')?.classList.add(`${ID}-display-none`);
            const mblSection = document.querySelectorAll('.main .leisure-amend-booking-view-container .leisure-amend-extras-container .leisure-checkin-sec');
            mblSection.forEach((section) => {
              section.classList.add(`${ID}-display-none`);
            });
            // document.querySelector('.main .leisure-amend-booking-view-container .leisure-booking-view-container .leisure-booked-info-sec').classList.add(`${ID}-display-none`);
            //same for booking shortcut
            document.querySelector(`.main  .TRAV-322a-adding-shortcut-module`)?.classList.add(`${ID}-display-none`);

            document.querySelector('.main .leisure-amend-booking-view-container .leisure-amend-extras-container .leisure-booking-summary-sec')?.classList.add(`${ID}-centre`);
            document.querySelector('.main .leisure-amend-booking-view-container .leisure-amend-extras-container .leisure-booking-summary-sec .leisure-summary-line')?.classList.add(`${ID}-display-none`);
            document.querySelector('.main .leisure-amend-booking-view-container .leisure-amend-extras-container .leisure-booking-summary-sec .leisure-booked-date-content')?.classList.add(`${ID}-display-none`);
            const totalDivs = document.querySelectorAll('.main .leisure-amend-booking-view-container .leisure-amend-extras-container .leisure-booking-summary-sec .leisure-booking-total');
            totalDivs.forEach((div) => {
              div.classList.add(`${ID}-display-none`);
            });
            document.querySelector('.main .leisure-amend-booking-view-container .leisure-amend-extras-container .leisure-booking-summary-sec .changed-items-list')?.classList.add(`${ID}-display-none`);
            
            const overlay = document.querySelector(`.${ID}-wifi-overlay`);
            overlay.remove();
          }, 2000);

          });
      })
  });
}


export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if(target.closest('.leisure-payment-cancel-btn')) {
      pollerLite(['.main .leisure-amend-pay-cancel'], () => {
        const wifiCancelBtn = document.querySelector('.leisure-amend-pay-cancel');
        wifiCancelBtn.click();

        window.location.href = manageBookingUrl;
      });
    }
  });

  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  /* comment out findBookingPageWifi() and loadWifiOnBookingPage() to test on confirmation page */
  startExperiment();
  findBookingPageWifi();
  loadWifiOnBookingPage();
};
