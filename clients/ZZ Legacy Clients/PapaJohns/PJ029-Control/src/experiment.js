import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  'body',
  '.main',
  () => !!window.jQuery,
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
], () => {
  events.send('PJ029', 'View', 'PJ029 activated - Control');
});
