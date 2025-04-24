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
    '.search-bar',
    'input.ais-SearchBox-input',
    'button.ais-SearchBox-submit',
    () => {
      let runExp = false;

      const regex = /\/shop\/cookware|\/shop\/cast\-iron|\/shop\/knives\-scissors|\/shop\/tableware\-dining|\/shop\/kitchen\-accessories|\/shop\/baking/g;
      const found = window.location.href.match(regex);
      if (window.location.pathname == '/') {
        runExp = true;
      } else if (found) {
        runExp = true;
      }

      return runExp;
    },
  ], activate);
}
