import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  '[ng-controller="MediaGalleryController"]',
  '#ProductMediaContainer',
  '#ProductNameAndRating .ProductName',
  '#ProductDetails .Prices',
  '#ProductDetails .ProductActions .AddToCart.FormField',
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
  events.send('AV012-variation', 'did-meet-conditions');
  activate();
});
