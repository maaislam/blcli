import Experiment from './lib/experiment';

// Destroy previously created event listeners and pollers on page load
Experiment.setup();
Experiment.destroyPollers();
Experiment.killAllEventListeners();
Experiment.killObservers();
Experiment.killAllTimers();

if(Experiment.winExp) {
  Experiment.winExp.destroy = function() {
    Experiment.destroyPollers();
    Experiment.killAllEventListeners();
    Experiment.killObservers();
    Experiment.killAllTimers();

    const elmsToRemove = [
      '.BI034_Lightbox__overlay',
      '.BI034_Lightbox',
    ];
    elmsToRemove.forEach((elm) => {
      const domElm = document.querySelector(elm);
      if(domElm) {
        domElm.remove();
      }
    });
  };
}

/* Init experiment */
Experiment.addPoller([
  '.footer .wrap form',
], Experiment.init);
