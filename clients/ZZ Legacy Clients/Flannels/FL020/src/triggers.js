// import { RunVoucher } from './experiment';
import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.newBasketPromoCode .form-horizontal.VoucherForm',
], Run);
