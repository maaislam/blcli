import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  /*eslint-disable */
  () => {
    if (window && window.location && window.location.pathname && window.location.pathname === '/') {
      const elements = [
        '.rc4-search-box',
        '.RC022_selectCourseType',
        '.rc4-search-box__group-bookings',
      ];
      let result = true;
      elements.forEach((element) => {
        if (!document.querySelector(element)) {
          result = false;
        }
      });
      return result;
    } else if (window && window.location && window.location.pathname && window.location.pathname === '/What-we-do/key-account-management-service.aspx') {
      return true;
    }
  },
  /* eslint-enable */
], activate);
