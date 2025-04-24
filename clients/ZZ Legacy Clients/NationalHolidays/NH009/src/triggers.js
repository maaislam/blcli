import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.holiday-search', '#ctl00_ContentPane', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      // eslint-disable-next-line
      checkjQuery = true;
    }
    return checkjQuery;
  },
], Experiment.init);
