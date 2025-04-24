import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';
import { events } from '../../../../lib/utils';
import settings from './lib/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {

  stack.destroyOnPageChange = true;

  stack.destroy = () => {
    if(settings.VARIATION != 'control') {
      destroyIntervals();
      killAllEventListeners();
      killObservers();

      // ---------------------------------------------------
      // Tidy up DOM - delete on destroy elements
      // ---------------------------------------------------
      [].forEach.call(document.querySelectorAll(`.${settings.ID}-DOD`), (elm) => {
        elm.parentNode.removeChild(elm);
      });

      document.documentElement.classList.remove(settings.ID);
      document.documentElement.classList.remove(`${settings.ID}-${settings.VARIATION}`);
    }
  };

  addPoller([
    'body',
    'product-content div[ng-if*="vm"]',
    () => {
      const action = document.querySelector('local-product-view local-add-to-basket action');
      return !!action;
    },
    () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
  ], activate);
}
