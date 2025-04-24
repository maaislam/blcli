import settings from './lib/settings';
import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, addEventListener, killObservers } from './lib/winstack';


const { ID } = settings;

stack.destroyOnPageChange = true;

stack.destroy = () => {
  [].forEach.call(document.querySelectorAll('.BVSaleNav-item'), (item) => {
    item.parentNode.removeChild(item);
  });
};

addPoller([
  'body',
  () => !!document.querySelector('ul.c-navigation__items') || !!document.querySelector('.c-drawer-nav')
], activate);
 
