/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share, getPageType, fireEvent, setup } from './lib/services';

import shared from './lib/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const inValidUrls = ['/product/', '/cart', '/checkout'];
const isValidUrl = !inValidUrls.some((urlStr) => location.pathname.indexOf(urlStr) !== -1);

if (!ieChecks && isValidUrl) {
  const { VARIATION } = shared;

  // Force set GA reference to 360 account
  // As of March 2020 we noticed the default tracker isn't always
  // this core account

  /**
   * Poll for elements then run experiment
   */
  const pollAndFire = () => {
    pollerLite(
      [
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        // Specify polling elements
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        'body',
        '[ng-controller="ProductListController"]',
        () => !document.querySelector('#SpecialOfferDetail'),
      ],
      () => {
        setup();
        // Fire did meet conditions
        fireEvent('Conditions Met');
        if (VARIATION != 'control') {
          activate();
        }
      }
    );
  };

  /**
   * Top-level polling entry point for code execution
   */
  waitForApp().then((data) => {
    setup();
    fireEvent('Test Code Fired');
    console.log('hello', data);

    share(data);
    pollAndFire();
  });
}
