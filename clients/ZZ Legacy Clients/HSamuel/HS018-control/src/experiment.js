import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  'body',
], () => {
  events.send('HS018', 'Control', 'HS018 activated');
});
/* eslint-enable */
