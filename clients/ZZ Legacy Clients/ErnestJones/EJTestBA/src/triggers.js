import init from './lib/experiment';
import { pollerLite, events } from '../../../../lib/uc-lib';
import cache from './lib/cache';
import { qs } from './lib/dom';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';

pubSub.subscribe('experiment-init', () => {
  events.send(`${settings.ID}`, 'View');
});

const elementExists = (selector) => {
  let result = false;
  if (cache.get(selector)) {
    result = true;
  } else {
    const elm = qs(selector);
    if (elm) {
      result = true;
      cache.add(selector, elm);
    }
  }
  return result;
};

pollerLite([
  () => elementExists('#checkoutContent'),
  '#deliveryServiceList .deliveryOptionLabel',
], init);
