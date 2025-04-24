import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#topNav',
  () => {
    if (window.location && window.location.pathname && window.location.pathname === '/') {
      return true;
    }
  },
], Experiment.init);
