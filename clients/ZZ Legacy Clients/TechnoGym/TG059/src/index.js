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

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
pollerLite([
  () => !!window.jQuery && !!window.jQuery.fn.slick,
  () => !!window.requestAnimationFrame,
  '.featured_post_wrapper',
  '.wrapper > .content-container',
  '.content-container .wordpress-page-view .page-container',
  '#main',
], init);
