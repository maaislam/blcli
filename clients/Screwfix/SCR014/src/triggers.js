/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/utils';
import activate from './lib/experiment';

pollerLite(['body'], activate);
