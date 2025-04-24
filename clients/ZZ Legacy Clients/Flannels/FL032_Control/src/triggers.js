import headerRebuild from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const pollForTests = () => {
  // Header poller
  // Header renders throughout the guest checkout
  pollerLite([
    '#BodyWrap > header', // Header - insert markup
  ], headerRebuild);
};
// Check visitor state, if anonymous then poll for elements
pollerLite([
  '.currency-gbp', // Make sure currency ig GBP
  // Poll for dataLayer
  () => {
    let checkDataLayer = false;
    // Next line exceeds length
    // eslint-disable-next-line
    const datalayerCheck = window.dataLayer && window.dataLayer[1] && window.dataLayer[1].visitorLoginState && window.dataLayer[1].visitorLoginState.toUpperCase();

    if (datalayerCheck === 'ANONYMOUS') {
      checkDataLayer = true;
    }
    return checkDataLayer;
  },
], pollForTests);

