import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.category-products', '.item-product .item-product-content > a.product-image', '.product-info',
], Experiment.init);
