import { Run, changeText } from './experiment';
import { poller } from '../../../../lib/uc-lib';
import { setCookie } from '../../../../lib/utils';

poller([
  '.Voucher.PaymentMethodSelectionLink',
], Run);

poller([
  '.VoucherForm h2',
], changeText);

poller([
  '[id*="divVoucherError"]',
], () => {
  const text = document.querySelector('[id*="divVoucherError"]').textContent;
  setCookie('FL022_error', text);
  window.location.pathname = '/checkout/payment';
});

