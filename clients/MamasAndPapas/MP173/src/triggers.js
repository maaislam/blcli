import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.call_to_action',
  '.pdp_product_details__body #details',
  () => !! window.universal_variable.product,
], activate);
