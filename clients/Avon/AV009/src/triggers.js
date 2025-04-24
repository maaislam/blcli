import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import settings from './lib/settings';
import { getCategory } from './lib/services';

const { ID } = settings;
const category = getCategory();
const isProduct = /\/product/.test(window.location.href);

if (/lips|nails|face|eyes/.test(category) && !isProduct) {
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
    events.send(`${ID}-variation-1`, 'did-meet-conditions');
    activate({ category });
  });
}
