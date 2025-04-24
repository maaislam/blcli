import { fullStory, events, viewabilityTracker } from '../../../../../lib/utils';
import { cacheDom } from '../../../../../lib/cache-dom';
import { checkoutMethodStep } from './steps/CheckoutMethod';
import { billingStep } from './steps/Billing';
import { shippingStep } from './steps/Shipping';
import { shippingMethodStep } from './steps/ShippingMethod';
import { paymentStep } from './steps/Payment';
import { userIsLoggedIn, showLoader, worldpay } from './helpers';

const eventSender = events.setDefaultCategory('ITXXX-Checkout');

/**
 * In The Style - Checkout Redesign
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ITXXXCheckout',
    VARIATION: '{{VARIATION}}',
  },

  /**
   * @desc Helper get info to attach to window
   */
  getInfo() {
    console.log(`%c${JSON.stringify(this.settings)}`, 'color: white; background: #1c3a70');
  },

  /**
   * @desc Page load tracking
   */
  pageLoadTracking() {
    const { settings } = Experiment;
    fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  },

  /**
   * @desc Setup
   */
  init() {
    // ----------------------------------------
    // Setup
    // ----------------------------------------
    const { settings } = Experiment;
    window[settings.ID] = Experiment;
    document.body.classList.add(settings.ID);
    this.pageLoadTracking();

    eventSender.send(null, 'did-render-new-checkout');
    
    // ----------------------------------------
    // Footer UI
    // ----------------------------------------
    const siteFooter = cacheDom.get('.site-footer');
    const paymentMethods = cacheDom.get('.site-footer .payment-methods');

    siteFooter.insertAdjacentHTML('beforebegin', `
      <div class="itx9-validation-box itx9-validation-box--inactive">
        <h3>Sorry babe please fix these errors:</h3>
        <div class="itx9-validation-box__errors">
        </div>
      </div>
    `);
    const validationBox = cacheDom.get('.itx9-validation-box');

    siteFooter.insertAdjacentHTML('beforebegin', `
      <footer class="itx9-cards-wrapper">
      ${paymentMethods.outerHTML}
      </footer>
    `);
     
    // ----------------------------------------
    // Override accordion open step as we take
    // care of that ourselves
    // ----------------------------------------
    window.checkout.gotoSection = (section) => {
      const sectionElement = document.querySelector('#opc-' + section);
      sectionElement.classList.add('allow');
      return;
    };
    
    // ----------------------------------------
    // Prime elements with 'default' values
    // ----------------------------------------
    const deliverToBilling = cacheDom.get('#billing\\:use_for_shipping_yes');
    if(deliverToBilling) {
      deliverToBilling.click();
    }
    
    // ----------------------------------------
    // Page main title
    // ----------------------------------------
    const pageTitle = cacheDom.get('.site-container .page-title');
    pageTitle.innerHTML = `
      <h1>
        Checkout
        <img width="32" height="32" class="itx9-checkout-padlock" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEA0lEQVRoQ9WZf04iSRTHq7oUG4LSGH8bBfEXEs3S8QByg3VOsLM32Bvs7A32BronWOcE6xzANBt/RFpF1PjbSKMEGrS7NpUMpjNWQ9drZjvTCf9A1fe9D/Xeq+pXGP3gD/7B/UddBVBVdQ1j/BFjnKWUZr/9czDGeUop+2xqmvalG39eVwCy2ewvGONPCKGkgFMlSumnfD7/l8Ccd0N9AayursYsy9pCCOV8OLFNCFnf2dmpQDTAAKqq/mTb9jZCSIEY/maOIUlSTtO0f0W1QACqqiYsy8p3yfmWzwYhJKtp2pkIBAhgeXlZQwi9S1IRwy5j83t7e6qIjjBAJpP5/WvCtrPDQmtTkqTS7u7ul5WVlTXbtlmCs1z52G4iS+yDg4M/vEIIAaRSqZgsy6U2ocPCYJ057ebA0tJSAmP8J0Jo3WWMYZpmslgsekpqIYB0Os3K5abb8jcajZxXw5lMZoNSyl0N9v3h4aGn8ioK8I9byWQJuL+/L1RF0un0KW/voJRuFQqFD17CSAhgcXGR8kTZzqrr+q9eDDrHsBVlc3nzCoWCJ988DWoZWFhY4ALYtp07Pj4WPhrMzc2tSZLEEv7do+u6J988DWqpz8/PcwHY2UfXdaHwYZqsKBBCDB7A0dGRJ988DWoZmJ2d5QKcnJwI6Tgd9qspZDiVSnEBisWikI4TwK+mkOGZmRkuwOnpqZCOE8CvppDhZDLJBSiVSkI6TgC/mkKGE4kEF+Ds7ExIxwngV1PI8PT0NBfg/PxcSMcJ4FdTyPDU1BQX4OLiQkjHCeBXU8jw5OQkF+Dy8lJIxwngV7Oj4YmJie919vd68shfXV25viO0BRgfH08ghNjxOdDn+vra1c+OKzA2NsYNm/+T6ObmBg4wOjoaOMDt7S0cYGRkJHCAu7s7OMDw8HDgAPf393CAoaGhwAEeHh7gAIODg4EDPD4+wgHi8TgUgHXbfrMsq0QISdq2zToRoC5euVyGAyiKAgXIGYbx9pqpKMoaQoj7+tipJBuGAQeIxWIggEql8s5oN7Va0B03soGBARCAJElJwzDe+pyKoiRs2wbt6k9PT/AV6O/vBwGwywxCSK5cLlfi8Thrw2/zLj06hQ/7/fn5GQ4QjUZBAF8d26pWqx+i0ejfbVqJHRmq1SocIBKJ+AFYr9VqnyORyM8IIXYRAnpqtRocIBwOQwGMer0eb3kcDofL0DJar9fhALIsQwE2TdN8azfKsrzRqbXutjymacIB+vr6QACs59lsNt8AQqHQBrvBhMRQo9GAA4RCIRAAxFG3Oc1mEw7Q29sbOMDLywscoKenJ3CA19dXOAAhJHAAy7LgABjjwAEopXAAhFDgbRWEEKyt0s1K8r20/gNeuIBA/n7u9AAAAABJRU5ErkJggg==" />
      </h1>
      <p class="page-title__subtitle">Hey babe, not much longer now until you're looking hot af</p>
    `;
    
    // ----------------------------------------
    // Off canvas minibag menu UI
    // ----------------------------------------
    const toggleButton = cacheDom.get('.right-off-canvas-toggle span span');
    if(toggleButton) {
      toggleButton.innerHTML = 'Back to Checkout';
    }

    if(userIsLoggedIn()) {
      eventSender.send(null, 'logged-in-user');
    } else {
      eventSender.send(null, 'not-logged-in-user');
    }
    
    // ----------------------------------------
    // Initialise steps
    //
    // Checkout Method (user guest / register)
    // is only for anonymous users
    // ----------------------------------------
    if(!userIsLoggedIn()) {
      checkoutMethodStep.init();
    }

    billingStep.init();
    shippingMethodStep.init();
    paymentStep.init();
    shippingStep.init();

    // ------------------------------------------------------------
    // On load open first step
    // ------------------------------------------------------------
    if(!userIsLoggedIn()) {
      checkoutMethodStep.showStep();
    } else {
      billingStep.showStep();
    }

    // Step 1
    if(!userIsLoggedIn()) {
      checkoutMethodStep.registerValidator(() => {
        checkoutMethodStep.saveStep();
      }, () => {
        if(checkoutMethodStep.isValid() !== true) {
          billingStep.hideStep();
          paymentStep.hideStep();
          shippingMethodStep.hideStep();
        }
      });
    }

    const accountYes = cacheDom.get('#itx9-account__yes');

    // Step 2
    billingStep.registerValidator((didChangeState) => {
      if(!userIsLoggedIn() && checkoutMethodStep.isValid() !== true) {
        return;
      }

      if(didChangeState) {
        billingStep.saveStep();
      }
        
      if(!shippingStep.isShippingDifferent()) {
        validationBox.classList.remove('itx9-validation-box--has-errors');
      }

      if(accountYes && accountYes.checked) {
        return;
      }
      
      // ------------------------------------------------------------
      // Successful validation of billing steps
      // ------------------------------------------------------------
      if(!shippingMethodStep.isStepVisible()) {
        billingStep.showStep();
        billingStep.saveStep();

        showLoader();

        shippingMethodStep.showStep();
        paymentStep.showStep();
      }
    }, () => {
      // ------------------------------------------------------------
      // Billing step is no longer valid
      // ------------------------------------------------------------
      if(shippingMethodStep.isStepVisible()) {
        shippingMethodStep.hideStep();
      }
      if(paymentStep.isStepVisible()) {
        paymentStep.hideStep();
      }
      
      // Update validation box
      if(!accountYes || !accountYes.checked) {
        const valBoxErrors = cacheDom.get('.itx9-validation-box__errors');

        valBoxErrors.innerHTML = '';

        const invalidFields = cacheDom.getAll('#billing-new-address-form .input-text.itx9-invalid', true);
        if(invalidFields.length > 0) {
          validationBox.classList.add('itx9-validation-box--has-errors');

          [].forEach.call(invalidFields, (field) => {
            if(field.dataset['itx9error']) {
              valBoxErrors.insertAdjacentHTML('beforeend', `
                <div class="itx9-error">
                ${field.dataset['itx9error']}
                </div>
              `);
            }
          });
        }
      } else {
        validationBox.classList.remove('itx9-validation-box--has-errors');
      }

    });

    // Shipping
    shippingStep.registerValidator((didChangeState) => {
      if(!userIsLoggedIn() && checkoutMethodStep.isValid() !== true) {
        return;
      }
      if(accountYes && accountYes.checked) {
        return;
      }

      const shippingDifferent = shippingStep.isShippingDifferent();
      if(didChangeState && shippingDifferent) {
        shippingStep.saveStep();

        if(!paymentStep.isStepVisible()) {
          paymentStep.showStep(); 
        }
      }
        
      if(billingStep.getIsValid()) {
        validationBox.classList.remove('itx9-validation-box--has-errors');
      }
    }, () => {
      if(paymentStep.isStepVisible()) {
        paymentStep.hideStep(); 
      }
      
      // Update validation box
      if(!accountYes || !accountYes.checked) {
        const valBoxErrors = cacheDom.get('.itx9-validation-box__errors');

        valBoxErrors.innerHTML = '';

        const invalidFields = cacheDom.getAll('#shipping-new-address-form .input-text.itx9-invalid', true);
        if(invalidFields.length > 0) {
          validationBox.classList.add('itx9-validation-box--has-errors');

          [].forEach.call(invalidFields, (field) => {
            if(field.dataset['itx9error']) {
              valBoxErrors.insertAdjacentHTML('beforeend', `
                <div class="itx9-error">
                ${field.dataset['itx9error']}
                </div>
              `);
            }
          });
        }
      } else {
        validationBox.classList.remove('itx9-validation-box--has-errors');
      }
    });

    // Step 3
    shippingMethodStep.registerValidator(() => {
      shippingMethodStep.saveStep();

      if(!paymentStep.isStepVisible()) {

        showLoader();

        paymentStep.showStep();
      }
    }, () => {
      paymentStep.hideStep();
    });

    // Payment validation
    paymentStep.registerValidator(() => {
      const submit = cacheDom.get('#checkout-review-submit .step-review-button-set', true);
      submit.querySelector('span span').innerHTML = 'pay securely';
      submit.style.opacity = 1;

      worldpay();
    }, () => {
      const submit = cacheDom.get('#checkout-review-submit .step-review-button-set', true);
      submit.querySelector('span span').innerHTML = 'please fill in all card fields';
      submit.style.opacity = 0.2;
    });

    // Validation box activation conditions
    if(userIsLoggedIn()) {
      // Logged in user already has address info given
      validationBox.classList.remove('itx9-validation-box--inactive');
    } else {
      const initValBox = window.addEventListener('scroll', (e) => {
        if(billingStep.isStepVisible()) {
          const createAccount = cacheDom.get('.itx9-create-account', true);
          if(createAccount) {
            const createAccountOffsetTop = (createAccount.getBoundingClientRect()).top;
            if(createAccountOffsetTop <= 180) {
              validationBox.classList.remove('itx9-validation-box--inactive');

              window.removeEventListener('scroll', initValBox);
            }
          }
        }
      });
    }
  }
};

export default Experiment;
