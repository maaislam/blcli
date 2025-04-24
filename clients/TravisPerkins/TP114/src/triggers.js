import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.tpCheckoutButton a',
  () => {
    let trigger = false;
    if (window.jQuery && !sessionStorage.getItem('TP114')) trigger = true;
    return trigger;
  },
], Run);
