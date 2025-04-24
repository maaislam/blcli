/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { share } from './lib/services';
import { waitForApp } from '../../../../lib/utils/avon';

waitForApp().then((data) => {
  // Make $ and rootScope global
  share(data);
  activate();
});
