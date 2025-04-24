import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
/* eslint-disable */
pollerLite([
  'body',
], () => {
  events.send('EH001', 'Control', 'EH001 Control activated');
});
/* eslint-enable */
