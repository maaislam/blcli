import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';
import { events } from '../../../../lib/utils';
import settings from './lib/shared';
import { urlList } from './lib/targeting';

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

const currentPathname = window.location.pathname;
const onTheRightPage = (urlList.indexOf(currentPathname) > -1);

if(onTheRightPage) {
  addPoller([
    'body',
    () => !!window['j' + ''.trim() + 'Query'],
    () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
  ], activate);
}
