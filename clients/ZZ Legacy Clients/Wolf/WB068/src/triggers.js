import WB068 from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  () => {
    let jQuery = false;

    if (window.jQuery) {
      jQuery = true;
    }

    return jQuery;
  },
], WB068);
