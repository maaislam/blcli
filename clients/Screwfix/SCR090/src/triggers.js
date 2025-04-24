/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

pollerLite(['#__next', '#__NEXT_DATA__', '[data-bv-show="rating_summary"]', () => window.__NEXT_DATA__ !== undefined], activate);
