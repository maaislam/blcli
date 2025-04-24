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
    'section.c-container a[label="Live chat"]',
    '.c-locale-switcher__flag--gb',
  ], activate);
});
