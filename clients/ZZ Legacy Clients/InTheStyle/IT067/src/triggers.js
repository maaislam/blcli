import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.product-view .product-collateral #block-reviews', '.block-related.block-product-grid',
], Experiment.init);
