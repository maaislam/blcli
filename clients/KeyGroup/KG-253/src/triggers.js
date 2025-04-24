/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const location = window.location.href;


if(location.includes("/campaigns/")) {
  pollerLite([
    'body'
  ], activate);
}
