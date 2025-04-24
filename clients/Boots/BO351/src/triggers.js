/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
//import TestReporting from './boots_tracking/TestReporting';
//import shared from '../../../../core-files/shared';

//const { ID, VARIATION } = shared;

//const testID = `${ID}| Mini Basket`; // Change this to test name and include in experiment.js
//const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
//const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer

if (!getCookie('Synthetic_Testing')) {
  // sends experience load event to datalayer
  pollerLite(['body', '#oct-notification-container'], activate);
}
