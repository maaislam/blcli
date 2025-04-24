/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.desktop-tile .tile-bottom .bottom-right p.delivery-text',
'.desktop-tile .tile-bottom .bottom-right div.delivery-icons',
'.mobile-tile .link-container .delivery-text',
'.mobile-tile .link-container .delivery-icons',
() => {
  let poller = false;
  if (window.location.href.indexOf("/takeaway?lookup=") > -1 || window.location.href.indexOf("/takeaway") > -1) {
    poller = true;
  }

  return poller;
},
], activate);
