import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';


pollerLite([
  'body',
], () => {
  events.send('DS001', 'Control', 'DS001 activated');
});

