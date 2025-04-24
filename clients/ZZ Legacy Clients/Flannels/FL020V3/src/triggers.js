// import { RunVoucher } from './experiment';
import { Run, RunVoucher } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.newBasketPromoCode [id*=PromoCodeManager_divVoucherError]',
], Run);

poller([
  '.Voucher.PaymentMethodSelectionLink',
], RunVoucher);
