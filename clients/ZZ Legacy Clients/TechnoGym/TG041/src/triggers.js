import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.category-title', '.category-view .category-products', '.regular-price .price',
], Experiment.init);
