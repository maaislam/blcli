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
  }
};

// On the basket, destroy is called before we poll
if(window.location.pathname.match(/checkout/)) {
  addPoller([
    'body',
    () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
    () => {
      return document.readyState == "complete";
    },
  ], activate, {
    multiplier: 1.05
  });
}
