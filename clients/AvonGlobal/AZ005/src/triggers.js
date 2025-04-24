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

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  const { pageType } = shared;
  const pollingElements = {
    offersPLPDetail: [
      '[ng-controller="SpecialOfferDetailController"]',
      '#MainContentWrapper',
    ],
    default: ['body'],
  };

  pollerLite(
    pollingElements[pageType] ? pollingElements[pageType] : pollingElements.default,
    () => {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
      activate();
    },
  );
};

getPageType().then((pageType) => {
  if (pageType === 'offersPLPDetail') {
    waitForApp().then((data) => {
      // Make $ and rootScope global
      share(data);
      share({ pageType });
      pollAndFire();
    });
  }
});
