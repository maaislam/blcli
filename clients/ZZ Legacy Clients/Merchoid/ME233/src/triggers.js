/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(window.location.pathname.indexOf('geeks-guide-to-ugly-christmas-sweaterjumpers') > -1) {
  pollerLite([
    'body',
    '.guide-list-wrapper',
    '.product-item',
  ], activate);
}
