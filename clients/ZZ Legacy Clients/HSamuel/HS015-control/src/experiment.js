import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
/*eslint-disable*/
pollerLite([
  'body',
 ], () => {
  events.send('HS015', 'Control', 'HS015 activated');
});
