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

events.setPropertyId('UA-142145223-1');

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  const { pageType } = shared;
  const pollingElements = {
    PLP: [
      '[ng-controller="ProductListController"]',
      '[ng-controller="CategoryLeftNavController"]',
      '.ProductList .ProductListCell',
    ],
    offersPLP: [
      '[ng-controller="SpecialOffersListController"]',
      '#MainContentWrapper',
      '.SpecialOfferItem .SpecialOfferInfo',
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
  if (pageType === 'PLP' || pageType === 'offersPLP') {
    waitForApp().then((data) => {
      // Make $ and rootScope global
      share(data);
      share({ pageType });
      pollAndFire();
    });
  }
});
