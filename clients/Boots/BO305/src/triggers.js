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

const testID = `${ID}|Frag Upsizer`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const reporting = new TestReporting(testID, testVariant);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    reporting.register();
    pollerLite([
      'body', '#estore_pdp_trcol_2'
    ], activate);
  }
}
