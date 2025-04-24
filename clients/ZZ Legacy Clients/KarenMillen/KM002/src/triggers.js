import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#CheckoutBillingForm',
  '.total-value.value',
  '#toPayment',
  () => !!window.jQuery.fn.validate,
], activate);
