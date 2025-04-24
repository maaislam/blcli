/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import { bucketUser } from '../../../../lib/gtm-ab';

try {
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
  if(isValidBrowserCheck() && window.location.pathname == '/checkout/register/') {
    const variation = bucketUser(`${shared.ID}-ab`, window.localStorage, 2);
    shared.VARIATION = variation || 'control';

    pollerLite([
      'body.page-register',
      '#page-title',
      '#checkout-login-page .col-md-6',
      () => window?.jQuery?.fn?.slick,
    ], () => {
      events.send(`${shared.ID}-${shared.VARIATION}`, 'did-activate');

      if(shared.VARIATION != 'control') {
        activate();
      }
    });
  }
} catch(e) {}
