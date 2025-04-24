/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { VARIATION } = shared;

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', ({ target }) => {
    console.log('🚀 ~ document.body.addEventListener ~ target:', target);
    if (!target.closest('#navbar-collapse') && !target.closest('.navigation-bar')) {
      return;
    }

    if (target.closest('[href*="/uk/loggedin/my-homeserve"]')) {
      VARIATION === '1'
        ? fireEvent('User interacts with “Log in” CTA')
        : VARIATION === '2'
        ? fireEvent('User interacts with “My account” CTA  in header')
        : fireEvent('User interacts with “Log in/ register” CTA');
    } else if (target.closest('[href*="/uk/loggedin/claims-proxy"]')) {
      VARIATION === '1'
        ? fireEvent('User interacts with “Make a claim” CTA')
        : VARIATION === '2'
        ? fireEvent('User interacts with “Make a claim” CTA in header')
        : fireEvent('User interacts with “Make a claim” CTA');
    } else if (target.closest('.navbar-toggler')) {
      fireEvent('User interact with Burger menu icon (mobile only)');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  const targetElement = document.querySelector(`[href*="/loggedin/"]`);
  //console.log('🚀 ~ targetElement:', targetElement);
  targetElement.innerText = VARIATION == '1' ? 'Log in' : 'My account';
};
