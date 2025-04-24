import { Run, Login, Redirect404 } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.guestCheckoutContainer',
  () => {
    let trigger = false;
    if (window.jQuery) trigger = true;
    return trigger;
  },
], Run);

poller([
  () => {
    let queryCheck = false;
    if (localStorage.getItem('TP105') === 'RedirectToCart') {
      queryCheck = true;
    }
    return queryCheck;
  },
], Login);

poller([
  () => {
    let queryCheck = false;
    if (localStorage.getItem('TP105') === 'Cart') {
      queryCheck = true;
    }
    return queryCheck;
  },
], Redirect404);
