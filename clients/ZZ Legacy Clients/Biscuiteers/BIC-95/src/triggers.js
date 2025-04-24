import activate from './lib/experiment';
import settings from './lib/settings';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();

  document.body.classList.remove(`${settings.ID}`);
  document.body.classList.remove(`${settings.ID}-${settings.VARIATION}`);

  document.body.classList.remove(`${settings.ID}-no_scroll`);

  const removeElms = [`.${settings.ID}-DOD`];
  removeElms.forEach((elm) => {
    const queriedElm = document.querySelectorAll(elm);
    [].forEach.call(queriedElm, (queriedElm) => {
      if (queriedElm) {
        queriedElm.parentNode.removeChild(queriedElm);
      }
    });
  });
};

addPoller([
  'body',
  'local-product-view',
  'local-add-to-basket .button',
  () => !!window.ga,
  () => !!window.tco && typeof window.tco.get == 'function'
], activate);
