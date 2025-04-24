/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['#__next', '#__NEXT_DATA__', () => window.utag?.data?.categoryName !== undefined], () => {
  setTimeout(activate, 2000);
});
