import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product-tile-list',
  '#list',
  '.loading-indicator-next',
  '.browse__total-result-container',
  '.browse__main-content',
  () => !!window.jQuery,
], () => {
  events.send('HS019', 'Control', 'HS019 activated');
});
