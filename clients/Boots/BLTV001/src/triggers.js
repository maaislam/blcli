/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if (!getCookie('Synthetic_Testing')) {
  // reporting.register(); // sends experience load event to datalayer
  pollerLite(['body', () => typeof window.userObj === 'object', () => window.userObj?.isLoggedIn === 'false'], activate);
}
