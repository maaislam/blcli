import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  'body',
], () => {
  events.send('PJ050', 'Control', 'PJ050 activated');
});
/* eslint-enable */