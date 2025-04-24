import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.rc18-courseRow',
  '.rc18-coursetableName',
  /*eslint-disable */
  () => {
    if (window.location.href && window.location.href.indexOf('/Where-we-train/EventsSearch.aspx') > -1) {
      return true;
    }
  },
  /* eslint-enable */
], Experiment.init);
