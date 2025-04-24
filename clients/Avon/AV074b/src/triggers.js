/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { events } from '../../../../lib/utils';
import shared from '../../../../core-files/shared';
import { setup, fireEvent } from '../../../../core-files/services';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  // Force set GA reference to 360 account
  // As of March 2020 we noticed the default tracker isn't always
  // this core account
  events.setPropertyId('UA-142145223-1');

  /**
   * Poll for elements the run experiment
   */
  const pollAndFire = () => {
    pollerLite(
      [
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        // Specify polling elements
        // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        'body',
      ],
      () => {

        // Fire did meet conditions
        activate();
      },
    );
  };

  /**
   * Top-level polling entry point for code execution
   */
  waitForApp().then((data) => {
    shared.rootScope = data.rootScope;
    pollAndFire();
  });
}
