/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 1000;

const init = () => {
  // Experiment Code...
  setup();

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
  const applePayImg = document.querySelector('[alt="Apple Pay"]');
  if (applePayImg) {
    const applePayWrapper = applePayImg.closest('div');
    applePayWrapper.style.display = 'none';
  }
  const applePayBtn = document.querySelector('[data-test-id="apple-pay-button"]');

  if (applePayBtn) {
    applePayBtn.style.display = 'none';
  }

  const paywithCardTextElem = document.querySelector('[class^="pageLayout__OrPayWithACard"] span');

  if (paywithCardTextElem) {
    paywithCardTextElem.innerHTML = 'Pay With Card';
  }
};

export default () => {
  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init

  onUrlChange(() => {
    pollerLite(['#app-container'], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
