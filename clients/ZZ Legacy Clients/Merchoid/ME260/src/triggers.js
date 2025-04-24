/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#maincontent',
  '.column.main',
  '.products.wrapper',
  '.product-item-details',
  '.as-seen-block',
  '.review-banner',
  '.slick-initialized',
  () => !!window.jQuery,
], activate);
