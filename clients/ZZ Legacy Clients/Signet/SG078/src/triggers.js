/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.browse__main-content',
  '.js-product-list-item .productLink',
  () => !!window.jQuery,
  () => !!(window.sg078data1 && window.sg078data2 && window.sg078data3),
], activate);
