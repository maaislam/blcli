/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import e from 'cors';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const errorSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="16" fill="currentColor" style="color: #BC0031;">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1" fill="none"/>
  <text x="12" y="16" font-size="16" text-anchor="middle" fill="currentColor">!</text>
</svg>
`;

const tickSVG = `
<svg class="${ID}-tick" xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
<path d="M1 8.5L5 12.5L16 1.5" stroke="#118F40" stroke-width="1"/>
</svg>`;

const revealPasswordSVG = `<span><svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" class="${ID}-password-icon" fill="none">
        <path d="M8.66665 4.33333C9.89247 4.32926 11.0946 4.67119 12.1347 5.31982C13.1749 5.96845 14.0109 6.89744 14.5466 8C13.4466 10.2467 11.2 11.6667 8.66665 11.6667C6.13331 11.6667 3.88665 10.2467 2.78665 8C3.32239 6.89744 4.1584 5.96845 5.19857 5.31982C6.23873 4.67119 7.44082 4.32926 8.66665 4.33333ZM8.66665 3C5.33331 3 2.48665 5.07333 1.33331 8C2.48665 10.9267 5.33331 13 8.66665 13C12 13 14.8466 10.9267 16 8C14.8466 5.07333 12 3 8.66665 3ZM8.66665 6.33333C9.10867 6.33333 9.5326 6.50893 9.84516 6.82149C10.1577 7.13405 10.3333 7.55797 10.3333 8C10.3333 8.44203 10.1577 8.86595 9.84516 9.17851C9.5326 9.49107 9.10867 9.66667 8.66665 9.66667C8.22462 9.66667 7.8007 9.49107 7.48814 9.17851C7.17557 8.86595 6.99998 8.44203 6.99998 8C6.99998 7.55797 7.17557 7.13405 7.48814 6.82149C7.8007 6.50893 8.22462 6.33333 8.66665 6.33333ZM8.66665 5C7.01331 5 5.66665 6.34667 5.66665 8C5.66665 9.65333 7.01331 11 8.66665 11C10.32 11 11.6666 9.65333 11.6666 8C11.6666 6.34667 10.32 5 8.66665 5Z" fill="black"/>
    </svg></span>`;

function togglePasswordVisibility(passwordFieldId) {
  const passwordField = document.getElementById(passwordFieldId);
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
}
const startExperiment = () => {
  // ...

  //check for guest checkout
  pollerLite(['.pt_checkout .new-customer .checkout-guest-registration'], () => {
    console.log('startExperiment GUEST');

    if (localStorage.getItem(`${ID}-guestEmail`)) {
      const guestEmail = JSON.parse(localStorage.getItem(`${ID}-guestEmail`));
      document.querySelector('.pt_checkout .new-customer .checkout-guest-registration .input-text.email').value =
        guestEmail.email;
      localStorage.removeItem(`${ID}-guestEmail`);
    }
  });

  pollerLite(['.pt_checkout .checkout .login-box form'], () => {
    console.log('startExperiment');
    let attemptedSignIn = false;
    const attemptedSignInEmail = localStorage.getItem(`${ID}-sign-in-email`);
    if (attemptedSignInEmail) {
      attemptedSignIn = true;
      localStorage.removeItem(`${ID}-sign-in-email`);
    }

    const newFormHtml = `
      <form class="${ID}-form">
        <fieldset class="${ID}-fieldset">
        <input type="radio" id="${ID}GuestRadio" name="checkoutType">
            <div class=${ID}-offset-container>
              <div class="${ID}-legend">
                  <label for="${ID}GuestRadio">Guest Checkout</label>
              </div>
              <p class="${ID}-p">You can create an account later.</p>
              <div class="${ID}-hidden-content ${ID}-display-none">
                <div class="${ID}-email-field">
                    <label for="${ID}GuestEmail" class="${ID}-label">Email:</label>
                    <input placeholder="example@example.com" type="email" id="${ID}GuestEmail" name="${ID}GuestEmail" class="${ID}-input" required>
                </div>
                <div id="${ID}-ErrorMessage" class="${ID}-error-message"></div>
                <p class="${ID}-p">We'll use your email to send you order updates.</p>
                <button class="${ID}-button">Continue</button>
              </div>
            </div>
        </fieldset>
      </form>

      <form class="${ID}-form">
        <fieldset class="${ID}-fieldset ${VARIATION !== '3' ? `${ID}-selected` : ''}">
        <input type="radio" id="${ID}-SignInRadio" name="checkoutType" ${VARIATION !== '3' ? 'checked' : ''}>
            <div class=${ID}-offset-container>
              <div class="${ID}-legend">
                  <label for="${ID}-SignInRadio">Sign In or Create an Account</label>
              </div>
              <p class="${ID}-p ${ID}-no-account-change">Checkout faster with your saved details.</p>
              <div class="${ID}-hidden-content">
                <div class="${ID}-email-field">
                    <label for="${ID}-SignInEmail" class="${ID}-label">Email:</label>
                    <input value="${
                      attemptedSignIn ? attemptedSignInEmail : ''
                    }" placeholder="example@example.com" type="email" id="${ID}-SignInEmail" name="${ID}-SignInEmail" class="${ID}-input" required>
                </div>
                <div id="${ID}-ErrorMessage" class="${ID}-error-message"></div>
                <p class="${ID}-p">We'll use your email to send you order updates.</p>
                <div class="${ID}-password-field">
                    <label for="${ID}-SignInPassword" class="${ID}-label">Password:</label>
                    <input placeholder="********" type="password" id="${ID}-SignInPassword" name="${ID}-SignInPassword" class="${ID}-input" required>
                    ${revealPasswordSVG}
                </div>
                <p class="${ID}-link ${ID}-need-help">Need help with your password?</p>
                <div>
                    <input type="checkbox" id="${ID}-RememberMe" name="${ID}-RememberMe" class="${ID}-checkbox">
                    <label for="${ID}-RememberMe">Remember me</label>
                </div>
                <button class="${ID}-button ${ID}-signIn">Sign In</button>
                <p class="${ID}-p ${ID}-no-account" class="${ID}-link">Not got an account?</p>
              </div>
            </div>
        </fieldset>
    </form>
      `;

    const targetForm = document.querySelector('#main .login-intercept.checkout');
    targetForm.insertAdjacentHTML('afterbegin', newFormHtml);

    function removeErrorMessage() {
      console.log('removeErrorMessage');
      const errorMessage = document
        .querySelector(`#${ID}-SignInRadio`)
        .closest(`.${ID}-fieldset`)
        .querySelector(`.${ID}-error-message p`);
      console.log(errorMessage, 'errorMessage');
      errorMessage.innerHTML = '';

      const signInPassword = document.getElementById(`${ID}-SignInPassword`);
      signInPassword.removeEventListener('input', removeErrorMessage);
    }

    const unsuccessfulSignIn = document.querySelector('.checkout .login-box .error-form');
    if (unsuccessfulSignIn) {
      const errorMessage = `<div class="${ID}-error-message"><p>${errorSVG} Sorry, you’ve entered an incorrect email address or password. Please try again.</p></div>`;
      const signInFieldset = document.querySelector(`.${ID}-fieldset .${ID}-hidden-content .${ID}-password-field`);
      signInFieldset.insertAdjacentHTML('afterend', errorMessage);

      // remove error message when user starts typing email or pw
      const signInPassword = document.getElementById(`${ID}-SignInPassword`);

      signInPassword.addEventListener('input', removeErrorMessage);
    }

    function validateEmail(targetField) {
      var emailInput = targetField;
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      //PASSWORD RESET MODAL
      if (emailInput.closest(`.${ID}-password-reset-modal`)) {
        console.log('password reset modal');
        const emailError = targetField.closest(`.${ID}-password-reset-modal-content`).querySelector(`.${ID}-error-message`);

        if (!targetField.value) {
          emailError.textContent = ''; // Clear error message
          emailError.style.display = 'none';
          emailInput.closest(`.${ID}-password-reset-modal`).querySelector(`.${ID}-button`).disabled = true;
        } else if (!emailRegex.test(emailInput.value)) {
          emailError.innerHTML = `${errorSVG} <p>Sorry your email doesn't match the format example@example.com</p>`;
          emailError.style.display = 'flex';
          if (emailInput.classList.contains(`${ID}-valid-style`)) {
            emailInput.classList.remove(`${ID}-valid-style`);
          }
          if (targetField.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`)) {
            targetField.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`).remove();
          }
          if (!emailInput.classList.contains(`${ID}-error-style`)) {
            emailInput.classList.add(`${ID}-error-style`);
          }
          //disable button
          emailInput.closest(`.${ID}-password-reset-modal`).querySelector(`.${ID}-button`).disabled = true;
          return false; // Prevent form submission
        } else {
          if (emailInput.classList.contains(`${ID}-error-style`)) {
            emailInput.classList.remove(`${ID}-error-style`);
          }
          emailInput.classList.add(`${ID}-valid-style`);
          emailInput.insertAdjacentHTML('afterend', tickSVG);
          emailError.textContent = ''; // Clear error message
          emailError.style.display = 'none';
          // passwordResetModalButton.textContent = 'Sent';
          emailInput.closest(`.${ID}-password-reset-modal`).querySelector(`.${ID}-button`).disabled = false;
          return true; // Allow form submission
        }
      } else {
        // SIGN IN AND GUEST CHECKOUT AND CREATE
        console.log('sign in guest create');
        const emailError = targetField.closest(`.${ID}-offset-container`).querySelector(`.${ID}-error-message`);
        console.log(emailInput.value);

        // Regular expression for a simple email validation

        if (!targetField.value) {
          emailError.innerHTML = ''; // Clear error message
          emailError.style.display = 'none';
          emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
        } else if (!emailRegex.test(emailInput.value)) {
          emailError.innerHTML = `${errorSVG} <p>Sorry your email doesn't match the format example@email.com</p>`;
          emailError.style.display = 'flex';
          if (emailInput.classList.contains(`${ID}-valid-style`)) {
            emailInput.classList.remove(`${ID}-valid-style`);
          }
          if (targetField.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`)) {
            targetField.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`).remove();
          }
          if (!emailInput.classList.contains(`${ID}-error-style`)) {
            emailInput.classList.add(`${ID}-error-style`);
          }
          emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
          // return false; // Prevent form submission
        } else {
          // const notGotAccount = document.querySelector(`.${ID}-show-sign-in`);
          // if(notGotAccount) {
          //   console.log('not got account')

          // } else {
          console.log('emailinput', emailInput.value);
          if (emailInput.classList.contains(`${ID}-error-style`)) {
            emailInput.classList.remove(`${ID}-error-style`);
          }
          emailInput.classList.add(`${ID}-valid-style`);
          emailInput.insertAdjacentHTML('afterend', tickSVG);
          emailError.innerHTML = ''; // Clear error message
          emailError.style.display = 'none';
          emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = false;
          // return true; // Allow form submission
          // }
        }
      }
    }

    const guestEmail = document.getElementById(`${ID}GuestEmail`);
    const signInEmail = document.getElementById(`${ID}-SignInEmail`);

    guestEmail.addEventListener('blur', function () {
      validateEmail(this);
    });

    signInEmail.addEventListener('blur', function () {
      console.log('signInEmail blur', signInEmail.value);
      validateEmail(this);
    });

    const radioButtons = document.querySelectorAll(`.${ID}-form input[type="radio"]`);
    const fieldsets = document.querySelectorAll(`.${ID}-form fieldset`);

    function toggleGuestAndSignIn(radioButton) {
      if (radioButton.id === `${ID}GuestRadio`) {
        radioButton.closest(`.${ID}-fieldset`).querySelector(`.${ID}-hidden-content`).classList.toggle(`${ID}-display-none`);
        document
          .querySelector(`#${ID}-SignInRadio`)
          .closest(`.${ID}-fieldset`)
          .querySelector(`.${ID}-hidden-content`)
          .classList.toggle(`${ID}-display-none`);
        document.querySelector(`#${ID}-SignInRadio`).checked = false;
      } else if (radioButton.id === `${ID}-SignInRadio`) {
        radioButton.closest(`.${ID}-fieldset`).querySelector(`.${ID}-hidden-content`).classList.toggle(`${ID}-display-none`);
        document
          .querySelector(`#${ID}GuestRadio`)
          .closest(`.${ID}-fieldset`)
          .querySelector(`.${ID}-hidden-content`)
          .classList.toggle(`${ID}-display-none`);
        document.querySelector(`#${ID}GuestRadio`).checked = false;
      }
    }

    radioButtons.forEach((radioButton, index) => {
      radioButton.addEventListener('change', function () {
        fieldsets.forEach((fieldset) => {
          fieldset.classList.remove(`${ID}-selected`);
        });
        fieldsets[index].classList.add(`${ID}-selected`);
        toggleGuestAndSignIn(this);
      });
    });

    const inputFields = document.querySelectorAll(`.${ID}-form .${ID}-input`);
    inputFields.forEach((inputField) => {
      inputField.addEventListener('focus', function () {
        this.classList.add(`${ID}-focused`);
      });

      inputField.addEventListener('blur', function () {
        this.classList.remove(`${ID}-focused`);
        const isPassword = this.type === 'password';
        if (isPassword && this.value) {
          this.classList.remove(`${ID}-error-style`);
          if (this.closest(`.${ID}-password-field`).querySelector(`.${ID}-error-message`)) {
            this.closest(`.${ID}-password-field`).querySelector(`.${ID}-error-message`).remove();
          }
        }
      });
    });

    const noAccountLink = document.querySelector(`.${ID}-no-account`);
    noAccountLink.addEventListener('click', function () {
      if (noAccountLink.classList.contains(`${ID}-show-sign-in`)) {
        noAccountLink.textContent = 'Not got an account?';
        noAccountLink.classList.remove(`${ID}-show-sign-in`);
        const section = noAccountLink.closest(`fieldset`);
        section.querySelector(`.${ID}-signIn`).textContent = 'Sign In';
        section.querySelector(`label`).textContent = 'Sign In or Create an Account';
        section.querySelector(`.${ID}-no-account-change`).textContent = 'Checkout faster with your saved details.';
        section.querySelector(`#${ID}-SignInPassword`).closest('div').classList.remove(`${ID}-display-none`);
        section.querySelector(`.${ID}-need-help`).classList.remove(`${ID}-display-none`);
        section.querySelector(`#${ID}-RememberMe`).closest(`div`).classList.remove(`${ID}-display-none`);
      } else {
        const section = noAccountLink.closest(`fieldset`);
        //Sign in to continue
        section.querySelector(`.${ID}-signIn`).textContent = 'Continue';
        section.querySelector(`.${ID}-signIn`).disabled = true;
        section.querySelector(`label`).textContent = 'Create an Account';
        section.querySelector(`.${ID}-no-account-change`).textContent = 'Register an account to checkout easier next time.';
        section.querySelector(`#${ID}-SignInPassword`).closest('div').classList.add(`${ID}-display-none`);
        noAccountLink.textContent = 'Got an account?';
        section.querySelector(`.${ID}-need-help`).classList.add(`${ID}-display-none`);
        section.querySelector(`#${ID}-RememberMe`).closest(`div`).classList.add(`${ID}-display-none`);
        noAccountLink.classList.add(`${ID}-show-sign-in`);
        if (section.querySelector(`.${ID}-error-message span`)) {
          section.querySelector(`.${ID}-error-message`).innerHTML = '';
        }
      }
    });

    // Remember me
    function clickOriginalRememberMe() {
      document.querySelector('.checkout .login-box .login-rememberme .input-checkbox').click();
    }
    document.querySelector(`#${ID}-RememberMe`).addEventListener('click', function () {
      clickOriginalRememberMe();
    });

    //password reset modal
    const passwordResetModal = `
    <div class="${ID}-modal-container ${ID}-display-none">
      <div class="${ID}-overlay"></div>
      <div class="${ID}-password-reset-modal">
        <div class="${ID}-password-reset-modal-top">
          <h2 class="${ID}-password-reset-modal-title">Reset your password</h2>
          <button class="${ID}-password-reset-modal-close">X</button>
        </div>
        <div class="${ID}-password-reset-modal-content">
          <p class="${ID}-password-reset-modal-p">Confirm your email below and we'll send you a link to reset your password.</p>
          <div class="${ID}-email-field">
            <label for="${ID}-PasswordResetEmail" class="${ID}-label">Email</label>
            <input placeholder="example@example.com" type="email" id="${ID}-PasswordResetEmail" name="${ID}-PasswordResetEmail" class="${ID}-input" required>
          </div>
          <div id="${ID}-ErrorMessage" class="${ID}-error-message"></div>
          <button type="submit" class="${ID}-button ${ID}-password-reset-modal-button">Send email</button>
        </div>
      </div>
    </div>
    `;

    targetForm.insertAdjacentHTML('afterbegin', passwordResetModal);

    const needHelpLink = document.querySelector(`.${ID}-need-help`);
    const passwordResetModalContainer = document.querySelector(`.${ID}-modal-container`);
    const passwordResetModalClose = document.querySelector(`.${ID}-password-reset-modal-close`);
    const passwordResetModalButton = document.querySelector(`.${ID}-password-reset-modal-button`);
    const passwordResetEmail = document.getElementById(`${ID}-PasswordResetEmail`);

    needHelpLink.addEventListener('click', function () {
      passwordResetModalContainer.classList.remove(`${ID}-display-none`);
    });

    passwordResetModalClose.addEventListener('click', function () {
      passwordResetModalContainer.classList.add(`${ID}-display-none`);
    });

    passwordResetEmail.addEventListener('blur', function () {
      validateEmail(this);
    });

    function sendPasswordResetEmail() {
      pollerLite(['.forgot-password-dialog .dialog-content input'], () => {
        const email = passwordResetEmail.value;
        console.log('email', email);
        //send email
        const passwordResetOriginalInput = document.querySelector('.forgot-password-dialog .dialog-content input');
        console.log(passwordResetOriginalInput, 'passwordResetOriginalInput');
        passwordResetOriginalInput.value = email;
        document.querySelector('.forgot-password-dialog .dialog-content button[type="submit"]').click();
      });
    }

    function openOriginalPasswordResetModal() {
      document.querySelector('.login-column #password-reset').click();
    }

    function passwordResetSuccess() {
      const passwordResetModalContent = document.querySelector(`.${ID}-password-reset-modal-content p`);
      passwordResetModalContent.innerText =
        'An email  has been sent to the email address entered with instructions on how to reset your password.';
      const newParagraph = `<p class="${ID}-password-reset-modal-p">To ensure our emails reach your inbox, add hello@email-hotelchocolat.com to your safe senders list.</p>`;
      passwordResetModalContent.insertAdjacentHTML('afterend', newParagraph);

      const passwordResetModalButton = document.querySelector(`.${ID}-password-reset-modal-button`);
      passwordResetModalButton.textContent = 'Got it';
      passwordResetModalButton.removeEventListener('click', sendPasswordResetEmail);
      passwordResetModalButton.addEventListener('click', function () {
        passwordResetModalContainer.classList.add(`${ID}-display-none`);
      });
    }

    passwordResetModalButton.addEventListener('click', function () {
      const isValid = validateEmail(passwordResetEmail);
      if (isValid) {
        openOriginalPasswordResetModal();
        sendPasswordResetEmail();
        passwordResetSuccess();
      }
    });

    //sign in functionality - sign in/create account
    const signInButton = document.querySelector(`.${ID}-signIn`);
    signInButton.addEventListener('click', function (e) {
      e.preventDefault();
      const email = document.getElementById(`${ID}-SignInEmail`).value;
      const password = document.getElementById(`${ID}-SignInPassword`).value;
      console.log(email, password);
      const notGotAccount = document.querySelector(`.${ID}-show-sign-in`);
      localStorage.setItem(`${ID}-sign-in-email`, email);
      if (!email) {
        console.log('no email');
        const errorMessage = signInButton.closest(`.${ID}-fieldset`).querySelector(`#${ID}-ErrorMessage`);
        console.log(errorMessage, 'errorMessage');
        errorMessage.innerHTML = `${errorSVG} <p>Please enter your email address</p>`;
        const emailInput = document.querySelector(`#${ID}-SignInEmail`);
        if (emailInput.classList.contains(`${ID}-valid-style`)) {
          emailInput.classList.remove(`${ID}-valid-style`);
        }
        if (emailInput.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`)) {
          emailInput.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`).remove();
        }
        if (!emailInput.classList.contains(`${ID}-error-style`)) {
          emailInput.classList.add(`${ID}-error-style`);
        }
        emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
      }

      if (!password) {
        const passwordInput = document.querySelector(`#${ID}-SignInPassword`);
        const errorHtml = `<div id="${ID}-ErrorMessage" class="${ID}-error-message" style="margin-top: 5px">${errorSVG} <p>Please enter your password</p></div>`;
        passwordInput.insertAdjacentHTML('afterend', errorHtml);
        if (passwordInput.classList.contains(`${ID}-valid-style`)) {
          passwordInput.classList.remove(`${ID}-valid-style`);
        }
        if (passwordInput.closest(`.${ID}-password-field`).querySelector(`.${ID}-tick`)) {
          passwordInput.closest(`.${ID}-password-field`).querySelector(`.${ID}-tick`).remove();
        }
        if (!passwordInput.classList.contains(`${ID}-error-style`)) {
          passwordInput.classList.add(`${ID}-error-style`);
        }
        passwordInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
      }

      if (email && password) {
        document.querySelector('.checkout .login-column-right .login-box input.email-input').value = email;
        const passwordInput = document.querySelector('.checkout .login-column-right .login-box input.password-input');
        passwordInput.value = password;

        document.querySelector('.checkout .login-column-right .login-box button[type="submit"]').removeAttribute('disabled');
        document.querySelector('.checkout .login-column-right .login-box button[type="submit"]').click();
      }
      if (notGotAccount) {
        document.querySelector('.checkout .login-column-left .login-box.create-account input').value = email;
        document
          .querySelector('.checkout .login-column-left .login-box.create-account button[type="submit"]')
          .removeAttribute('disabled');
        document.querySelector('.checkout .login-column-left .login-box button[type="submit"]').click();
      }
    });

    //guest checkout functionality
    const guestButton = document.querySelector(`#${ID}GuestRadio`).closest(`.${ID}-fieldset`).querySelector(`.${ID}-button`);
    guestButton.addEventListener('click', function (e) {
      e.preventDefault();
      const email = document.getElementById(`${ID}GuestEmail`).value;
      console.log(email);
      const emailObj = {
        email: email,
      };
      localStorage.setItem(`${ID}-guestEmail`, JSON.stringify(emailObj));
      // localStorage.removeItem(`${ID}-guestEmail`);
      document.querySelector('.checkout .login-column .login-box button').click();
    });

    const passwordRevealIcon = document.querySelector(`.${ID}-password-icon`);
    passwordRevealIcon.addEventListener('click', function () {
      togglePasswordVisibility(`${ID}-SignInPassword`);
    });
  });
};

