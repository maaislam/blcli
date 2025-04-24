import init from './lib/experiment';
import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import { qs, qsa, elementExists } from './lib/dom';
// import cache from './lib/cache';
import pubSub from './lib/publishSubscribe';
import settings from './lib/settings';

// Events
pubSub.subscribe('user-saw', () => {
  events.send(settings.ID, 'User Saw', 'Minibag');
});

pubSub.subscribe('click-orders', () => {
  events.send(settings.ID, 'Clicked', 'View Previous Orders');
});

pubSub.subscribe('click-search', () => {
  events.send(settings.ID, 'Clicked', 'Search');
});

pubSub.subscribe('click-basket', () => {
  events.send(settings.ID, 'Clicked', 'View Basket');
});

pubSub.subscribe('close-popup', () => {
  events.send(settings.ID, 'Clicked', 'Popup Closed');
});

pollerLite([
  () => elementExists('body'),
  () => elementExists('#cart_content #minicart_data span.cartOverlay'),
], init);
