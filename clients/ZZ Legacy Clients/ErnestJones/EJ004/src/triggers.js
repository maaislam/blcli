import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerPrevention';

flicker();

poller([
  '.browse__banner-content-inner h2',
  '.browse__applied-filters',
  '.product-tile-list__item',
], Run);

