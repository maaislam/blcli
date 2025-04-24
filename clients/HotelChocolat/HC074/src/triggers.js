/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from '../../../../core-files/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  if(!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite([
      'body',
      '.search-result-content ul#search-result-items li.grid-tile div.product-tile[style]',
      '#main #primary .pagination .toggle-grid',

      () => {
        let runExperiment = false;

        if (window.location.pathname.indexOf('/shop/') > -1
        && document.querySelector('.search-result-content ul#search-result-items').children.length > 1) {
          runExperiment = true;
        }

        return runExperiment;
      },
    ], () => {
      activate();
    });
  }
}
