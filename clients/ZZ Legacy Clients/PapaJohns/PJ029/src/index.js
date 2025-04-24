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

pubSub.subscribe('experiment-init', () => {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
});

pubSub.subscribe('unused-offers-exists', () => {
  events.send(settings.ID, 'unused-offers-exists', '', {
    sendOnce: true
  });
});

pubSub.subscribe('built-basket', () => {
  events.send(settings.ID, 'basket-summary-shown', '', {
    sendOnce: true  
  });
});

pubSub.subscribe('failed-building-basket', () => {
  events.send(settings.ID, 'basket-summary-could-not-be-shown', '', {
    sendOnce: true  
  });
});

pubSub.subscribe('did-click-change-link', () => {
  events.send(settings.ID, 'did-click-change-link', '', {
    sendOnce: true  
  });
});

pubSub.subscribe('refreshed-page', () => {
  events.send(settings.ID, 'refreshed-page-basket-changed', '', {
    sendOnce: true  
  });
});

pubSub.subscribe('clicked-proceed-to-checkout', () => {
  events.send(settings.ID, 'clicked-proceed-to-checkout', '', {
    sendOnce: true  
  });
});

pubSub.subscribe('clicked-visa-proceed', () => {
  events.send(settings.ID, 'clicked-visa-proceed', '', {
    sendOnce: true  
  });
});

pubSub.subscribe('clicked-apply-code', () => {
  events.send(settings.ID, 'clicked-apply-code', '', {
    sendOnce: true  
  });
});

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
pollerLite([
  'body',
  '.main',
  () => !!window.jQuery,
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
], init);
