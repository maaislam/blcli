/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { getPageType } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['a.select2-choice.ui-select-match'], () => {
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions'); // GA
  });
};

getPageType().then((pageType) => {
  if (pageType === 'PLP') {
    waitForApp().then(() => {
      pollAndFire();
    });
  }
});
