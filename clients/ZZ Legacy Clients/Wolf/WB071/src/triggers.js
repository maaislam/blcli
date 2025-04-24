import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.items-in-your-basket',
  '.totals-table .total-cart',
  '.checkout-actions .checkout-group .checkout-action-item .normal-checkout',
  () => {
    let trigger = false;
    if (window.jQuery) {
      trigger = true;
    }

    return trigger;
  },
], Run);
