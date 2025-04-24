/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

import { validSkus } from './lib/data';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  pollerLite(
    [
      'body',
      '[data-qaid="pdp-product-overview"]',
      () => validSkus.some((sku) => window.location.pathname.includes(sku.toLowerCase())),
    ],
    activate
  );
}
