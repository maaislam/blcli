import Experiment from './lib/experiment';

// Destroy previously created event listeners and pollers on page load
Experiment.setup();
Experiment.destroyPollers();
Experiment.killAllEventListeners();
Experiment.killObservers();

/* Init experiment */
Experiment.addPoller([
  'body',
  '.fw-bold.price',
  'upsell-products .flex.flex-wrap',
  'action.button.p-l-10.p-r-10.w-12-m.w-12-s',
  'upsell-products-item.m-t-2.flex-column.c-4-set',
  () => {
    const jq = window['j' + 'Query'];
    return !!jq;
  }
], Experiment.init);
