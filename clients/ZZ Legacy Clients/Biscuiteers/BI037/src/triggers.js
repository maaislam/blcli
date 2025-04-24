import activate, { undoModifyHeaderItemsDesktop } from './lib/experiment';
import { events } from '../../../../lib/utils';
import { stack, addPoller, destroyPollers, killAllEventListeners, killObservers } from './lib/winstack';
import settings from './lib/settings';
import pubSub from './lib/PublishSubscribe';

stack.destroyOnPageChange = true;

// Clean up on page exit - destroy - remove elms and listeners etc.
stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();

  document.body.classList.remove(`${settings.ID}`);

  const existing = document.querySelector(`.${settings.ID}-countdown`);
  if(existing) {
    existing.remove();
  }

  const existing2 = document.querySelector(`.${settings.ID}-headfaq`);
  if(existing2) {
    existing2.remove();
  }

  undoModifyHeaderItemsDesktop();
};

// Subscribers
pubSub.subscribe('clicked-element', (label) => {
  events.send(`${settings.ID}`, 'click', label, {
    sendOnce: true
  });
});

addPoller([
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
  () => {
    // Not IE11
    const result = (((window || {}).navigator || {}).userAgent) &&
    !(window.navigator.userAgent.indexOf('Trident') > -1 && !!window.navigator.userAgent.match(/rv[: ]11/i));
    return result;
  },
], activate);
