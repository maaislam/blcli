import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import settings from './lib/settings';

const { ID } = settings;

pollerLite([
  '#LogoBar',
  '#HamburgerMenuNew',
  'header',
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
  events.send(`${ID}-variation-1`, 'did-meet-conditions');
  activate();
});
