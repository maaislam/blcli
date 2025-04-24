import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
/* eslint-disable */
pollerLite([
  'body',
], () => {
  events.send('EH002', 'Control', 'EH002 Control activated');
});
/* eslint-enable */
