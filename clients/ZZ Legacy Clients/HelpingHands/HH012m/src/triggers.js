import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#menu-item-728 .menu-item.menu-item-type-post_type', // All homecare links
  // Ensure all nav items that will be used exists
  () => {
    let checkNavLength = false;
    const navElements = document.querySelectorAll('#menu-item-728 .menu-item.menu-item-type-post_type').length;
    if (navElements >= 14) {
      checkNavLength = true;
    }
    return checkNavLength;
  },
], Run);
