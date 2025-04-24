import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  '.ProductListModule .ProductListItem',
  () => {
    try {
      return typeof window.angular.element === 'function';
    } catch (e) {}
  },
  () => {
    try {
      return !!window.AppModule.RootScope.$on;
    } catch (e) {}
  },
], () => {
  events.send('AV009-control', 'did-meet-conditions');
});
