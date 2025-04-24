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
  () => !!(angular && window.tco && window.tco.get),
  () => window.tco.get('customer') 
    && window.tco.get('customer').basket 
    && window.tco.get('customer').basket.qty > 0,
], activate);
