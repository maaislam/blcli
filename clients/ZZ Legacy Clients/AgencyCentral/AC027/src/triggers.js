import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

poller([
  '#search-results-container .agency-result.row ', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  }, () => {
    let checkCookie = false;
    const profileCookie = getCookie('empOrCand');
    // Check cookie exists, if it does then check if they are an employer
    if (profileCookie) {
      if (profileCookie.toUpperCase() === 'EMP') {
        checkCookie = true;
      }
    }
    return checkCookie;
  },
  () => {
    // Check if there are at least 6 agency listings
    let checkSixthAgency = false;
    if (document.querySelectorAll('#search-results-container .agency-result.row ')[5]) {
      checkSixthAgency = true;
    }
    return checkSixthAgency;
  },
], run);
