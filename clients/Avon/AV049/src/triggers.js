/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share, getPageType, getPLPType, strEndsWith, runOnPage } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

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
      '.Layout_Phone'
    ],
    () => {

      // Must be one of PLP pages.
      const trigger = getPLPType();
      if (trigger) {
        // Custom Usabilla var.
        let clientID = null;
        const value = `; ${document.cookie}`;
        const parts = value.split('; _ga=');
        if (parts.length === 2) clientID = parts.pop().split(';').shift();

        if (window.usabilla_live) {
          window.usabilla_live('data', {
            custom: {
              clientID,
            },
          });
        }

        // Fire did meet conditions
        events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
        if (VARIATION.toLowerCase() !== 'control') activate();
        else {
          // Control.
          sessionStorage.setItem(`${ID}-init`, '1');

          if (window.usabilla_live) window.usabilla_live('trigger', 'AV049 Control');
          // events.send(`${ID}`, 'Control fired');
        }
      }
    },
  );
};

/**
 * Top-level polling entry point for code execution
 */
//getPageType().then((pageType) => {
  // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
  // ^ Optionally filter by a page type
  // Remove if not required
  // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
  if (!sessionStorage.getItem(`${ID}-init`)) {
    waitForApp().then((data) => {
      // Make $ and rootScope global
      share(data);
      //share({ pageType });
      pollAndFire();
    });
  }
//});
