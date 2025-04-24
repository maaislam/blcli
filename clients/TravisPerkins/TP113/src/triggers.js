import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';
// import { getCookie } from '../../../../lib/utils';

poller([
  '#upperCheckoutButton',
  () => {
    let trigger = false;
    if (window.jQuery && !sessionStorage.getItem('TP113')) trigger = true;
    return trigger;
  },
], Run);
