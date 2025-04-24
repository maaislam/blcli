import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  () => {
    let trigger = false;

    if (window.jQuery) {
      trigger = true;
    }

    return trigger;
  },
], Run);
