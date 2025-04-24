import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';
import { events } from '../../../../lib/utils';
import settings from './lib/shared';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  if(settings.VARIATION != 'control') {
    destroyPollers();
    destroyIntervals();
    killAllEventListeners();
    killObservers();

    // ---------------------------------------------------
    // Tidy up DOM - delete on destroy elements
    // ---------------------------------------------------
    [].forEach.call(document.querySelectorAll(`.${settings.ID}-DOD`), (elm) => {
      elm.parentNode.removeChild(elm);
    });

    document.body.classList.remove(settings.ID);
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
};

addPoller([
  'body',
  'product-when-your-occasion',
  'local-product-view',
  () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
], activate);
