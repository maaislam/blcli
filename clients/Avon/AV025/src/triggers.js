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

// pollerLite(['body'], activate);

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  const pathname = window.location.pathname;
  // Check if page is a PLP
  if (/^(\/)(\d{3}).*$/.test(pathname)) {
    pollerLite(['a.select2-choice.ui-select-match'], () => {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions'); // GA
      activate();
    });
  }
  
};

waitForApp().then((data) => {
  share(data);
  pollAndFire();
});
