import activate from './lib/experiment';
import shared from './lib/shared';
import { events } from './../../../../lib/utils';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers, addEventListener } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();
};

if(!navigator.userAgent.match(/SamsungBrowser/i)) {
  addPoller([
    () => !!window.dataLayer,
    () => !!window.ga,
    () => {
      return !!(document.readyState == 'complete')
    },
    () => {
      return !!document.querySelector(`.c-product-details .c-field-brasize`) 
        || !!document.querySelector('.c-product-details__size-grid');
    }
  ], () => {
    events.send(shared.ID + '-' + shared.VARIATION, `${shared.ID} Active`);

    if(shared.VARIATION != 'control') {
      activate();
    }
  });
}
