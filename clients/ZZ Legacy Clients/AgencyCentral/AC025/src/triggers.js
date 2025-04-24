import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.agency-primary-link',
  () => {
    let trigger = false;

    if (window.jQuery) {
      trigger = true;
    }

    return trigger;
  },
], Run);
