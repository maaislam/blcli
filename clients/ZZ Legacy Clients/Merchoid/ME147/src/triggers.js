import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.product-image a',
  '.mobile-target-product-title',
  '.price.large',
  '.product-details.tabs-style',
  '.row.product-page',
], Experiment.init);
