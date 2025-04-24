/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(
  ['[data-qaid="pdp-best-seller-container"]', '#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined],
  () => {
    setTimeout(activate, 2000);
  }
);
