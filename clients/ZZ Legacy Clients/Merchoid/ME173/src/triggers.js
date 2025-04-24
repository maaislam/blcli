import { mapPoller } from '../../../../lib/uc-lib';
import Run from './lib/experiment';

mapPoller([
  {
    'deliveryWrap': '.product-usps',
    'prodTitle': '.mobile-target-product-title',
    'brand': 'input[name="_merchoid_pa_brand_name"]'
  },
], Run);
