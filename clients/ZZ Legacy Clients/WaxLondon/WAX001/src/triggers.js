/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import { bucketUser } from '../../../../lib/gtm-ab';

/**
 * Valid browsers based on user agent
 *
 * Wax don't support IE11 themselves
 */
const isValidBrowserCheck = () => {
  const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 
    || !!navigator.userAgent.match(/Trident.*rv\:11\./);

  if(isIE) {
    return false;
  }

  return true;
}

// Run - we're using GTM so check bucketed user
if(isValidBrowserCheck()) {
  const variation = bucketUser(`${shared.ID}-ab`, window.localStorage, 2, [10,100]);
  shared.VARIATION = variation || 'control';

  pollerLite([
    'body.product-template-default',
    () => !!window.jQuery,
    () => !!window?.jQuery?.fn?.slick,
    () => {
      const afterTarget = document.querySelector('#product-colors') 
        || document.querySelector('#product-accordion');

      return !!afterTarget;
    }
  ], () => {
    events.send(`${shared.ID}-${shared.VARIATION}`, 'did-activate');

    if(shared.VARIATION != 'control') {
      activate();
    }
  });
}
