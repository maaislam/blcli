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
  events.send('EJ019', 'Control', 'EJ019 activated');
});
