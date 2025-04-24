import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    if (window.location && window.location.pathname && window.location.pathname === '/Purchase/YourDetails.aspx') {
      return true;
    }
  },
], Experiment.init);
