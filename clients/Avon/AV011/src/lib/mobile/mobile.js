/**
 * @fileoverview Mobile specific changes for this experiment
 */
import { applyAllChanges } from '../services';
import { changeTitle, createMobileCarousel, createMobileSlidingContent } from '../changes';

/**
 * @returns {Promise}
 */
export default () => applyAllChanges([
  changeTitle,
  createMobileCarousel,
  createMobileSlidingContent,
]);
