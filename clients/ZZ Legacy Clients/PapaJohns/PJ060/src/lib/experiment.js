/**
 * PJ060 -Return User POC - Lightbox concept test
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import desktopResetPwd from './desktop_view/postRequest';
import amendContent from './desktop_view/amendLightboxContent';
import formData from './formData';
import data from './data';

const activate = () => {
  setup();

  // Experiment code
  if (window.location.pathname.indexOf('/basket-confirmation.aspx') > -1) {
    /**
     * @desc Makes a GET request to a category URL and retrieves the venue details
     * @param {String} url URL to retrieve the venue information from
     * @param {Function} callback Function to run when the request was successful
     */
    /*eslint-disable */
    const getFormDetails = (url, callback) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const viewState = temp.querySelector('#__VIEWSTATE').value;
          const viewStateGenerator = temp.querySelector('#__VIEWSTATEGENERATOR').value;
          const eventValidation = temp.querySelector('#__EVENTVALIDATION').value;

          const formDetails = {
            'view-state': viewState,
            'view-state-generator': viewStateGenerator,
            'event-validation': eventValidation,
          };
          callback(formDetails);
        }
      };
      request.send();
    };
    // Call 
    getFormDetails(`https://www.papajohns.co.uk/`, (formDetails) => {
      formData.data = formDetails;
    });
    // -------------------------------------------
    // PRM Manager Listen for State Changes
    // -------------------------------------------
    window.prm.add_endRequest(function (sender, error) {
      try {
        // console.log('------- something has changed -------------------------');
        // console.log(sender);
        if ((sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbProceed" && !document.querySelector('#PJ060-continueToPwd')) || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbReturnToSignIn") {
          amendContent.init();

          pollerLite(['#ctl00_cphBody_pnlLoginError'], () => {
            // Fallback step - Login Error
            if (document.querySelector('#ctl00_cphBody_pnlLoginError span').innerText.trim().indexOf("The email address / password you entered were not found") > -1 || document.querySelector('#ctl00_cphBody_pnlLoginError span').innerText.trim().indexOf("You must complete the captcha") > -1) {
              document.querySelector('#captcha_container').style.display = 'block';

              const errorMessageContainer = document.querySelector('#ctl00_cphBody_pnlLoginError');
              const signInBtnContainer = `<div class="PJ060-continue__container">
                <p class="PJ060-btn PJ060-continue__btn" id="PJ060-signInErrorStep">Sign In &amp; Checkout</p>
              </div>`;
              errorMessageContainer.insertAdjacentHTML('afterend', signInBtnContainer);
              const forgottenPwdContainer = document.querySelector('#ctl00_cphBody_lbForgottenPass');
              forgottenPwdContainer.classList.add('PJ060-forgottenPwd');
              forgottenPwdContainer.classList.add('PJ060-forgottenPwd__errorStep');
              forgottenPwdContainer.classList.add('show');

              // Click Sign In
              const signInBtn = document.querySelector('#PJ060-signInErrorStep');
              if (signInBtn) {
                signInBtn.addEventListener('click', () => {
                  const captchaChecked = document.querySelector('.recaptcha-checkbox-checked');
                  if (grecaptcha && grecaptcha.getResponse().length !== 0) {
                    document.querySelector('#ctl00_cphBody_pnlLoginError span').innerHTML = "";
                    window.__doPostBack('ctl00_cphBody_lbSignInPopup'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
                  } else {
                    document.querySelector('#ctl00_cphBody_pnlLoginError span').innerHTML = "You must complete the captcha";
                    setTimeout(function(){ 
                      document.querySelector('#PJ060-CaptchaError').classList.remove('show');
                    }, 6000);
                  }
                });
              }

              // Reset Password Step
              const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
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
                        }
                      });
                      /** Continue to Checkout buttons **/
                      // Continue & Register button
                      const continueRegisterBtn2 = document.querySelector('#PJ060-continueAndRegister_2');
                      if (continueRegisterBtn2) {
                        continueRegisterBtn2.addEventListener('click', () => {
                          // alert('clicked on CONTINUE  AND   REGISTER 2---');
                          sessionStorage.setItem('PJ060-checkoutRegister', `${data.userEmail}`);
                          window.__doPostBack('ctl00_cphBody_lbGuest'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
                        });
                      }

                      // Continue as Guest button
                      const continueGuestBtn2 = document.querySelector('#PJ060-continueAsGuest_2');
                      if (continueGuestBtn2) {
                        continueGuestBtn2.addEventListener('click', () => {
                          // alert('clicked on CONTINUE  AS   GUEST 2---');
                          sessionStorage.setItem('PJ060-guestCheckout', `${data.userEmail}`);
                          window.__doPostBack('ctl00_cphBody_lbGuest'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
                        });
                      }
                    }
                  });
                });
              });
            }
          });
          pollerLite(['.PJ060-showPwd'], () => {
            // Show Password - Icon functionality
            const revealPwdIcon = document.querySelector('.PJ060-showPwd');
            if (revealPwdIcon) {
              revealPwdIcon.addEventListener('click', () => {
                showPassword(passwordField);
              });
            }
          });
        } else {
          document.querySelector('#captcha_container').style.display = 'block';
          const errorMessageContainer = document.querySelector('#ctl00_cphBody_pnlLoginError');
          if (!document.querySelector('.PJ060-continue__container')) {
            const signInBtnContainer = `<div class="PJ060-continue__container">
              <p class="PJ060-btn PJ060-continue__btn" id="PJ060-signInErrorStep">Sign In &amp; Checkout</p>
            </div>`;
            errorMessageContainer.insertAdjacentHTML('afterend', signInBtnContainer);
          }
          // Click Sign In
          const signInBtn = document.querySelector('#PJ060-signInErrorStep');
          if (signInBtn) {
            signInBtn.addEventListener('click', () => {
              const captchaChecked = document.querySelector('.recaptcha-checkbox-checked');
              if (grecaptcha && grecaptcha.getResponse().length !== 0) {
                document.querySelector('#ctl00_cphBody_pnlLoginError span').innerHTML = "";
                window.__doPostBack('ctl00_cphBody_lbSignInPopup'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
              } else {
                document.querySelector('#ctl00_cphBody_pnlLoginError span').innerHTML = "You must complete the captcha";
                setTimeout(function(){ 
                  document.querySelector('#PJ060-CaptchaError').classList.remove('show');
                }, 6000);
              }
            });
          }
        }
      } catch (e) {} 
    });
    
  } else if (window.location.pathname.indexOf('/checkout.aspx') > -1 || window.location.pathname.indexOf('/checkout-mobile.aspx') > -1) {
    pollerLite(['#ctl00_cphBody_txtGuestEmail', '#chkGuestRegister'], () => {
      // Continue & Register
      if (sessionStorage.getItem('PJ060-checkoutRegister') !== null) {
        const userEmail = sessionStorage.getItem('PJ060-checkoutRegister');
        pollerLite(['#ctl00_cphBody_txtGuestEmail'], () => {
          const emailInput = document.querySelector('#ctl00_cphBody_txtGuestEmail');
          if (emailInput) {
            emailInput.setAttribute('value', `${userEmail}`);

            sessionStorage.removeItem('PJ060-checkoutRegister');
          }
        });
        
      // Continue as Guest
      } else if (sessionStorage.getItem('PJ060-guestCheckout') !== null) {
        //chkGuestRegister
        pollerLite(['#chkGuestRegister', '#ctl00_cphBody_txtGuestEmail'], () => {
          const checkbox = document.querySelector('#chkGuestRegister');
          if (checkbox) {
            setTimeout(function(){
              checkbox.click();
            }, 2000);
            const userEmail = sessionStorage.getItem('PJ060-guestCheckout');
            const emailInput = document.querySelector('#ctl00_cphBody_txtGuestEmail');
            if (emailInput) {
              emailInput.setAttribute('value', `${userEmail}`);
  
              sessionStorage.removeItem('PJ060-guestCheckout');
            }
          }
        });
        
      }
    });
  }
  
};

export default activate;
