import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
poller([
  'h1.title-inner1',
  '.order_totals .total> .ui-grid-a>.ui-block-b',
  '.grid_12 >.common-cart-item',
  '.grid_12 >.common-cart-item .code',
  '.grid_12 >.common-cart-item form',
  '.grid_12 >.common-cart-item .ui-block-a',
  '.grid_12 >.common-cart-item .item > .grid_4',
  '.grid_12 >.common-cart-item .remove-item-qnt',
  '.grid_12 >.common-cart-item .label-value.totalPrice',
  '.grid_12 >.common-cart-item .common-qty',
  '.grid_12 >.common-cart-item .label-value.totalPrice',
  '.order_totals > .vat .ui-block-a',
  '.order_totals > .sub-total',
  '.order_totals .ui-grid-a .ui-block-b',
  '.grid_12.linkButton.row1',
  '.grid_12.linkButton.row2',
  '#saveBasket',
  '#checkoutButton',
  '.order_totals',
  '.order_totals .total> .ui-grid-a > .ui-block-a',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
