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

//WIFI
import wifi from './components/wifi';
import wifiHandler from './handlers/wifiHandler';
//SHARE
import {share, getTheApp} from './components/share';
import { shareInput, shareFunctionality } from './handlers/shareHandler';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // Add your experiment code here
  //testing on homepage
  // pollerLite(['.main .espot-container'], () => {
  //   console.log('espot-container found');

  //   const target = document.querySelector('.main .espot-container');

  //   //B = WIFI / C = GET THE APP
  //   //IF B & C are both true then check if wifi is true
  //   //IF wifi is true then add  special container and class to wifi and get the app containers - create 2 halves
  //   //Else add get the app container
    
  //   const wifiHtml = wifi(ID);
  //   // target.insertAdjacentHTML('beforebegin', wifiHtml);


  //   const getTheAppHtml = getTheApp(ID);
  //   // target.insertAdjacentHTML('beforebegin', getTheAppHtml);

  //   const wifiAndAppContainer = `
  //   <div class="${ID}-wifi-and-app-container">
  //     <div class="${ID}-wifi-container ${ID}-wifi-and-app-container-half">
  //       ${wifiHtml}
  //     </div>
  //     <div class="${ID}-app-container ${ID}-wifi-and-app-container-half">
  //       ${getTheAppHtml}
  //     </div>
  //   </div>`;

  //   target.insertAdjacentHTML('beforebegin', wifiAndAppContainer);
  //   document.querySelector('.main .TRAV-322c-wifi-container .TRAV-322c-wifi-logo').remove();


  //   //will need to poll for .TRAV-322b-1
  //   // const isTRAV322b = document.querySelector('.TRAV-322b-1')
  //   // if(isTRAV322b) {
  //     pollerLite(['.main .TRAV-322b-wifi-container'], () => {
  //       console.log('wifi container found');
  //       //add special container and class to wifi and get the app containers - create 2 halves
  //       const wifiContainer = document.querySelector('.main .TRAV-322b-wifi-container');
  //       const appContainer = document.querySelector('.main .TRAV-322c-app-container');

  //       const wifiAndAppContainer = `
  //       <div class="${ID}-wifi-and-app-container">
  //         <div class="${ID}-app-container">
  //           ${appContainer.innerHTML}
  //         </div>
  //         <div class="${ID}-wifi-container">
  //           ${wifiContainer.innerHTML}
  //         </div>
  //       </div>`;

  //       target.insertAdjacentHTML('beforebegin', wifiAndAppContainer);
  //       document.querySelector('.main .TRAV-322b-wifi-container').remove();
  //       document.querySelector('.main .TRAV-322c-wifi-container .TRAV-322c-wifi-logo').remove();
        
  //     });
  //   // }
  // });

  //testing on booking page
  pollerLite(['#main .bookingDetails .eachStay .rowRoom .dlTotals', () => typeof window.globalDataLayer === 'object'], () => {
    console.log('booking page found');

    //testing scenarios
    //1 - bookerFirstName !== stayerFirstName - can just add full width container and ignore wifi
    //2 - bookerFirstName === stayerFirstName - check if TRAV-322b-1 exists and if the wifi container exists
    // A) if it does then add special container and class to wifi and get the app containers - create 2 halves
    // B) if it doesn't then add get the app container full width


    const target = document.querySelector('.main .chForm .no-print');

    const bookerFirstName = window.globalDataLayer["bookerFirstName"];
    const stayerFirstName = window.globalDataLayer["firstName"];

    if(bookerFirstName !== stayerFirstName) {
      const shareHtml = share(ID);
      target.insertAdjacentHTML('afterend', shareHtml);
      shareFunctionality(ID);
      shareInput(ID);
    } else {
          const isTRAV322b = document.querySelector('.TRAV-322b-1')
          if(isTRAV322b) {
            pollerLite(['.main .TRAV-322b-wifi-container'], () => {
              console.log('wifi container found');
              //add special container and class to wifi and
              //get the app containers - create 2 halves
              const wifiContainer = document.querySelector('.main .TRAV-322b-wifi-container');
              // console.log(wifiContainer);
              const appContainer = getTheApp(ID);
              // console.log(appContainer, 'appContainer');

              const wifiAndAppContainer = `
              <div class="${ID}-wifi-and-app-container ${ID}-wifi-and-app-container-half">
                <div class="${ID}-app-container">
                  ${appContainer}
                </div>
                <div class="${ID}-wifi-container ${ID}-wifi-and-app-container-half">
                  ${wifiContainer.innerHTML}
                </div>
              </div>`;

              // console.log(wifiAndAppContainer, 'wifiAndAppContainer');

              target.insertAdjacentHTML('afterend', wifiAndAppContainer);
              const wifiAndAppDOM = document.querySelector(`${ID}-wifi-and-app-container`);
              // console.log(wifiAndAppDOM, 'wifiAndAppDOM');

              document.querySelector('.main .TRAV-322b-wifi-container').remove();
              document.querySelector('.main .TRAV-322c-wifi-container .TRAV-322b-wifi-container-left .TRAV-322b-wifi-logo').classList.remove('TRAV-322b-hide-desktop');
              document.querySelector('.main .TRAV-322c-wifi-container .TRAV-322b-wifi-container-right .TRAV-322b-wifi-logo').classList.remove('TRAV-322b-hide-mbl');
              
              document.querySelector('.main .TRAV-322c-wifi-container .TRAV-322b-wifi-container-right .TRAV-322b-wifi-logo').remove();


            });
          } else {
            const getTheAppHtml = getTheApp(ID);
            target.insertAdjacentHTML('afterend', getTheAppHtml);
            const getTheAppImage = document.querySelector('.main .TRAV-322c-app-container .TRAV-322c-app-image-container');
            const getTheAppContainer = document.querySelector('.main .TRAV-322c-app-container');
            getTheAppImage.remove();
            getTheAppContainer.style.height = 'auto';

          }
    }

  });
};


const findBookingPageShare = () => {
  pollerLite(['.main .manage-bookings-main-container .manage-bookings-form-container'], () => {
    const currentUrl = window.location.href;
    const queryParams = new URLSearchParams(currentUrl);

    if(queryParams.get("journey") === 'share') {
      console.log('share journey found');

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
  findBookingPageShare();
};