const startExperiment2 = () => {
  // ...

  //check for

  //check for guest checkout
  pollerLite(['.pt_checkout .new-customer .checkout-guest-registration'], () => {
    // console.log('startExperiment GUEST');

    if (localStorage.getItem(`${ID}-guestEmail`)) {
      const guestEmail = JSON.parse(localStorage.getItem(`${ID}-guestEmail`));
      document.querySelector('.pt_checkout .new-customer .checkout-guest-registration .input-text.email').value =
        guestEmail.email;
      // localStorage.removeItem(`${ID}-guestEmail`);
    }
  });

  pollerLite(['.pt_checkout .checkout .login-box form'], () => {
    console.log('startExperiment');

    let attemptedSignIn = false;
    const attemptedSignInEmail = localStorage.getItem(`${ID}-sign-in-email`);
    if (attemptedSignInEmail) {
      attemptedSignIn = true;
      localStorage.removeItem(`${ID}-sign-in-email`);
    }

    const newFormHtml = `
      <form class="${ID}-form ${ID}-guest">
        <fieldset class="${ID}-fieldset ${VARIATION !== '3' ? `${ID}-selected` : ''}">
        <input type="radio" id="${ID}GuestRadio" name="checkoutType" ${VARIATION !== '3' ? 'checked' : ''}>
            <div class=${ID}-offset-container>
              <div class="${ID}-legend">
                  <label for="${ID}GuestRadio">Guest Checkout</label>
              </div>
              <p class="${ID}-p">You can create an account later.</p>
              <div class="${ID}-hidden-content ">
                <button class="${ID}-button">Continue</button>
              </div>
            </div>
        </fieldset>
      </form>

      <form class="${ID}-form ${ID}-sign-in">
      <fieldset class="${ID}-fieldset">
      <input type="radio" id="${ID}-SignInRadio" name="checkoutType">
          <div class=${ID}-offset-container>
            <div class="${ID}-legend">
                <label for="${ID}-SignInRadio">Sign In</label>
            </div>
            <p class="${ID}-p ${ID}-no-account-change">Checkout faster with your saved details.</p>
            <div class="${ID}-hidden-content ${ID}-display-none">
              <div class="${ID}-email-field">
                  <label for="${ID}-SignInEmail" class="${ID}-label">Email:</label>
                  <input value="${
                    attemptedSignIn ? attemptedSignInEmail : ''
                  }" placeholder="example@example.com" type="email" id="${ID}-SignInEmail" name="${ID}-SignInEmail" class="${ID}-input" required>
              </div>
              <div id="${ID}-ErrorMessage" class="${ID}-error-message"></div>
              <p class="${ID}-p">We'll use your email to send you order updates.</p>
              <div class="${ID}-password-field">
                  <label for="${ID}-SignInPassword" class="${ID}-label">Password:</label>
                  <input placeholder="********" type="password" id="${ID}-SignInPassword" name="${ID}-SignInPassword" class="${ID}-input" required>
                  ${revealPasswordSVG}
              </div>
              <p class="${ID}-link ${ID}-need-help">Need help with your password?</p>
              <div>
                  <input type="checkbox" id="${ID}-RememberMe" name="${ID}-RememberMe" class="${ID}-checkbox">
                  <label for="${ID}-RememberMe">Remember me</label>
              </div>
              <button class="${ID}-button ${ID}-signIn">Sign In</button>
            </div>
          </div>
      </fieldset>
  </form>

      <form class="${ID}-form ${ID}-create-account">
        <fieldset class="${ID}-fieldset">
        <input type="radio" id="${ID}-CreateAccountRadio" name="checkoutType">
            <div class=${ID}-offset-container>
              <div class="${ID}-legend">
                  <label for="${ID}-CreateAccountRadio">Create an Account</label>
              </div>
              <p class="${ID}-p ${ID}-no-account-change">Register now for faster checkout and easier order tracking.</p>
              <div class="${ID}-hidden-content ${ID}-display-none">
                <div class="${ID}-email-field">
                    <label for="${ID}-CreateAccountEmail" class="${ID}-label">Email:</label>
                    <input placeholder="example@example.com" type="email" id="${ID}-CreateAccountEmail" name="${ID}-CreateAccountEmail" class="${ID}-input" required>
                </div>
                <div id="${ID}-ErrorMessage" class="${ID}-error-message"></div>
                <p class="${ID}-p">We'll use your email to send you order updates.</p>
                <button class="${ID}-button ${ID}-signIn">Continue</button>
              </div>
            </div>
        </fieldset>
    </form>
      `;

    const targetForm = document.querySelector('#main .login-intercept.checkout');
    targetForm.insertAdjacentHTML('afterbegin', newFormHtml);

    function removeErrorMessage() {
      console.log('removeErrorMessage');
      const errorMessage = document
        .querySelector(`#${ID}-SignInRadio`)
        .closest(`.${ID}-fieldset`)
        .querySelector(`.${ID}-error-message p`);
      console.log(errorMessage, 'errorMessage');
      errorMessage.innerHTML = '';

      const signInPassword = document.getElementById(`${ID}-SignInPassword`);
      signInPassword.removeEventListener('input', removeErrorMessage);
    }

    const unsuccessfulSignIn = document.querySelector('.checkout .login-box .error-form');
    if (unsuccessfulSignIn) {
      const errorMessage = `<div class="${ID}-error-message"><p>${errorSVG} Sorry, you’ve entered an incorrect email address or password. Please try again.</p></div>`;

      const signInFieldset = document.querySelector(`.${ID}-fieldset .${ID}-hidden-content .${ID}-password-field`);
      signInFieldset.insertAdjacentHTML('afterend', errorMessage);
      //swap from default guest checkout to default sign in
      signInFieldset.closest(`.${ID}-fieldset`).querySelector(`.${ID}-hidden-content`).classList.remove(`${ID}-display-none`);
      signInFieldset.closest(`.${ID}-fieldset`).querySelector('input[type=radio]').checked = true;
      signInFieldset.closest(`.${ID}-fieldset`).classList.add(`${ID}-selected`);

      document
        .querySelector(`#${ID}GuestRadio`)
        .closest(`.${ID}-fieldset`)
        .querySelector(`.${ID}-hidden-content`)
        .classList.add(`${ID}-display-none`);
      document.querySelector(`#${ID}GuestRadio`).closest(`.${ID}-fieldset`).classList.remove(`${ID}-selected`);
      document.querySelector(`#${ID}GuestRadio`).checked = false;

      //remove error message when user starts typing email or pw
      const signInPassword = document.getElementById(`${ID}-SignInPassword`);

      signInPassword.addEventListener('input', removeErrorMessage);
    }

    function validateEmail(targetField) {
      var emailInput = targetField;
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      //PASSWORD RESET MODAL
      if (emailInput.closest(`.${ID}-password-reset-modal`)) {
        console.log('password reset modal');
        const emailError = targetField.closest(`.${ID}-password-reset-modal-content`).querySelector(`.${ID}-error-message`);

        if (!targetField.value) {
          emailError.textContent = ''; // Clear error message
          emailError.style.display = 'none';
          emailInput.closest(`.${ID}-password-reset-modal`).querySelector(`.${ID}-button`).disabled = true;
        } else if (!emailRegex.test(emailInput.value)) {
          emailError.innerHTML = `${errorSVG} <p>Sorry your email doesn't match the format example@example.com</p>`;
          emailError.style.display = 'flex';
          if (emailInput.classList.contains(`${ID}-valid-style`)) {
            emailInput.classList.remove(`${ID}-valid-style`);
          }
          if (targetField.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`)) {
            targetField.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`).remove();
          }
          if (!targetField.classList.contains(`${ID}-error-style`)) {
            targetField.classList.add(`${ID}-error-style`);
          }
          emailInput.closest(`.${ID}-password-reset-modal`).querySelector(`.${ID}-button`).disabled = true;
          return false; // Prevent form submission
        } else {
          if (emailInput.classList.contains(`${ID}-error-style`)) {
            emailInput.classList.remove(`${ID}-error-style`);
          }
          emailInput.classList.add(`${ID}-valid-style`);
          emailInput.insertAdjacentHTML('afterend', tickSVG);
          emailError.textContent = ''; // Clear error message
          // passwordResetModalButton.textContent = 'Sent';
          emailInput.closest(`.${ID}-password-reset-modal`).querySelector(`.${ID}-button`).disabled = false;
          return true; // Allow form submission
        }
      } else {
        // SIGN IN AND GUEST CHECKOUT
        const emailError = targetField.closest(`.${ID}-offset-container`).querySelector(`.${ID}-error-message`);

        // Regular expression for a simple email validation

        if (!targetField.value) {
          emailError.textContent = ''; // Clear error message
          emailError.style.display = 'none';
          emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
        } else if (!emailRegex.test(emailInput.value)) {
          emailError.innerHTML = `${errorSVG} <p>Sorry your email doesn't match the format example@email.com</p>`;
          emailError.style.display = 'flex';
          if (emailInput.classList.contains(`${ID}-valid-style`)) {
            emailInput.classList.remove(`${ID}-valid-style`);
          }
          if (targetField.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`)) {
            targetField.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`).remove();
          }
          if (!emailInput.classList.contains(`${ID}-error-style`)) {
            emailInput.classList.add(`${ID}-error-style`);
          }
          emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
          // return false; // Prevent form submission
        } else {
          const notGotAccount = document.querySelector(`.${ID}-show-sign-in`);
          if (notGotAccount) {
            return;
          } else {
            if (emailInput.classList.contains(`${ID}-error-style`)) {
              emailInput.classList.remove(`${ID}-error-style`);
            }
            console.log('emailinput', emailInput.value);
            emailInput.classList.add(`${ID}-valid-style`);
            emailInput.insertAdjacentHTML('afterend', tickSVG);
            emailError.textContent = ''; // Clear error message
            emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = false;
            // return true; // Allow form submission
          }
        }
      }
    }

    // const guestEmail = document.getElementById(`${ID}GuestEmail`);
    const signInEmail = document.getElementById(`${ID}-SignInEmail`);
    const createAccountEmail = document.getElementById(`${ID}-CreateAccountEmail`);

    // guestEmail.addEventListener('blur', function() {
    //   validateEmail(this);
    // });

    signInEmail.addEventListener('blur', function () {
      validateEmail(this);
    });

    createAccountEmail.addEventListener('blur', function () {
      validateEmail(this);
    });

    const radioButtons = document.querySelectorAll(`.${ID}-form input[type="radio"]`);
    const fieldsets = document.querySelectorAll(`.${ID}-form fieldset`);

    function toggleGuestAndSignIn(radioButton) {
      if (radioButton.id === `${ID}GuestRadio`) {
        //show current fieldset
        radioButton.closest(`.${ID}-fieldset`).querySelector(`.${ID}-hidden-content`).classList.toggle(`${ID}-display-none`);
        //hide other fieldsets if they are not already hidden
        const signInRadioHidden = document
          .querySelector(`#${ID}-SignInRadio`)
          .closest(`.${ID}-fieldset`)
          .querySelector(`.${ID}-hidden-content`)
          .classList.contains(`${ID}-display-none`);
        document.querySelector(`#${ID}-SignInRadio`).checked = false;
        if (!signInRadioHidden) {
          document
            .querySelector(`#${ID}-SignInRadio`)
            .closest(`.${ID}-fieldset`)
            .querySelector(`.${ID}-hidden-content`)
            .classList.toggle(`${ID}-display-none`);
        }

        const createRadioHidden = document
          .querySelector(`#${ID}-CreateAccountRadio`)
          .closest(`.${ID}-fieldset`)
          .querySelector(`.${ID}-hidden-content`)
          .classList.contains(`${ID}-display-none`);
        document.querySelector(`#${ID}-CreateAccountRadio`).checked = false;
        if (!createRadioHidden) {
          document
            .querySelector(`#${ID}-CreateAccountRadio`)
            .closest(`.${ID}-fieldset`)
            .querySelector(`.${ID}-hidden-content`)
            .classList.toggle(`${ID}-display-none`);
        }
      } else if (radioButton.id === `${ID}-SignInRadio`) {
        //show current fieldset
        radioButton.closest(`.${ID}-fieldset`).querySelector(`.${ID}-hidden-content`).classList.toggle(`${ID}-display-none`);
        //hide other fieldsets if they are not already hidden
        const guestRadioHidden = document
          .querySelector(`#${ID}GuestRadio`)
          .closest(`.${ID}-fieldset`)
          .querySelector(`.${ID}-hidden-content`)
          .classList.contains(`${ID}-display-none`);
        document.querySelector(`#${ID}GuestRadio`).checked = false;
        if (!guestRadioHidden) {
          document
            .querySelector(`#${ID}GuestRadio`)
            .closest(`.${ID}-fieldset`)
            .querySelector(`.${ID}-hidden-content`)
            .classList.toggle(`${ID}-display-none`);
        }
        const createRadioHidden = document
          .querySelector(`#${ID}-CreateAccountRadio`)
          .closest(`.${ID}-fieldset`)
          .querySelector(`.${ID}-hidden-content`)
          .classList.contains(`${ID}-display-none`);
        document.querySelector(`#${ID}-CreateAccountRadio`).checked = false;
        if (!createRadioHidden) {
          document
            .querySelector(`#${ID}-CreateAccountRadio`)
            .closest(`.${ID}-fieldset`)
            .querySelector(`.${ID}-hidden-content`)
            .classList.toggle(`${ID}-display-none`);
        }
      } else if (radioButton.id === `${ID}-CreateAccountRadio`) {
        //show current fieldset
        radioButton.closest(`.${ID}-fieldset`).querySelector(`.${ID}-hidden-content`).classList.toggle(`${ID}-display-none`);
        //hide other fieldsets if they are not already hidden
        const guestRadioHidden = document
          .querySelector(`#${ID}GuestRadio`)
          .closest(`.${ID}-fieldset`)
          .querySelector(`.${ID}-hidden-content`)
          .classList.contains(`${ID}-display-none`);
        document.querySelector(`#${ID}GuestRadio`).checked = false;
        if (!guestRadioHidden) {
          document
            .querySelector(`#${ID}GuestRadio`)
            .closest(`.${ID}-fieldset`)
            .querySelector(`.${ID}-hidden-content`)
            .classList.toggle(`${ID}-display-none`);
        }
        const signInRadioHidden = document
          .querySelector(`#${ID}-SignInRadio`)
          .closest(`.${ID}-fieldset`)
          .querySelector(`.${ID}-hidden-content`)
          .classList.toggle(`${ID}-display-none`);
        document.querySelector(`#${ID}-SignInRadio`).checked = false;
        if (!signInRadioHidden) {
          document
            .querySelector(`#${ID}-SignInRadio`)
            .closest(`.${ID}-fieldset`)
            .querySelector(`.${ID}-hidden-content`)
            .classList.toggle(`${ID}-display-none`);
        }
      }
    }

    radioButtons.forEach((radioButton, index) => {
      radioButton.addEventListener('change', function () {
        fieldsets.forEach((fieldset) => {
          fieldset.classList.remove(`${ID}-selected`);
        });
        fieldsets[index].classList.add(`${ID}-selected`);
        toggleGuestAndSignIn(this);
      });
    });

    const inputFields = document.querySelectorAll(`.${ID}-form .${ID}-input`);
    inputFields.forEach((inputField) => {
      inputField.addEventListener('focus', function () {
        this.classList.add(`${ID}-focused`);
      });

      inputField.addEventListener('blur', function () {
        this.classList.remove(`${ID}-focused`);
        const isPassword = this.type === 'password';
        if (isPassword && this.value) {
          this.classList.remove(`${ID}-error-style`);
          if (this.closest(`.${ID}-password-field`).querySelector(`.${ID}-error-message`)) {
            this.closest(`.${ID}-password-field`).querySelector(`.${ID}-error-message`).remove();
          }
        }
      });
    });

    // const noAccountLink = document.querySelector(`.${ID}-no-account`);
    // noAccountLink.addEventListener('click', function() {
    //   if(noAccountLink.classList.contains(`${ID}-show-sign-in`)) {
    //     noAccountLink.textContent = 'Not got an account?';
    //     noAccountLink.classList.remove(`${ID}-show-sign-in`);
    //     const section = noAccountLink.closest(`fieldset`);
    //     section.querySelector(`.${ID}-signIn`).textContent = 'Sign In';
    //     section.querySelector(`label`).textContent = 'Sign In or Create an Account';
    //     section.querySelector(`.${ID}-no-account-change`).textContent = 'Checkout with your saved details.';
    //     section.querySelector(`#${ID}-SignInPassword`).closest('div').classList.remove(`${ID}-display-none`);
    //     section.querySelector(`.${ID}-need-help`).classList.remove(`${ID}-display-none`);
    //     section.querySelector(`#${ID}-RememberMe`).closest(`div`).classList.remove(`${ID}-display-none`);
    //   } else {
    //   const section = noAccountLink.closest(`fieldset`);
    //   //Sign in to continue
    //   section.querySelector(`.${ID}-signIn`).textContent = 'Continue';
    //   section.querySelector(`label`).textContent = 'Create an Account';
    //   section.querySelector(`.${ID}-no-account-change`).textContent = 'Register an account to checkout easier next time.';
    //   section.querySelector(`#${ID}-SignInPassword`).closest('div').classList.add(`${ID}-display-none`);
    //   noAccountLink.textContent = 'Got an account?';
    //   section.querySelector(`.${ID}-need-help`).classList.add(`${ID}-display-none`);
    //   section.querySelector(`#${ID}-RememberMe`).closest(`div`).classList.add(`${ID}-display-none`);
    //   noAccountLink.classList.add(`${ID}-show-sign-in`);
    //   if(section.querySelector(`.${ID}-error-message`)) {
    //     section.querySelector(`.${ID}-error-message`).remove();
    //   }
    //   }
    // });

    // Remember me
    function clickOriginalRememberMe() {
      document.querySelector('.checkout .login-box .login-rememberme .input-checkbox').click();
    }
    document.querySelector(`#${ID}-RememberMe`).addEventListener('click', function () {
      clickOriginalRememberMe();
    });

    //password reset modal
    const passwordResetModal = `
    <div class="${ID}-modal-container ${ID}-display-none">
      <div class="${ID}-overlay"></div>
      <div class="${ID}-password-reset-modal">
        <div class="${ID}-password-reset-modal-top">
          <h2 class="${ID}-password-reset-modal-title">Reset your password</h2>
          <button class="${ID}-password-reset-modal-close">X</button>
        </div>
        <div class="${ID}-password-reset-modal-content">
          <p class="${ID}-password-reset-modal-p">Confirm your email below and we'll send you a link to reset your password.</p>
          <div class="${ID}-email-field">
            <label for="${ID}-PasswordResetEmail" class="${ID}-label">Email</label>
            <input placeholder="example@example.com" type="email" id="${ID}-PasswordResetEmail" name="${ID}-PasswordResetEmail" class="${ID}-input" required>
          </div>
          <div id="${ID}-ErrorMessage" class="${ID}-error-message"></div>
          <button type="submit" class="${ID}-button ${ID}-password-reset-modal-button">Send email</button>
        </div>
      </div>
    </div>
    `;

    targetForm.insertAdjacentHTML('afterbegin', passwordResetModal);

    const needHelpLink = document.querySelector(`.${ID}-need-help`);
    const passwordResetModalContainer = document.querySelector(`.${ID}-modal-container`);
    const passwordResetModalClose = document.querySelector(`.${ID}-password-reset-modal-close`);
    const passwordResetModalButton = document.querySelector(`.${ID}-password-reset-modal-button`);
    const passwordResetEmail = document.getElementById(`${ID}-PasswordResetEmail`);

    needHelpLink.addEventListener('click', function () {
      passwordResetModalContainer.classList.remove(`${ID}-display-none`);
    });

    passwordResetModalClose.addEventListener('click', function () {
      passwordResetModalContainer.classList.add(`${ID}-display-none`);
    });

    passwordResetEmail.addEventListener('blur', function () {
      validateEmail(this);
    });

    passwordResetModalButton.addEventListener('click', function () {
      validateEmail(passwordResetEmail);
    });

    function sendPasswordResetEmail() {
      pollerLite(['.forgot-password-dialog .dialog-content input'], () => {
        const email = passwordResetEmail.value;
        console.log('email', email);
        //send email
        const passwordResetOriginalInput = document.querySelector('.forgot-password-dialog .dialog-content input');
        console.log(passwordResetOriginalInput, 'passwordResetOriginalInput');
        passwordResetOriginalInput.value = email;
        document.querySelector('.forgot-password-dialog .dialog-content button[type="submit"]').click();
      });
    }

    function openOriginalPasswordResetModal() {
      document.querySelector('.login-column #password-reset').click();
    }

    function passwordResetSuccess() {
      const passwordResetModalContent = document.querySelector(`.${ID}-password-reset-modal-content p`);
      passwordResetModalContent.innerText =
        'An email  has been sent to the email address entered with instructions on how to reset your password.';
      const newParagraph = `<p class="${ID}-password-reset-modal-p">To ensure our emails reach your inbox, add hello@email-hotelchocolat.com to your safe senders list.</p>`;
      passwordResetModalContent.insertAdjacentHTML('afterend', newParagraph);

      const passwordResetModalButton = document.querySelector(`.${ID}-password-reset-modal-button`);
      passwordResetModalButton.textContent = 'Got it';
      passwordResetModalButton.removeEventListener('click', sendPasswordResetEmail);
      passwordResetModalButton.addEventListener('click', function () {
        passwordResetModalContainer.classList.add(`${ID}-display-none`);
      });
    }

    passwordResetModalButton.addEventListener('click', function () {
      const isValid = validateEmail(passwordResetEmail);
      if (isValid) {
        openOriginalPasswordResetModal();
        sendPasswordResetEmail();
        passwordResetSuccess();
      }
    });

    //sign in functionality - sign in/create account - not shared in this variation
    const signInButton = document.querySelector(`.${ID}-signIn`);
    signInButton.addEventListener('click', function (e) {
      e.preventDefault();
      const email = document.getElementById(`${ID}-SignInEmail`).value;
      const password = document.getElementById(`${ID}-SignInPassword`).value;

      localStorage.setItem(`${ID}-sign-in-email`, email);
      const notGotAccount = document.querySelector(`.${ID}-show-sign-in`);
      if (!email) {
        const errorMessage = signInButton.closest(`.${ID}-fieldset`).querySelector(`#${ID}-ErrorMessage`);

        errorMessage.innerHTML = `${errorSVG} <p>Please enter your email address</p>`;
        const emailInput = document.querySelector(`#${ID}-SignInEmail`);
        if (emailInput.classList.contains(`${ID}-valid-style`)) {
          emailInput.classList.remove(`${ID}-valid-style`);
        }
        if (emailInput.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`)) {
          emailInput.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`).remove();
        }
        if (!emailInput.classList.contains(`${ID}-error-style`)) {
          emailInput.classList.add(`${ID}-error-style`);
        }
        emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
      }

      if (!password) {
        const passwordInput = document.querySelector(`#${ID}-SignInPassword`);
        const errorHtml = `<div id="${ID}-ErrorMessage" class="${ID}-error-message" style="margin-top: 5px">${errorSVG} <p>Please enter your password</p></div>`;
        passwordInput.insertAdjacentHTML('afterend', errorHtml);
        if (passwordInput.classList.contains(`${ID}-valid-style`)) {
          passwordInput.classList.remove(`${ID}-valid-style`);
        }
        if (passwordInput.closest(`.${ID}-password-field`).querySelector(`.${ID}-tick`)) {
          passwordInput.closest(`.${ID}-password-field`).querySelector(`.${ID}-tick`).remove();
        }
        if (!passwordInput.classList.contains(`${ID}-error-style`)) {
          passwordInput.classList.add(`${ID}-error-style`);
        }
        passwordInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
      }

      if (email && password) {
        document.querySelector('.checkout .login-column-right .login-box input.email-input').value = email;
        const passwordInput = document.querySelector('.checkout .login-column-right .login-box input.password-input');
        passwordInput.value = password;

        document.querySelector('.checkout .login-column-right .login-box button[type="submit"]').removeAttribute('disabled');
        document.querySelector('.checkout .login-column-right .login-box button[type="submit"]').click();
      }
      if (notGotAccount) {
        document.querySelector('.checkout .login-column-left .login-box.create-account input').value = email;
        document
          .querySelector('.checkout .login-column-left .login-box.create-account button[type="submit"]')
          .removeAttribute('disabled');
        document.querySelector('.checkout .login-column-left .login-box button[type="submit"]').click();
      }
    });

    const createAccountButton = document.querySelector(`.${ID}-create-account .${ID}-button`);
    createAccountButton.addEventListener('click', function (e) {
      e.preventDefault();
      const email = document.getElementById(`${ID}-CreateAccountEmail`).value;
      if (!email) {
        const errorMessage = createAccountButton.closest(`.${ID}-fieldset`).querySelector(`#${ID}-ErrorMessage`);

        errorMessage.innerHTML = `${errorSVG} <p>Please enter your email address</p>`;
        const emailInput = document.querySelector(`#${ID}-CreateAccountEmail`);
        if (emailInput.classList.contains(`${ID}-valid-style`)) {
          emailInput.classList.remove(`${ID}-valid-style`);
        }
        if (emailInput.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`)) {
          emailInput.closest(`.${ID}-email-field`).querySelector(`.${ID}-tick`).remove();
        }
        if (!emailInput.classList.contains(`${ID}-error-style`)) {
          emailInput.classList.add(`${ID}-error-style`);
        }
        emailInput.closest(`.${ID}-offset-container`).querySelector(`.${ID}-button`).disabled = true;
      } else {
        document.querySelector('.checkout .login-column-left .login-box.create-account input').value = email;
        document
          .querySelector('.checkout .login-column-left .login-box.create-account button[type="submit"]')
          .removeAttribute('disabled');
        document.querySelector('.checkout .login-column-left .login-box button[type="submit"]').click();
      }
    });

    //guest checkout functionality
    const guestButton = document.querySelector(`#${ID}GuestRadio`).closest(`.${ID}-fieldset`).querySelector(`.${ID}-button`);
    guestButton.addEventListener('click', function (e) {
      e.preventDefault();
      // const email = document.getElementById(`${ID}GuestEmail`).value;
      // const createAccount = document.getElementById(`${ID}-GuestAccount`).checked;
      // console.log(email);
      // const emailObj = {
      //   email: email,
      // }
      // localStorage.setItem(`${ID}-guestEmail`, JSON.stringify(emailObj));
      // localStorage.removeItem(`${ID}-guestEmail`);
      // if(createAccount){
      //   document.querySelector('.checkout .login-column-left .login-box.create-account input').value = email;
      //   document.querySelector('.checkout .login-column-left .login-box.create-account button[type="submit"]').removeAttribute('disabled');
      //   document.querySelector('.checkout .login-column-left .login-box button[type="submit"]').click();
      // } else {
      document.querySelector('.checkout .login-column .login-box button').click();
      // }
    });
    const passwordRevealIcon = document.querySelector(`.${ID}-password-icon`);
    passwordRevealIcon.addEventListener('click', function () {
      togglePasswordVisibility(`${ID}-SignInPassword`);
    });
  });
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (VARIATION == 1) {
    startExperiment();
  } else if (VARIATION == 2 || VARIATION == 3) {
    startExperiment2();
  }
};
