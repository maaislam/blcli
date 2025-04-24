/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(
    [
      '[ng-controller="ProductListController"]',
      '[ng-controller="CategoryLeftNavController"]',
      '.ProductList .ProductListCell',
    ],
    () => {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
    },
  );
};

if (/(\/)(\d.*)(\/)(make-up)/.test(window.location.href)) {
  waitForApp().then(() => {
    pollAndFire();
  });
}
