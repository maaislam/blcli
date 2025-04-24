import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.CheckWrap #DeliveryAddressForm2Wrapper .billGroup .control-label',
  '.CheckWrap #DeliveryAddressForm2Wrapper .billGroup .checkbox input',
  '.CheckWrap #DeliveryAddressForm2Wrapper .billGroup',
  () => !!window._gaUAT,
], activate);
