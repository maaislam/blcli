// import { RunVoucher } from './experiment';
import { Run, UserError } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.newBasketPromoCode .form-horizontal.VoucherForm',
], Run);

poller([
  '.newBasketPromoCode [id*=PromoCodeManager_divVoucherError]',
], UserError);
