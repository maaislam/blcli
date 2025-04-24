/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

import products from './lib/data/data';
import shared from '../../../../core-files/shared';
import { isGoogleShopper } from './lib/helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 1000; // 1 seconds to about hydration issue

pollerLite(['#__next', () => typeof window.tealiumDataLayer === 'object', () => window.__NEXT_DATA__ !== undefined], () => {
  const link = window.location.href;
  const isToplistProduct = products.find((item) => link.toLocaleLowerCase().includes(item.toLocaleLowerCase()));

  if ((isToplistProduct && isGoogleShopper()) || sessionStorage.getItem(`${ID}__data-${VARIATION}`)) {
    //setCookie('google_shopper', 'true', 1);
    // If the user is not from Google Shopping, activate the experiment
    setTimeout(activate, DOM_RENDER_DELAY);
  }
});
