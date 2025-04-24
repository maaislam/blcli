/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body'], () => {
  document.body.classList.remove(`${shared.ID}`);

  activate();
});


