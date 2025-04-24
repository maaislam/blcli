import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import init from './lib/experiment';
import { productsTargeted } from './lib/experiment';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';
  
// ---------------------------------------------------
// Subscribers
// ---------------------------------------------------
pubSub.subscribe('experiment-init', () => {
  events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
});

pubSub.subscribe('experiment-init', () => {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
});

pubSub.subscribe('did-show-button', (data) => {
  events.send(settings.ID, 'did-show-button', data);
});

pubSub.subscribe('did-click-button', (data) => {
  switch(data) {
    case 'included':
      events.send(settings.ID, 'did-click-button', 'mattress-included', {
        sendOnce: true  
      });
      break;
    case 'link':
      events.send(settings.ID, 'did-click-button', 'link-to-mattress-page', {
        sendOnce: true  
      });
      break;
  }
});

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
const targetProducts = productsTargeted();
pollerLite([
  'body',
  '.productDetail_price',
  () => targetProducts.indexOf(window.location.pathname) !== -1,
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
], init);
