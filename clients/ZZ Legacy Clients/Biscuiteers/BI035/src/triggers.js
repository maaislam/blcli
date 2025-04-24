import activate from './lib/experiment';
import { stack, addPoller, destroyPollers, killAllEventListeners, killObservers } from './lib/winstack';
import pubSub from './lib/PublishSubscribe';
import { events } from '../../../../lib/utils';
import settings from './lib/settings';

stack.destroyOnPageChange = true;

stack.destroy = () => {
  destroyPollers();
  killAllEventListeners();
  killObservers();

  pubSub.deleteAll();

  // Tidy up DOM - delete on destroy elements
  [].forEach.call(document.querySelectorAll(`.${settings.ID}-DOD`), (elm) => {
    elm.remove();
  });
};

pubSub.subscribe('did-click-header-vib-link', () => {
  events.send(settings.ID, 'did-click-header-vib-link', '', {
    sendOnce: true
  });
});

pubSub.subscribe('did-click-pdp-info-icon', () => {
  events.send(settings.ID, 'did-click-pdp-info-icon', '', {
    sendOnce: true
  });
});

pubSub.subscribe('did-click-basket-info-icon', () => {
  events.send(settings.ID, 'did-click-basket-info-icon', '', {
    sendOnce: true
  });
});

pubSub.subscribe('show-dashboard-messaging', (type) => {
  events.send(settings.ID, 'show-dashboard-messaging', type, {
    sendOnce: true
  });
});

pubSub.subscribe('did-show-header-link-access-vib', (type) => {
  events.send(settings.ID, 'did-show-header-link-access-vib', type, {
    sendOnce: true
  });
});

pubSub.subscribe('show-pdp-messaging', (type) => {
  events.send(settings.ID, 'show-pdp-messaging', type, {
    sendOnce: true
  });
});

pubSub.subscribe('show-basket-messaging', (type) => {
  events.send(settings.ID, 'show-basket-messaging', type, {
    sendOnce: true
  });
});

pubSub.subscribe('did-show-apply-button-to-vib', (type) => {
  events.send(settings.ID, 'did-show-apply-button-to-vib', type, {
    sendOnce: true
  });
});

pubSub.subscribe('amended-basket-totals-for-non-vib', (type) => {
  events.send(settings.ID, 'amended-basket-totals-for-non-vib', type, {
    sendOnce: true
  });
});

addPoller([
  () => {
    return tco && (typeof tco.get == 'function') && tco.get('customer') && tco.get('customer').data;
  }
], activate);
