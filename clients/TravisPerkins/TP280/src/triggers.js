/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(
  [
    () =>
      document.querySelector('[data-test-id="my-products-button"]') ||
      document.querySelector('[data-test-id="header-account-button"]'),
  ],
  () => {
    activate();
  }
);
