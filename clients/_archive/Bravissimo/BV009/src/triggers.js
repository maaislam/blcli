import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers, addEventListener } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();
};

addEventListener(window, 'load', () => {
  addPoller([
    'body',
  ], () => {
    // Check if page is search.
    if (!document.querySelector('.c-results__title')) {
      console.log('not on search page');
      activate();
    }
  });
})
