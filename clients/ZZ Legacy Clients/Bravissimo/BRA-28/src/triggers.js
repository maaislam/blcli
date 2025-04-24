import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers, addEventListener } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();
};

  addPoller([
    'body',
    () => {
      let run = false;
      if (window.universal_variable && window.dataLayer && window.dataLayer[0] && document.readyState == "complete") {
        run = true;
      }
      return run;
    }
  ], () => {
    activate();
  });
