import settings from './lib/settings';

const { ID } = settings;


import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();
};

addPoller([
  'body',
  '.c-results-list__items',
  '.c-product-summary__img',
], activate);
