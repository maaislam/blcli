/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import TestReporting from './boots_tracking/TestReporting';
import shared from '../../../../core-files/shared';
import { addCssToHead, addScriptToHead } from './lib/helpers/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const { ID, VARIATION } = shared;

const testID = `${ID}|Commonly Forgotten Products Reminder`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const reporting = new TestReporting(testID, testVariant);

if (!ieChecks) {
  if (!getCookie('Synthetic_Testing')) {
    reporting.register();
    addScriptToHead('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
    addScriptToHead('https://apps.bazaarvoice.com/deployments/Boots/main_site/production/en_GB/bv.js');
    addScriptToHead('/wcsstore/Bazaarvoice/Bazaarvoice.js');

    addCssToHead('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    addCssToHead('https://display.ugc.bazaarvoice.com/static/Boots/main_site/825/2111/en_GB/stylesheets/screen.css');
    pollerLite(['body'], activate);
  }
}
