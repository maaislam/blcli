import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.pd3--variant-product.subcat_column-item .pd3-prod-content',
  '.uc-countdown-wrapper',
], Run);
