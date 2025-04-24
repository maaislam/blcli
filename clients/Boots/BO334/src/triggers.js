/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import TestReporting from './boots_tracking/TestReporting';
import shared from '../../../../core-files/shared';
import pageArray from './lib/data';

const { ID, VARIATION } = shared;

const testID = `${ID}|Post ATB Combinations`; // Change this to test name and include in experiment.js
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer

const isValidPage = pageArray.some((item) => window.location.href.includes(item.currPageURL));

if (!getCookie('Synthetic_Testing') && isValidPage) {
  reporting.register(); // sends experience load event to datalayer
  pollerLite(['body'], activate);
}
