/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, setCookie, getCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  pollerLite(['.c-subscription-form', '.c-subscription-form__dismiss'], () => {

    let notificationForm = document.querySelector('.c-subscription-form');
    let notificationFormDismiss = document.querySelector('.c-subscription-form__dismiss');

    notificationFormDismiss.addEventListener('click', () => {

      setCookie(`${ID}-form-dismissed`, `true`);
      notificationForm.classList.add(`${ID}-hidden`);
      fireEvent(`Click - user has clicked on the close X`, true);

    });

    if(getCookie(`${ID}-form-dismissed`) == 'true') {
      notificationForm.classList.add(`${ID}-hidden`);
      fireEvent(`Interaction - the cookie is set to true so the popup is hidden`, true);
    }

    document.body.addEventListener('click', (e) => {

      if(e.target.closest('.c-subscription-form')) {
        fireEvent(`Click - user has clicked on the notification form with the target: ${e.target}`, true);
      }

    });

  });
  
};
