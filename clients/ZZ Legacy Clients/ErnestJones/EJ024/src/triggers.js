import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  'body',
  '.basket__cta-form',
  '#lower-button-group',
  '.order-summary__total-value',
  '.product-summary',
  '.product-summary__remove-form',
  () => {
    try {
      return !!window.digitalData.cart.item;
    } catch(e) {}
  },
  () => {
    try {
      return !!window.jQuery;
    } catch(e) {}
  },
], activate);
/* eslint-enable */
