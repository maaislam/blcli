/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    'section.section .container .column.is-3-desktop.is-4-tablet.is-6-mobile',
    () => {
      let runExp = false;
      if (window.location.href.indexOf('/collections/the-wellbeing-pod') > -1) {
        runExp = true;
      }

      return runExp;
    },
  ], activate);
}
