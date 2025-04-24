import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.section-category-heading',
  '.brand-category',
  '.row.brand-byline .brand-image',
  '.products .product-small .name',
], Experiment.init);
