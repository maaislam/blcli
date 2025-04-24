/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { events } from '../../../../lib/utils';

events.setPropertyId('UA-142145223-1');

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite([
    'header',
    '#SearchBar',
    '#Hamburger',
  ], () => {
    events.send('AV043-Control', 'did-meet-conditions');
  });
};

waitForApp().then(pollAndFire);
