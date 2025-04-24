import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#input-industry-selector',
  '#industry-modal-backdrop',
  '#industry-modal-container',
  () => {
    let trigger = false;
    if (window.jQuery) {
      trigger = true;
    }
    return trigger;
  },
], Run);
