/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.item_info h2',
// '#riq_requestcall div.dilricn2nw.lftbtmicon',
() => {
  let poller = false;
  if (window.location.pathname.indexOf('/p/') > -1 && (document.querySelector('button#bc_chatbutton') || document.querySelector('div.bcFloat'))) {
    poller = true;
  }

  return poller;
},
], activate);
