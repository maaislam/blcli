import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import init from './lib/experiment';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';

// ---------------------------------------------------
// Use tracker 2 for GA events
// ---------------------------------------------------
events.setTrackerName('tracker2');
  
// ---------------------------------------------------
// Subscribers
// ---------------------------------------------------
pubSub.subscribe('experiment-init', () => {
  events.send(settings.ID, 'View - Saw Stat', `${settings.ID} activated - Variation ${settings.VARIATION}`);
});

pubSub.subscribe('experiment-init', () => {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
});

pubSub.subscribe('box-in-view', () => {
  events.send(settings.ID, 'box-in-view', '', {
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
  '.main-content > .container > .content > .right',
  () => !!HTMLElement.prototype.getBoundingClientRect,
  () => {
    return settings.STATS.map((stat) => !!(window.location.pathname.match(stat.regex))).length > 0;
  },
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
], init);
