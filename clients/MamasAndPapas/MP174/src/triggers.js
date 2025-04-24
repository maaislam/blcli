import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.call_to_action.pdp__btn-group',
  '.pdp_product_details.col-pdp',
  () => {
    let run = false;
    if (window.dataLayer && window.dataLayer[0] && window.dataLayer[0].ecommerce && window.dataLayer[0].ecommerce.detail && window.dataLayer[0].ecommerce.detail.products) {
      run = true;
    }
    return run;
  }
], activate);
