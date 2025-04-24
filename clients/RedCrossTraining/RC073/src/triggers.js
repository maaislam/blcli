/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(window.location.pathname.match(/where-we-train/)) {
  pollerLite([
    'body',
    () => !!window.jQuery && !!window.jQuery.fn.get
  ], activate);
}
