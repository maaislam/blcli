import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  () => {
    let value = false;
    if (window.jQuery) {
      value = true;
    }
    return value;
  },
], Run);
