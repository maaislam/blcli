/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import { UAParser } from './lib/ua-parser';
import shared from './lib/shared';

const parser = new UAParser();
if(parser) {
  const browserInfo = parser.getResult();

  const browserName = browserInfo.browser.name;
  const browserMajorVersion = browserInfo.browser.major;

  const allowedBrowsers = [
    () => !!(browserName == 'Chrome' && browserMajorVersion >= 70),
    () => !!(browserName == 'Safari' && browserMajorVersion >= 10),
    () => !!(browserName == 'Mobile Safari' && browserMajorVersion >= 10),
    () => !!(browserName == 'Firefox' && browserMajorVersion >= 68),
    () => !!(browserName == 'Edge' && browserMajorVersion >= 83),
    () => !!(browserName == 'Samsung Browser' && browserMajorVersion >= 11),
  ];

  if(allowedBrowsers.some((condition) => condition())) {
    // ---------------------------------------
    // Browser is supported
    // ---------------------------------------

    pollerLite(['body',
    () => {
      let poller = false;
      if (window.location.pathname.indexOf('/checkout/shipping_address') > -1
      || window.location.pathname.indexOf('/checkout/payment-method') > -1
      || window.location.pathname.indexOf('/checkout/confirmation') > -1) {
        poller = true;  
      }

      return poller;
    },
    () => !!window.Trustpilot,
    () => {
      return !!(
        document.querySelector('.af-max-width.side-pad0-small-only')
        ||
        document.querySelector('.margin.margin-bottom.margin-xxl .row')
        ||
        document.querySelector('.checkout-progress-bar')
      );
    },
    ], () => {
      events.send(`${shared.ID}-${shared.VARIATION}`, 'did-run');
      if(shared.VARIATION != 'control') {
        activate();
      }
    });
  }
}
