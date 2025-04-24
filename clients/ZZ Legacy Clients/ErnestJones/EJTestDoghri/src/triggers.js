import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import init from './lib/experiment';
import cache from './lib/cache';
import { qs, qsa } from './lib/dom';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';

/**
 * @desc Firing function when SOMETHING happens
 */
pubSub.subscribe('experiment-init', () => {
  events.send(`${settings.ID}`, 'View');
});

pubSub.subscribe('did-show-message', () => {
  events.send(`${settings.ID}`, 'Did Show Message');
});

/**
 * 
 * @desc Checks if element exists and stores in Cache
 */
const elementExists = (selector) => {
  let result = false;
    if (cache.get(selector)) {
      result = true;
    } else {
      const elm =  document.querySelector(selector);
    }

    if (elm) {
      result = true;

      cache.add(selector, elm);
    }

    return result;
};

pollerLite([
  'body',
  () => elementExists('#checkoutContent'),
  () => elementExists('#deliveryServiceList .deliveryOptionLabel'),
], init);
