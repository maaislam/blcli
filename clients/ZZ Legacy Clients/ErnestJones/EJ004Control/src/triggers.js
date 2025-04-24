import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.browse__banner-content-inner h2',
  '.browse__applied-filters',
  '.product-tile-list__item',
], Run);

