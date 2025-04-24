import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#menu-item-728 > .dropdown-menu > li', // Homecare services nav items
  '#menu-item-728 > .dropdown-menu', // Homecare services area
  '#menu-item-728 .menu-item > a', // Homecare services nav links
  // Ensure all nav items that will be used exists
  () => {
    let checkNavLength = false;
    const navElements = document.querySelectorAll('#menu-item-728 > .dropdown-menu > li').length;
    if (navElements >= 14) {
      checkNavLength = true;
    }
    return checkNavLength;
  },
], Run);
