/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { runMobileExperiment } from './run-mobile-experiment.function';
import { runDesktopExperiment } from './run-desktop-experiment.function';

const { ID, VARIATION } = shared;

export const activate = () => {
  setup();

  if (!window.location.pathname.includes('/product/')) return;

  fireEvent('Conditions Met');

  fireEvent('User visits PDP');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') return;

  fireEvent('Sees USP bar');

  setInterval(() => {
    const mobileElement = document.querySelector(
      '#MainContentWrapper > main > div.ProductDetail.device-type.ng-scope.mobile > ng-include > div > h1'
    );

    /**
     * Mobile
     */
    if (mobileElement && !document.querySelector(`.${ID}-slider`))
      runMobileExperiment();

    if (!document.querySelector(`.${ID}-desktop-container`))
      runDesktopExperiment();
  }, 500);
};
