/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (window.location.pathname.includes('/products/')) {
  pollerLite(['body', '.visitor-counter-content-box-carecartbysalespop-2020'], activate);
}
