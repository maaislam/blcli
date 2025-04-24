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
    'nav.navigation',
    '.header.has-background-white',
    () => document.readyState == 'complete',
    // --- This is commented out when it goes into production
    () => !!window.NE320preact,
    () => {
      let runExp = false;
      if (!!window.navData1 && !!window.navData2 && !!window.NE320data) {
        runExp = true;
      }
      return runExp;
    },
  ], activate);
}
