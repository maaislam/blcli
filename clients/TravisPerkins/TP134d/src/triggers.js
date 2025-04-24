import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.s7staticimage img',
  'h1.tpProductTitle',
  '.tp_stock_ProdImage img',
  '#s7ProductDetailsImage_swatches',
  '#s7ProductDetailsImage_container .s7staticimage img',
  '#tab-techspecs .featureClass table',
], activate);
