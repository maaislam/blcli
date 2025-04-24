import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';
/* eslint-disable */
poller([
  '.checkout_item.cartItem',
  '.cart-redeem-block',
  '#voucher .vouchermsg',
  () => {
    return !!window.jQuery;
  },
], Experiment.init);
