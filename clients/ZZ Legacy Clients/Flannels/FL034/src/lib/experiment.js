/**
 * FL034 - Password error for guest checkout
 * @author Josh Tyler - User Conversion
 */
import { setup, observeMessage, addMessage, storeEmail, addEmail, scrollToGuest } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
// import FL015 from './FL015';
import settings from './settings';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import customEvents from './events';

const activate = () => {
  if (settings.VARIATION === '3') {
    events.send(settings.ID, 'Control', 'Control event fired FL015 only');
    if (!document.querySelector('.FL015')) {
      FL015();
    }
    return false;
  }
  /**
   * Variables
   */
  const loginCta = document.querySelector('.loginContainer #dnn_ctr88149_Launch_registerLogin_btnRegisteredCustomer');
  /**
  * Experiment code
  */
  setup();
  // Run FL015
  // if (!document.querySelector('.FL015')) {
  //   FL015();
  // }
  // Store Email address for autofill
  if (loginCta) {
    loginCta.addEventListener('click', storeEmail);
  }
  // Clicking scroll to guest checkout
  if (settings.VARIATION === '1') {
    // Observe the error message and add the new
    observeMessage(() => {
      const registerEl = document.querySelector('.FL015 .CustomerGroups .newCustomer');
      const loginEl = document.querySelector('.FL015 .CustomerGroups .existingCustomer .innerBorder');
      if (registerEl && loginEl) {
        registerEl.classList.add('FL034-show');
        loginEl.classList.add('FL034-show');
      }
      addMessage();
      const options = document.querySelector('.FL015-account-options');
      if (options) {
        options.classList.add('FL034-hide');
      }
      customEvents.observer();
      pollerLite(['#FL034-guest'], () => {
        const guestLink = document.getElementById('FL034-guest');
        if (guestLink) {
          // guestLink.addEventListener('click', () => {
          //   const elToShow = document.querySelector('.FL015 .CustomerGroups .newCustomer');
          //   if (elToShow) {
          //     elToShow.classList.add('FL034-show');
          //   }
          // });
        }
      });
    });
    scrollToGuest(addEmail);
  }
  if (settings.VARIATION === '2') {
    observeMessage(() => {
      const loginEl = document.querySelector('.FL015 .CustomerGroups .existingCustomer .innerBorder');
      if (loginEl) {
        loginEl.classList.add('FL034-show');
      }
      addMessage();
      // Hide existing guest section
      const guestSection = document.querySelector('.CustomerGroups .newCustomer.col-xs-12.col-sm-6');
      if (guestSection) {
        guestSection.classList.add('FL034-hide');
      }
      customEvents.observer();
    });
    addEmail();
    // Change guest cta text
    pollerLite(['.FL034-error button.FL034-guest-cta'], () => {
      const newGuestCheckoutCta = document.querySelector('.FL034-error button.FL034-guest-cta');
      const existingGuestCheckoutCta = document.querySelector('.newCustomer .innerBorder .loginContainer .NewCustWrap a#dnn_ctr88149_Launch_btnGuestCustomer');
      newGuestCheckoutCta.addEventListener('click', () => {
        // e.preventDefault();
        existingGuestCheckoutCta.click();
      });
    });
  }
  // Custom events
  customEvents.guestContinue();
  customEvents.secureContinue();
};

export default activate;
