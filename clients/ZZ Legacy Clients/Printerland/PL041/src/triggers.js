/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import settings from './lib/settings';
import { pollerLite } from '../../../../lib/uc-lib';

const run = () => {
  return ((settings.isCartridgeFinder || settings.isProductPage));
};

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite(['body', run], activate);
}