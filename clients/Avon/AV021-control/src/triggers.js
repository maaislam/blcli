/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { events } from '../../../../lib/utils';

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite([
    'header',
    '#SearchBar',
    '#Hamburger',
  ], () => {
    events.send('AV021-Control', 'did-meet-conditions');
  });
};

waitForApp().then(pollAndFire);
