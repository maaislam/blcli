/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import TestReporting from './boots_tracking/TestReporting';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const { ID, VARIATION } = shared;

const testID = `${ID}-PL|PDP Flash Offers`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer


if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    reporting.register(); // sends experience load event to datalayer
    pollerLite([
      'body',
      '#estore_productpage_template_container #estore_product_promotions_on_pdp li.pdp-promotion-redesign',
      '#estore_product_promotions_on_pdp .pdp-promotion-redesign-container',
    ], activate);
  }
}
