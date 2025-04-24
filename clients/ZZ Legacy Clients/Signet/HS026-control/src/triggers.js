import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.browse__sort-container.mobile-and-tablet-only',
  '.browse__header-section h1',
  '#list',
  '.product-tile__description',
  '.browse__results-and-sort-container',
], activate);
