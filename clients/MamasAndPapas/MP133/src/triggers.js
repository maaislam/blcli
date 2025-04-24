import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.productFilter.js-toggle',
  
  /*eslint-disable */
  () => {
    if (window && window.location && window.location && window.location.pathname.indexOf('/en-gb/c/pushchairs-prams') > -1) {
      return true;
    }
  },
  /* eslint-enable */
], activate);
