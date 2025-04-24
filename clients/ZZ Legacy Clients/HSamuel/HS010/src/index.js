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

pubSub.subscribe('video-interaction', (data) => {
  events.send(settings.ID, 'video-interaction', data);
});

pubSub.subscribe('items-in-view-on-scroll', (data) => {
  events.send(settings.ID, 'quote-items-seen', data, {
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
  '.browse__main-content',
  '.items .product-tile-list__item',

  /**
   * Video DOM support
   */
  () => {
    if(!HTMLMediaElement || !HTMLVideoElement) {
      return false;
    }

    return HTMLMediaElement.prototype.hasOwnProperty('muted') 
      && HTMLMediaElement.prototype.hasOwnProperty('autoplay')
      && ('oncanplay' in window)
  },

  /**
   * Not IE11
   */
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
], init);
