import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#products > .row > .prod ', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
