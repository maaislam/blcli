import activate from './lib/experiment';
import shared from './lib/shared';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();
  destroyIntervals();

  document.body.classList.remove(`${shared.ID}`);
  document.body.classList.remove(`${shared.ID}-${shared.VARIATION}`);

  document.body.classList.remove(`${shared.ID}-no_scroll`);

  const removeElms = [`.${shared.ID}-DOD`];
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
    'local-add-to-basket',
    () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
    () => !!tco?.get && !!tco?.get('app') && (typeof tco?.get('app')?.$compile == 'function')
  ], () => {


      activate();
    
  });
