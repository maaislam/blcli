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

// Global GA 360
events.setPropertyId('UA-142145223-1');

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['a.select2-choice.ui-select-match'], () => {
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions'); // GA
    activate();
  });
};

getPageType().then((pageType) => {
  if (pageType === 'PLP') {
    waitForApp().then((data) => {
      share(data);
      pollAndFire();
    });
  }
});
