/**
 * @fileoverview Desktop specific changes for this experiment
 */
import shared from '../shared';
import { applyAllChanges } from '../services';
import {
  dismantleCarousel,
  changeTitle,
  createScollingDesc,
  changeShadeDropdownText,
} from '../changes';

/**
 * @returns {Promise}
 */
export default () => {
  // Update sticky sidebar if it exists as it won't be rebuilt
  const { sidebarReference } = shared;
  if (sidebarReference && sidebarReference.updateSticky) {
    sidebarReference.updateSticky();

    setTimeout(() => {
      sidebarReference.updateSticky();
    }, 1000);
  }

  return applyAllChanges([
    dismantleCarousel,
    changeTitle,
    createScollingDesc,
    changeShadeDropdownText,
  ]);
};
