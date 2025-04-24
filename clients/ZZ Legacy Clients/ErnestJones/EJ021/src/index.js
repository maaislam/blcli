import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import init from './lib/experiment';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';
  
// ---------------------------------------------------
// Subscribers
// ---------------------------------------------------
pubSub.subscribe('experiment-init', () => {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
});

pubSub.subscribe('experiment-init', () => {
  events.send(settings.ID, `${settings.VARIATION}`, 'View', {
    sendOnce: true  
  });
});

pubSub.subscribe('clicked-main-filter-button', () => {
  events.send(settings.ID, `${settings.VARIATION}`, 'Clicked Main Filter Button', {
    sendOnce: true  
  });
});

pubSub.subscribe('clicked-scroll-filter-button', () => {
  events.send(settings.ID, `${settings.VARIATION}`, 'Clicked Onscroll Filter Button', {
    sendOnce: true  
  });
});

pubSub.subscribe('used-filter', (data) => {
  events.send(settings.ID, `${settings.VARIATION}`, `Used Filter - ${data}`);
});

// ----------------------------------------------
// Generic Poller
//
// - Rules for across all variations
// - Rules for across all combinations
// ----------------------------------------------
pollerLite([
  'body',
  '.filter-toggle',
  '.browse__results-and-sort-container',
  () => {
    // -- V2 -- 
    let result = false;
    if(settings.VARIATION === '1') {
      result = true;
    } else if(settings.VARIATION === '2') {
      result = !!document.querySelector('#filter-modal .js-modal-content');
    }

    return result;
  },
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
], init);
