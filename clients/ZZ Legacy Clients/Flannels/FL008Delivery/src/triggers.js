import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';

flicker();

poller([
  '.panel-group.col-xs-12.SizenContact', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
