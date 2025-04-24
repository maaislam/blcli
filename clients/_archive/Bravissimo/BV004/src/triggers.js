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
    () => {
      let run = false;
      const { product } = window.dataLayer[0];
      if (product) {
        const { category } = product;
        if (category === 'Lingerie') {
          run = true;
        }
      } else if (window.location.href === 'https://www.bravissimo.com/bra-fitting-guide/') {
        run = true;
      }
      return run;
    },
  ], activate);  
});