import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.button_text > .sessioncamhidetext', '#page > .yCmsContentSlot.header_buttons', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
