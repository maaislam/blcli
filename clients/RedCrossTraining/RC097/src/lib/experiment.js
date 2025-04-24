/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderLabelContent from './components/labelContent';
import attendeeMessage from './components/customMsg';
import { data } from './data';
import renderFakeSubmit from './components/fakeSubmit';
import observeDOM from './observeDOM';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  if (location.pathname.indexOf('/purchase/') !== -1) {
    if (document.referrer === 'https://www.redcrossfirstaidtraining.co.uk/basket/') {
      fireEvent('Clicks confirm attendees - success');
    }
    return;
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    //console.log(target);
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
    if (targetMatched(`#${ID}__continueButton`)) {
      e.preventDefault();
      document.querySelector(`.${ID}__submit-error`).classList.remove(`${ID}__hide`);
      fireEvent('User gets "proceed to payment" error');
    } else if (targetMatched('[id$="ct-chckList"]')) {
      const isOpen = target.checked;
      isOpen && fireEvent('Opens delegate details section');
    } else if (targetMatched('input[value="Confirm Attendees"]')) {
      setTimeout(() => {
        const hasError = !!target.closest('.tabs').querySelector('.input-validation-error');
        console.log(hasError);
        hasError && fireEvent('Clicks confirm attendees - fail');
      }, 1000);
    }
  });
  const errorBanner = `#delegate-alert_box`;
  const callbackFunc = () => {
    const isHidden = () => {
      const elem = document.getElementById('delegate-alert_box');
      return window.getComputedStyle(elem).display === 'none';
    };

    setTimeout(() => {
      !isHidden() && fireEvent('Clicks confirm attendees - fail');
    }, 1000);
  };
  observeDOM(errorBanner, callbackFunc);

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

  const mainWrapper = document.getElementsByTagName('main')[0];
  const attendeeLabels = document.querySelectorAll('[id$="ct-chckList"] + label');
  const attendeeMsgAnchors = document.querySelectorAll('[id$="ct-chckList"]');
  mainWrapper.classList.add(`${ID}__mainWrapper`);

  attendeeMessage(ID, data, attendeeMsgAnchors);
  renderLabelContent(ID, data, attendeeLabels);
  fireEvent('Conditions Met');

  const missingAttendee = !!document.querySelector(`.success-wrapper.${ID}__hide`);

  if (!missingAttendee) return;
  renderFakeSubmit(ID);
};
