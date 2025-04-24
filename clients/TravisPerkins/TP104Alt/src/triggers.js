import { Run, Login } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.yCmsComponent.order_basket',
  '.view-more-btn',
  '#view-less-btn',
  '#content',
], Run);

poller([
  () => {
    let queryCheck = false;
    if (localStorage.getItem('TP104') === 'RedirectToCart') {
      queryCheck = true;
    }
    return queryCheck;
  },
], Login);
