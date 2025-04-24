/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(
  [
    '.hero-banner__content',
    () => window.matchMedia('(orientation: portrait)').matches,
    () => window.matchMedia('(max-width: 480px)').matches,
  ],
  activate
);
