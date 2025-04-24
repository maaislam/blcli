import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const startExperiment = () => {
  console.log('Experiment started 00');

  pollerLite(
    ['.main', () => typeof window.Moengage === 'function' && typeof window.Moengage.onsite.registerCallback === 'function'],
    () => {
      //only works on homepage
      // console.log('Moengage loaded');

      const getUserData = new Promise((resolve, reject) => {
        // window.Moengage.onsite.registerCallback('optedin', function (err, data) {
        //   if (err) {
        //     return console.error('Error from moengage:', err);
        //   }
        //   console.log('Data for campaign:', data);
        //   var payload = data.payload;
        //   // var impTracker = data.imp;
        //   const moengageObj = payload;
        //   resolve(moengageObj);
        // });

        window.Moengage.onsite.getData('optedin', function (err, data) {
          if (err) {
            return console.error('Error from moengage:', err);
          }
          console.log('Data for campaign:', data);
          var payload = data.payload; // Campaign payload defined during campaign creation
          var impTracker = data.imp; // Function, you can call impTracker() to
          impTracker();
          console.log(impTracker);
          const moengageObj = payload;
          resolve(moengageObj);
        });
      });

      getUserData.then((moengageObj) => {
        console.log('moengageObj', moengageObj);

        const emailField = document.querySelector('#myDetails .reqField.emailAddress');

        const storage = localStorage.getItem(`${ID}-moengageObj`);
        if (storage) {
          const newEmail = JSON.parse(storage)['email'];
          if (newEmail === emailField.value) {
            console.log('user already registered, so do not show checkbox');
            return;
          }
        }

        localStorage.setItem(`${ID}-moengageObj`, JSON.stringify(moengageObj));
      });
    }
  );

  pollerLite(
    [
      '.main .chForm #myDetails',
      () =>
        typeof window.Moengage === 'function' &&
        typeof window.Moengage.onsite.getData === 'function' &&
        typeof window.Moengage.add_unique_user_id === 'function' &&
        typeof window.Moengage.add_email === 'function' &&
        typeof window.Moengage.onsite.registerCallback === 'function',
    ],
    () => {
      const storage = localStorage.getItem(`${ID}-moengageObj`);
      if (storage) {
        const unsubscribed = JSON.parse(storage)['moe_unsubscribe'];
        if (unsubscribed === 'True') {
          console.log('user is unsubscribed, so do not show checkbox');
          return;
        }
      }

      console.log('Experiment started');

      document.querySelector('.main .chForm #myDetails .contactNumber').closest('div').querySelector('p').style.display = 'none';

      const newCheckboxHtml = `
    <div class="${ID}-checkbox-container" style="display: none;">
      <div class="${ID}-checkbox-container-title">
        <h3>How can we stay in touch?</h3>
      </div>
      <div class="${ID}-checkbox-container-text">
        <p>
          Tick to optin if you want to receive updates, offers and hotel openings.
           If you opt in or have previously opted in, you can opt out at any point by clicking the unsubscribe link found in our emails.
        </p>
        <p class="${ID}-display-none ${ID}-success-message">
          Your communication preferences have been saved
        </p>
      </div>
      <div class="${ID}-checkbox-container-checkbox">
        <input type="checkbox" id="${ID}-email" name="consent"  />
        <label for="${ID}-email">Email</label>
        <input type="checkbox" id="${ID}-sms" name="consent"  />
        <label for="${ID}-sms">SMS</label>
      </div>
    </div>`;
      const duplicateMessages = document.querySelectorAll(`.${ID}-checkbox-container`);
      if (duplicateMessages.length > 0) {
        //remove all except the last one
        duplicateMessages.forEach((el) => {
          el.remove();
        });
      }
      const targetContainer = document.querySelector('.main .chForm #myDetails');
      targetContainer.insertAdjacentHTML('afterend', newCheckboxHtml);

      const emailCheckbox = document.querySelector(`#${ID}-email`);
      const smsCheckbox = document.querySelector(`#${ID}-sms`);

      const changeToSuccessMessage = () => {
        const originalMessage = document.querySelector(`.${ID}-checkbox-container`);
        if (originalMessage) {
          originalMessage.style.display = 'none';
        }

        const successMessage = `
      <div class="${ID}-checkbox-container">
        <div class="${ID}-checkbox-container-text">
          <p class="${ID}-success-message">
            Your communication preferences have been saved <i class="iValidTick"></i>
          </p>
        </div>
      </div>`;
        const duplicateMessages = document.querySelectorAll(`.${ID}-checkbox-container`);
        if (duplicateMessages.length > 0) {
          //remove all except the last one
          duplicateMessages.forEach((el) => {
            el.remove();
          });
        }
        const targetContainer = document.querySelector('.main .chForm #myDetails');
        targetContainer.insertAdjacentHTML('afterend', successMessage);
      };

      emailCheckbox.addEventListener('change', (e) => {
        console.log('emailCheckbox checked:', e.target.checked);
        //set the email to local storage if email is not already in local storage
        const emailInput = document.querySelector('#checkout .reqField.emailAddress');
        const email = emailInput.value.trim();
        const localStorageKey = `${ID}-email`;
        let emailArray = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        let isEmailExists = false;

        if (emailCheckbox.checked) {
          if (emailArray.includes(email)) {
            isEmailExists = true;
            console.log('Email already exists in localStorage:', email);
            return;
          } else {
            emailArray.push(email);
            localStorage.setItem(localStorageKey, JSON.stringify(emailArray));
            console.log('Email added to localStorage:', email);
          }
        }
        // else {
        //   // If unchecked, remove the email from the array
        //   emailArray = emailArray.filter(storedEmail => storedEmail !== email);
        //   localStorage.setItem(localStorageKey, JSON.stringify(emailArray));
        //   console.log('Email removed from localStorage:', email);
        // }

        if (isEmailExists) return;

        setTimeout(() => {
          //check if both checkboxes are checked and if email and mobile are valid
          if (
            e.target.checked &&
            smsCheckbox.checked &&
            !document.querySelector('.chForm .reqField.contactNumber').closest('.field').classList.contains('fieldError') &&
            !document.querySelector('.chForm .reqField.emailAddress').closest('.field').classList.contains('fieldError')
          ) {
            const email = document.querySelector('.chForm .reqField.emailAddress').value;
            const mobile = document.querySelector('.chForm .reqField.contactNumber').value;
            if (email === '' || mobile === '') {
              return;
            }
            window.Moengage.add_unique_user_id(email).then((res) => {
              window.Moengage.add_user_attribute('moe_unsubscribe', false);
              window.Moengage.add_mobile(mobile);
              window.Moengage.add_user_attribute('src', 'booking-form');
              window.Moengage.add_user_attribute('smspermit', true).then((res) => {
                // console.log('Moengage add_user_attribute sent');
                console.log(res);
              });
              window.Moengage.add_email(email);
              window.Moengage.add_user_attribute('emailpermit', true).then((res) => {
                // console.log('Moengage add_user_attribute sent');
                console.log(res);
              });
              changeToSuccessMessage();
            });
          }

          // check if email checked and if email is valid
          if (
            e.target.checked &&
            !document.querySelector('.chForm .reqField.emailAddress').closest('.field').classList.contains('fieldError')
          ) {
            const email = document.querySelector('.chForm .reqField.emailAddress').value;
            // console.log('email', email);
            window.Moengage.add_unique_user_id(email).then((res) => {
              window.Moengage.add_email(email);
              window.Moengage.add_user_attribute('src', 'booking-form');
              window.Moengage.add_user_attribute('moe_unsubscribe', false);
              window.Moengage.add_user_attribute('emailpermit', true).then((res) => {
                // console.log('Moengage add_user_attribute sent');
                console.log(res);
              });
              changeToSuccessMessage();
            });
          } else {
            console.log('email not checked or email is not valid');
            // window.Moengage.add_user_attribute("emailpermit", false).then((res) => {
            //   console.log('Moengage add_user_attribute sent');
            //   console.log(res);
            // });
          }
        }, 6000);
      });

      smsCheckbox.addEventListener('change', (e) => {
        setTimeout(() => {
          //check if both checkboxes are checked and if email and mobile are valid
          if (
            e.target.checked &&
            emailCheckbox.checked &&
            !document.querySelector('.chForm .reqField.contactNumber').closest('.field').classList.contains('fieldError') &&
            !document.querySelector('.chForm .reqField.emailAddress').closest('.field').classList.contains('fieldError')
          ) {
            const email = document.querySelector('.chForm .reqField.emailAddress').value;
            const mobile = document.querySelector('.chForm .reqField.contactNumber').value;
            window.Moengage.add_unique_user_id(email).then((res) => {
              window.Moengage.add_user_attribute('moe_unsubscribe', false);
              window.Moengage.add_mobile(mobile);
              window.Moengage.add_user_attribute('src', 'booking-form');
              window.Moengage.add_user_attribute('src', 'checkout');
              window.Moengage.add_user_attribute('smspermit', true).then((res) => {
                // console.log('Moengage add_user_attribute sent');
                console.log(res);
              });
              window.Moengage.add_email(email);
              window.Moengage.add_user_attribute('emailpermit', true).then((res) => {
                // console.log('Moengage add_user_attribute sent');
                console.log(res);
              });
              changeToSuccessMessage();
            });
          }

          //check if sms checked and if mobile & email is valid
          if (
            e.target.checked &&
            !document.querySelector('.chForm .reqField.contactNumber').closest('.field').classList.contains('fieldError') &&
            !document.querySelector('.chForm .reqField.emailAddress').closest('.field').classList.contains('fieldError')
          ) {
            const email = document.querySelector('.chForm .reqField.emailAddress').value;
            const mobile = document.querySelector('.chForm .reqField.contactNumber').value;
            window.Moengage.add_unique_user_id(email).then((res) => {
              window.Moengage.add_mobile(mobile);
              window.Moengage.add_user_attribute('src', 'booking-form');
              window.Moengage.add_user_attribute('smspermit', true).then((res) => {
                console.log('Moengage add_user_attribute sent');
                console.log(res);
              });
              changeToSuccessMessage();
            });
          } else {
            console.log('sms not checked or mobile is not valid or email is not valid');
          }
        }, 6000);
      });
    }
  );
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  pollerLite(
    [
      () =>
        typeof window.Moengage === 'function' &&
        typeof window.Moengage.onsite.getData === 'function' &&
        typeof window.Moengage.add_unique_user_id === 'function' &&
        typeof window.Moengage.add_email === 'function' &&
        typeof window.Moengage.onsite.registerCallback === 'function',
    ],
    () => {
      const emailInput = document.querySelector('#checkout .reqField.emailAddress');
      const email = emailInput.value;
      const mobileInput = document.querySelector('#checkout .reqField.contactNumber');
      const mobile = mobileInput.value;

      emailInput.addEventListener('input', (e) => {
        const emailValue = e.target.value;
        const emailArray = JSON.parse(localStorage.getItem(`${ID}-email`)) || [];
        const checkboxContainer = document.querySelector(`.${ID}-checkbox-container`);

        // console.log('email - emailArray', emailArray);
        // console.log('email - emailValue', emailValue);

        if (emailArray.includes(emailValue) && checkboxContainer) {
          checkboxContainer.style.display = 'none';
          // console.log('User already registered, so do not run the test');
          return;
        }

        checkboxContainer.style.display = 'flex';

        window.Moengage.add_unique_user_id(email).then((res) => {
          window.Moengage.add_user_attribute('moe_unsubscribe', false);
          window.Moengage.add_user_attribute('src', 'booking-form');

          window.Moengage.add_email(email);
          window.Moengage.add_user_attribute('emailpermit', true).then((res) => {
            // console.log('Moengage add_user_attribute sent');
            console.log('test res', res);
            window.enableEmail = res;
          });
        });
      });

      mobileInput.addEventListener('input', () => {
        window.Moengage.add_unique_user_id(email).then((res) => {
          window.Moengage.add_user_attribute('moe_unsubscribe', false);
          window.Moengage.add_user_attribute('src', 'booking-form');

          window.Moengage.add_mobile(mobile);
          window.Moengage.add_user_attribute('smspermit', true).then((res) => {
            // console.log('Moengage add_user_attribute sent');
            console.log('test res mob', res);
            window.enableSms = res;
          });
        });
      });
    }
  );

  startExperiment();

  const myEmailField = document.querySelector('#myDetails .reqField.emailAddress');
  const phoneField = document.querySelector('#myDetails .reqField.contactNumber');

  myEmailField.addEventListener('input', () => {
    startExperiment();
  });
  phoneField.addEventListener('input', () => {
    startExperiment();
  });
};
