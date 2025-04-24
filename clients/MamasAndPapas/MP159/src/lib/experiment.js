/**
 * MP159 - Login Improvements
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();

  // Poll for HJ
  pollerLite([() => {
    let run = false;
    if (typeof hj === "function") {
      run = true;
    }
    return run;
  }], () => {
    hj('tagRecording', ['MP159']);
  });

  const loginChanges = () => {
    // Cache page elements
    const guestEls = {
      emailBlock: cacheDom.get('#guestForm .form_field-elements.mirror[data-mirrored="username"]'),
      submitButton: cacheDom.get('#guestForm button.btn.btn-turquoise'),
    }
    const accountEls = {
      emailBlock: cacheDom.get('#loginForm .form_field-elements.mirror[data-mirrored="username"]'),
      passwordInput: cacheDom.get('#loginForm input#j_password'),
    }

    // Change title
    const loginTitle = cacheDom.get('h2.checkout_title');
    if (loginTitle) {
      loginTitle.textContent = '';
    }

    // Add welcome message
    const introRef = cacheDom.get('.checkout_form.js-checkout');
    if (introRef) {
      introRef.insertAdjacentHTML('afterbegin', `
        <div class="MP159-intro--message">
          <h1>Hello!</h1>
          <p>Please enter your email address to checkout.</p>
        </div>
      `);
    }

    const changeMessage = () => {
      const addedMessageEl = document.querySelector('.MP159-intro--message');
      if (addedMessageEl) {
        addedMessageEl.innerHTML = '';
        addedMessageEl.insertAdjacentHTML('afterbegin', `
          <h1>Welcome Back!</h1>
          <p>This email address is already registered with an account. Please enter your password to continue.</p>
        `);
      }
      events.send(settings.ID, 'Saw', 'Registered user (sees password field)');
    }

    const changeMessageForget = (emailAddy) => {
      const addedMessageEl = document.querySelector('.MP159-intro--message');
      if (addedMessageEl) {
        addedMessageEl.innerHTML = '';
        addedMessageEl.insertAdjacentHTML('afterbegin', `
          <h1>Help is on the way!</h1>
          <p>We've emailed <strong>${emailAddy}</strong> a link to create a new password</p>

          <p class="MP159-small">
            Please check your spam folder if you don't see it in your inbox. If you reset your password on the same device we can keep your items in your bag for you.
          </p>
        `);
      }
    };

    const changeMessagePassword = () => {
      const addedMessageEl = document.querySelector('.d-block form .form_field_error-message');
      const forgetLink = addedMessageEl.querySelector('a.password-forgotten');
      if (forgetLink) {
        forgetLink.textContent = 'reset it here';
      }
      if (addedMessageEl) {
        if (!document.querySelector('.MP159-forgotten--password')) {
          addedMessageEl.insertAdjacentHTML('afterbegin', `
            <div class="MP159-forgotten--password">
              <p class="MP159-large"><strong>Oops! That looks like the wrong password</strong></p>
              <p>Try again or quickly </p>
            </div>
          `);
          events.send(settings.ID, 'Saw', 'User is displayed with incorrect password error');
        }
      }
    }

    const changeForgotLink = () => {
      const forgetLink = document.querySelector('.form_field_error-message.forget-password a');
      if (forgetLink) {
        forgetLink.innerHTML = 'Forgotten your password? <span>Reset it here</span>, It\'s quick & easy!';
      }
    };

    // Move global messages closer to the inputs
    const globalMessageEl = cacheDom.get('#globalMessages');
    const newMessageRef = cacheDom.get('.checkout_form.js-checkout');
    if (newMessageRef && globalMessageEl) {
      newMessageRef.insertAdjacentElement('afterbegin', globalMessageEl);
    }

    // Change email input type to 'email' not 'text'
    const guestEmail = guestEls.emailBlock.querySelector('input[type="text"]');
    const accountEmail = accountEls.emailBlock.querySelector('input[type="text"]');
    if (guestEmail) {
      guestEmail.setAttribute('type', 'email');
    }
    if (accountEmail) {
      accountEmail.setAttribute('type', 'email');
    }

    const forgotPasswordLink = cacheDom.get('.form_field_error-message.forget-password');
    const storedEmail = accountEls.emailBlock.querySelector('input[type="email"]');

    if (forgotPasswordLink) {
      forgotPasswordLink.addEventListener('click', (e) => {
        let thisEmail;
        if (storedEmail) {
          thisEmail = storedEmail.value;
        }

        pollerLite(['form#forgottenPwdForm .control-group input[type="text"]'], () => {
          const forgottenPasswordForm = document.querySelector('form#forgottenPwdForm');
          const fpEmail = document.querySelector('form#forgottenPwdForm .control-group input[type="text"]');
          const fpSubmit = document.querySelector('form#forgottenPwdForm button.positive');

          fpEmail.value = thisEmail;
          setTimeout(() => {
            fpSubmit.click();
          }, 500);
        });
      });
    }
    pollerLite(['#validEmail.alert.alert-success'], () => {
      /**
       * Forgotten password success message.
       */
      const successMessage = document.querySelector('#validEmail.alert.alert-success');
      const addedMessageEl = document.querySelector('.d-block form .form_field_error-message');
      const reLoginForm = document.querySelector('.d-block');
      const introMessage = document.querySelector('.MP159-intro--message');

      successMessage.classList.add('MP159-hide');
      addedMessageEl.classList.add('MP159-hide');
      // Hide login forms
      reLoginForm.classList.add('MP159-hide');
      introMessage.classList.add('py-5');
      changeMessageForget(storedEmail.value);

    });

    // Add observer to globalMessages
    observer.connect(globalMessageEl, () => {
      pollerLite(['#globalMessages .alert.alert-danger'], () => {
        const addedDiv = document.querySelector('#globalMessages .alert');
        if (addedDiv && addedDiv.textContent.match(/Your username or password was incorrect/gi)) {
          addedDiv.textContent = 'Your password was incorrect.'
          addedDiv.classList.add('MP159-hide');
          changeMessagePassword();
        }
        if (addedDiv && addedDiv.textContent.match(/This email address is already registered with an account, please sign in to continue/gi)) {
          // Don't show green alert bars now, change title messaging
          addedDiv.classList.add('MP159-hide');
          changeMessage();
          // Chane forgotten password link
          changeForgotLink();
          // Highlight email input
          const emailInput = document.querySelector('input#j_username');
          if (emailInput) {
            emailInput.classList.add('MP159-active--input');
            emailInput.parentElement.classList.add('MP159-active--label');
          }
        }
      })
      
    }, {
      config: {
        attributes: true,
        childList: true,
      }
    });
  }
  pollerLite([
    '.pageLabel-checkout-login',
    '.form_field_error-message.forget-password',
    '.checkout_heading',
    '.form_field-elements',
  ], loginChanges);

  /**
   * Add delivery address
   */
  pollerLite(['#mnpAddressForm'], () => {
    const deliveryTitle = document.querySelector('h2.checkout_title');
    const formWrapper = document.querySelector('.checkout_form .row.bg-white');
    if (deliveryTitle) {
      deliveryTitle.textContent = 'Welcome to Guest Checkout';
    }
    if (formWrapper) {
      formWrapper.insertAdjacentHTML('afterbegin', `
        <h3>Delivery Address</h3>
        <a class="MP159-try-again" href="https://www.mamasandpapas.com/en-gb/login/checkout"><i class="fa fa-chevron-left" aria-hidden="true"></i> Enter a different email address</a>
      `);
    }
  });

};

export default activate;
