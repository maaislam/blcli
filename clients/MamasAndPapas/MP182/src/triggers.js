/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
  '.row.productFilter_filterSelectors.p-2',
  () => {
    let run = false;
    if (window.jQuery) {
      run = true;
    }
    return run;
  },
], activate);
