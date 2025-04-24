import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    const pagesToExclude = ["/OrderProcess/Welcome.aspx", "/OrderProcess/Payment.aspx"];
    if (window && window.location && window.location.pathname && window.location.pathname.indexOf('/OrderProcess') > -1 && pagesToExclude.indexOf(window.location.pathname) === -1) {
      return true;
    }
  },
], activate);
