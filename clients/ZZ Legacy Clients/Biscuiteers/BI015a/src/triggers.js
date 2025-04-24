import Experiment from './lib/experiment';

// Destroy previously created event listeners and pollers on page load
Experiment.setup();
Experiment.destroyPollers();
Experiment.killAllEventListeners();

/* Init experiment */
Experiment.addPoller([
  'body',
  () => !!window.JQSG
], Experiment.init);
