import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.tpInfoWrapper .prices_holder',
  '.price_inc_vat_section .includedVAT',
  '.product_price_section .price_value',
], Run);
