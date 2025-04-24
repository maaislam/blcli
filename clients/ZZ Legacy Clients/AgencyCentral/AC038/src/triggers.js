import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

pollerLite([
  '.navbar-strapline', // Content insert after
  '#navbar',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
  () => {
    let checkCookie = false;
    const profileCookie = getCookie('empOrCand');
    // Check cookie exists, fire if not an employer
    if (profileCookie) {
      if (profileCookie.toUpperCase() !== 'EMP') {
        checkCookie = true;
      }
    }
    return checkCookie;
  },
], Run);
