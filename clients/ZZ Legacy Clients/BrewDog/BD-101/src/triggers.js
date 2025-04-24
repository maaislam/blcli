/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', 
  '.header-mobile__menu',
  '.header-mobile__actions__action',
  '.header',
  () => {
    let run = false;
    if (window.dataLayer) {
        run = true;
    }
    return run;
  }
], activate);
