import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.productDetail .yCmsContentSlot.add-to-cart + .yCmsContentSlot',
  '#addToCartForm',
  '.addToCartButton',
  '.pickupInStoreBtn',
], Experiment.init);
