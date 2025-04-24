/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Generic conditions for running
pollerLite([
  'body',
  () => !!window._ictt,
], () => {
    activate();
});
