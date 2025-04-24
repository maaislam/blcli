import AbstractStep from './AbstractStep';
import { cacheDom } from '../../../../../../lib/cache-dom';
import { events } from '../../../../../../lib/utils';
import { billingStep } from './Billing';
import { paymentStep } from './Payment';
import { shippingStep } from './Shipping';
import { shippingMethodStep } from './ShippingMethod';

/**
 * @desc CheckoutMethod (new user or existing customer)
 */
class CheckoutMethod extends AbstractStep {
  /**
   * @desc Initialise step
   */
  init() {
    this.setCheckoutMethod('guest');
    this.buildFauxEmail();

    return this;
  }

  /**
   * @desc Register validator, callback on success
   * @param {Function} success
   * @param {Function} error
   */
  registerValidator(success, error) {
    /**
     * @desc Validation rules
     * Default string implies required
     * Functions return boolean to pass
     */
    const validationRules = [
      () => {
        let valid = false;

        const fauxInput = cacheDom.get('.itx9-faux-email__input');

        if(fauxInput.value && fauxInput.value.match(/.+@.+\..{2,}/i)) {
          valid = true;
          this.markFieldValid(fauxInput);

          const errorMessages = cacheDom.getAll('#opc-login .itx9-faux-email .validation-advice', true);

          [].forEach.call(errorMessages, (errorMsg) => {
            if(errorMsg) {
              errorMsg.remove();
            }
          });
        } else {
          this.markFieldInvalid(fauxInput);
        }

        return valid;
      },
      () => {
        let valid = false;
        const fauxPassword = cacheDom.get('.itx9-faux-password');

        if(!!fauxPassword.value.trim()) {
          valid = true;
          this.markFieldValid(fauxPassword);

          const errorMessages = cacheDom.getAll('#opc-login .itx9-account__password-wrap .validation-advice', true);

          [].forEach.call(errorMessages, (errorMsg) => {
            if(errorMsg) {
              errorMsg.remove();
            }
          });
        } else {
          this.markFieldInvalid(fauxPassword);
        }

        return valid;
      }
    ];

    this.recursiveValidator(validationRules, success, error);
  }

  /**
   * Is valid step?
   *
   * @return {Boolean}
   */
  isValid() {
    const fauxInput = cacheDom.get('.itx9-faux-email__input');
    const fauxPassword = cacheDom.get('.itx9-faux-password');
    const accountYes = cacheDom.get('#itx9-account__yes');

    const invalidFields = [];

    if(!fauxInput.value || !fauxInput.value.match(/.+@.+\..{2,}/i)) {
      invalidFields.push('email');
    }

    if(accountYes.checked && fauxPassword && ( !fauxPassword.value.trim() )) {
      invalidFields.push('password');
    }

    if(invalidFields.length == 0) {
      return true;
    } else {
      return invalidFields;
    }
  }

  /**
   * @desc Set checkout method
   * @param {string} type Set method 'guest' or 'register'
   */
  setCheckoutMethod(type) {
    const input = cacheDom.get(`[name=checkout_method][value=${type}]`);
    input.setAttribute('checked', 'checked');
  }

