import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => { // eslint-disable-line consistent-return
    if (window && window.location && window.location.pathname && window.location.pathname === '/What-we-do.aspx') {
      return true;
    } else if (window && window.location && window.location.pathname && window.location.pathname.indexOf('/News-and-legislation') > -1) {
      return !!document.querySelector('.main-container .sidebar-first');
    } else if (window && window.location && window.location.pathname && window.location.pathname === '/Purchase/PurchaseSuccess.aspx') {
      return !document.querySelector('.RC028_Banner.RC028_Apps_Banner');
    }
  },
], activate);
