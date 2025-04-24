import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';
import formData from '../formData';
import data from '../data';

export default () => {
  // Email Validation Regex
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  // Move Visa Checkout Button
  const visaCheckoutBtn = document.querySelector('#ctl00_cphBody_pnlVcoOptionPopup');
  const forgottenPwdContainer = document.querySelector('#ctl00_cphBody_lbForgottenPass');
  if (visaCheckoutBtn && forgottenPwdContainer) {
    forgottenPwdContainer.classList.add('PJ060-forgottenPwd');
    const continueBtnContainer = `<div id='PJ060-LoginError' class='simpleErrorMsg'>
      <span>You must enter your email address to proceed</span>
    </div>
    <div id='PJ060-CaptchaError' class='simpleErrorMsg'>
      <span>You must complete the captcha</span>
    </div>
    <div class='PJ060-continue__container'>
      <p class='PJ060-btn PJ060-continue__btn' id='PJ060-continueToPwd'>Continue</p>
    </div>
    <div class="PJ060-buttons__container">
      <p class="PJ060-continue__signIn first-btn" id='PJ060-continueAndRegister'>Continue &amp; Register</p>
      <p style="display: inline-block;">or</p>
      <p class="PJ060-continue__signIn second-btn" id='PJ060-continueAsGuest'>Continue as Guest</p></div>
    <div class='PJ060-line show'>
      <p>or</p>
    </div>`;
    
    if (!document.querySelector('#PJ060-LoginError')) {
      forgottenPwdContainer.insertAdjacentHTML('beforebegin', continueBtnContainer);
      document.querySelector('.PJ060-line').insertAdjacentElement('beforeend', visaCheckoutBtn);
    }
    
    // Change lightbox title
    const title = document.querySelector('#fancySignIn h2.title');
    title.innerHTML = 'Checkout';

    // Email field
    const emailField = document.querySelector('input#ctl00_cphBody_txtEmailPopup');
    const emailFieldContainer = emailField.closest('p');
    if (emailFieldContainer) {
      emailFieldContainer.classList.add('PJ060-email__wrapper');
      emailFieldContainer.classList.add('show');
    }

    // Hide Password field
    const passwordField = document.querySelector('input#ctl00_cphBody_txtPasswordPopup');
    const passwordFieldContainer = passwordField.closest('p');
    if (passwordFieldContainer) {
      passwordFieldContainer.classList.add('PJ060-password__wrapper');
      passwordFieldContainer.insertAdjacentHTML('beforeend', `<span class='PJ060-showPwd'></span>`);

      passwordFieldContainer.insertAdjacentElement('afterend', forgottenPwdContainer);
    }

    /*** Sign In content ***/
    const signInContent = document.querySelector('#ctl00_cphBody_pnlLogin');
    // Change description
    const description = signInContent.querySelector('p.description');
    if (description) {
      description.outerHTML = `<div class='PJ060-description__wrapper show'>
        <p class='PJ060-description first-line'>Enter your email address</p>
        <p class='PJ060-description second-line'>To proceed with your order</p>
      <div>`;
    }
    
    // Hide Sign In title
    const signInTitle = signInContent.querySelector('h1');
    signInTitle.innerHTML = `Sign In or Continue below`;
    signInTitle.style.display = 'none';


    /** Show Password ***/
    function showPassword(input) {
      if (input.type  && input.type === 'password') {
        input.type = 'text'; // eslint-disable-line no-param-reassign
        document.querySelector('span.PJ060-showPwd').classList.add('clicked');
      } else if (input.type  && input.type === 'text') {
        input.type = 'password'; // eslint-disable-line no-param-reassign
        document.querySelector('span.PJ060-showPwd').classList.remove('clicked');
      }
    }

    /******************** Continue to Step 2 **********************/
    const continueBtn = document.querySelector('.PJ060-continue__btn#PJ060-continueToPwd');
    // Email value validation
    const emptyEmailErrorMessage = document.querySelector('#PJ060-LoginError');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        if (!emailField.value || emailField.value === '' || !regex.test(emailField.value)) {
          emptyEmailErrorMessage.classList.add('show');
        } else if (emailField.value !== '' || regex.test(emailField.value)) {
          emptyEmailErrorMessage.classList.remove('show');

          const userEmail = document.querySelector('#ctl00_cphBody_txtEmailPopup').value;
          data.userEmail = userEmail;

          /*** Step 2 ***/
          emailFieldContainer.classList.remove('show');
          passwordFieldContainer.classList.add('show');
          forgottenPwdContainer.classList.add('show');
          document.querySelector('.PJ060-line').classList.remove('show');
          signInTitle.style.display = 'block';

          // Change Button Text
          continueBtn.id = 'PJ060-signInCheckout';
          continueBtn.innerHTML = 'Sign In &amp; Checkout';

          const checkoutButtonsContainer = document.querySelector('.PJ060-buttons__container');
          checkoutButtonsContainer.classList.add('show');
          // Captcha
          const captcha = document.querySelector('#captcha_container');
          if (captcha) {
            captcha.classList.add('show');
          }

          const stepOneDescription = document.querySelector('.PJ060-description__wrapper');
          if (stepOneDescription) {
            stepOneDescription.classList.remove('show');
          }

          // Show Password - Icon functionality
          const revealPwdIcon = document.querySelector('.PJ060-showPwd');
          if (revealPwdIcon) {
            revealPwdIcon.addEventListener('click', () => {
              showPassword(passwordField);
            });
          }
          /** Sign In and Checkout button **/
          const signInCheckoutBtn = document.querySelector('#PJ060-signInCheckout');
          if (signInCheckoutBtn) {
            signInCheckoutBtn.addEventListener('click', () => {
              const captchaChecked = document.querySelector('.recaptcha-checkbox-checked');
              if (grecaptcha && grecaptcha.getResponse().length !== 0) {
                document.querySelector('#PJ060-CaptchaError').classList.remove('show');
                //input.value.length >= 8
                //<div id="ctl00_cphBody_pnlLoginError" class="simpleErrorMsg"><span>The email address / password you entered were not found</span></div>
                window.__doPostBack('ctl00_cphBody_lbSignInPopup'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');

                // pollerLite(['#ctl00_cphBody_pnlLoginError'], () => {
                //   if (document.querySelector('#ctl00_cphBody_pnlLoginError span').innerText.trim() === "The email address / password you entered were not found") {
                //     console.log('LOGIN   ERROR   MESSAGE   VISIBLE---------------');
                //     document.querySelector('#captcha_container').style.display = 'block';
                //   }
                // });
              } else {
                document.querySelector('#PJ060-CaptchaError').classList.add('show');
                setTimeout(function(){ 
                  document.querySelector('#PJ060-CaptchaError').classList.remove('show');
                }, 6000);
              }
            });
          }

          /** Continue to Checkout buttons **/
          //ctl00_cphBody_lbGuest
          // Continue & Register button
          const continueRegisterBtn = document.querySelector('#PJ060-continueAndRegister');
          if (continueRegisterBtn) {
            continueRegisterBtn.addEventListener('click', () => {
              // alert('clicked on CONTINUE  AND   REGISTER---');
              // const userEmail = document.querySelector('#ctl00_cphBody_txtEmailPopup').value;
              
              sessionStorage.setItem('PJ060-checkoutRegister', `${userEmail}`);
              window.__doPostBack('ctl00_cphBody_lbGuest'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
            });
          }

          // Continue as Guest button
          const continueGuestBtn = document.querySelector('#PJ060-continueAsGuest');
          if (continueGuestBtn) {
            continueGuestBtn.addEventListener('click', () => {
              // alert('clicked on CONTINUE  AS   GUEST---');
              sessionStorage.setItem('PJ060-guestCheckout', `${userEmail}`);
              window.__doPostBack('ctl00_cphBody_lbGuest'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
            });
          }
        }
      });
    }
  }
};

