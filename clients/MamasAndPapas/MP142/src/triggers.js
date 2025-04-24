import activate from './lib/experiment';
import pubSub from './lib/PublishSubscribe';
import { events } from '../../../../lib/utils';
import settings from './lib/settings';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!   NOTE   !!!
// THIS EXPERIMENT RUNS FOR BOTH VARIATION AND CONTROL
// we set to control in task runner
// gulp --variation="control" or --variation="1"
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

pubSub.subscribe('did-add-link-to-main-slide-nav-menu', () => {
  events.send(`${settings.ID}`, `${settings.VARIATION}`, 'did-add-link-to-main-slide-nav-menu', {
    sendOnce: true
  });
});
pubSub.subscribe('did-click-added-link', () => {
  events.send(`${settings.ID}`, `${settings.VARIATION}`, 'did-click-added-link', {
    sendOnce: true
  });
});
pubSub.subscribe('did-change-link-in-existing-nav-menu-item', () => {
  events.send(`${settings.ID}`, `${settings.VARIATION}`, 'did-change-link-in-mp140-menu', {
    sendOnce: true
  });
});
pubSub.subscribe('did-click-mp140-link', () => {
  events.send(`${settings.ID}`, `${settings.VARIATION}`, 'did-click-mp140-link', {
    sendOnce: true
  });
});

activate();  // Pollers within the experiment JS
