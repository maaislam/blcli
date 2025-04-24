import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, destroyIntervals, killAllEventListeners, killObservers } from './lib/winstack';
import { events } from '../../../../lib/utils';
import settings from './lib/shared';
import { getRootScope, isCurrentPagePlpOrPdp } from './lib/services';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  if(settings.VARIATION != 'control') {
    destroyPollers();
    destroyIntervals();
    killAllEventListeners();
    killObservers();
  }

  document.body.classList.remove(settings.ID);
  document.body.classList.remove(`${settings.ID}-active`);
};

addPoller([
  'body',
  () => !!isCurrentPagePlpOrPdp(),
  () => !!getRootScope(),
  () => !!window['j' + ''.trim() + 'Query'],
  () => !!window.google_tag_manager, // Prevent destroy being called before exp. code
], activate);
