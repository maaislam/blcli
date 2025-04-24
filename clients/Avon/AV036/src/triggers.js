/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { waitForApp } from '../../../../lib/utils/avon';
import { share } from './lib/services';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['mvp-delivery-selection'], () => {
    const { ID, VARIATION } = shared;
    // events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
    activate();
  });
};

waitForApp().then((data) => {
  // Make data global
  share(data);
  pollAndFire();
});
