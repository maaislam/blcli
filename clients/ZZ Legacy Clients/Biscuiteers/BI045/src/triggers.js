import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  if(shared.VARIATION != 'control') {
    destroyPollers();
    destroyIntervals();
    killAllEventListeners();
    killObservers();

    // ---------------------------------------------------
    // Tidy up DOM - delete on destroy elements
    // ---------------------------------------------------
    document.body.classList.remove(shared.ID);
    document.body.classList.remove(`${shared.ID}-${shared.VARIATION}`);
    [].forEach.call(document.querySelectorAll(`.${shared.ID}-DOD`), (elm) => {
      elm.parentNode.removeChild(elm);
    });
  }
};


if(window.innerWidth < 520) {
// can only view on small screens where carousel exists
  addPoller([
    'body',
    () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
  ], () => {
      //events.send(shared.ID, `${shared.ID}-${shared.VARIATION}`, 'did-activate');

      if(shared.VARIATION != 'control') {
        activate();
      }
  });
}
