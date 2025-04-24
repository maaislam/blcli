/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share, getPageType } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

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
      if (VARIATION.toLowerCase() !== 'control') activate();
    },
  );
};

/**
 * Top-level polling entry point for code execution
 */
waitForApp().then((data) => {
  share(data);

  // Make $ and rootScope global
  pollAndFire();
});
