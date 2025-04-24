/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  if(!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite([
      'body',
      '#page_heading h1',
      '#page_heading h3',
      () => {
        let isLandingPage = false;

        if (document.referrer.indexOf("hotelchocolat.com") == -1) {
          isLandingPage = true;
        }

        return isLandingPage;
      },
      () => {
        let runExperiment = false;
        if (window.location.href.indexOf('velvetiser') == -1) {
          runExperiment = true;
        }

        return runExperiment;
      },
    ], () => {
      activate();
    });
  }
}
