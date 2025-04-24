/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { getPageType } from './lib/services';
import { events } from '../../../../lib/utils';

// Force set GA reference to 360 account
// As of March 2020 we noticed the default tracker isn't always
// this core account
events.setPropertyId('UA-142145223-1');

/** Poll for elements the run experiment */
const pollAndFire = () => {
  pollerLite(['pdp-shade-selector'], () => {
    events.send('AV023-Control', 'did-meet-conditions');
  });
};

waitForApp().then(() => {
  // Make $ and rootScope global
  const pageType = getPageType();
  if (pageType === 'foundationPDP') {
    pollAndFire();
  }
});
