import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.main-content div.container',
  /*eslint-disable */
  () => {
    if (window && window.location && window.location.pathname && window.location.pathname.indexOf('/OrderProcess') > -1) {
      return true;
    }
  },
  () => window.jQuery,
  () => $.fn.slick,
  /* eslint-enable */
], activate);
