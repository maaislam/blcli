/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { events } from '../../../../lib/utils';
import { getCategory, share } from './lib/services';
import shared from './lib/shared';

const { ID, VARIATION } = shared;
const category = getCategory();
const isProduct = /\/product/.test(window.location.href);

if (/face|foundation/.test(category) && !isProduct) {
  waitForApp().then((data) => {
    // Make $ and rootScope global
    share(data);
    share({ category });
    pollerLite(['.ProductListModule .ProductListItem'], () => {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
      activate();
    });
  });
}
