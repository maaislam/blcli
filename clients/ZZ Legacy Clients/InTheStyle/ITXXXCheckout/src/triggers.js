import Experiment from './lib/experiment';
import { poller } from '../../../../lib/uc-lib';

// ------------------------------------------------
// Page load core elements polling
// ------------------------------------------------
poller([
  'body',
  '#opc-billing',
  '#opc-shipping',
  '#opc-payment',
  '#opc-shipping_method',
  () => !!window.checkout,
  () => !!window.shippingMethod,
  () => !!window.shipping,
  () => !!window.billing,
  () => !!window.payment
], () => {
  Experiment.init();
});
