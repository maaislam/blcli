/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
`.content__wrapper.product_main__body .row.limited-row .column._50`,
`.container.product-page__quick-links`,
'.product__items.bundle_items',
() => {
  let poller = false;
  if (document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_lblLowStock.lowstock') === null) {
    poller = true;
  }
  return poller;
},
], activate);
