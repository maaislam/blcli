import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers, addEventListener } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();
};

addPoller([
  '.c-container__main',
  () => !!window.ga,
  () => {
    return !!(document.readyState == 'complete')
  }
], () => {
  activate();
});