  /**
   * @desc Build faux email address - this drives progression to next step 
   */
  buildFauxEmail() {
    const stepContent = cacheDom.get('#checkout-step-login');
    if(stepContent) {
      stepContent.classList.add('itx9-hide');

      stepContent.insertAdjacentHTML('afterend', `
          <div class="itx9-faux-email">
            <label class="itx9-faux-email__label itx9-custom-label">Hi! what's your email address?</label>
            <div class="input-box">
              <input type="email" required class="itx9-faux-email__input input-text">
            </div>
          </div>
          <div class="itx9-account">
            <label class="itx9-account__label itx9-custom-label">Do you have an account with us?</label>

            <ul class="itx9-account__yes-no sp-methods">
              <li class="itx9-account__yes-wrap">
                <input type="radio" class="itx9-account__yes" id="itx9-account__yes" name="itx9-account">
                <label for="itx9-account__yes">
                  yes, and my password is...
                </label>
              </li>

              <li class="itx9-account__password-wrap itx9-radioless">
                <label class="itx9-custom-label">Password</label>
                <input type="password" class="itx9-faux-password input-text">
                <p class="itx9-forgot-password-link itx9-field-desc itx9-text-right">
                  <a href="/customer/account/forgotpassword" class="itx9-text-lower">Forgot password</a>
                </p>
              </li>

              <li class="itx9-account__sign-in-wrap itx9-radioless itx9-text-center">
                <button class="button itx9-sign-in itx9-text-lower">
                  <span>
                    <span>
                      Sign in
                    </span>
                  </span>
                </button>
              </li>

              <li class="itx9-account__no-wrap">
                <input type="radio" class="itx9-account__no" id="itx9-account__no" name="itx9-account">
                <label for="itx9-account__no">
                  no, i'm checking out as a guest...
                  <span class="itx9-label__extra">
                    you can also register these details later on, bbz
                  </span>
                </label>
              </li>

              <li class="itx9-account__guest-continue-wrap itx9-radioless itx9-text-center">
                <button class="button itx9-guest-continue itx9-text-lower">
                  <span>
                    <span>
                      Continue
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
      `);

      this.userType = null;

      [].forEach.call(cacheDom.getAll('[name=itx9-account]'), (elm) => {
        elm.on('change', (e) => {
          const contWrap = cacheDom.get('.itx9-account__guest-continue-wrap');
          const signinWrap = cacheDom.get('.itx9-account__sign-in-wrap');
          const passWrap = cacheDom.get('.itx9-account__password-wrap');

          contWrap.classList.remove('itx9--active');
          signinWrap.classList.remove('itx9--active');
          passWrap.classList.remove('itx9--active');

          if(e.currentTarget.className.match(/itx9-account__no/)) {
            // Show continue button
            this.userType = 'guest';

            contWrap.classList.add('itx9--active');
          } else if(e.currentTarget.className.match(/itx9-account__yes/)) {
            // Show login button and password field
            this.userType = 'registered';

            signinWrap.classList.add('itx9--active');
            passWrap.classList.add('itx9--active');

            // Hide other payment steps
            billingStep.hideStep();
            paymentStep.hideStep();
            shippingMethodStep.hideStep();
          }
        });
      });

      // Event handlers for step progression
      const fauxInput = cacheDom.get('.itx9-faux-email__input');
      const fauxPasswordInput = cacheDom.get('.itx9-faux-password');
      const targetElm = cacheDom.get('#billing\\:email');
      const loginEmail = cacheDom.get('#login-email');
      const targetPasswordElm = cacheDom.get('#login-password');

      fauxInput.addEventListener('keyup', (e) => {
        const thisValue = e.currentTarget.value;
        targetElm.value = thisValue;
        loginEmail.value = thisValue;
      });

      fauxPasswordInput.addEventListener('keyup', (e) => {
        const thisValue = e.currentTarget.value;
        targetPasswordElm.value = thisValue;
      });

      /**
       * On trying to proceed validate
       */
      const validate = () => {
        const errorMessages = cacheDom.getAll('#opc-login .validation-advice', true);

        [].forEach.call(errorMessages, (errorMsg) => {
          if(errorMsg && errorMsg.classList.contains('validation-advice')) {
            errorMsg.remove();
          }
        });

        const validCheck = this.isValid();

        if(validCheck === true) {
          fauxInput.classList.remove('validation-failed');

          return true;
        } else {
          if(validCheck.indexOf('email') > -1) {
            fauxInput.classList.add('validation-failed');
            fauxInput.insertAdjacentHTML('afterend', `
              <div class="validation-advice">
                we still need your email to continue
              </div>
            `);
          }
          if(validCheck.indexOf('password') > -1) {
            fauxPasswordInput.classList.add('validation-failed');
            fauxPasswordInput.insertAdjacentHTML('afterend', `
              <div class="validation-advice">
                please enter a valid password
              </div>
            `);
          }

          this.scrollToStep(null, false);


          return false;
        }
      };
      
      // Proceed to next step
      cacheDom.get('.itx9-guest-continue').addEventListener('click', () => {
        if(validate()) {
          this.saveStep();

          billingStep.showStep(() => {
            billingStep.refreshSlider();  
          }, true, false);

          events.send('ITXXX-Checkout', 'did-click-continue-guest', 'valid');
        } else {
          events.send('ITXXX-Checkout', 'did-click-continue-guest', 'invalid');
        }
      });
      
      // Proceed to perform login
      cacheDom.get('.itx9-sign-in').addEventListener('click', () => {
        if(validate()) {
          this.killRecursiveValidator();

          cacheDom.get('#login-form button.button').click();
        }
      });

      // If email address exists on page load prepopulate email address box
      if(loginEmail && loginEmail.value.trim()) {
        fauxInput.value = loginEmail.value.trim();
        targetElm.value = loginEmail.value.trim();
      }

      // User entered invalid password on page load identify message
      const errorMessage = cacheDom.get('#checkout-step-login .new-users .alert-box');
      if(errorMessage) {
        const accountYes = cacheDom.get('[for=itx9-account__yes]');
        accountYes.click();

        // Show error message
        const fauxEmailWrap = cacheDom.get('.itx9-faux-email');
        fauxEmailWrap.insertAdjacentElement('beforebegin', errorMessage);
        setTimeout(() => {
            errorMessage.querySelector('.close').click();
        }, 5000);
      }
    }
  }

  /**
   * Save step
   */
  saveStep() {
    window.checkout.setMethod();
  }
}

export let checkoutMethodStep = new CheckoutMethod('#opc-login');
