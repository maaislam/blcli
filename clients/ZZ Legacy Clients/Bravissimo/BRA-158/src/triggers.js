/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
 
import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();
};

try {
  addPoller([
    () => !!window.dataLayer,
    () => !!window.ga,
    () => {
      return !!(document.readyState == 'complete')
    },
  ], () => {
    activate();
  }, {
    multiplier: 1
  });
} catch(e) {}
