import Experiment from './lib/experiment';

// Destroy previously created event listeners and pollers on page load
Experiment.setup();
Experiment.destroyPollers();
Experiment.killAllEventListeners();
// Experiment.killObservers();

/* Init experiment */
Experiment.addPoller([
  '.meganav',
], Experiment.init);
