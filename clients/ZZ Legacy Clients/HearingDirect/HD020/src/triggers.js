import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.products-grid .item',
  '.product-info__name',
  '.category-description.std',
], Experiment.init);
