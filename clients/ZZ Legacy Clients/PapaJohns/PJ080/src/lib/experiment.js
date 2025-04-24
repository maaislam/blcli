/**
 * PJ080 - Forgotten password prompt
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, forgottenPwdEvent } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${shared.ID} is running`);


  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbProceedMobile"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbReturnToSignInMobile") {
        if (shared.VARIATION === '1') {
          // console.log('[028] Checkout Lightbox is open ============');
          pollerLite(['#ctl00__objHeader_lbForgottenPassMobile'], () => {
            forgottenPwdEvent();
          });
        }
      /**
       * @desc Error Message Appears
       */
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbSignInMobile") {
        const errorEl = document.querySelector('#ctl00__objHeader_pLoginErrorMobile');
        if (errorEl 
          && errorEl.innerText.trim() === "The email address / password you entered were not found") {
          if (shared.VARIATION === '1') {
            const signInCheckoutContainer = document.querySelector(`.buttonsContainer.mobileSigninRegPopup`);

            const signInCheckoutEl = signInCheckoutContainer.querySelector(`#ctl00__objHeader_lbSignInMobile.actionButton.signInFancyButton`);

            const signInGuestEl = `<div class="buttonsContainer mobileSigninRegPopup ${shared.ID}-greenBtn">
              <a href="checkout-mobile.aspx" class="backButton signInFancyButton" style="width: unset">Continue as Guest</a>
            </div>`;
            setTimeout(() => {
              // console.log('MOVE ELEMENTS'); 

              errorEl.insertAdjacentHTML('afterend', signInGuestEl);
              signInCheckoutEl.classList.add(`${shared.ID}-greyBtn`);

              events.send(shared.ID, `${shared.ID} - Error Code Shown`, `The email address / password you entered were not found`, { sendOnce: true }); 
            }, 2000);
              
            pollerLite(['#ctl00__objHeader_lbForgottenPassMobile'], () => {
              forgottenPwdEvent();
            });
          } else if (shared.VARIATION === 'control') {
            // ***  CONTROL ***
            setTimeout(() => {
              events.send(shared.ID, `${shared.ID} - Error Code Shown`, `The email address / password you entered were not found`, { sendOnce: true }); 
            }, 2000);
          }
            
        /**
         * @desc Forgotten Password
         */
        } else {
          // pollerLite(['#ctl00__objHeader_pLoginErrorMobile'], () => {
          //   alert(`[02] ELSE -  ${errorEl.innerText}`);
          // });
          if (shared.VARIATION === '1') {
            pollerLite(['#ctl00__objHeader_lbForgottenPassMobile'], () => {
              forgottenPwdEvent();
            });
          }
        }

      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbForgottenPassMobile") {
        if (shared.VARIATION === '1') {
          const continueAsGuestCta = document.querySelector('#ctl00__objHeader_divContinueAsGuest.sign-in-inputs.guestcheckout .buttonsContainer.mobileSigninRegPopup');
          continueAsGuestCta.classList.add(`${shared.ID}-greenBtn`);
          
          pollerLite(['#ctl00__objHeader_lbForgottenPassMobile'], () => {
            forgottenPwdEvent();
          });
        }
      }
    } catch (e) {} 
  });
};

export default activate;