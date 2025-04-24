/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.phone-number.InfinityNumber',
  () => window.location.pathname.indexOf('/why-helping-hands/') > -1,
], activate);
