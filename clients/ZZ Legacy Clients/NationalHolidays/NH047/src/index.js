import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import init from './lib/experiment';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';

events.setTrackerName('tracker2');
  
// ---------------------------------------------------
// Subscribers
// ---------------------------------------------------
pubSub.subscribe('experiment-init', () => {
  events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
});

pubSub.subscribe('experiment-init', () => {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
});

pubSub.subscribe('scarcity-hover--quickview', () => {
  events.send(settings.ID, 'scarcity-hover--quickview', '', {
    sendOnce: true
  });
});
pubSub.subscribe('scarcity-click--quickview', () => {
  events.send(settings.ID, 'scarcity-click--quickview', '', {
    sendOnce: true
  });
});

pubSub.subscribe('scarcity-hover--itineraries', () => {
  events.send(settings.ID, 'scarcity-hover--itineraries', '', {
    sendOnce: true
  });
});
pubSub.subscribe('scarcity-click--itineraries', () => {
  events.send(settings.ID, 'scarcity-click--itineraries', '', {
    sendOnce: true
  });
});

pubSub.subscribe('scarcity-hover--booking', () => {
  events.send(settings.ID, 'scarcity-hover--booking', '', {
    sendOnce: true
  });
});
pubSub.subscribe('scarcity-click--booking', () => {
  events.send(settings.ID, 'scarcity-click--booking', '', {
    sendOnce: true
  });
});

pubSub.subscribe('did-show-message', (type) => {
  events.send(settings.ID, 'did-show-message--' + type, '', {
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
  () => !!window.localStorage,
  () => !!window.jQuery,
  () => localStorage.getItem(settings.LOCAL_STORE_KEY),
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => {
    // Not IE11
    const result = (((window || {}).navigator || {}).userAgent) &&
    !(window.navigator.userAgent.indexOf('Trident') > -1 && !!window.navigator.userAgent.match(/rv[: ]11/i));
    return result;
  },
], init);
