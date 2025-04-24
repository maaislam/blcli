/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if(!ieChecks) {
  if(location.href.match('ref=wizard')) {
    // Scroll the form into view
    pollerLite([
      'body',
      '[data-module-id="27809"] h2.dev-h3',
    ], () => {
      const h2 = document.querySelector('[data-module-id="27809"] h2.dev-h3');
      const cards = document.querySelector('.sib-cards[data-module-id="27809"]');

      if(cards) {
        // We have to hide this as otherwise page jumps back up
        cards.style.display = 'none';
      }

      if(h2) {
        h2.scrollIntoView();
      }
    });
  } else {
    // Experiment
    pollerLite([
      'body',
      '.banner-header .container section .dev-section',
    ], () => {
      activate();
    });
  }
}
