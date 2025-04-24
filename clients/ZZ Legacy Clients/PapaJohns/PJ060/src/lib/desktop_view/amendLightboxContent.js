import { pollerLite } from '../../../../../../lib/uc-lib';
import desktopResetPwd from './postRequest';
import formData from '../formData';
import data from '../data';
import signInStep from './signInStep';
// import resetPasswordStep from './resetPasswordStep';

const amendContent = {
  init() {
    // console.log('INSIDE   AMEND LIGHTBOX CONTENT   FUNCTION -------------------------');
    // Get Total Basket Value
    const basketTotalElement = document.querySelector('#ctl00__objHeader_lbBasketItem .menuEntry');
    if (basketTotalElement) {
      data.basketValue = basketTotalElement.innerText.trim().replace('£', '');
    }

    function rebuildLightBox() {
      // console.log('RE BUILD    LIGHTBOX   !');
      // Email Validation Regex
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      pollerLite(['#ctl00_cphBody_txtEmailPopup'], () => {
        // Block Sign In button functionality on Enter
        const signInBtnControl = document.querySelector('a#ctl00_cphBody_lbSignInPopup');
        signInBtnControl.addEventListener('click', (e) => {
          e.preventDefault()
        });
        // Proceed on Enter
        document.getElementById("ctl00_cphBody_txtEmailPopup").addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("PJ060-continueToPwd").click();
            }
        });
        /**
         * @desc Sign In Step
         */
        signInStep();

        /**
         * @desc Reset Password Step
         */
        // resetPasswordStep();
        // Email Validation Regex
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        pollerLite(['#ctl00_cphBody_lbForgottenPass'], () => {
          const forgottenPwdLink = document.querySelector('#ctl00_cphBody_lbForgottenPass');
          forgottenPwdLink.insertAdjacentHTML('beforebegin', `<div id='PJ060-PwdLoginError' class='simpleErrorMsg'><span>The email address / password you entered were not found</span></div>`);
          forgottenPwdLink.addEventListener('click', () => {
            pollerLite(['#ctl00_cphBody_lbForgottenPassword', '#ctl00_cphBody__txtEmail'], () => {
              /** Forgotten Password link **/
              // console.log('this is the user email:');
              // console.log(data.userEmail);
              sessionStorage.removeItem('PJ060-data');
              const resetPasswordContainer = document.querySelector('#ctl00_cphBody_pnlForgottenPassword');
              if (resetPasswordContainer) {
                const resetEmailInput = resetPasswordContainer.querySelector('#ctl00_cphBody__txtEmail');
                if (resetEmailInput) {
                  resetEmailInput.setAttribute('value', `${data.userEmail}`);
                }
                const returnToSignInLink = resetPasswordContainer.querySelector('#ctl00_cphBody_lbReturnToSignIn');
                const resetPasswordContent = `<div id='PJ060-ResetPwdError' class='simpleErrorMsg'>
                  <span>You must enter your email address</span>
                </div>
                <div class='PJ060-reset__container'>
                  <p class='PJ060-btn PJ060-reset__btn' id='PJ060-resetPwd'>Request Reset</p>
                </div>
                <div class='PJ060-message__success hidden'>
                  <p>We will send a password reset link to <strong>${data.userEmail}</strong> so you can Log In</p>
                </div>
                <div class='PJ060-message__error hidden'>
                  <p>Something went wrong. Please try again later.</p>
                </div>
                <div class="PJ060-buttons__container">
                  <p class="PJ060-continue__signIn first-btn" id='PJ060-continueAndRegister_2'>Continue &amp; Register</p>
                  <p style="display: inline-block;">or</p>
                  <p class="PJ060-continue__signIn second-btn" id='PJ060-continueAsGuest_2'>Continue as Guest</p>
                </div>`;
                // console.log('ADD   PASSWORD   RESET   BUTTON  -------------------------');
                returnToSignInLink.insertAdjacentHTML('afterend', resetPasswordContent);

                // Click Return to Sign In
                returnToSignInLink.addEventListener('click', () => {
                  //alert('RE RUN   THE   TEST');
                  // amendLightboxContent.rebuildLightBox();
                  rebuildLightBox();
                });

                // Click Reset Password
                const resetPasswordBtn = document.querySelector('#PJ060-resetPwd');
                const invalidEmailErrorMessage = document.querySelector('#PJ060-ResetPwdError');
                resetPasswordBtn.addEventListener('click', () => {
                  const emailToReset = document.querySelector('#ctl00_cphBody__txtEmail');
                  // console.log('CLICKED    RESET    PASSWORD   !');
                  // console.log(regex.test(emailToReset.value));
                  if (!emailToReset.value || emailToReset.value === '' || !regex.test(emailToReset.value)) {
                    invalidEmailErrorMessage.classList.add('show');
                  } else if (emailToReset.value !== '' || regex.test(emailToReset.value)) {
                    // console.log(data);
                    data.userEmail = emailToReset.value;
                    
                    // Successful Reset
                    desktopResetPwd.init(formData, data, invalidEmailErrorMessage);
                    // invalidEmailErrorMessage.classList.remove('show');
                    // document.querySelector('#PJ060-resetPwd').innerHTML = 'Request Sent';
                    // document.querySelector('.PJ060-message__success').innerHTML = `<p>We will send a password reset link to <strong>${emailToReset.value}</strong> so you can Log In</p>`;
                    // document.querySelector('.PJ060-message__success').classList.remove('hidden');
                  }
                });
                /** Continue to Checkout buttons **/
                // Continue & Register button
                const continueRegisterBtn2 = document.querySelector('#PJ060-continueAndRegister_2');
                if (continueRegisterBtn2) {
                  continueRegisterBtn2.addEventListener('click', () => {
                    // alert('clicked on CONTINUE  AND   REGISTER 2---');
                    // const userEmail = document.querySelector('#ctl00_cphBody_txtEmailPopup').value;
                    
                    sessionStorage.setItem('PJ060-checkoutRegister', `${data.userEmail}`);
                    window.__doPostBack('ctl00_cphBody_lbGuest'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
                  });
                }

                // Continue as Guest button
                const continueGuestBtn2 = document.querySelector('#PJ060-continueAsGuest_2');
                if (continueGuestBtn2) {
                  continueGuestBtn2.addEventListener('click', () => {
                    // alert('clicked on CONTINUE  AS   GUEST 2---');
                    sessionStorage.setItem('PJ060-guestCheckout', true);
                    window.__doPostBack('ctl00_cphBody_lbGuest'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
                  });
                }
              }
            });
          });
        });

        // amendLightboxContent.rebuildLightBox();
        // rebuildLightBox();
      });
    }
    
    pollerLite(['.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened', '#ctl00_cphBody_pnlVcoOptionPopup', '#ctl00_cphBody_lbForgottenPass'], () => {
      // console.log('---fancybox open');
      // function rebuildLightBox() {
      //   console.log('RE BUILD    LIGHTBOX   !');
      //   // Email Validation Regex
      //   const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      //   pollerLite(['#ctl00_cphBody_txtEmailPopup'], () => {
      //     // Block Sign In button functionality on Enter
      //     const signInBtnControl = document.querySelector('a#ctl00_cphBody_lbSignInPopup');
      //     signInBtnControl.addEventListener('click', (e) => {
      //       e.preventDefault()
      //     });
      //     /**
      //      * @desc Sign In Step
      //      */
      //     signInStep();

      //     /**
      //      * @desc Reset Password Step
      //      */
      //     resetPasswordStep();
      //   });
      // }
      // Run for the first time
      rebuildLightBox();

      // Click on Proceed if the lightbox has closed
      const proceedBtn = document.querySelector('#ctl00_cphBody_lbProceed');
      if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
          console.log('CLICKED   ON    PROCEED   BUTTON');
          rebuildLightBox();
        });
      }
    });
  }
};

export default amendContent;
