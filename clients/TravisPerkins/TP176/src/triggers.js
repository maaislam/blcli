/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../src/lib/shared';

// Only runs when TP175 exists given that particular experiment
// changes PLP item layouts
pollerLite(['body', '.TP175'], () => {
  document.body.classList.remove(`${shared.ID}`);

  activate();
});
