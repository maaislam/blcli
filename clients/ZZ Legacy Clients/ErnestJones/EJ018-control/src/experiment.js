import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  'body',
], () => {
  events.send('EJ018', 'Control', 'EJ018 activated');
});
/* eslint-enable */
