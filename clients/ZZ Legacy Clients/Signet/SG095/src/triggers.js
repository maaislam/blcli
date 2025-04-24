/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#js-search',
  '.promotion-messages',
  '#js-main-nav-toggle',
  '#js-search',
  '.page-overlay',
  () => !!window.jQuery,
], activate);
