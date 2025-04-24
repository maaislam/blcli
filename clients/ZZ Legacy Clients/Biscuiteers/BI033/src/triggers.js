import Experiment from './lib/experiment';

// Destroy previously created event listeners and pollers on page load
Experiment.setup();
Experiment.destroyPollers();
Experiment.killAllEventListeners();
Experiment.killObservers();

/* Init experiment */
Experiment.addPoller([
  'category-view .grid',
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => {
    // Not IE11
    const result = (((window || {}).navigator || {}).userAgent) &&
    !(window.navigator.userAgent.indexOf('Trident') > -1 && !!window.navigator.userAgent.match(/rv[: ]11/i));
    return result;
  },
], Experiment.init);
