import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/* eslint-disable */
pollerLite([
  '.basket',
], () => {
  events.send('PJ003', 'Control', 'PJ003 activated');

  // wait until basket is opened
  window.prm.add_endRequest(function (sender, error) {
    try {
      const target = sender._postBackSettings.asyncTarget;
      if (target === 'ctl00$_objHeader$lbBasketItem') {
        
        const basketDeal = document.getElementById('ctl00__objHeader_divDiscount');
        const thirtyoff = basketDeal.querySelector('.discountCont .item').textContent;
        if (thirtyoff.indexOf('33% off Pizzas Online') > -1) {
          events.send('PJ003', 'Control', 'Opened basket with 33% offer added', { sendOnce: true });
        }
      }
    } catch (e) {}
  });
});
/* eslint-enable */
