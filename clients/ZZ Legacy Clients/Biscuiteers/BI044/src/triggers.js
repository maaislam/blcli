import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';
import pubSub from './lib/PublishSubscribe';
import { events } from '../../../../lib/utils';
import settings from './lib/settings';

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
    document.body.classList.remove(settings.ID);
    document.body.classList.remove(`${settings.ID}-${settings.VARIATION}`);
    [].forEach.call(document.querySelectorAll(`.${settings.ID}-DOD`), (elm) => {
      elm.parentNode.removeChild(elm);
    });
  }
};


if(window.innerWidth < 520) {
// can only view on small screens where carousel exists
  addPoller([
    'body',
    '#section-2',
    () => document.querySelectorAll('#section-2 .carousel__frame img.rf.loaded[src]').length >= 4,
    () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
  ], () => {
      events.send(settings.ID, `${settings.ID}-${settings.VARIATION}`, 'did-activate');

      if(settings.VARIATION != 'control') {
        activate();
      }
  });
}
