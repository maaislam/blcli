/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.page__section .modal-section__body .product__key_features',
    '.scroller__bottom .prod-menu-container ul.scroller__list li.scroller__item span[data-anchor-id="4"]',
    '.spec-chart-container.js-spec-chart',
  ], activate);
}
