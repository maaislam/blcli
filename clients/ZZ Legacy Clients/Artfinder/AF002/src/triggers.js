/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
// '.accordion-navigation.alternative-accordion-navigation-for-small-only',
'.af-main-row.alternative-field .row',
() => {
  let poller = false;
  if (window.location.pathname.indexOf('/art/') > -1) {
    poller = true;
  }

  return poller;
},
// () => {
//   return (document.querySelectorAll('.af-card').length > 0);
// },
() => {
  return (window.dataLayer && window.dataLayer[0] && window.dataLayer[0].user_currency);
}
], activate);
