/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import VoucherTab from './components/voucherTab';

const activate = () => {
  setup();
  const voucher = new VoucherTab();
};

export default activate;
