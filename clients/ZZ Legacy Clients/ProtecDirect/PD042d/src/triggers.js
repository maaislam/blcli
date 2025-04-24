import init from './lib/experiment';
import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import { elementExists } from './lib/dom';
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

pollerLite([
  () => elementExists('#cart_popup'),
  () => elementExists('#rollover_cart_popup'),
  () => elementExists('.nav_secondary .manage_users.search form'),
  () => elementExists('#cart_content dl#minicart_data > dd'),
], init);
