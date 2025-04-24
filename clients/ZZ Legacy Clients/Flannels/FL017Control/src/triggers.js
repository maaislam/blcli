import buildBasket from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.CheckoutHeader',
  () => {
    let trigger = false;
    const { pathname } = window.location;
    if (
    pathname.match(/(\/)(checkout)(\/)(deliverychoices)($|\?.*)/) ||
    pathname.match(/(\/)(checkout)(\/)(payment)($|\?.*)/) ||
    pathname.match(/(\/)(checkout)(\/)(carddetails)($|\?.*)/) ||
    pathname.match(/(\/)(checkout)(\/)(usevoucher)($|\?.*)/)) {
      trigger = true;
    }
    return trigger;
  },
], buildBasket);
