/**
 * The brief: show the delivery method, cost and date at the top of the page
 * and send events for experiment view and message shown
 */
import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import init from './lib/experiment';
import settings from './lib/settings';
import { qs, qsa } from './lib/dom';
import cache from './lib/cache';
import pubSub from './lib/PublishSubscribe';

pubSub.subscribe('experiment-init', () => {
  events.send('TEST', `${settings.ID}`, 'View');
});

pubSub.subscribe('did-show-message', () => {
  events.send('TEST', `${settings.ID}`, 'Did Show Message');
});

/**
 * @desc Check for existence of element, check cache first 
 */
const elementExists = (selector) => {
  let result = false;

  if(cache.get(selector)) {
    result = true;
  } else {
    const elm = qs(selector);
    if(elm) {
      cache.add(selector, elm);

      result = true;
    }
  }

  return result;
};

// GENERIC poller
pollerLite([
  () => elementExists('#checkoutContent'),
  () => elementExists('#deliveryServiceList .deliveryOptionLabel'),
], init);
