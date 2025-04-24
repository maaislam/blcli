import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    if ((window.location.pathname === '/' && document.querySelector('#ctl00_RightPane .holiday-search.smaller')) || (window.location.href.indexOf('search-results?') > -1 && localStorage.getItem('NH067-search') !== null)) {
     return true;
    }
  },
], activate);
