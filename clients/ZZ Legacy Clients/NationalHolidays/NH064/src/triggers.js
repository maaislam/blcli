import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

events.setTrackerName('tracker2');

pollerLite([
  'body',
  '#ddlMoreDates',
  () => !!window.jQuery,
], activate);
