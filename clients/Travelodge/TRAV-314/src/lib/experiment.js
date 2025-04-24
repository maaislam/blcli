/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // ...
  // console.log('Experiment started');
  pollerLite(['.pgHome .main .espot-container', () => typeof window.Moengage === 'function' &&
    typeof window.Moengage.onsite.registerCallback === 'function'], () => {
      //only works on homepage
      // console.log('Moengage loaded');
      const getUserData = new Promise((resolve, reject) => {
        window.Moengage.onsite.getData("optedin", function (err, data) {
          if (err) {
            return console.error('Error from moengage:', err);
          }
          // console.log('Data for campaign:', data);
          var payload = data.payload; // Campaign payload defined during campaign creation
          var impTracker = data.imp; // Function, you can call impTracker() to 
          impTracker();
          // console.log(impTracker);
          const moengageObj = payload;
          resolve(moengageObj)
        })
      });

      const createAndInsertCRM = () => {

        const crmHtml = `
          <div class="${ID}-crm-container">
            <div class="${ID}-crm-container-left">
              <div class="${ID}-crm-container-left-content">
                <h3>Unlock exclusive offers</h3>
                <p>Sign-up to be the first to hear about the latest news, room sales and special offers from Travelodge.</p>
              </div>
            </div>
            <div class="${ID}-crm-container-right">
              <div class="${ID}-crm-container-right-content">
                <form class="${ID}-crm-form">
                  <input type="email" id="crm-email" placeholder="Email Address" />
                  <button type="submit">Sign up</button>
                  <p>To unsubscribe, simply click the unsubscribe link in our emails anytime. <a href="/about/privacy-policy/">Privacy policy.</a></p>
                </form>
              </div>
            </div>
          </div>
        `;

        const targetContainer = document.querySelector('.pgHome .main .formSearchWidget');
        targetContainer.insertAdjacentHTML('afterend', crmHtml);

        const tickIcon = `<i class="iValidTick ${ID}-valid-tick"></i>`

        function errorMessaging() {
          const errorMessage = `
            <div class="${ID}-error-message">
              <p>Please enter an email address using the correct format</p>
            </div>
            `;

          if (document.querySelector(`.${ID}-error-message`)) {
            return;
          }
          const targetContainer = document.querySelector(`.${ID}-crm-form input[type="email"]`);
          targetContainer.insertAdjacentHTML('afterend', errorMessage);

          const emailField = document.querySelector(`.${ID}-crm-form input[type="email"]`);
          emailField.classList.add(`${ID}-error-styling`);
        }

        //watch for change in email field and validate email
        const emailField = document.querySelector('#crm-email');
        emailField.addEventListener('change', (e) => {
          const email = e.target.value;
          if (!email.includes('@') || !email.includes('.')) {
            errorMessaging();
            if (document.querySelector(`.${ID}-valid-tick`)) {
              document.querySelector(`.${ID}-valid-tick`).remove();
            }
          } else {
            emailField.setCustomValidity('');
            emailField.insertAdjacentHTML('afterend', tickIcon);
            document.querySelector(`.${ID}-error-message`).remove();
            emailField.classList.remove(`${ID}-error-styling`);
          }
        });

        const crmForm = document.querySelector(`.${ID}-crm-form`);
        crmForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.querySelector('#crm-email').value;
          if (!email.includes('@') || !email.includes('.')) {
            errorMessaging();
            return;
          }
          window.Moengage.add_unique_user_id(email).then((res) => {
            window.Moengage.add_user_attribute("moe_unsubscribe", false);
            window.Moengage.add_user_attribute("src", "homepage");
            window.Moengage.add_email(email);
            window.Moengage.add_user_attribute("emailpermit", true);
          })
            .then(() => {
              // change sign up button to subscribed
              const submitButton = document.querySelector(`.${ID}-crm-form button`);
              submitButton.textContent = 'Subscribed';
              submitButton.disabled = true;
              fireEvent('Click - Moengage user subscribed');
            });
        });
      }

      getUserData.then((moengageObj) => {
        // console.log('moengageObj', moengageObj);
        if (moengageObj.moe_unsubscribe === "True" || moengageObj.email) {
          return;
        } else {
          createAndInsertCRM();
        }
      });

    });
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-MELVDQ5FNP';

  setup();

  logMessage(ID + " Variation: " + VARIATION);

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
  startExperiment();
};
