import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  'header',
  /*eslint-disable */
  () => {
    if (window.location.pathname === '/en-gb/c/blankets' || window.location.pathname === '/en-gb/c/parasols-raincovers' || window.location.pathname === '/en-gb/c/parasols-raincovers' || window.location.pathname === '/en-gb/c/rockers-bouncers-swings' || window.location.pathname === '/en-gb/c/cots-cribs-cotbeds') {
      return !!document.querySelector('.productCard_mediaContainer');
      return !!document.querySelector('#js-filterSortOrder');
    }
  },
  /* eslint-enable */
], Experiment.init);
