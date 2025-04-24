/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(
    [
      '.Action_Home',
      '#MainContentWrapper',
    ],
    () => {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
      if (VARIATION.toLowerCase() !== 'control') activate();
    },
  );
};

const isHome = /https?:\/\/www\.avon\.uk\.com\/?(\?.*)?(&.*)?(#.*)?$/.test(window.location.href);
const isStorePage = /https?:\/\/www\.avon\.uk\.com\/store\/*/.test(window.location.href);
if (isHome || isStorePage) {
  waitForApp().then((data) => {
    events.setPropertyId('UA-142145223-1');

    // Make $ and rootScope global
    share(data);
    pollAndFire();
  });
}
