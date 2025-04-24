/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(window.location.pathname.match(/stores\/barnet/i) && !window.location.pathname.match(/basket-confirmation/)) {
  pollerLite(['body', '#ctl00__objHeader_aCheckoutMobile'], activate, {
    multiplier: 1,
  });
}
