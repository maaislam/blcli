import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  'h1',
  () => {
    if (window.location.pathname.indexOf('/destination/') > -1 && window.location.href.split('/').length === 5) {
      return true;
    }
  },
  () => window.jQuery && window.jQuery.fn && window.jQuery.fn.slick,
], activate);
