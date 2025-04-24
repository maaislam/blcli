import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
/* eslint-disable */
pollerLite([
  () => {
    try {
      return !!window.digitalData;
    } catch(e) {}
  },
  () => {
    try {
      return !!window.jQuery;
    } catch(e) {}
  },
], () => {
  events.send('HS024', 'Control', 'HS024 activated');
});
/* eslint-enable */
