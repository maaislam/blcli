/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import TestReporting from './boots_tracking/TestReporting';
import shared from '../../../../core-files/shared';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const testID = `${ID}|One click ATB PDP`; // Change this to test name and include in experiment.js
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer

if (!getCookie('Synthetic_Testing')) {
  VARIATION !== 'pl' && reporting.register(); // sends experience load event to datalayer
  pollerLite(['#richRelevanceContainer'], () => {
    const isChanelOrDior = window.location.href.indexOf('chanel') > -1 || window.location.href.indexOf('dior') > -1;
    if (isChanelOrDior) {
      return;
    }
    setTimeout(activate, DOM_RENDER_DELAY);
  });
}
