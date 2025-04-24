import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.product-page .product-image', '.product-image-assoc-brand',
], Experiment.init);
