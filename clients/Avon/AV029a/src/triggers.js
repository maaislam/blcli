import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  '.AddToWishList',
  '.ProductActions',
  () => {
    try {
      return !!window.AppModule.RootScope.$on;
    } catch (e) {}
  },
  () => {
    try {
      return !!window.AppModule.RootScope.Layout.Name;
    } catch (e) {}
  },
], () => {
  events.send('AV005-variation', 'did-meet-conditions');
  activate();
});
