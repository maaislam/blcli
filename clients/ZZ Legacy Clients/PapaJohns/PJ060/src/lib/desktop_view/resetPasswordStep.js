import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';
import desktopResetPwd from './postRequest';
import formData from '../formData';
import data from '../data';
import amendLightboxContent from './amendLightboxContent';

export default () => {
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
          if (!document.querySelector('#PJ060-ResetPwdError')) {
            returnToSignInLink.insertAdjacentHTML('afterend', resetPasswordContent);
          }
          
          // Click Return to Sign In
          returnToSignInLink.addEventListener('click', () => {
            //alert('RE RUN   THE   TEST');
            amendLightboxContent.rebuildLightBox();
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
        }
      });
    });
  });

  // amendLightboxContent.rebuildLightBox();
  amendLightboxContent();
};

