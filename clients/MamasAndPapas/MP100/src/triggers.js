import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.redeem-block',
  '.cartItem',
  '#voucher .vouchermsg',
  '.checkout_savings',
  '.cart-item-name-product-url',
  '.deliveryinfopanel',
  '.cartNewButton',
], Experiment.init);
