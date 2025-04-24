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

  // Garbage removal

  if(document.getElementById(`${ID}-ffinfo-additional`)) {
    document.getElementById(`${ID}-ffinfo-additional`).remove();
  }

  if(document.getElementById(`${ID}-ffinfo-holder`)) {
    document.getElementById(`${ID}-ffinfo-holder`).remove();
  }

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
