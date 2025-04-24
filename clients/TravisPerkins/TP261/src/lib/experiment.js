/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { getCookie } from '../../../../../lib/utils';
import { accountNumbers } from './files/accountNumbersArray'

const { ID, VARIATION } = shared;
const isLoggedIn = () => !!getCookie('access_token');

const init = () => {

  //console.log(`${ID} is working`);

  if (isLoggedIn()) {

    let loggedInAccount;
    window.dataLayer.forEach((item) => {
      if (item.accountNo !== undefined) {
        loggedInAccount = item.accountNo;
        return;
      }
    });

    accountNumbers.forEach((accountNumber) => {
      if (accountNumber === loggedInAccount) {
        setup();
        fireEvent('Conditions Met');
        fireEvent('User is found within the list');

        document.addEventListener("click", function (event) {

          const { target } = event;
          if (target.href === "https://www.travisperkins.co.uk/content/create-account") {

            if (VARIATION == 'control') {
              fireEvent('User clicks on the £50 credit banner');
              return;
            }

            event.preventDefault();
            fireEvent('User clicks on our new updated banner');
            window.location = "https://travisperkbuilder.co.uk/account/guidance";
          }
        })

        if (VARIATION == 'control') {
          return;
        }

        setTimeout(() => {

          let desktopImage = document.querySelector(`[data-test-id="usp-block"] img[src$="/desktop_logged_in_strip_50_credit_jun23_1220x65_v1-min.jpg"]`);

          let mobileImage = document.querySelector(`[data-test-id="usp-block"] img[src$="/mobile_logged_in_strip_50_credit_jun23_375x65-min.jpg"]`);

          let uspLink = document.querySelector(`[data-test-id="usp-block"] a[href="/content/create-account"]`);

          if (desktopImage) {
            desktopImage.src = "http://sb.monetate.net/img/1/581/4875994.jpg";
          }

          if (mobileImage) {
            mobileImage.src = "http://sb.monetate.net/img/1/581/4875995.jpg";
          }

        }, 1000);

      }
    })
  }

};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {

        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 1500);
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
