/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share } from './lib/services';

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['body'], activate);
};

waitForApp().then((data) => {
  // Make $ and rootScope global
  share(data);
  pollAndFire();
});
