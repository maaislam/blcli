import activate from './lib/experiment';
import { poller } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';

// ---------------------------------------------------
// Subscribers
// ---------------------------------------------------
pubSub.subscribe('did-click-tour-link', (data) => {
  events.send(settings.ID, 'did-see-lightbox', data, {
    sendOnce: true  
  });
});

pubSub.subscribe('did-reorder-departure-points', () => {
  events.send(settings.ID, 'did-reorder-departure-points', '', {
    sendOnce: true
  });
});

pubSub.subscribe('did-reorder-room-types', () => {
  events.send(settings.ID, 'did-reorder-room-types', '', {
    sendOnce: true  
  });
});

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
poller([
  'body',
  () => window.jQuery && window.jQuery.fn && window.jQuery.fn.ajaxComplete,
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => {
    // Not IE11
    const result = (((window || {}).navigator || {}).userAgent) &&
    !(window.navigator.userAgent.indexOf('Trident') > -1 && !!window.navigator.userAgent.match(/rv[: ]11/i));
    return result;
  },
], activate);
