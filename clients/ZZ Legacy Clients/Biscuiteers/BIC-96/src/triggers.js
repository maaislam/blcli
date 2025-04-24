import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';
import { events } from '../../../../lib/utils';
import settings from './lib/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
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

      //document.body.classList.remove(settings.ID);
    }
  };

  addPoller([
    'body',
    () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
    () => !!tco?.get && !!tco?.get('app') && (typeof tco?.get('app')?.$compile == 'function')
  ], () => {
    events.send(`${settings.ID}-${settings.VARIATION}`, 'Shown', '');
    if(settings.VARIATION != 'control') {
      activate();
    }
  });
}
