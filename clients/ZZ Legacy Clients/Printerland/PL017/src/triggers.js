import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

events.setPropertyId('UA-3521256-1');

pollerLite([
  'body',
  () => window.jQuery,
], activate);
