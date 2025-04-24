/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import TestReporting from './boots_tracking/TestReporting';
import shared from '../../../../core-files/shared';

const { ID, VARIATION } = shared;

let pageType = '';
if(VARIATION === '1') {
  pageType = 'PDP Flash Offers';
} else if(VARIATION === '2') {
  pageType = 'PLP Flash Offers';
} else if(VARIATION === '3') {
  pageType = 'PDP && PLP Flash Offers';
}

const testID = `${ID}|${pageType}`; // Change this to test name and include in experiment.js
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer

if (!getCookie('Synthetic_Testing')) {
  reporting.register(); // sends experience load event to datalayer
  pollerLite(['body'], activate);
}
