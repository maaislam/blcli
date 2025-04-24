import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product-tile-list',
  '#list',
  '.loading-indicator-next',
  '.browse__total-result-container',
  '.browse__main-content',
  () => !!window.jQuery,
], activate);
