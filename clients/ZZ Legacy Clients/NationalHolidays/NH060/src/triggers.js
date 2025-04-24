import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

events.setTrackerName('tracker2');

pollerLite([
  'body',
  '.result-item .btn-more-info',
  '.result-item .itin-title',
  () => !!window.jQuery,
], activate);
