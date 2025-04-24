import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  'body',
], () => {
  events.send('PJ049', 'Control', 'PJ049 activated');
});
/* eslint-enable */