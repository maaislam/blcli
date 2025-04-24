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

pubSub.subscribe('did-click-top-banner', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-click-top-banner', {
    sendOnce: true  
  });
});
pubSub.subscribe('did-add-top-banner', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-add-top-banner', {
    sendOnce: true  
  });
});
pubSub.subscribe('did-add-content-to-checkout-newsletter-box', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-add-content-to-checkout-newsletter-box', {
    sendOnce: true  
  });
});
pubSub.subscribe('did-rename-label-on-checkout-newsletter-box', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-rename-label-on-checkout-newsletter-box', {
    sendOnce: true  
  });
});
pubSub.subscribe('user-clicked-signup-checkbox-checkout', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'user-clicked-signup-checkbox-checkout', {
    sendOnce: true  
  });
});
pubSub.subscribe('did-show-newsletter-info', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-show-newsletter-info', {
    sendOnce: true  
  });
});
pubSub.subscribe('did-click-newsletter-info-cta', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'did-click-newsletter-info-cta', {
    sendOnce: true  
  });
});
pubSub.subscribe('user-saw-signup-page', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'user-saw-signup-page', {
    sendOnce: true  
  });
});
pubSub.subscribe('user-did-click-subscribe-on-signup-page', () => {
  events.send(settings.ID, `Variation ${settings.VARIATION}`, 'user-did-click-subscribe-on-signup-page', {
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
  () => {
    const pathName = window.location.pathname;
    const validUrls = [
      /Courses\/First-aid-at-work-courses-uk-mainland.aspx/i,
      /What-we-do\/First-aid-at-work.aspx/i,
      /Purchase\/YourDetails.aspx/i,
      /What-we-do\/ongoing-support.aspx/i,
      /News-and-legislation\/sign-up-to-our-newsletter.aspx/i,
    ];

    return validUrls.some((url) => url.test(pathName));
  },
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => {
    // Not IE11
    const result = (((window || {}).navigator || {}).userAgent) &&
    !(window.navigator.userAgent.indexOf('Trident') > -1 && !!window.navigator.userAgent.match(/rv[: ]11/i));
    return result;
  },
], init);
