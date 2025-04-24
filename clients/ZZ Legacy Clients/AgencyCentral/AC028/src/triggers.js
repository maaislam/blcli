import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

poller([
  'body', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
  () => {
    let onSearchPage = false;
    if (/(\/)(agencysearch)(\/)(search)(.htm\?).*/.test(window.location.href)) {
      onSearchPage = true;
    }
    return onSearchPage;
  },
  // Check session storage if modal has been shown in this session
  // Do not run activate the test if it has
  () => {
    let showModal = false;
    if (!sessionStorage.getItem('AC028-Modal-Shown')) {
      showModal = true;
    }
    return showModal;
  },
  () => {
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
], run);

