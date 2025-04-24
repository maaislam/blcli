import Experiment from './experiment';

// Destroy previously created event listeners and pollers on page load
Experiment.setup();
Experiment.destroyPollers();
Experiment.killAllEventListeners();
Experiment.killObservers();

/* Init experiment */
Experiment.addPoller([
  'body', '.off-canvas__nav-menu',
], Experiment.init);
