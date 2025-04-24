/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { getPageType } from './lib/services';
import shared from './lib/shared';
import { events } from '../../../../lib/utils';

const { ID, VARIATION } = shared;

/**
 * Wait for app to load before we can use it's data
 * @returns {Promise}
 */
const waitForApp = () => new Promise((resolve) => {
  pollerLite([
    () => window.angular?.element,
    () => window.AppModule?.RootScope,
    () => window.AppModule?.RootScope?.$on,
    () => window.AppModule?.RootScope?.ShopContext,
    () => window.AppModule?.RootScope?.Layout?.Name,
  ], resolve);
});

/**
 * Returns true once all poller conditions are passed
 * @param {Array} conditions
 * @returns {Promise}
 */
const waitForConditions = conditions => new Promise((resolve) => {
  pollerLite(conditions, resolve);
});

/**
 * Triggers for the search page
 */
const evaluateSearchTriggers = () => {
  const rootScope = shared.rootScope || window.AppModule.RootScope;
  const searchQuery = rootScope.ShopContext.ProductSearchQuery;
  const searchContainsLip = searchQuery.toLowerCase().indexOf('lip') > -1;

  if (searchContainsLip) {
    waitForConditions([
      '.ProductListHeading',
    ]).then(() => {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
    });
  }
};

/**
 * Triggers for the PLP page
 */
const evaluatePlpTriggers = () => {
  waitForConditions([
    '.ProductListHeading',
    '.ProductListCell',
  ]).then(() => {
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
  });
};

waitForApp().then(() => {
  const pageType = getPageType();
  const isSearch = pageType === 'search';
  const isPLP = pageType === 'plp';

  // Evaluate page specific triggers
  if (isSearch) {
    evaluateSearchTriggers();
  } else if (isPLP) {
    evaluatePlpTriggers();
  }
});
