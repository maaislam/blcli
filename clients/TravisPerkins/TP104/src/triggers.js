import { Run, Login, Redirect404 } from './experiment';
import { poller } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

const pathName = window.location.pathname;

poller([
  '.yCmsComponent.order_basket',
  '.view-more-btn',
  '#view-less-btn',
  '#content',
], Run);

poller([
  () => {
    let queryCheck = false;
    if (getCookie('TP104') === 'RedirectToCart' && pathName.indexOf('/cart') > -1) {
      queryCheck = true;
    }
    return queryCheck;
  },
], Login);

poller([
  () => {
    let queryCheck = false;
    if (getCookie('TP104') === 'Cart' && (pathName.indexOf('/404') > -1) || pathName === '/') {
      queryCheck = true;
    }
    return queryCheck;
  },
], Redirect404);
