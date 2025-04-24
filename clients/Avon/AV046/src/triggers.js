/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { waitForApp } from '../../../../lib/utils/avon';
import { share } from './lib/services';
import { pollerLite, events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(
    ['#Modals'],
    () => {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
      activate();
    },
  );
};

waitForApp().then((data) => {
  // Make $ and rootScope global
  share(data);
  pollAndFire();
});
