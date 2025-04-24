/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { isPDP, isPLP } from './lib/helpers/utils';

setTimeout(() => {
  if (isPLP()) {
    pollerLite(['body', () => document.querySelectorAll('[data-test-id="product"]').length >= 1], activate);
  } else if (isPDP()) {
    pollerLite(
      [
        '[data-test-id="collection-availability-message"] span',
        () => document.querySelectorAll('[data-test-id="add-to-collection-btn"]'),
      ],
      activate
    );
  } else if (window.location.href.includes('/search/')) {
    pollerLite(['body', () => document.querySelectorAll('[data-test-id="product"]').length >= 1], activate);
  } else {
    pollerLite(['body'], activate);
  }
}, 2000);
