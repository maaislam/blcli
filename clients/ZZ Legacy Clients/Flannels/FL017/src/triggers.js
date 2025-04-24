import { storeBasket, buildBasket, storeBasketPDP } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#BasketDiv .ContinueOn',
  '#divContinueSecurely .ContinueOn',
], storeBasket);

poller([
  () => {
    let trigger = false;
    const { pathname } = window.location;
    if (localStorage.getItem('FL017_basket') &&
    localStorage.getItem('FL017_basket-extras') &&
    (pathname.match(/(\/)(checkout)(\/)(deliverychoices)($|\?.*)/) ||
    pathname.match(/(\/)(checkout)(\/)(payment)($|\?.*)/) ||
    pathname.match(/(\/)(checkout)(\/)(carddetails)($|\?.*)/) ||
    pathname.match(/(\/)(checkout)(\/)(usevoucher)($|\?.*)/))) {
      trigger = true;
    }
    return trigger;
  },
], buildBasket);

poller([
  '#productDetails',
  '.addToBag',
], storeBasketPDP);

