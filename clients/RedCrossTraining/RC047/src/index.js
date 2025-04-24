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

pubSub.subscribe('click-event', (identifier) => events.send(settings.ID, 'Clicked', identifier));
pubSub.subscribe('form-interaction', () => events.send(settings.ID, 'Focus', 'form-interaction', { sendOnce: true }));

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
pollerLite([
  'body',
  '.purchasenav-basket-contents-course', // RC035 condition
  '.purchasenav-back-button', // RC035 condition
  '.course-result-name', // RC035 condition
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => {
    const result =  
    // Not IE11
    (((window || {}).navigator || {}).userAgent) && 
    !(window.navigator.userAgent.indexOf('Trident') > -1 && !!window.navigator.userAgent.match(/rv[: ]11/i));

    return result;
  },
  () => !!window.jQuery,
], init);
