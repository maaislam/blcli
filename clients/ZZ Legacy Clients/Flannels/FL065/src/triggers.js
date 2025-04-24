import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.FlanProdDet .addToBasketContainer .ImgButWrap a',
], activate);
