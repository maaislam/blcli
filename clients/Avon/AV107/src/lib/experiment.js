/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderNewsletter from './components/newsletter';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    fireEvent('Conditions Met');
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const anchorElm = document.querySelector('.os-step__title').closest('.section');
  renderNewsletter(ID, anchorElm);
  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const target = e.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
    const isEmailValid = (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return re.test(String(email.value).toLowerCase());
    };
    if (targetMatched(`.${ID}__newsletter--submit`)) {
      const emailInput = document.querySelector(`.${ID}__newsletter--email`);
      if (isEmailValid(emailInput)) {
        fireEvent('Customer Clicks Sign Up');
      } else {
        fireEvent('Customer receives an error message when trying to enter email address');
      }
    }
  });
};
