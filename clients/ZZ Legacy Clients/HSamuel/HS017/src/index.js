import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import init from './lib/experiment';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';
  
// ---------------------------------------------------
// Subscribers
// ---------------------------------------------------
pubSub.subscribe('experiment-init', () => {
  events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
});

pubSub.subscribe('did-show-gender', () => {
  events.send(settings.ID, 'did-show-gender-ctas', '');
});
pubSub.subscribe('did-build-brand-slider', () => {
  events.send(settings.ID, 'did-build-brand-slider', '');
});

pubSub.subscribe('experiment-init', () => {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
});

pubSub.subscribe('did-interact-with-price-slider', () => {
  events.send(settings.ID, 'did-interact-with-price-slider', '', {
    sendOnce: true  
  });
});

pubSub.subscribe('did-click-cta', (data) => {
  switch(data.type) {
    case 'him':
      events.send(settings.ID, 'did-click-cta-link--gender', 'him');
      break;
    case 'her':
      events.send(settings.ID, 'did-click-cta-link--gender', 'her');
      break;
    default:
      events.send(settings.ID, 'did-click-cta-link', data.type || '');
  }
});

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
pollerLite([
  'body',
  '.browse__main-content',
  '.browse__results-and-sort-container .browse__sort-container.desktop-up',
  () => window.navigator.userAgent.indexOf('MSIE ') === -1, // Not IE <= 10,
  () => !(/Trident.*rv[ :]*11\./.test(window.navigator.userAgent)), // Not IE11
  () => /.*\/webstore\/l\/.*watches.*/i.test(window.location.pathname),
], init);
