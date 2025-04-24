import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  'body',
  '.browse__page-intro',
  '.browse__main-content',
  '.browse__results-and-sort-container .browse__sort-container.desktop-up',
  () => window.navigator.userAgent.indexOf('MSIE ') === -1, // Not IE <= 10,
  () => !(/Trident.*rv[ :]*11\./.test(window.navigator.userAgent)), // Not IE11
  () => /.*\/webstore\/l\/.*watches.*/i.test(window.location.pathname),
], () => {
  events.send('HS017', 'Control', 'HS017 activated');
});
/* eslint-enable */
