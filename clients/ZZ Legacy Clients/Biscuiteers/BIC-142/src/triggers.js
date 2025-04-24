import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {

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
      [].forEach.call(document.querySelectorAll(`.${shared.ID}-DOD`), (elm) => {
        elm.parentNode.removeChild(elm);
      });

      document.body.classList.remove(shared.ID);
    }
  };

  addPoller([
    'body',
    () => !!window.google_tag_manager, // Prevent destroy being called before exp. code,
  ], activate);
}
