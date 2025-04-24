import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { cacheDom } from './../../../../lib/cache-dom';

pollerLite(['.baskt_item', () => !!window.dataLayer[0].loggedIn], () => {
  // Only run if logged in and 5 or less items in the basket
  const products = cacheDom.getAll('.baskt_item');
  const MAX_PRODUCTS = 6;
  const LOGGED_IN = window.dataLayer[0].loggedIn === 'yes';
  if (LOGGED_IN && products.length <= MAX_PRODUCTS && !document.querySelector('body').classList.contains('TP121')) {
    pollerLite([
      '.basket-item-content',
      '.basketTotalPrice',
      '.itm_total p',
      'input[name="quantity"]',
      '.baskt_item .itm_info > h3 > a',
    ], activate);
  }
});
