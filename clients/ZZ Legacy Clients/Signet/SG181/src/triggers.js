/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

pollerLite(['body', '.product-summary', () => typeof window.exponea !== 'undefined'], () =>
  pollerLite(
    ['body', '.product-summary', () => typeof window.exponea.getRecommendation !== 'undefined'],
    activate
  )
);

if (!ieChecks) {
  if (!document.documentElement.classList.contains(`${shared.ID}`)) {
    pollerLite(['body', '.product-summary', () => typeof window.exponea !== 'undefined'], () =>
      pollerLite(
        ['body', '.product-summary', () => typeof window.exponea.getRecommendation !== 'undefined'],
        activate
      )
    );
  }
}
