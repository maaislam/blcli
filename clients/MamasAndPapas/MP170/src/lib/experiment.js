/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { observer } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const orderSum = document.querySelector('.checkout__ordersummary');
  const checkoutRef = document.querySelector('.checkout');
  const questionWrap = document.querySelector('.checkout__heading__button');
  const globalMessages = document.querySelector('#globalMessages');
  const globalMessagesAlert = globalMessages.querySelector('.alert');
  const checkoutLoginEl = document.querySelector('#loginForm .checkout__login');
  const formUserCheckoutWrap = document.querySelector('.formUserCheckout');
  const guestMessage = document.querySelector('.checkout__guest__footer .form_field_error-message.forget-password.mb-0 + p');
  const continueBtnGuest = document.querySelector('.formGuestCheckout .checkout__footer button');
  const passInput = document.querySelector('input#j_password');

  // Add a dummy continue button
  checkoutRef.insertAdjacentHTML('beforeend', `
    <button id="MP170-cont" type="submit" class="btn btn-turquoise">Continue Securely</button>
  `);

  // Move order summary
  checkoutRef.insertAdjacentHTML('beforeend', orderSum.outerHTML);

  const showMessage = () => {
    formUserCheckoutWrap.insertAdjacentHTML('afterend', `
      <div class="MP170-message alert alert-danger">
        <p>Please select whether you have an account</p>
      </div>
    `);

  };

  // Add click event to dummy button
  const addedBtn = document.querySelector('#MP170-cont');
  if (addedBtn) {
    addedBtn.addEventListener('click', () => {
      showMessage();
    });
  }

  // Add click event for 'yes' 'no' wrapper
  const options = questionWrap.querySelectorAll('div[class*="formOptionGuest"]');
  let runScroll = false;
  if (options.length) {
    for (let i = 0; options.length > i; i += 1) {
      options[i].addEventListener('click', () => {
        // console.log()
        addedBtn.classList.add('d-none');
        const message = document.querySelector('.MP170-message');
        if (message) {
          message.parentNode.removeChild(message);
        }
  
        // Scroll user down
        if (!runScroll) {
          window.scrollBy(0, 100);
          runScroll = true;
        }
      });
    }
  }


  // Move Global Message
  if (document.querySelector('#loginForm .globalMessages')) {
    const addedmessage = document.querySelector('#loginForm .globalMessages');
    addedmessage.parentNode.removeChild(addedmessage);
  }

  checkoutLoginEl.insertAdjacentHTML('beforeend', globalMessages.outerHTML);
  

  // Add Observer to alert messages in order to change it
  const messageEl = document.querySelector('.checkout__login #globalMessages');
  observer.connect(messageEl, () => {
    const alertMessage = messageEl.querySelector('.alert');
    if (alertMessage.textContent == 'This email address is already registered with an account, please sign in to continue') {
      alertMessage.textContent = ''; // Clear it
      alertMessage.insertAdjacentHTML('beforeend', `
        <p>This email address is already registered with an account.</p>
        <p>We recommend to either:</p>
        <p>a) reset your password <a href="#" class="MP170-passReset">(here)</a> or</p>
        <p>b) use our guest checkout with a different email address</p>
      `);
    }
    if (alertMessage.textContent == 'Your email address or password is incorrect.') {
      // Style password input
      passInput.classList.add('MP170-error');

      alertMessage.textContent = ''; // Clear it
      alertMessage.insertAdjacentHTML('beforeend', `
        <p>Oops! That looks like the wrong password</p>
        <p>We recommend to either:</p>
        <p>a) reset your password <a href="#" class="MP170-passReset">(here)</a> or</p>
        <p>b) use our guest checkout with a different email address</p>
      `);
    }
    
    // Add event for password reset
    const passResets = document.querySelector('a.MP170-passReset');
    const originalPassReset = document.querySelector('h3.form_field_error-message.forget-password a');
    if (passResets) {
      passResets.addEventListener('click', () => {
        originalPassReset.click();
      });
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: true,
    }
  })

  // Move Guest Message below CTA
  continueBtnGuest.insertAdjacentHTML('afterend', guestMessage.outerHTML);
};

export default activate;
