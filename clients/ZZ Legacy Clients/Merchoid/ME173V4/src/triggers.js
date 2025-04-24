import { mapPoller } from '../../../../lib/uc-lib';
import Run from './lib/experiment';

mapPoller([
  {
    'deliveryWrap': '.product-usps',
    'prodTitle': '.mobile-target-product-title',
    'brand': 'input[name="_merchoid_pa_brand_name"]',
    'test': '.ME_test'
  },
], Run);

setTimeout(function() {
  document.body.insertAdjacentHTML('beforeend', '<div class="ME_test"></div>')
}, 1500);
